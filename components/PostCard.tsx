import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { DoodleStar } from "./Doodles";

export type PostCardData = {
  slug: string;
  title: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  publishedAt: Date | string | null;
  categories: { category: { name: string; slug: string } }[];
};

const tagColors = ["bg-yellow", "bg-accent-soft", "bg-green-soft", "bg-blue-soft"] as const;

function colorForCategory(slug: string) {
  const sum = slug.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return tagColors[sum % tagColors.length];
}

export default function PostCard({
  post,
  featured = false,
  index,
}: {
  post: PostCardData;
  featured?: boolean;
  index?: number;
}) {
  return (
    <Link
      href={`/posts/${post.slug}`}
      className={`group block overflow-hidden paper-card transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0_var(--ink)] ${
        featured ? "sm:col-span-2" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden border-b-[1.6px] border-border bg-paper-card ${featured ? "aspect-[16/8]" : "aspect-[16/10]"}`}
      >
        {post.coverImageUrl ? (
          <Image
            src={post.coverImageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={featured ? "(min-width: 640px) 800px, 100vw" : "(min-width: 640px) 400px, 100vw"}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BookOpen className="text-ink-faint" size={32} strokeWidth={1.25} />
          </div>
        )}
        {typeof index === "number" && (
          <span className="font-mono-label absolute left-3 top-3 border-[1.6px] border-ink bg-surface px-2 py-0.5 text-[0.65rem] text-ink">
            NOTE {String(index + 1).padStart(2, "0")}
          </span>
        )}
        {featured && (
          <DoodleStar className="absolute right-3 top-3 h-7 w-7 text-yellow opacity-90 transition-transform duration-300 group-hover:rotate-12" />
        )}
      </div>
      <div className="p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {post.categories.slice(0, 2).map(({ category }) => (
            <span
              key={category.slug}
              className={`font-mono-label inline-flex items-center gap-1 px-2 py-0.5 text-[0.65rem] text-ink ${colorForCategory(category.slug)}`}
            >
              {category.name.toUpperCase()}
            </span>
          ))}
          {post.categories.length > 2 && (
            <span className="font-mono-label text-[0.65rem] text-ink-faint">+{post.categories.length - 2}</span>
          )}
          {post.publishedAt && (
            <span className="font-mono-label text-[0.65rem] text-ink-faint">
              {format(new Date(post.publishedAt), "MMM d, yyyy").toUpperCase()}
            </span>
          )}
        </div>
        <h3
          className={`mt-3 font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent-deep ${
            featured ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
        )}
        <span className="font-mono-label mt-4 inline-flex items-center gap-1.5 text-xs text-ink">
          READ NOTE
          <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}
