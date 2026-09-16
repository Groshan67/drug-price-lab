import { cn } from "@/lib/utils";
import {
  Calendar,
  Sparkles,
  FileClock,
  FlaskConical,
  LayoutGrid,
  Building2,
  ClipboardList,
  CalendarDays,
  Archive,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  calendar: Calendar,
  sparkles: Sparkles,
  "file-clock": FileClock,
  "flask-conical": FlaskConical,
  "layout-grid": LayoutGrid,
  "building-2": Building2,
  "clipboard-list": ClipboardList,
  "calendar-days": CalendarDays,
  archive: Archive,
};

const tones = {
  brand: "bg-brand-soft text-brand-dark",
  plum: "bg-plum-soft text-plum",
  emerald: "bg-emerald-soft text-emerald",
  gold: "bg-gold-soft text-gold",
};

export default function IconBadge({
  icon,
  tone = "brand",
  className,
}: {
  icon: string;
  tone?: keyof typeof tones;
  className?: string;
}) {
  const Icon = icons[icon] ?? Sparkles;
  return (
    <span
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl",
        tones[tone],
        className
      )}
    >
      <Icon className="h-5 w-5" />
    </span>
  );
}
