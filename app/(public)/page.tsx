import Link from "next/link";
import { ArrowRight, PenLine } from "lucide-react";
import PostCard from "@/components/PostCard";
import ScrollReveal from "@/components/ScrollReveal";
import HeroIntro from "@/components/HeroIntro";
import Marquee from "@/components/Marquee";
import { DoodleBracketLeft, DoodleBracketRight, DoodleSwirl, DoodleHeart } from "@/components/Doodles";
import { getCategories, getLatestPosts } from "@/lib/queries";
import { siteConfig } from "@/lib/site-config";

const pillColors = ["bg-yellow", "bg-accent-soft", "bg-green-soft", "bg-blue-soft"] as const;

// Otherwise Next.js prerenders this page once at build time (it has no
// dynamic inputs) and it would never show newly published posts.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [posts, categories] = await Promise.all([getLatestPosts(13), getCategories()]);
  const [featured, ...rest] = posts;

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <HeroIntro />
      </div>

      <Marquee
        items={[siteConfig.name, "BOOKS", "AI", "ECONOMICS", "LEADERSHIP", "SCIENCE", "HEALTH", "CULTURE"]}
      />

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {categories.length > 0 && (
          <div className="relative flex flex-wrap items-center gap-2 py-10">
            <DoodleSwirl className="pointer-events-none absolute -left-8 top-2 hidden h-8 w-8 text-accent opacity-70 md:block" />
            {categories.map((c, i) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}`}
                className={`font-mono-label border-[1.6px] border-ink px-4 py-1.5 text-xs text-ink transition-transform hover:-translate-y-0.5 ${pillColors[i % pillColors.length]}`}
              >
                {c.name.toUpperCase()}
              </Link>
            ))}
          </div>
        )}

        {posts.length === 0 ? (
          <div className="flex flex-col items-center gap-3 border-[1.6px] border-dashed border-border py-24 text-center">
            <PenLine className="text-ink-faint" size={28} strokeWidth={1.25} />
            <p className="text-ink-soft">No entries published yet — the first note is on its way.</p>
            <DoodleHeart className="h-6 w-6 text-accent" />
          </div>
        ) : (
          <section id="latest" className="scroll-mt-24 pb-20 pt-4">
            <ScrollReveal>
              <h2 className="mb-6 flex items-center justify-center gap-3 text-2xl font-bold tracking-tight text-ink sm:justify-start">
                <DoodleBracketLeft className="h-8 w-3 text-accent" />
                Latest notes
                <DoodleBracketRight className="h-8 w-3 text-accent" />
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured && (
                <ScrollReveal className="sm:col-span-2">
                  <PostCard post={featured} featured index={0} />
                </ScrollReveal>
              )}
              {rest.map((post, i) => (
                <ScrollReveal key={post.id} delay={Math.min(i * 0.05, 0.3)}>
                  <PostCard post={post} index={i + 1} />
                </ScrollReveal>
              ))}
            </div>
            {posts.length >= 13 && (
              <div className="mt-10 flex justify-center">
                <Link href={`/category/${categories[0]?.slug ?? ""}`} className="btn-sharp">
                  Browse by topic <ArrowRight size={15} />
                </Link>
              </div>
            )}
          </section>
        )}
      </div>
    </>
  );
}
