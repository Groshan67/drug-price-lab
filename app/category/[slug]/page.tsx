import { notFound } from "next/navigation";
import SiteShell from "@/components/layout/SiteShell";
import CategoryPageHeader from "@/components/category/CategoryPageHeader";
import CategoryStatsBar from "@/components/category/CategoryStatsBar";
import CategoryIngredientTable from "@/components/category/CategoryIngredientTable";
import RelatedCategoriesRow from "@/components/category/RelatedCategoriesRow";
import { getCategoryBySlug } from "@/lib/data/category-detail";

export default function CategoryDetailPage({ params }: { params: { slug: string } }) {
  const data = getCategoryBySlug(params.slug);
  if (!data) notFound();

  return (
    <SiteShell>
      <CategoryPageHeader data={data} />
      <CategoryStatsBar data={data} />
      <CategoryIngredientTable data={data} />
      <RelatedCategoriesRow data={data} />
    </SiteShell>
  );
}
