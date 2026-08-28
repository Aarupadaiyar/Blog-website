import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { DoodleCircle, DoodleWaveDivider, DoodleUnderline, DoodleStar, DoodleHeart } from "@/components/Doodles";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="relative mx-auto max-w-2xl px-5 py-20 sm:px-8">
      <DoodleCircle className="pointer-events-none absolute -right-6 top-8 h-24 w-24 text-green opacity-70 sm:h-32 sm:w-32" />
      <DoodleStar className="pointer-events-none absolute right-32 top-2 h-5 w-5 text-yellow opacity-90" />
      <p className="font-hand text-3xl text-accent-deep">about the writer</p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        {siteConfig.authorName}
      </h1>
      <DoodleUnderline className="mt-1 h-3 w-40 text-accent" />
      <p className="mt-3 text-lg text-ink-soft">{siteConfig.authorTitle}</p>

      <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row">
        <div className="relative h-32 w-32 shrink-0 overflow-hidden border-[1.6px] border-ink bg-paper-card">
          {siteConfig.authorPhotoUrl ? (
            <Image src={siteConfig.authorPhotoUrl} alt={siteConfig.authorName} fill className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center px-3 text-center">
              <span className="font-mono-label text-[0.65rem] text-ink-faint">ADD YOUR PHOTO</span>
            </div>
          )}
        </div>

        <div className="wobbly-box relative flex-1 bg-surface p-6 sm:p-8">
          <DoodleHeart className="pointer-events-none absolute -right-3 -top-3 h-6 w-6 text-accent" />
          <p className="font-mono-label text-xs text-ink-faint">A FEW LINES ABOUT ME</p>
          <div className="prose-notebook mt-3">
            <p>{siteConfig.authorBio}</p>
          </div>
        </div>
      </div>

      <DoodleWaveDivider className="mt-14 h-10 w-full text-border" />

      <div className="prose-notebook mt-6">
        <p>{siteConfig.description}</p>
        <p>New notes appear here as they&apos;re written — check back, or follow along by topic from the menu above.</p>
      </div>
    </div>
  );
}
