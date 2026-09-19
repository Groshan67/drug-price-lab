import SiteShell from "@/components/layout/SiteShell";
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
    <SiteShell>
      <SearchHero />
      <Highlights />
      <Rankings />
      <EntryGrid eyebrow="جستجو" entries={searchEntries} />
      <EntryGrid eyebrow="ابزارها" entries={toolEntries} />
      <CategoryGrid />
      <IngredientTags />
      <ReadTeaser />
    </SiteShell>
  );
}
