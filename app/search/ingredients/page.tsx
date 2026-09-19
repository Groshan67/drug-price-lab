import SiteShell from "@/components/layout/SiteShell";
import IngredientDirectory from "@/components/search/IngredientDirectory";

export const metadata = {
  title: "جستجو بر اساس مواد مؤثره | RxPrice Lab",
  description: "فهرست کامل مواد مؤثره برای بررسی قیمت دارو، مقایسه ژنریک و روند بازنگری.",
};

export default function SearchByIngredientsPage() {
  return (
    <SiteShell>
      <IngredientDirectory />
    </SiteShell>
  );
}
