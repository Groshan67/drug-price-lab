import { MessageCircle } from "lucide-react";
import type { DrugDetail } from "@/lib/data/drug-detail";

export default function AskAICard({ drug }: { drug: DrugDetail }) {
  return (
    <section className="px-4 mt-4">
      <div className="mx-auto max-w-5xl rounded-xl2 border border-plum/20 bg-plum-soft p-5">
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle className="h-4 w-4 text-plum" />
          <p className="text-sm font-bold text-plum">پرسش از AI</p>
        </div>
        <p className="text-sm text-ink-soft leading-6">{drug.askAI.intro}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {drug.askAI.chips.map((c) => (
            <button
              key={c}
              type="button"
              className="rounded-full bg-card border border-plum/20 px-3 py-1.5 text-xs text-plum hover:bg-plum hover:text-white transition-colors"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
