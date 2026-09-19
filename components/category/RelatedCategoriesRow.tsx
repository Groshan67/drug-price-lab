import Link from "next/link";
import type { CategoryDetailData } from "@/lib/data/category-detail";
import { categoryGroups } from "@/lib/data/category-directory";

export default function RelatedCategoriesRow({ data }: { data: CategoryDetailData }) {
  const group = categoryGroups.find((g) => g.slug === data.groupSlug);
  const siblings = group?.items.filter((it) => it.slug !== data.slug) ?? [];

  if (siblings.length === 0) return null;

  return (
    <section className="px-4 mt-4">
      <div className="mx-auto max-w-5xl rounded-xl2 border border-line bg-card p-5 shadow-card">
        <p className="text-xs font-medium text-ink-faint mb-3">
          طبقه‌بندی‌های هم‌گروه ({data.groupLabel})
        </p>
        <div className="flex flex-wrap gap-2">
          {siblings.map((s) => (
            <Link
              key={s.slug}
              href={`/category/${s.slug}`}
              className="rounded-full border border-line bg-card px-3.5 py-2 text-sm text-ink-soft hover:border-brand/40 hover:bg-brand-soft hover:text-brand-dark transition-colors"
            >
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
