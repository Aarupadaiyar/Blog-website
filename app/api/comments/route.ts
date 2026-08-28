import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { commentSchema } from "@/lib/validation";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = commentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  // Honeypot tripped — pretend it worked so the bot doesn't learn anything.
  if (data.companyWebsite) {
    return NextResponse.json({ ok: true, status: "pending" }, { status: 201 });
  }

  const post = await prisma.post.findUnique({ where: { id: data.postId }, select: { id: true, status: true } });
  if (!post || post.status !== "published") {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  await prisma.comment.create({
    data: {
      postId: post.id,
      authorName: data.authorName,
      authorEmail: data.authorEmail || null,
      body: data.body,
      status: "pending",
    },
  });

  return NextResponse.json({ ok: true, status: "pending" }, { status: 201 });
}
