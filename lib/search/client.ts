import { MeiliSearch } from "meilisearch";

export const searchClient = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST ?? "http://127.0.0.1:7700",
  apiKey: process.env.MEILISEARCH_API_KEY,
});

export const DRUGS_INDEX = "drugs";
