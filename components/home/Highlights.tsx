import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { highlights } from "@/lib/data/mock";
import IconBadge from "@/components/ui/IconBadge";

export default function Highlights() {
  return (
    <section className="px-4">
      <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-3 gap-4">
        {highlights.map((h) => (
          <Link
            key={h.label}
            href={h.href}
            className="group flex items-start gap-3 rounded-xl2 border border-line bg-card p-4 shadow-card hover:shadow-cardHover transition-shadow"
          >
            <IconBadge icon={h.icon} tone={h.tone} />
            <div className="min-w-0 flex-1">
              <p className="text-lg font-bold tabular">{h.value}</p>
              <p className="text-xs text-ink-soft mt-0.5">{h.label}</p>
              <p className="text-xs text-ink-faint">{h.sub}</p>
            </div>
            <ChevronLeft className="h-4 w-4 text-ink-faint shrink-0 mt-1 transition-transform group-hover:-translate-x-0.5" />
          </Link>
        ))}
      </div>
    </section>
  );
}
