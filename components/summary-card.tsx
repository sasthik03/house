import type { ElementType } from "react";

type SummaryCardVariant = "success" | "info" | "warning" | "destructive";

type SummaryCardProps = {
  icon: ElementType;
  label: string;
  value: number | string;
  subtitle?: string;
  variant?: SummaryCardVariant;
};

export function SummaryCard({
  icon: Icon,
  label,
  value,
  subtitle,
  variant = "info",
}: SummaryCardProps) {
  const styles: Record<
    SummaryCardVariant,
    {
      icon: string;
      value: string;
    }
  > = {
    success: {
      icon: "bg-[#EAF4EF] text-[#00875A]",
      value: "text-[#00875A]",
    },
    info: {
      icon: "bg-blue-50 text-blue-600",
      value: "text-blue-600",
    },
    warning: {
      icon: "bg-amber-50 text-amber-600",
      value: "text-amber-600",
    },
    destructive: {
      icon: "bg-red-50 text-red-600",
      value: "text-red-600",
    },
  };

  const currentStyle = styles[variant];

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${currentStyle.icon}`}
        >
          <Icon className="h-4 w-4" />
        </div>

        {/* Content */}
        <div className="min-w-0">
          <p className="text-xs text-gray-500">{label}</p>

          <p className={`mt-0.5 text-xl font-bold ${currentStyle.value}`}>
            {value}
          </p>

          {subtitle && (
            <p className="mt-0.5 text-[11px] text-gray-400">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}
