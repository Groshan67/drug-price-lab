import type { IngredientPageData } from "@/lib/data/ingredient-page";

export default function IngredientPageHeader({ data }: { data: IngredientPageData }) {
  return (
    <section className="px-4 pt-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-xl sm:text-2xl font-bold">{data.name}</h1>
        <p className="text-sm text-ink-faint mt-1 tabular">
          {data.totalItems.toLocaleString("fa-IR")} قلم / {data.revisionLabel}
        </p>
      </div>
    </section>
  );
}
