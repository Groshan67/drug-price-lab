import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { CategoryDetailData } from "@/lib/data/category-detail";

export default function CategoryPageHeader({ data }: { data: CategoryDetailData }) {
  return (
    <section className="px-4 pt-6">
      <div className="mx-auto max-w-5xl">
        <nav className="flex items-center flex-wrap gap-1 text-xs text-ink-faint mb-3">
          {data.breadcrumb.map((b, i) => (
            <span key={b.href} className="flex items-center gap-1">
              {i > 0 && <ChevronLeft className="h-3 w-3 rotate-180" />}
              {i === data.breadcrumb.length - 1 ? (
                <span className="text-ink font-medium">{b.label}</span>
              ) : (
                <Link href={b.href} className="hover:text-brand transition-colors">
                  {b.label}
                </Link>
              )}
            </span>
          ))}
        </nav>

        <h1 className="text-xl sm:text-2xl font-bold">{data.name}</h1>
        <p className="text-sm text-ink-faint mt-1 tabular">
          {data.ingredientCount.toLocaleString("fa-IR")} ماده مؤثره، {data.itemCount.toLocaleString("fa-IR")} قلم /{" "}
          {data.revisionLabel} <span className="text-ink-faint">· {data.groupLabel}</span>
        </p>
        <p className="text-sm text-ink-soft leading-7 mt-3 max-w-3xl">{data.description}</p>
      </div>
    </section>
  );
}
