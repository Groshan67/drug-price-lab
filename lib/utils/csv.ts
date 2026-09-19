// ابزار خروجی CSV — یک فایل واقعی می‌سازد و دانلودش را در مرورگر شروع می‌کند.

function csvEscape(value: unknown): string {
  const str = value === null || value === undefined ? "" : String(value);
  if (/[",\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function downloadCsv(filename: string, headers: string[], rows: (string | number)[][]) {
  // BOM برای نمایش صحیح حروف فارسی در Excel
  const bom = "\uFEFF";
  const lines = [headers, ...rows].map((row) => row.map(csvEscape).join(","));
  const csvContent = bom + lines.join("\r\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename.endsWith(".csv") ? filename : `${filename}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
