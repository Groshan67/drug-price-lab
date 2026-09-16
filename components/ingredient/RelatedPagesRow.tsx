import Link from "next/link";
import type { IngredientPageData } from "@/lib/data/ingredient-page";

export default function RelatedPagesRow({ data }: { data: IngredientPageData }) {
  return (
    <section className="px-4 mt-6">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-medium text-ink-faint mb-3">صفحات مرتبط</p>
        <div className="flex flex-wrap gap-2">
          {data.relatedPages.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="rounded-full border border-line bg-card px-4 py-2 text-xs font-medium text-ink-soft hover:border-brand/40 hover:text-brand transition-colors"
            >
              {p.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
