export default function LowestGenericBanner({
  price,
  diffPercent,
  diffAmount,
}: {
  price: number;
  diffPercent: number;
  diffAmount: number;
}) {
  return (
    <div className="rounded-xl2 bg-emerald-soft border border-emerald/20 px-5 py-3.5 text-center">
      <p className="text-sm font-bold text-emerald">
        کمترین قیمت محصول ژنریک: {price.toLocaleString("fa-IR")} ین (
        {diffPercent === 0 ? "بدون تغییر نسبت به محصول پیشگام" : `${diffPercent}٪ نسبت به محصول پیشگام`} / اختلاف{" "}
        {diffAmount.toLocaleString("fa-IR")} ین)
      </p>
    </div>
  );
}
