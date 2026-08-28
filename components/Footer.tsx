import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { DoodleScribble, DoodleStar, DoodleZigzag, DoodleDots } from "./Doodles";

export default function Footer({ categories }: { categories: { name: string; slug: string }[] }) {
  return (
    <footer className="mt-24 border-t-[1.6px] border-ink">
      <div className="relative overflow-hidden border-b-[1.6px] border-ink bg-ink py-16 text-paper">
        <DoodleStar className="pointer-events-none absolute right-10 top-8 h-8 w-8 text-yellow opacity-90" />
        <DoodleZigzag className="pointer-events-none absolute bottom-6 left-10 h-4 w-20 text-green opacity-70" />
        <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
          <p className="font-hand text-3xl text-yellow">more soon —</p>
          <h2 className="mt-1 max-w-lg text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            New notes land here every week.
          </h2>
          <DoodleScribble className="mt-4 h-6 w-32 text-accent" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <div className="text-lg font-bold tracking-tight text-ink">{siteConfig.name}</div>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{siteConfig.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div>
              <div className="font-mono-label text-xs text-ink-faint">TOPICS</div>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/category/${c.slug}`} className="text-sm text-ink-soft hover:text-accent-deep">
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <DoodleDots className="pointer-events-none absolute -right-10 -top-3 h-4 w-12 text-accent opacity-70" />
              <div className="font-mono-label text-xs text-ink-faint">MORE</div>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                <li>
                  <Link href="/resources" className="text-sm text-ink-soft hover:text-accent-deep">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-ink-soft hover:text-accent-deep">
                    About
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t-[1.6px] border-border pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {siteConfig.authorName}. All notes are my own.
          </span>
          <Link href="/admin/login" className="hover:text-ink-soft">
            Admin login
          </Link>
        </div>
      </div>
    </footer>
  );
}
