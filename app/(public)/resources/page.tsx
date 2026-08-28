import Image from "next/image";
import { ExternalLink, BookOpen, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ScrollReveal from "@/components/ScrollReveal";
import { DoodleWaveDivider, DoodleStar, DoodleCheck, DoodleDots } from "@/components/Doodles";

export const metadata = { title: "Resources" };

const typeColors: Record<string, string> = {
  book: "bg-yellow",
  magazine: "bg-accent-soft",
  course: "bg-green-soft",
  podcast: "bg-blue-soft",
  article: "bg-yellow",
  tool: "bg-accent-soft",
};

export default async function ResourcesPage() {
  const resources = await prisma.resource.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  return (
    <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <DoodleStar className="pointer-events-none absolute right-10 top-10 h-7 w-7 text-blue opacity-80" />
      <DoodleDots className="pointer-events-none absolute right-40 top-24 hidden h-4 w-14 text-green opacity-70 sm:block" />
      <p className="font-hand text-3xl text-accent-deep">worth your time</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink sm:text-5xl">Resources</h1>
      <p className="mt-4 max-w-xl text-lg text-ink-soft">
        Books, courses, magazines, and tools worth recommending — updated as I find things worth
        sharing.
      </p>
      <DoodleWaveDivider className="mt-8 h-8 w-full text-border" />

      {resources.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-3 border-[1.6px] border-dashed border-border py-24 text-center">
          <BookOpen className="text-ink-faint" size={28} strokeWidth={1.25} />
          <p className="text-ink-soft">No resources listed yet — check back soon.</p>
          <DoodleCheck className="h-5 w-6 text-green" />
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r, i) => (
            <ScrollReveal key={r.id} delay={Math.min(i * 0.04, 0.3)}>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col overflow-hidden paper-card transition-transform hover:-translate-y-1 hover:shadow-[4px_4px_0_var(--ink)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden border-b-[1.6px] border-border bg-paper-card">
                  {r.coverImageUrl ? (
                    <Image
                      src={r.coverImageUrl}
                      alt={r.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(min-width: 640px) 400px, 100vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <BookOpen className="text-ink-faint" size={30} strokeWidth={1.25} />
                    </div>
                  )}
                  {r.featured && (
                    <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center border-[1.6px] border-ink bg-yellow">
                      <Star size={13} className="fill-ink text-ink" />
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span
                    className={`font-mono-label inline-flex w-fit items-center px-2 py-0.5 text-[0.65rem] text-ink ${typeColors[r.type] ?? "bg-paper-card"}`}
                  >
                    {r.type.toUpperCase()}
                  </span>
                  <h3 className="mt-3 font-bold leading-snug tracking-tight text-ink transition-colors group-hover:text-accent-deep">
                    {r.title}
                  </h3>
                  {r.creator && <p className="mt-1 text-sm text-ink-faint">{r.creator}</p>}
                  {r.description && <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{r.description}</p>}
                  <span className="font-mono-label mt-4 inline-flex items-center gap-1.5 text-xs text-ink">
                    VIEW
                    <ExternalLink size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}
