"use client";

import { Fragment, useMemo, useState } from "react";
import Link from "next/link";
import { Download, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IngredientPageData, IngredientProductRow } from "@/lib/data/ingredient-page";

type ClassificationFilter = "all" | "original" | "generic";
type SortBy = "classification" | "price-asc" | "price-desc" | "manufacturer";

const classificationLabel: Record<IngredientProductRow["classification"], string> = {
  original: "محصول اصلی",
  generic: "محصول ژنریک",
};

export default function IngredientProductExplorer({ data }: { data: IngredientPageData }) {
  const [classificationFilter, setClassificationFilter] = useState<ClassificationFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("classification");
  const [brandFilter, setBrandFilter] = useState<string>("all");

  const brands = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of data.products) map.set(p.brand, (map.get(p.brand) ?? 0) + 1);
    return Array.from(map.entries());
  }, [data.products]);

  const filtered = useMemo(() => {
    let rows = data.products.filter(
      (p) => classificationFilter === "all" || p.classification === classificationFilter
    );
    if (brandFilter !== "all") rows = rows.filter((p) => p.brand === brandFilter);

    if (sortBy === "price-asc") rows = [...rows].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") rows = [...rows].sort((a, b) => b.price - a.price);
    else if (sortBy === "manufacturer")
      rows = [...rows].sort((a, b) => a.manufacturer.localeCompare(b.manufacturer, "fa"));

    return rows;
  }, [data.products, classificationFilter, sortBy, brandFilter]);

  const grouped = useMemo(() => {
    if (sortBy !== "classification") return null;
    const groups: { key: string; rows: IngredientProductRow[] }[] = [];
    for (const p of filtered) {
      let group = groups.find((g) => g.key === p.classification);
      if (!group) {
        group = { key: p.classification, rows: [] };
        groups.push(group);
      }
      group.rows.push(p);
    }
    return groups;
  }, [filtered, sortBy]);

  return (
    <section className="px-4 mt-4">
      <div className="mx-auto max-w-5xl rounded-xl2 border border-line bg-card p-5 shadow-card">
        {/* ردیف تب‌ها + مرتب‌سازی + اکشن‌ها */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex rounded-full border border-line p-1">
            {([
              ["all", "همه"],
              ["original", "محصول اصلی"],
              ["generic", "محصول ژنریک"],
            ] as [ClassificationFilter, string][]).map(([val, label]) => (
              <button
                key={val}
                onClick={() => setClassificationFilter(val)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  classificationFilter === val ? "bg-brand text-white" : "text-ink-soft hover:text-brand"
                )}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex rounded-full border border-line p-1">
              {([
                ["classification", "ترتیب طبقه‌بندی"],
                ["price-asc", "قیمت ↑"],
                ["price-desc", "قیمت ↓"],
                ["manufacturer", "سازنده"],
              ] as [SortBy, string][]).map(([val, label]) => (
                <button
                  key={val}
                  onClick={() => setSortBy(val)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                    sortBy === val ? "bg-brand text-white" : "text-ink-soft hover:text-brand"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
            <button className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-emerald hover:bg-emerald-soft transition-colors">
              <Download className="h-3.5 w-3.5" />
              CSV
            </button>
            <button className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-brand/40 hover:text-brand transition-colors">
              <Copy className="h-3.5 w-3.5" />
              کپی همراه با منبع
            </button>
          </div>
        </div>

        {/* ردیف فیلتر برند */}
        <div className="flex items-center gap-2 flex-wrap mt-3 pt-3 border-t border-line">
          <span className="text-xs text-ink-faint">برند</span>
          <button
            onClick={() => setBrandFilter("all")}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium border transition-colors",
              brandFilter === "all"
                ? "bg-brand text-white border-brand"
                : "border-line text-ink-soft hover:border-brand/40 hover:text-brand"
            )}
          >
            همه ({data.products.length.toLocaleString("fa-IR")})
          </button>
          {brands.map(([brand, count]) => (
            <button
              key={brand}
              onClick={() => setBrandFilter(brand)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium border transition-colors",
                brandFilter === brand
                  ? "bg-brand text-white border-brand"
                  : "border-line text-ink-soft hover:border-brand/40 hover:text-brand"
              )}
            >
              {brand} ({count.toLocaleString("fa-IR")})
            </button>
          ))}
        </div>

        {/* جدول */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-ink-faint border-b border-line">
                <th className="text-right font-medium py-2">نام محصول</th>
                <th className="text-right font-medium py-2">مشخصات</th>
                <th className="text-right font-medium py-2">شرکت سازنده</th>
                <th className="text-right font-medium py-2">طبقه‌بندی</th>
                <th className="text-right font-medium py-2">قیمت دارو (ین)</th>
                <th className="text-right font-medium py-2">بازنگری قبلی</th>
                <th className="text-right font-medium py-2">افزایش/کاهش</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {(grouped ?? [{ key: "flat", rows: filtered }]).map((group) => (
                <Fragment key={group.key}>
                  {grouped && (
                    <tr>
                      <td colSpan={7} className="pt-4 pb-1 text-xs font-bold text-ink-soft">
                        {classificationLabel[group.key as IngredientProductRow["classification"]]}
                      </td>
                    </tr>
                  )}
                  {group.rows.map((p) => (
                    <tr key={p.slug}>
                      <td className="py-3">
                        <Link href={`/drug/${p.slug}`} className="font-medium text-brand hover:underline">
                          {p.name}
                        </Link>
                      </td>
                      <td className="py-3 text-ink-soft">{p.spec}</td>
                      <td className="py-3 text-ink-soft">{p.manufacturer}</td>
                      <td className="py-3">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-0.5 text-xs font-medium",
                            p.classification === "original"
                              ? "bg-gold-soft text-gold"
                              : "bg-brand-soft text-brand-dark"
                          )}
                        >
                          {classificationLabel[p.classification]}
                        </span>
                      </td>
                      <td className="py-3 font-bold tabular">{p.price.toLocaleString("fa-IR")} ین</td>
                      <td className="py-3 text-ink-faint tabular">
                        {p.prevPrice !== null ? p.prevPrice.toLocaleString("fa-IR") : "—"}
                      </td>
                      <td className="py-3 tabular">
                        {p.changePercent !== null ? (
                          <span className={p.changePercent < 0 ? "text-rose font-medium" : "text-emerald font-medium"}>
                            {p.changePercent > 0 ? "+" : ""}
                            {p.changePercent.toLocaleString("fa-IR")}٪ (
                            {p.changeAmount && p.changeAmount > 0 ? "+" : ""}
                            {p.changeAmount?.toLocaleString("fa-IR")} ین)
                          </span>
                        ) : (
                          <span className="text-ink-faint">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
