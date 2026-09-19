export default function NotificationPopover() {
  return (
    <div className="p-4">
      <p className="text-sm font-bold mb-3">اعلان‌ها</p>

      <div className="rounded-lg bg-brand-soft/60 px-3 py-2.5 text-xs text-ink-soft leading-6">
        هرگونه <span className="font-bold text-ink">تغییر قیمت دارو</span> یا{" "}
        <span className="font-bold text-ink">پایان دوره اقدامات انتقالی</span> (ظرف ۶ ماه آینده) را برای داروهای
        ثبت‌شده در لیست پیگیری به شما اطلاع می‌دهیم. لطفاً وقتی نقطه قرمز روشن شد بررسی کنید.
      </div>

      <p className="text-xs text-ink-faint text-center py-6">
        با افزودن دارو به لیست پیگیری، از تغییرات قیمت آن مطلع خواهید شد.
      </p>
    </div>
  );
}
