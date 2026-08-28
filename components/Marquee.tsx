export default function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden border-y-[1.6px] border-ink bg-ink py-3">
      <div className="marquee-track">
        {loop.map((item, i) => (
          <span key={i} className="font-mono-label mx-4 flex items-center gap-4 whitespace-nowrap text-sm text-paper">
            {item}
            <span aria-hidden className="text-yellow">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
