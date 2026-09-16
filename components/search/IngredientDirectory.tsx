"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Search, FlaskConical } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ingredientDirectory,
  ingredientsForLetter,
  letterCounts,
  persianAlphabet,
} from "@/lib/data/ingredients-directory";

export default function IngredientDirectory() {
  const [query, setQuery] = useState("");
  const counts = useMemo(() => letterCounts(), []);
  const firstAvailableLetter =
    persianAlphabet.find((l) => counts[l]) ?? persianAlphabet[0];
  const [activeLetter, setActiveLetter] = useState(firstAvailableLetter);

  const isSearching = query.trim().length > 0;

  const results = useMemo(() => {
    if (isSearching) {
      const q = query.trim();
      return ingredientDirectory
        .filter((i) => i.name.includes(q))
        .sort((a, b) => a.name.localeCompare(b.name, "fa"));
    }
    return ingredientsForLetter(activeLetter);
  }, [query, activeLetter, isSearching]);

  return (
    <div className="px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-baseline gap-3 flex-wrap">
          <h1 className="text-xl sm:text-2xl font-bold">جستجو بر اساس مواد مؤثره</h1>
          <span className="text-sm text-ink-faint tabular">
            مجموعاً {ingredientDirectory.length.toLocaleString("fa-IR")} ماده مؤثره
          </span>
        </div>
        <p className="mt-2 text-sm text-ink-faint leading-6 max-w-2xl">
          با انتخاب نام ماده مؤثره می‌توانید قیمت دارو، مقایسه محصول اصلی/ژنریک و روند تغییر
          قیمت همه محصولات حاوی آن را ببینید. عدد کنار هر نام، تعداد اقلام فهرست‌شده است.
        </p>

        <div className="relative mt-5 max-w-md">
          <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
            placeholder="پالایش بر اساس نام ماده مؤثره (مثلاً آملودیپین)"
            className="w-full rounded-lg border border-line bg-card ps-9 pe-4 py-2.5 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/15 transition-shadow"
          />
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {persianAlphabet.map((letter) => {
            const count = counts[letter] ?? 0;
            const disabled = count === 0;
            const active = !isSearching && letter === activeLetter;
            return (
              <button
                key={letter}
                type="button"
                disabled={disabled}
                onClick={() => {
                  setQuery("");
                  setActiveLetter(letter);
                }}
                className={cn(
                  "h-9 min-w-9 px-2.5 rounded-full text-sm font-medium border transition-colors",
                  disabled && "border-line text-ink-faint/40 cursor-not-allowed",
                  !disabled && active && "bg-brand text-white border-brand",
                  !disabled &&
                    !active &&
                    "border-line text-ink-soft hover:border-brand/40 hover:text-brand"
                )}
              >
                {letter}
              </button>
            );
          })}
          <button
            type="button"
            disabled
            className="h-9 px-3 rounded-full text-sm font-medium border border-line text-ink-faint/40 cursor-not-allowed"
          >
            طب سنتی و سایر
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-ink-soft">
            {isSearching ? (
              <>نتایج جستجو برای «{query.trim()}»</>
            ) : (
              <>حرف «{activeLetter}»</>
            )}
          </p>
          <p className="text-xs text-ink-faint tabular">
            {results.length.toLocaleString("fa-IR")} ماده مؤثره
          </p>
        </div>

        {results.length === 0 ? (
          <div className="mt-4 rounded-xl2 border border-dashed border-line p-8 text-center text-sm text-ink-faint">
            موردی با این مشخصات پیدا نشد.
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
            {results.map((ing) => (
              <Link
                key={ing.slug}
                href={`/ingredient/${ing.slug}`}
                className="flex items-center justify-between gap-3 py-2.5 border-b border-line/70 group"
              >
                <span className="flex items-center gap-2 text-sm font-medium text-brand group-hover:underline min-w-0">
                  <FlaskConical className="h-3.5 w-3.5 shrink-0 text-brand/60" />
                  <span className="truncate">{ing.name}</span>
                </span>
                <span className="shrink-0 rounded-full bg-canvas text-ink-faint text-xs font-medium tabular px-2 py-0.5">
                  {ing.drugCount.toLocaleString("fa-IR")}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
