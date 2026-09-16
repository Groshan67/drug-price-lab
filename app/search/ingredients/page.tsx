import Sidebar from "@/components/layout/Sidebar";
import MobileHeader from "@/components/layout/MobileHeader";
import Footer from "@/components/layout/Footer";
import IngredientDirectory from "@/components/search/IngredientDirectory";

export const metadata = {
  title: "جستجو بر اساس مواد مؤثره | دارونما",
  description: "فهرست کامل مواد مؤثره برای بررسی قیمت دارو، مقایسه ژنریک و روند بازنگری.",
};

export default function SearchByIngredientsPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <MobileHeader />
        <main className="pb-8">
          <IngredientDirectory />
        </main>
        <Footer />
      </div>
    </div>
  );
}
