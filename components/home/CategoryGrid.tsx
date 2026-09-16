import Link from "next/link";
import { categoryCards } from "@/lib/data/mock";

export default function CategoryGrid() {
  return (
    <section className="px-4 mt-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium text-ink-faint mb-3">
          جستجوی مستقیم بر اساس طبقه‌بندی اثر دارویی
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {categoryCards.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-xl2 border border-line bg-card px-4 py-4 text-sm font-medium text-center shadow-card hover:shadow-cardHover hover:border-plum/40 hover:text-plum transition-all"
            >
              {c.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
