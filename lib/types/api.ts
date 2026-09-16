// تایپ‌های TypeScript دقیقاً مطابق پاسخ‌های واقعی endpoint های مرجع (lab-endpoint.txt).
// نام فیلدها به‌عمد snake_case نگه داشته شده تا اگر بعداً API خودمان را با همین
// قرارداد پیاده کردیم (یا داده واقعی را proxy کردیم)، تایپ‌ها بدون تغییر کار کنند.
// این فایل مستقل از Prisma است — لایه‌ی نگاشت (mapper) بین این تایپ‌ها و مدل‌های
// Prisma باید در lib/db/mappers.ts (در فاز بعدی) نوشته شود.

export type DrugTypeLabel = "先発品" | "後発品" | string;
export type DrugRouteLabel = "内用薬" | "外用薬" | "注射薬" | string;

/** آیتم خلاصه دارو — پرکاربردترین شکل در اکثر endpoint های فهرستی */
export interface DrugSummary {
  yj_code: string;
  drug_name: string;
  spec: string;
  ingredient: string;
  manufacturer: string;
  drug_type: DrugTypeLabel;
  price: string; // API قیمت را به‌صورت string برمی‌گرداند
  has_ge_alt: boolean;
  pmda_pdf_url: string | null;
  is_active: boolean;
  new_drug_premium: boolean;
  premium_type: string | null;
  unprofitable_drug: boolean;
  basic_medicine: boolean;
  basic_medicine_type: string | null;
  prev_price: string | null;
  listing_date: string; // "YYYY-MM-DD"
}

/** نسخه گسترده‌ی DrugSummary که در /similar دیده می‌شود */
export interface SimilarDrugItem extends DrugSummary {
  category: DrugRouteLabel;
  calc_method: string | null;
  santei_comparator: string | null;
}

// ---------------------------------------------------------------------------
// GET /api/search?q=&limit=
// ---------------------------------------------------------------------------
export interface SearchResponse {
  total: number;
  items: DrugSummary[];
}

// ---------------------------------------------------------------------------
// GET /api/home/stats
// ---------------------------------------------------------------------------
export interface HomeStatsResponse {
  total_active: number;
  premium_count: number;
  grace_count: number;
  latest_revision: string;
  latest_regular_revision: string;
  latest_event_date: string;
  latest_event_count: number;
  latest_event_new_count: number;
}

// ---------------------------------------------------------------------------
// GET /api/home/top-drugs?limit=&days=
// ---------------------------------------------------------------------------
export interface TopDrugItem {
  drug_name: string;
  count: number;
  yj_code: string;
  ingredient: string;
  price: number;
  drug_type: DrugTypeLabel;
  manufacturer: string;
}

// ---------------------------------------------------------------------------
// GET /api/home/top-manufacturers?limit=&days=
// ---------------------------------------------------------------------------
export interface TopManufacturerItem {
  manufacturer: string;
  count: number;
}

// ---------------------------------------------------------------------------
// GET /api/company/{name}          → DrugSummary[]
// GET /api/category/{code}         → DrugSummary[]
// GET /api/ingredient/{name}       → DrugSummary[]
// GET /api/drugs/{yj_code}/generics[?all_forms=true] → DrugSummary[]
// GET /api/drugs/{yj_code}/specs   → DrugSummary[]
// (این‌ها همگی آرایه‌ای از DrugSummary برمی‌گردانند، از تایپ بالا استفاده کنید)
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// GET /api/companies
// ---------------------------------------------------------------------------
export interface CompanyStat {
  manufacturer: string;
  total: number;
  brand_count: number;
  generic_count: number;
  premium_count: number;
  unprofitable_count: number;
  basic_count: number;
}

// ---------------------------------------------------------------------------
// GET /api/drugs/{yj_code}/outlook
// ---------------------------------------------------------------------------
export interface DrugOutlook {
  cat: string; // مثلاً "standard"
  label: string; // مثلاً "通常改定（実勢乖離率次第）"
  note: string;
}

export interface DrugOutlookResponse {
  outlook: DrugOutlook;
  disclaimer: string;
}

// ---------------------------------------------------------------------------
// GET /api/drugs/{yj_code}/price-history
// ---------------------------------------------------------------------------
export interface PriceHistoryEntry {
  revision_date: string; // "YYYY-MM"
  price: string;
  is_revised: boolean;
  is_fusansan: boolean;
  reason_layer: string | null;
  reason_mechanism: string | null;
  reason_citation: string | null;
  reason_detail: string | null;
  midyear_applied_ym: string | null;
  midyear_kind: string | null;
  midyear_ref: string | null;
  pmp_status: string | null;
  pmp_reason: string | null;
  pmp_reason_layer: string | null;
  pmp_event: string | null;
  listing: string | null;
  touitsu_yj: string | null;
  touitsu_name: string | null;
}

// ---------------------------------------------------------------------------
// GET /api/drugs/{yj_code}/santei
// ---------------------------------------------------------------------------
export interface SanteiResponse {
  santei: unknown | null; // شکل دقیق در نمونه‌ها مشاهده نشد (همیشه null بود)
  refs: unknown[];
}

// ---------------------------------------------------------------------------
// GET /api/drugs/{yj_code}  → جزئیات کامل یک دارو (معادل صفحه D1–D5)
// ---------------------------------------------------------------------------
export interface PmpYearStatus {
  revision_date: string;
  status: string; // مثلاً "リスト外"
}

export interface PmpSummary {
  status: string;
  as_of: string;
  as_of_rev: string;
  implication: string;
  exclusion: string | null;
  note: string | null;
  listing_date: string | null;
  listing_official: boolean;
  cap_date: string | null;
  ge_first_listing: string | null;
  years: PmpYearStatus[];
}

export interface DrugDetailResponse {
  yj_code: string;
  category: DrugRouteLabel;
  ingredient: string;
  spec: string;
  drug_name: string;
  manufacturer: string;
  drug_type: DrugTypeLabel;
  price: string;
  has_ge_alt: boolean;
  narcotic: boolean;
  grace_period: string;
  revision_date: string;
  pmda_pdf_url: string | null;
  is_active: boolean;
  new_drug_premium: boolean;
  premium_type: string | null;
  unprofitable_drug: boolean;
  basic_medicine: boolean;
  basic_medicine_type: string | null;
  fusansan_dates: string[];
  pmp_history: unknown[];
  pmp_summary: PmpSummary;
  indication: string | null;
  hta: string | null;
  listing_date: string;
  earliest_revision_date: string | null;
  listed_years: number;
  prev_price: string | null;
  prev_revision_date: string | null;
  touitsu_current: string | null;
  touitsu_members: unknown | null;
  stable_supply_category: string | null;
  supply_status: string | null;
  reexam: string | null;
  outlook: DrugOutlook;
}

// ---------------------------------------------------------------------------
// GET /api/deletions/check?names=A,B,C
// ---------------------------------------------------------------------------
export type DeletionsCheckResponse = Record<string, boolean>;

// ---------------------------------------------------------------------------
// GET /api/revision/{date}  → عکس لحظه‌ای بازار برای یک تاریخ بازنگری
// ---------------------------------------------------------------------------
export interface RevisionKarteExample {
  yj_code: string;
  drug_name: string;
}

export interface RevisionKarteEntry {
  mechanism: string;
  layer: string;
  count: number;
  pct: number;
  anchor: string;
  examples: RevisionKarteExample[];
}

export interface RevisionPriceChangeItem {
  yj_code: string;
  drug_name: string;
  drug_type: DrugTypeLabel;
  ingredient: string;
  manufacturer: string;
  spec: string;
  prev_price: number;
  curr_price: number;
  change_pct: number;
}

export interface RevisionStats {
  decreased: number;
  increased: number;
  unchanged: number;
  new: number;
  removed: number;
}

export interface MarketRevisionResponse {
  revision_date: string;
  prev_date: string | null;
  next_date: string | null;
  is_adhoc: boolean;
  karte: RevisionKarteEntry[];
  total_items: number;
  prev_total: number;
  avg_change_pct: number;
  stats: RevisionStats;
  top_decreases: RevisionPriceChangeItem[];
  top_increases: RevisionPriceChangeItem[];
  new_items: unknown[];
  removed_items: unknown[];
  karte_total: number;
}

// ---------------------------------------------------------------------------
// GET /api/insights
// ---------------------------------------------------------------------------
export interface InsightItem {
  slug: string;
  url: string;
  title: string;
  description: string;
  keywords: string;
  category: string;
  status: "published" | "draft" | string;
  date: string;
  date_label: string;
  date_full: string;
  read_min: number;
  featured: boolean;
  author: string;
  ogp_image: string;
  stat_value: string;
  stat_label: string;
  series: string;
  series_order: number;
  lead: string;
  weekly_views: number;
}

// ---------------------------------------------------------------------------
// GET /api/simulation/guide
// ---------------------------------------------------------------------------
export interface SimulationFieldMeta {
  label: string;
  section: string;
  type: "string" | "number" | "boolean" | string;
  description: string;
  example: string | number | boolean;
  source: string;
  regulation_ref: string;
}

export interface SimulationGuideResponse {
  count: number;
  sections: string[]; // ۲۰ بخش قانونی، از "基本情報" تا "最低薬価"
  fields: Record<string, SimulationFieldMeta>;
}

// ---------------------------------------------------------------------------
// POST /api/simulation/existing
// ورودی ~۸۸ فیلد دارد (پارامترهای فصل ۳ بند ۱ تا ۱۲). به‌عمد Partial تایپ شده چون
// اکثر فیلدها nullable و اختیاری هستند — لیست کامل کلیدها را از
// SimulationGuideResponse.fields در زمان اجرا بخوانید.
// ---------------------------------------------------------------------------
export type SimulationExistingRequest = Partial<{
  yj_code: string;
  current_price: number;
  drug_name: string;
  drug_type: DrugTypeLabel;
  category: DrugRouteLabel;
  listing_date: string;
  has_ge_alt: boolean;
  is_generic_drug: boolean;
  is_biosimilar: boolean;
  is_same_as_originator: boolean;
  is_basic_medicine: boolean;
  is_unprofitable: boolean;
  new_drug_premium: boolean;
  is_kyokuhouhin: boolean;
  expected_gap_rate: number;
  average_gap_rate: number;
  annual_sales_billion: number | null;
  base_annual_sales_billion: number | null;
  simulation_years: number;
  base_revision_date: string;
  // GE group weighted-average fields (§7 price-band aggregation)
  ge_previous_tier: string | null;
  ge_group_highest_pre_tier_price: number | null;
  ge_group_tier_i_weighted_avg: number | null;
  ge_group_tier_i_below_avg_weighted_avg: number | null;
  ge_group_tier_ro_weighted_avg: number | null;
  ge_group_tier_ro_below_avg_weighted_avg: number | null;
  ge_group_sec7_2_weighted_avg: number | null;
  ge_group_sec7_2_below_avg_weighted_avg: number | null;
  ge_group_same_originator_weighted_avg: number | null;
  // §5.2 efficacy-change recalculation
  efficacy_A: number | null;
  efficacy_B: number | null;
  efficacy_P: number | null;
  efficacy_Q: number | null;
  efficacy_X: number | null;
  efficacy_Y: number | null;
  has_similar_new_drug_for_new_efficacy: boolean | null;
  // §5.2(2) special exception
  sec52_tokurei_own_daily_price: number | null;
  sec52_tokurei_ref_drug_daily_price: number | null;
  sec52_tokurei_ref_drug_annual_sales_billion: number | null;
  sec52_tokurei_patient_expansion_ratio: number | null;
  sec52_tokurei_max_annual_patients: number | null;
  sec52_tokurei_is_curative_or_severe: boolean;
  // §5.3 dosage-change recalculation
  old_max_dose: number | null;
  new_max_dose: number | null;
  is_dosage_reduced_for_safety: boolean;
  pre_efficacy_change_sales_billion: number | null;
  is_coverage_condition_change: boolean;
  // §10 revision-time premium
  revision_premium_condition: string | null;
  revision_premium_a: number | null;
  revision_premium_x: number | null;
  revision_premium_type: string | null;
  // §11 foreign average price adjustment
  sec11_imports_drug: boolean;
  sec11_pricing_method: string | null;
  sec11_no_foreign_price_at_listing: boolean;
  sec11_foreign_price_became_available: boolean;
  sec11_listing_years: number | null;
  sec11_had_reissan: boolean | null;
  foreign_avg_price_ratio: number | null;
  // §12 cost-effectiveness evaluation
  icer_beta: number | null;
  icer_price_target: number | null;
  // فیلدهای اضافه‌ی نسخه‌شده در GE (product-level, اختیاری)
  ge_first_listing_date: string | null;
  ge_weighted_avg_price: number | null;
  ge_highest_price_after: number | null;
  ge_lowest_price: number | null;
  ge_substitution_rate: number | null;
  ge_prior_substitution_rate: number | null;
  is_pmp_eligible: boolean | null;
  r6_g1_phase: string | null;
}>;

export interface SimulationTraceStep {
  step_no: number;
  rule_name: string;
  citation: string;
  applies: boolean;
  price_before: number;
  price_after: number;
  reason: string;
  is_manual_check: boolean;
}

export interface SimulationRevisionStep {
  revision_date: string;
  price_before: number;
  price_after: number;
  applied_rules: string[];
  applied_citations: string[];
  notes: string[];
  requires_manual_check: boolean;
  r8_special_check: boolean;
  below_minimum: boolean;
  minimum_price_citation: string;
  trace_steps: SimulationTraceStep[];
}

export interface SimulationEligibilityRule {
  rule_name: string;
  citation: string;
  applies: boolean;
  reason: string;
  requires_manual_check: boolean;
  manual_check_items: string[];
}

export interface SimulationExistingResponse {
  yj_code: string;
  drug_name: string;
  base_price: number;
  revision_history: SimulationRevisionStep[];
  eligibility_summary: SimulationEligibilityRule[];
  requires_manual_check: boolean;
  manual_check_items: string[];
  warnings: string[];
}
