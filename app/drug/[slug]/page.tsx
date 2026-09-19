import { notFound } from "next/navigation";
import SiteShell from "@/components/layout/SiteShell";
import DrugHeaderCard from "@/components/drug/DrugHeaderCard";
import PriceOverviewCard from "@/components/drug/PriceOverviewCard";
import FutureOutlookCard from "@/components/drug/FutureOutlookCard";
import OutOfPocketCard from "@/components/drug/OutOfPocketCard";
import LowestGenericBanner from "@/components/drug/LowestGenericBanner";
import IngredientOverviewCard from "@/components/drug/IngredientOverviewCard";
import PriceTrendChart from "@/components/drug/PriceTrendChart";
import SameClassComparisonCard from "@/components/drug/SameClassComparisonCard";
import GenericProductsTable from "@/components/drug/GenericProductsTable";
import RevisionHistoryTable from "@/components/drug/RevisionHistoryTable";
import CalculationInfoCard from "@/components/drug/CalculationInfoCard";
import IndicationsCard from "@/components/drug/IndicationsCard";
import GenericSwitchCard from "@/components/drug/GenericSwitchCard";
import AskAICard from "@/components/drug/AskAICard";
import ShareBar from "@/components/drug/ShareBar";
import { getDrugBySlug } from "@/lib/data/drug-detail";

export default function DrugPage({ params }: { params: { slug: string } }) {
  const drug = getDrugBySlug(params.slug);
  if (!drug) notFound();

  return (
    <SiteShell>
      <DrugHeaderCard drug={drug} />
      <PriceOverviewCard drug={drug} />
      <FutureOutlookCard drug={drug} />
      <OutOfPocketCard drug={drug} />

      {drug.lowestGenericBanner && (
        <div className="px-4 mt-4">
          <div className="mx-auto max-w-5xl">
            <LowestGenericBanner
              price={drug.lowestGenericBanner.price}
              diffPercent={drug.lowestGenericBanner.diffPercent}
              diffAmount={drug.lowestGenericBanner.diffAmount}
            />
          </div>
        </div>
      )}

      <IngredientOverviewCard drug={drug} />
      <PriceTrendChart drugName={drug.name} points={drug.priceTrend} />
      <SameClassComparisonCard drug={drug} />

      <GenericProductsTable drug={drug} />
      <RevisionHistoryTable drug={drug} />
      <CalculationInfoCard drug={drug} />
      <IndicationsCard drug={drug} />

      <GenericSwitchCard drug={drug} />
      <AskAICard drug={drug} />
      <ShareBar drug={drug} />
    </SiteShell>
  );
}
