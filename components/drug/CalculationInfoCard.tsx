import Link from "next/link";
import type { DrugDetail } from "@/lib/data/drug-detail";

export default function CalculationInfoCard({ drug }: { drug: DrugDetail }) {
  const c = drug.calculationInfo;

  const cells = [
    { label: "روش محاسبه", value: c.method },
    { label: "قیمت در زمان فهرست‌شدن", value: `${c.priceAtListing.toLocaleString("fa-IR")} ین` },
    { label: "تاریخ فهرست‌شدن در استاندارد قیمت دارو", value: c.listingDate },
    {
      label: "داروی مقایسه‌ای",
      value: c.comparatorDrug ? c.comparatorDrug.name : "—",
      href: c.comparatorDrug?.href,
    },
    { label: "تعدیل بر اساس میانگین قیمت خارجی", value: c.foreignAdjustment },
    { label: "طبقه‌بندی تأیید", value: c.approvalClassification },
  ];

  return (
    <section className="px-4 mt-4">
      <div className="mx-auto max-w-5xl rounded-xl2 border border-line bg-card p-5 shadow-card">
        <p className="text-sm font-bold mb-4">اطلاعات محاسبه در زمان فهرست‌شدن دارو</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
          {cells.map((cell) => (
            <div key={cell.label}>
              <p className="text-xs text-ink-faint mb-0.5">{cell.label}</p>
              {cell.href ? (
                <Link href={cell.href} className="text-sm font-medium text-brand hover:underline">
                  {cell.value}
                </Link>
              ) : (
                <p className="text-sm font-medium">{cell.value}</p>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-ink-faint mt-4 pt-3 border-t border-line">
          منبع: <span className="text-brand hover:underline cursor-pointer">{c.sourceLabel}</span>
        </p>
      </div>
    </section>
  );
}
