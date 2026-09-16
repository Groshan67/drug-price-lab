import { Link2 } from "lucide-react";
import type { DrugDetail } from "@/lib/data/drug-detail";
import LowestGenericBanner from "./LowestGenericBanner";

export default function GenericSwitchCard({ drug }: { drug: DrugDetail }) {
  if (!drug.genericSwitch || !drug.lowestGenericBanner) return null;
  const { genericSwitch, lowestGenericBanner } = drug;

  return (
    <section className="px-4 mt-8">
      <div className="mx-auto max-w-5xl rounded-xl2 border border-line bg-card shadow-card overflow-hidden">
        <div className="flex items-center gap-2 bg-emerald px-5 py-3 text-white">
          <Link2 className="h-4 w-4" />
          <p className="text-sm font-bold">بررسی جایگزینی با محصول ژنریک</p>
        </div>
        <div className="p-5 space-y-2 text-sm text-ink-soft">
          <p>{genericSwitch.availabilityNote}</p>
          <p>{genericSwitch.standardMatchNote}</p>
          <p>
            کمترین قیمت: <span className="font-medium text-ink">{genericSwitch.lowestName}</span>
          </p>
        </div>
        <div className="px-5 pb-5">
          <LowestGenericBanner
            price={lowestGenericBanner.price}
            diffPercent={lowestGenericBanner.diffPercent}
            diffAmount={lowestGenericBanner.diffAmount}
          />
        </div>
      </div>
    </section>
  );
}
