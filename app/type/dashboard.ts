import { LucideIcon } from "lucide-react";

export type TAdminStat = {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  trendText?: string;
  trendType?: "up" | "down";
  icon: LucideIcon;
};
