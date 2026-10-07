import { TAdminStat } from "@/app/type/dashboard";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export type AdminStatsCardProps = {
  stat: TAdminStat;
  showMenu?: boolean;
};

export default function AdminStatsCard({ stat }: AdminStatsCardProps) {
  const Icon = stat.icon;

  const isDown = stat.trendType === "down";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 transition hover:border-gray-300 hover:shadow-sm">
      {/* Icon + Content */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#EAF4EF] text-[#00875A]">
          <Icon className="h-4 w-4" />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500">{stat.title}</p>

          <p className="mt-0.5 text-xl font-bold leading-tight text-[#112233]">
            {stat.value}
          </p>
        </div>
      </div>

      {/* Subtitle / Trend */}
      {(stat.subtitle || stat.trend) && (
        <div className="mt-2 flex items-center gap-2 pl-12 text-xs">
          {stat.trend && (
            <span
              className={`inline-flex items-center gap-0.5 font-semibold ${
                isDown ? "text-red-600" : "text-[#00875A]"
              }`}
            >
              {isDown ? (
                <ArrowDownRight className="h-3.5 w-3.5" />
              ) : (
                <ArrowUpRight className="h-3.5 w-3.5" />
              )}

              {stat.trend}
            </span>
          )}

          {stat.trendText && (
            <span className="text-gray-400">{stat.trendText}</span>
          )}

          {!stat.trend && stat.subtitle && (
            <span className="text-gray-400">{stat.subtitle}</span>
          )}
        </div>
      )}
    </div>
  );
}
