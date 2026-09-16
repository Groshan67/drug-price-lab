// Seed با داده‌های واقعی نمونه از lab-endpoint.txt (پاسخ‌های واقعی endpoint های مرجع).
// اجرا: npm run seed

import { PrismaClient, DrugType, DrugRoute } from "@prisma/client";

const prisma = new PrismaClient();

async function upsertManufacturer(name: string, slug: string, nameFa?: string) {
  return prisma.manufacturer.upsert({
    where: { name },
    update: {},
    create: { name, slug, nameFa },
  });
}

async function upsertIngredient(name: string, slug: string, categoryId?: string, nameFa?: string) {
  return prisma.ingredient.upsert({
    where: { name },
    update: {},
    create: { name, slug, categoryId, nameFa },
  });
}

async function main() {
  // ---------------------------------------------------------------------
  // طبقه‌بندی اثر دارویی — نمونه از /api/category/2144
  // نکته: نگاشت دقیق کد→نام رسمی طبقه‌بندی هنوز مستند نشده؛ نام زیر بر اساس
  // ماده مؤثره‌ی نمونه (آلاسپریل، یک مهارکننده ACE) استنباط شده و باید در فاز
  // بعدی با جدول رسمی YJ code تطبیق داده شود.
  // ---------------------------------------------------------------------
  const aceCategory = await prisma.category.upsert({
    where: { code: "2144" },
    update: {},
    create: {
      code: "2144",
      slug: "ace-inhibitor",
      name: "アンジオテンシン変換酵素(ACE)阻害薬",
      nameFa: "مهارکننده‌های آنزیم مبدل آنژیوتانسین (ACE)",
    },
  });

  const antipyretic = await prisma.category.upsert({
    where: { code: "1141" },
    update: {},
    create: {
      code: "1141",
      slug: "antipyretic-acetaminophen",
      name: "解熱鎮痛消炎剤（アセトアミノフェン系）",
      nameFa: "ضدتب و ضددرد (نوع استامینوفن)",
    },
  });

  // ---------------------------------------------------------------------
  // سازندگان
  // ---------------------------------------------------------------------
  const astellas = await upsertManufacturer("アステラス製薬", "astellas-pharma", "آستلاس فارما");
  const sanofi = await upsertManufacturer("サノフィ", "sanofi", "سانوفی");
  const sumitomo = await upsertManufacturer("住友ファーマ", "sumitomo-pharma", "سومیتومو فارما");
  const lillyJapan = await upsertManufacturer("日本イーライリリー", "eli-lilly-japan", "ایلای‌لیلی ژاپن");
  const alnylam = await upsertManufacturer("Ａｌｎｙｌａｍ　Ｊａｐａｎ", "alnylam-japan", "آلنیلام ژاپن");
  const viatris = await upsertManufacturer("ヴィアトリス製薬", "viatris-pharmaceuticals", "ویاتریس فارماسیوتیکالز");
  const astraZeneca = await upsertManufacturer("アストラゼネカ", "astrazeneca", "آسترازنکا");
  const sanbio = await upsertManufacturer("サンバイオ", "sanbio", "سان‌بایو");
  const hisamitsu = await upsertManufacturer("久光製薬", "hisamitsu-pharmaceutical", "هیساموتسو فارماسیوتیکال");

  // ---------------------------------------------------------------------
  // مواد مؤثره
  // ---------------------------------------------------------------------
  const linaclotide = await upsertIngredient("リナクロチド", "linaclotide", undefined, "لیناکلوتید");
  const meningococcalVaccine = await upsertIngredient(
    "４価髄膜炎菌ワクチン（破傷風トキソイド結合体）",
    "meningococcal-vaccine-4v",
    undefined,
    "واکسن چهارظرفیتی مننگوکوک (کونژوگه توکسوئید کزاز)"
  );
  const alacepril = await upsertIngredient("アラセプリル", "alacepril", aceCategory.id, "آلاسپریل");
  const tirzepatide = await upsertIngredient("チルゼパチド", "tirzepatide", undefined, "تیرزپاتید");
  const vutrisiran = await upsertIngredient("ブトリシランナトリウム", "vutrisiran-sodium", undefined, "وتریسیران سدیم");
  const acetaminophen = await upsertIngredient("アセトアミノフェン", "acetaminophen", antipyretic.id, "استامینوفن");
  const acalabrutinib = await upsertIngredient("アカラブルチニブ", "acalabrutinib", undefined, "آکالابروتینیب");
  const vandefitemcel = await upsertIngredient("バンデフィテムセル", "vandefitemcel", undefined, "واندفیتم‌سل");

  // ---------------------------------------------------------------------
  // داروها — از نمونه‌های /api/search، /api/company، /api/category، /api/ingredient
  // ---------------------------------------------------------------------
  await prisma.drug.upsert({
    where: { yjCode: "2399017F1020" },
    update: {},
    create: {
      yjCode: "2399017F1020",
      slug: "linzess-025mg",
      name: "リンゼス錠0.25mg",
      spec: "0.25mg1錠",
      ingredientId: linaclotide.id,
      manufacturerId: astellas.id,
      drugType: DrugType.ORIGINATOR,
      price: 57.8,
      hasGeAlt: false,
      pmdaPdfUrl:
        "https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/800126_2399017F1020_1_06",
      isActive: true,
      listingDate: new Date("2017-03-01"),
    },
  });

  await prisma.drug.upsert({
    where: { yjCode: "6311402A1028" },
    update: {},
    create: {
      yjCode: "6311402A1028",
      slug: "menquadfi-im",
      name: "メンクアッドフィ筋注",
      spec: "0.5mL1瓶",
      ingredientId: meningococcalVaccine.id,
      manufacturerId: sanofi.id,
      drugType: DrugType.ORIGINATOR,
      price: 19721.0,
      prevPrice: 19943.0,
      hasGeAlt: false,
      pmdaPdfUrl:
        "https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/780069_6311402A1028_1_08",
      isActive: true,
      listingDate: new Date("2022-11-16"),
    },
  });

  await prisma.drug.upsert({
    where: { yjCode: "2144003F2025" },
    update: {},
    create: {
      yjCode: "2144003F2025",
      slug: "cetapril-25mg",
      name: "セタプリル錠25mg",
      spec: "25mg1錠",
      ingredientId: alacepril.id,
      manufacturerId: sumitomo.id,
      categoryId: aceCategory.id,
      drugType: DrugType.ORIGINATOR,
      price: 13.3,
      prevPrice: 15.5,
      hasGeAlt: true,
      pmdaPdfUrl:
        "https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/400093_2144003F2025_1_08",
      isActive: true,
      listingDate: new Date("1988-06-01"),
    },
  });

  // مانجارو — ۶ دوز، طبق داده واقعی revision 2026-08 (top_decreases)
  const manjaroDoses: { yj: string; spec: string; slug: string; prev: number; curr: number }[] = [
    { yj: "2499422G1024", spec: "2.5mg0.5mL1キット", slug: "manjaro-2-5", prev: 1924.0, curr: 1443.0 },
    { yj: "2499422G2020", spec: "5mg0.5mL1キット", slug: "manjaro-5", prev: 3848.0, curr: 2886.0 },
    { yj: "2499422G3027", spec: "7.5mg0.5mL1キット", slug: "manjaro-7-5", prev: 5772.0, curr: 4329.0 },
    { yj: "2499422G4023", spec: "10mg0.5mL1キット", slug: "manjaro-10", prev: 7696.0, curr: 5772.0 },
    { yj: "2499422G5020", spec: "12.5mg0.5mL1キット", slug: "manjaro-12-5", prev: 9620.0, curr: 7215.0 },
    { yj: "2499422G6026", spec: "15mg0.5mL1キット", slug: "manjaro-15", prev: 11544.0, curr: 8658.0 },
  ];
  for (const d of manjaroDoses) {
    const drug = await prisma.drug.upsert({
      where: { yjCode: d.yj },
      update: {},
      create: {
        yjCode: d.yj,
        slug: d.slug,
        name: `マンジャロ皮下注${d.spec.split("mg")[0]}mgアテオス`,
        spec: d.spec,
        ingredientId: tirzepatide.id,
        manufacturerId: lillyJapan.id,
        drugType: DrugType.ORIGINATOR,
        route: DrugRoute.INJECTION,
        price: d.curr,
        prevPrice: d.prev,
        isActive: true,
        revisionDate: "2026-08",
      },
    });
    await prisma.priceRevision.upsert({
      where: { drugId_revisionDate: { drugId: drug.id, revisionDate: "2026-08" } },
      update: {},
      create: {
        drugId: drug.id,
        revisionDate: "2026-08",
        price: d.curr,
        isRevised: true,
        reasonMechanism: "持続可能性特例価格調整",
        reasonCitation: "—",
      },
    });
  }

  const vutrisiranDrug = await prisma.drug.upsert({
    where: { yjCode: "1290401G1021" },
    update: {},
    create: {
      yjCode: "1290401G1021",
      slug: "amvuttra-25mg-syringe",
      name: "アムヴトラ皮下注25mgシリンジ",
      spec: "25mg0.5mL1筒",
      ingredientId: vutrisiran.id,
      manufacturerId: alnylam.id,
      drugType: DrugType.ORIGINATOR,
      route: DrugRoute.INJECTION,
      price: 6834558.0,
      prevPrice: 8006196.0,
      isActive: true,
      revisionDate: "2026-08",
    },
  });
  await prisma.priceRevision.upsert({
    where: { drugId_revisionDate: { drugId: vutrisiranDrug.id, revisionDate: "2026-08" } },
    update: {},
    create: {
      drugId: vutrisiranDrug.id,
      revisionDate: "2026-08",
      price: 6834558.0,
      isRevised: true,
      reasonMechanism: "市場拡大再算定",
      reasonCitation: "—",
    },
  });

  // آلپینی و ژنریکش — طبق تصاویر D1–D5 + /api/drugs/1141700J2092/generics
  const alpiny = await prisma.drug.upsert({
    where: { yjCode: "1141700J2092" },
    update: {},
    create: {
      yjCode: "1141700J2092",
      slug: "alpiny-suppositories-100",
      name: "アルピニー坐剤100",
      spec: "100mg1個",
      ingredientId: acetaminophen.id,
      manufacturerId: hisamitsu.id,
      categoryId: antipyretic.id,
      drugType: DrugType.ORIGINATOR,
      price: 21.6,
      prevPrice: 20.9,
      isActive: true,
      listingDate: new Date("2016-03-01"),
      revisionDate: "2026-04",
    },
  });

  await prisma.drug.upsert({
    where: { yjCode: "1141700J2130" },
    update: {},
    create: {
      yjCode: "1141700J2130",
      slug: "anhiba-suppository-children-100",
      name: "アンヒバ坐剤小児用100mg",
      spec: "100mg1個",
      ingredientId: acetaminophen.id,
      manufacturerId: viatris.id,
      categoryId: antipyretic.id,
      drugType: DrugType.ORIGINATOR,
      price: 21.6,
      hasGeAlt: false,
      pmdaPdfUrl:
        "https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/671450_1141700J1045_5_03",
      isActive: true,
      listingDate: new Date("2023-10-01"),
    },
  });

  await prisma.drug.upsert({
    where: { yjCode: "4291070M1024" },
    update: {},
    create: {
      yjCode: "4291070M1024",
      slug: "calquence-100mg",
      name: "カルケンスカプセル100mg",
      spec: "100mg1カプセル",
      ingredientId: acalabrutinib.id,
      manufacturerId: astraZeneca.id,
      drugType: DrugType.ORIGINATOR,
      price: 11705.7,
      prevPrice: 12921.9,
      hasGeAlt: false,
      pmdaPdfUrl:
        "https://www.pmda.go.jp/PmdaSearch/iyakuDetail/ResultDataSetPDF/670227_4291070M1024_1_05",
      isActive: true,
      listingDate: new Date("2021-04-21"),
    },
  });

  // نمونه کامل /api/drugs/{yj_code} — دارای pmp_summary و outlook واقعی
  await prisma.drug.upsert({
    where: { yjCode: "4900412X1024" },
    update: {},
    create: {
      yjCode: "4900412X1024",
      slug: "akuugo-brain-implant",
      name: "アクーゴ脳内移植用注",
      spec: "1回分",
      ingredientId: vandefitemcel.id,
      manufacturerId: sanbio.id,
      drugType: DrugType.ORIGINATOR,
      route: DrugRoute.INJECTION,
      price: 72716528.0,
      narcotic: false,
      gracePeriod: "",
      revisionDate: "2026-05",
      isActive: true,
      listingDate: new Date("2026-05-20"),
      pmpSummary: {
        status: "対象外",
        as_of: "2026年4月時点",
        as_of_rev: "2026-04",
        implication:
          "加算の対象外です。次回は通常の改定ルールで、実勢価との開き（乖離率）に応じて引き下げられる見込みです",
        exclusion: null,
        note: "公式リスト（2022〜2026年度）に掲載なし",
        listing_date: "2026-05-20",
        listing_official: true,
        cap_date: "2041-05",
        ge_first_listing: null,
        years: [
          { revision_date: "2022-04", status: "リスト外" },
          { revision_date: "2023-04", status: "リスト外" },
          { revision_date: "2024-04", status: "リスト外" },
          { revision_date: "2025-04", status: "リスト外" },
          { revision_date: "2026-04", status: "リスト外" },
        ],
      },
      outlook: {
        cat: "standard",
        label: "通常改定（実勢乖離率次第）",
        note:
          "特別な規定の適用は現時点で確認されていません。中間年改定が実施される場合、過去の例では乖離の大きい品目のみが引き下げ対象でした（第3章第1節）。",
      },
    },
  });

  // ---------------------------------------------------------------------
  // عکس لحظه‌ای بازنگری بازار — /api/revision/2026-08
  // ---------------------------------------------------------------------
  await prisma.marketRevision.upsert({
    where: { revisionDate: "2026-08" },
    update: {},
    create: {
      revisionDate: "2026-08",
      prevDate: "2026-04",
      nextDate: null,
      isAdhoc: true,
      totalItems: 7,
      prevTotal: 15631,
      avgChangePct: -23.52,
      statsDecreased: 7,
      statsIncreased: 0,
      statsUnchanged: 0,
      statsNew: 0,
      statsRemoved: 0,
      karteTotal: 7,
      karte: [
        {
          mechanism: "持続可能性特例価格調整",
          layer: "confirmed",
          count: 6,
          pct: 85.7,
          anchor: "shijokakudai",
          examples: [
            { yj_code: "2499422G6026", drug_name: "マンジャロ皮下注15mgアテオス" },
            { yj_code: "2499422G5020", drug_name: "マンジャロ皮下注12.5mgアテオス" },
            { yj_code: "2499422G4023", drug_name: "マンジャロ皮下注10mgアテオス" },
          ],
        },
        {
          mechanism: "市場拡大再算定",
          layer: "confirmed",
          count: 1,
          pct: 14.3,
          anchor: "shijokakudai",
          examples: [{ yj_code: "1290401G1021", drug_name: "アムヴトラ皮下注25mgシリンジ" }],
        },
      ],
      topDecreases: manjaroDoses
        .map((d) => ({
          yj_code: d.yj,
          drug_name: `マンジャロ皮下注${d.spec.split("mg")[0]}mgアテオス`,
          drug_type: "先発品",
          ingredient: "チルゼパチド",
          manufacturer: "日本イーライリリー",
          spec: d.spec,
          prev_price: d.prev,
          curr_price: d.curr,
          change_pct: -25.0,
        }))
        .concat([
          {
            yj_code: "1290401G1021",
            drug_name: "アムヴトラ皮下注25mgシリンジ",
            drug_type: "先発品",
            ingredient: "ブトリシランナトリウム",
            manufacturer: "Ａｌｎｙｌａｍ　Ｊａｐａｎ",
            spec: "25mg0.5mL1筒",
            prev_price: 8006196.0,
            curr_price: 6834558.0,
            change_pct: -14.6,
          },
        ]),
      topIncreases: [],
      newItems: [],
      removedItems: [],
    },
  });

  // ---------------------------------------------------------------------
  // مقاله نمونه — /api/insights
  // ---------------------------------------------------------------------
  await prisma.insight.upsert({
    where: { slug: "kouhatsu-shinki-sannyu-yakka" },
    update: {},
    create: {
      slug: "kouhatsu-shinki-sannyu-yakka",
      title:
        "後発品はなぜ作られなくなったのか — いま新規参入すると、内用薬の薬価は中央値10.8円",
      description:
        "約4割の企業が後発品の開発・上市を断念したと報じられました。薬価ラボのデータベースで市場全体の薬価構造を調べたところ、内用薬431成分の「新規参入時につく薬価」は中央値10.8円、42.7%の成分では10円以下でした。後発品の薬価が7年で半減した実データとあわせて構造を示します。",
      keywords: "後発品,ジェネリック,ジェネリック・ロス,薬価,新規参入,最安値,価格帯集約,不採算,供給不安,薬価改定",
      category: "薬価の基礎",
      status: "published",
      date: new Date("2026-08-25"),
      readMin: 6,
      featured: false,
      author: "薬価ラボ編集部",
      ogpImage: "/ogp.png",
      statValue: "10.8円",
      statLabel: "いま内用薬の後発品に新規参入した場合につく薬価の中央値（成分ごとの最安既収載後発品）",
      weeklyViews: 8,
    },
  });

  console.log("Seed کامل شد (داده‌های واقعی از lab-endpoint.txt):", {
    alpinyId: alpiny.id,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
