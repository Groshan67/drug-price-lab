import Sidebar from "@/components/layout/Sidebar";
import MobileHeader from "@/components/layout/MobileHeader";
import Footer from "@/components/layout/Footer";
import SearchHero from "@/components/home/SearchHero";
import Highlights from "@/components/home/Highlights";
import Rankings from "@/components/home/Rankings";
import EntryGrid from "@/components/home/EntryGrid";
import CategoryGrid from "@/components/home/CategoryGrid";
import IngredientTags from "@/components/home/IngredientTags";
import ReadTeaser from "@/components/home/ReadTeaser";
import { searchEntries, toolEntries } from "@/lib/data/mock";

export default function HomePage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 min-w-0">
        <MobileHeader />
        <main className="pb-8">
          <SearchHero />
          <Highlights />
          <Rankings />
          <EntryGrid eyebrow="جستجو" entries={searchEntries} />
          <EntryGrid eyebrow="ابزارها" entries={toolEntries} />
          <CategoryGrid />
          <IngredientTags />
          <ReadTeaser />
        </main>
        <Footer />
      </div>
    </div>
  );
}
