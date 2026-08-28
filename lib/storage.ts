import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

/**
 * Storage is pluggable: with no Cloudinary env vars set, uploads are written
 * to /public/uploads (fine for local dev). Fill in the CLOUDINARY_* env vars
 * (see .env.example) to switch to Cloudinary for production — no code change
 * needed, this module picks it up automatically.
 */
const useCloudinary = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
);

if (useCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export type UploadResult = {
  url: string;
  publicId?: string;
};

export type UploadKind = "image" | "pdf";

export async function uploadFile(
  buffer: Buffer,
  originalName: string,
  kind: UploadKind
): Promise<UploadResult> {
  if (useCloudinary) {
    const resourceType = kind === "pdf" ? "raw" : "image";
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { resource_type: resourceType, folder: "blog" },
        (error, result) => {
          if (error || !result) reject(error);
          else resolve(result);
        }
      );
      stream.end(buffer);
    });
    return { url: result.secure_url, publicId: result.public_id };
  }

  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadsDir, { recursive: true });
  const ext = path.extname(originalName) || (kind === "pdf" ? ".pdf" : "");
  const safeName = `${Date.now()}-${crypto.randomUUID()}${ext}`;
  await writeFile(path.join(uploadsDir, safeName), buffer);
  return { url: `/uploads/${safeName}` };
}

export const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
export const MAX_PDF_BYTES = 25 * 1024 * 1024;
