import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import IconBadge from "@/components/ui/IconBadge";
import { cn } from "@/lib/utils";

type Entry = {
  icon: string;
  tone: "brand" | "plum" | "emerald" | "gold";
  title: string;
  desc: string;
  cta: string;
  href: string;
};

const topBorderTone: Record<Entry["tone"], string> = {
  brand: "before:bg-brand",
  plum: "before:bg-plum",
  emerald: "before:bg-emerald",
  gold: "before:bg-gold",
};

const ctaTone: Record<Entry["tone"], string> = {
  brand: "text-brand",
  plum: "text-plum",
  emerald: "text-emerald",
  gold: "text-gold",
};

export default function EntryGrid({
  eyebrow,
  entries,
}: {
  eyebrow: string;
  entries: Entry[];
}) {
  return (
    <section className="px-4 mt-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium text-ink-faint mb-3">{eyebrow}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {entries.map((e) => (
            <Link
              key={e.title}
              href={e.href}
              className={cn(
                "relative overflow-hidden flex flex-col gap-3 rounded-xl2 border border-line bg-card p-5 shadow-card hover:shadow-cardHover transition-shadow",
                "before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-0.5",
                topBorderTone[e.tone]
              )}
            >
              <IconBadge icon={e.icon} tone={e.tone} />
              <div>
                <p className="text-sm font-bold">{e.title}</p>
                <p className="text-xs text-ink-faint mt-1 leading-5">{e.desc}</p>
              </div>
              <span
                className={cn(
                  "mt-auto flex items-center gap-1 text-xs font-medium",
                  ctaTone[e.tone]
                )}
              >
                {e.cta}
                <ChevronLeft className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
