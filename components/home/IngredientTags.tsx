import Link from "next/link";
import { keyIngredients } from "@/lib/data/mock";

export default function IngredientTags() {
  return (
    <section className="px-4 mt-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium text-ink-faint mb-3">جستجو بر اساس مواد مؤثره کلیدی</p>
        <div className="flex flex-wrap gap-2">
          {keyIngredients.map((ing) => (
            <Link
              key={ing.href}
              href={ing.href}
              className="rounded-full border border-line bg-card px-4 py-2 text-xs font-medium text-ink-soft hover:border-brand/40 hover:text-brand hover:bg-brand-soft transition-colors"
            >
              {ing.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
