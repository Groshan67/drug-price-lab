"use client";

import { useState } from "react";
import { LayoutGrid } from "lucide-react";
import SiteShell from "@/components/layout/SiteShell";
import AllCategoriesModal from "@/components/category/AllCategoriesModal";

export default function SearchByCategoryPage() {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <SiteShell>
      <div className="px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-plum-soft text-plum mb-4">
            <LayoutGrid className="h-6 w-6" />
          </span>
          <h1 className="text-lg font-bold mb-2">جستجو بر اساس طبقه‌بندی اثر دارویی</h1>
          <p className="text-sm text-ink-faint leading-6 mb-5">
            یک طبقه‌بندی از فهرست دسته‌بندی‌ها انتخاب کنید تا مواد مؤثره و قیمت داروهای آن را ببینید.
          </p>
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="rounded-lg bg-brand text-white px-5 py-2.5 text-sm font-medium hover:bg-brand-dark transition-colors"
          >
            مشاهده فهرست دسته‌بندی‌ها
          </button>
        </div>
      </div>

      {modalOpen && <AllCategoriesModal onClose={() => setModalOpen(false)} />}
    </SiteShell>
  );
}
