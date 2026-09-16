import { notFound } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import MobileHeader from "@/components/layout/MobileHeader";
import Footer from "@/components/layout/Footer";
import IngredientPageHeader from "@/components/ingredient/IngredientPageHeader";
import IngredientStatsBar from "@/components/ingredient/IngredientStatsBar";
import IngredientProductExplorer from "@/components/ingredient/IngredientProductExplorer";
import RelatedPagesRow from "@/components/ingredient/RelatedPagesRow";
import { getIngredientPageBySlug } from "@/lib/data/ingredient-page";

export default function IngredientPage({ params }: { params: { slug: string } }) {
  const data = getIngredientPageBySlug(params.slug);
  if (!data) notFound();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <MobileHeader />
        <main className="pb-8">
          <IngredientPageHeader data={data} />
          <IngredientStatsBar data={data} />
          <IngredientProductExplorer data={data} />
          <RelatedPagesRow data={data} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
