import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { siteConfig } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.post.findMany({
    where: { status: "published", publishedAt: { lte: new Date() } },
    select: { slug: true, updatedAt: true },
  });
  const categories = await prisma.category.findMany({ select: { slug: true } });

  return [
    { url: siteConfig.url, changeFrequency: "daily", priority: 1 },
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.5 },
    ...categories.map((c) => ({
      url: `${siteConfig.url}/category/${c.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...posts.map((p) => ({
      url: `${siteConfig.url}/posts/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
