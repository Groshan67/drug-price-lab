import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { topDrugs, topManufacturers } from "@/lib/data/mock";
import { cn } from "@/lib/utils";

function RankBadge({ n }: { n: number }) {
  return (
    <span
      className={cn(
        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold tabular",
        n === 1 ? "bg-gold-soft text-gold" : "bg-canvas text-ink-faint"
      )}
    >
      {n.toLocaleString("fa-IR")}
    </span>
  );
}

export default function Rankings() {
  return (
    <section className="px-4 mt-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium text-ink-faint mb-3">رتبه‌بندی‌های برجسته</p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl2 border border-line bg-card shadow-card p-4">
            <p className="text-sm font-bold mb-3">داروهای پربازدید</p>
            <ul className="divide-y divide-line">
              {topDrugs.map((d) => (
                <li key={d.rank}>
                  <Link
                    href={d.href}
                    className="flex items-center gap-3 py-3 hover:bg-canvas -mx-1 px-1 rounded-lg transition-colors"
                  >
                    <RankBadge n={d.rank} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{d.name}</p>
                      <p className="text-xs text-ink-faint truncate">{d.sub}</p>
                    </div>
                    <span className="text-sm font-bold tabular shrink-0">
                      {d.price.toLocaleString("fa-IR")} ین
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl2 border border-line bg-card shadow-card p-4">
            <p className="text-sm font-bold mb-3">سازندگان پربازدید</p>
            <ul className="divide-y divide-line">
              {topManufacturers.map((m) => (
                <li key={m.rank}>
                  <Link
                    href={m.href}
                    className="flex items-center gap-3 py-3 hover:bg-canvas -mx-1 px-1 rounded-lg transition-colors"
                  >
                    <RankBadge n={m.rank} />
                    <span className="text-sm font-medium flex-1">{m.name}</span>
                    <ChevronLeft className="h-4 w-4 text-ink-faint" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
