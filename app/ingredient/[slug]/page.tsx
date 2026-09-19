import { notFound } from "next/navigation";
import SiteShell from "@/components/layout/SiteShell";
import IngredientPageHeader from "@/components/ingredient/IngredientPageHeader";
import IngredientStatsBar from "@/components/ingredient/IngredientStatsBar";
import IngredientPriceTrendChart from "@/components/ingredient/IngredientPriceTrendChart";
import IngredientProductExplorer from "@/components/ingredient/IngredientProductExplorer";
import RelatedPagesRow from "@/components/ingredient/RelatedPagesRow";
import { getIngredientPageBySlug } from "@/lib/data/ingredient-page";

export default function IngredientPage({ params }: { params: { slug: string } }) {
  const data = getIngredientPageBySlug(params.slug);
  if (!data) notFound();

  return (
    <SiteShell>
      <IngredientPageHeader data={data} />
      <IngredientStatsBar data={data} />
      {data.priceTrendComparison && <IngredientPriceTrendChart data={data.priceTrendComparison} />}
      <IngredientProductExplorer data={data} />
      <RelatedPagesRow data={data} />
    </SiteShell>
  );
}
