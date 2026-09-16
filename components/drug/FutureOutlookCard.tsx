import { ChevronDown } from "lucide-react";
import type { DrugDetail } from "@/lib/data/drug-detail";
import { cn } from "@/lib/utils";

export default function FutureOutlookCard({ drug }: { drug: DrugDetail }) {
  const rows = [
    {
      label: "بازنگری بعدی",
      value: drug.futureOutlook.nextRevisionDate,
      note: drug.futureOutlook.nextRevisionNote,
      action: { label: "برآورد اثر در بازنگری بعدی", href: "#" },
    },
    {
      label: "مقررات قابل اجرا",
      value: "بازنگری‌های معمول (بر اساس نرخ انحراف واقعی)",
      note: drug.futureOutlook.applicableRegulationsNote,
    },
    {
      label: "وضعیت نگهداری قیمت دارو",
      value: "غیرواجد شرایط پرداخت اضافی",
      note: drug.futureOutlook.maintenanceNote,
      dropdown: "روند سالانه و شواهد",
    },
    {
      label: "ورود به بازار با داروهای ژنریک",
      value: drug.futureOutlook.reexamExpiry,
      note: drug.futureOutlook.marketEntryNote,
      dropdown: "شواهد و ملاحظات",
    },
  ];

  return (
    <section className="px-4 mt-4">
      <div className="mx-auto max-w-5xl rounded-xl2 border border-line bg-card p-5 shadow-card">
        <p className="text-sm font-bold mb-4">چشم‌انداز آینده</p>
        <div className="space-y-4 divide-y divide-line">
          {rows.map((r, i) => (
            <div
              key={r.label}
              className={cn(
                "grid grid-cols-1 sm:grid-cols-[10rem_1fr] gap-1 sm:gap-4",
                i > 0 && "pt-4"
              )}
            >
              <p className="text-xs text-ink-faint sm:pt-0.5">{r.label}</p>
              <div>
                <p className="text-sm font-medium">{r.value}</p>
                <p className="text-xs text-ink-faint leading-6 mt-1">{r.note}</p>
                {r.action && (
                  <a href={r.action.href} className="inline-block text-xs text-brand mt-1.5 hover:underline">
                    {r.action.label} ←
                  </a>
                )}
                {r.dropdown && (
                  <button
                    type="button"
                    className="mt-2 inline-flex items-center gap-1 rounded-full border border-line px-3 py-1.5 text-xs font-medium text-ink-soft hover:border-brand/40 hover:text-brand transition-colors"
                  >
                    {r.dropdown}
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
