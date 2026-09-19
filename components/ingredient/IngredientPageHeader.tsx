"use client";

import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";
import type { IngredientPageData } from "@/lib/data/ingredient-page";

export default function IngredientPageHeader({ data }: { data: IngredientPageData }) {
  const router = useRouter();

  return (
    <section className="px-4 pt-6">
      <div className="mx-auto max-w-5xl">
        {data.backLink && (
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-1 text-xs text-brand hover:underline mb-3"
          >
            <ChevronRight className="h-3.5 w-3.5" />
            {data.backLink.label}
          </button>
        )}
        <h1 className="text-xl sm:text-2xl font-bold">{data.name}</h1>
        <p className="text-sm text-ink-faint mt-1 tabular">
          {data.totalItems.toLocaleString("fa-IR")} قلم / {data.revisionLabel}
        </p>
      </div>
    </section>
  );
}
