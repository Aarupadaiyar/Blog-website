import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getPostBySlug, getRelatedPosts } from "@/lib/queries";
import VideoEmbed from "@/components/VideoEmbed";
import PdfCard from "@/components/PdfCard";
import PostCard from "@/components/PostCard";
import PostHero from "@/components/PostHero";
import CommentSection from "@/components/CommentSection";
import AdminPostControls from "@/components/AdminPostControls";
import { siteConfig } from "@/lib/site-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt ?? undefined,
      type: "article",
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
      siteName: siteConfig.name,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const categoryIds = post.categories.map((c) => c.categoryId);
  const related = await getRelatedPosts(categoryIds, post.id);
  const primaryCategory = post.categories[0]?.category;
  const categories = post.categories.map((c) => c.category);
  const session = await getServerSession(authOptions);
  const isAdmin = Boolean((session?.user as { id?: string } | undefined)?.id);

  return (
    <article>
      {isAdmin && (
        <div className="pt-4">
          <AdminPostControls postId={post.id} />
        </div>
      )}
      <PostHero
        title={post.title}
        categories={categories}
        authorName={post.author?.name}
        publishedAt={post.publishedAt}
        coverImageUrl={post.coverImageUrl}
        videoUrl={post.videoUrl}
      />

      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        {post.coverImageUrl && post.videoUrl && (
          <div className="mb-10">
            <VideoEmbed url={post.videoUrl} />
          </div>
        )}

        <div className="prose-notebook" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />

        {post.attachments.length > 0 && (
          <div className="mt-12 space-y-3">
            <h2 className="tracking-tight text-lg font-bold text-ink">Attachments</h2>
            {post.attachments.map((a) => (
              <PdfCard key={a.id} url={a.url} fileName={a.fileName} />
            ))}
          </div>
        )}

        {post.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2 border-t-[1.6px] border-border pt-8">
            {post.tags.map(({ tag }) => (
              <span key={tag.id} className="font-mono-label border-[1.6px] border-border px-2.5 py-1 text-[0.65rem] text-ink-soft">
                #{tag.name.toUpperCase()}
              </span>
            ))}
          </div>
        )}

        <CommentSection postId={post.id} comments={post.comments} />

        {related.length > 0 && (
          <div className="mt-16 border-t border-border pt-10">
            <h2 className="mb-6 tracking-tight text-xl font-bold text-ink">
              More in {primaryCategory?.name ?? "this topic"}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((r, i) => (
                <PostCard key={r.id} post={r} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
