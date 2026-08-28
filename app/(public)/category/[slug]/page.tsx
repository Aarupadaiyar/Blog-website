import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import ScrollReveal from "@/components/ScrollReveal";
import { prisma } from "@/lib/prisma";
import { getPostsByCategorySlug } from "@/lib/queries";
import { DoodleUnderline, DoodleZigzag } from "@/components/Doodles";

async function getCategory(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return {};
  return { title: category.name, description: category.description ?? undefined };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  const posts = await getPostsByCategorySlug(slug);

  return (
    <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <DoodleZigzag className="pointer-events-none absolute right-8 top-14 hidden h-4 w-24 text-blue opacity-70 sm:block" />
      <p className="font-hand text-3xl text-accent-deep">topic</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{category.name}</h1>
      <DoodleUnderline className="mt-1 h-3 w-40 text-green" />
      {category.description && (
        <p className="mt-4 max-w-xl text-lg text-ink-soft">{category.description}</p>
      )}

      {posts.length === 0 ? (
        <p className="mt-16 text-ink-soft">No entries in this topic yet.</p>
      ) : (
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <ScrollReveal key={post.id} delay={Math.min(i * 0.05, 0.3)}>
              <PostCard post={post} index={i} />
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
