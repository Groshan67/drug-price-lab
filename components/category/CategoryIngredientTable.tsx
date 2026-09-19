"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Download, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { downloadCsv } from "@/lib/utils/csv";
import type { CategoryDetailData } from "@/lib/data/category-detail";

type ViewMode = "ingredient" | "item";

export default function CategoryIngredientTable({ data }: { data: CategoryDetailData }) {
  const router = useRouter();
  const [view, setView] = useState<ViewMode>("ingredient");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return data.ingredients;
    return data.ingredients.filter((i) => i.name.includes(q));
  }, [data.ingredients, query]);

  function handleExportCsv() {
    downloadCsv(
      `${data.slug}-ingredients`,
      ["نام ماده مؤثره", "تعداد اقلام", "پیشگام", "حمایتی", "کمترین قیمت (ین)", "بیشترین قیمت (ین)", "بازنگری قبلی میانگین (%)"],
      filtered.map((row) => [
        row.name,
        row.itemCount,
        row.starters,
        row.relievers,
        row.priceLow,
        row.priceHigh,
        row.prevRevisionAvgPercent,
      ])
    );
  }

  function handleCopyWithSource() {
    const lines = filtered.map(
      (row) =>
        `${row.name}: ${row.priceLow.toLocaleString("fa-IR")}–${row.priceHigh.toLocaleString("fa-IR")} ین`
    );
    const text = `${data.name} (${data.groupLabel})\n${lines.join("\n")}\nمنبع: ${data.revisionLabel}`;
    navigator.clipboard?.writeText(text).catch(() => {});
  }

  return (
    <section className="px-4 mt-4">
      <div className="mx-auto max-w-5xl rounded-xl2 border border-line bg-card p-5 shadow-card">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="inline-flex rounded-full border border-line p-1">
            {([
              ["ingredient", "بر اساس ماده مؤثره"],
              ["item", "بر اساس قلم"],
            ] as [ViewMode, string][]).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setView(val)}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                  view === val ? "bg-brand text-white" : "text-ink-soft hover:text-brand"
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-emerald hover:bg-emerald-soft transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              CSV
            </button>
            <button
              onClick={handleCopyWithSource}
              className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-brand/40 hover:text-brand transition-colors"
            >
              <Copy className="h-3.5 w-3.5" />
              کپی همراه با منبع
            </button>
          </div>
        </div>

        <div className="mt-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="پالایش بر اساس نام دارو/ماده مؤثره..."
            className="w-full rounded-lg border border-line bg-canvas px-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-shadow"
          />
        </div>

        {view === "item" ? (
          <div className="mt-6 rounded-xl border border-dashed border-line p-8 text-center text-sm text-ink-faint">
            نمای «بر اساس قلم» هنوز در این پیش‌نمایش داده کامل ندارد.
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-ink-faint border-b border-line">
                  <th className="text-right font-medium py-2">نام ماده مؤثره</th>
                  <th className="text-right font-medium py-2">تعداد اقلام</th>
                  <th className="text-right font-medium py-2">پیشگام / حمایتی</th>
                  <th className="text-right font-medium py-2">دامنه قیمت (ین)</th>
                  <th className="text-right font-medium py-2">بازنگری قبلی (میانگین)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {filtered.map((row) => (
                  <tr
                    key={row.slug}
                    onClick={() => router.push(`/ingredient/${row.slug}`)}
                    className="cursor-pointer hover:bg-brand-soft/50 transition-colors"
                  >
                    <td className="py-3 font-medium text-brand">{row.name}</td>
                    <td className="py-3 tabular">{row.itemCount.toLocaleString("fa-IR")}</td>
                    <td className="py-3 text-ink-soft tabular">
                      {row.starters.toLocaleString("fa-IR")}/{row.relievers.toLocaleString("fa-IR")}
                    </td>
                    <td className="py-3 font-medium tabular whitespace-nowrap">
                      {row.priceLow.toLocaleString("fa-IR")}–{row.priceHigh.toLocaleString("fa-IR")}
                    </td>
                    <td
                      className={cn(
                        "py-3 font-medium tabular",
                        row.prevRevisionAvgPercent < 0 ? "text-rose" : "text-emerald"
                      )}
                    >
                      {row.prevRevisionAvgPercent > 0 ? "+" : ""}
                      {row.prevRevisionAvgPercent.toLocaleString("fa-IR")}٪
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
