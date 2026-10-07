import { CheckCircle2, Clock3, Info, XCircle } from "lucide-react";

type StatusBadgeVariant = "success" | "info" | "warning" | "destructive";

type StatusBadgeProps = {
  status: string;
  variant?: StatusBadgeVariant;
};

export function StatusBadge({ status, variant = "success" }: StatusBadgeProps) {
  const styles: Record<
    StatusBadgeVariant,
    {
      className: string;
      icon: React.ElementType;
    }
  > = {
    success: {
      className: "bg-[#EAF4EF] text-[#00875A]",
      icon: CheckCircle2,
    },
    info: {
      className: "bg-blue-50 text-blue-600",
      icon: Info,
    },
    warning: {
      className: "bg-amber-50 text-amber-600",
      icon: Clock3,
    },
    destructive: {
      className: "bg-red-50 text-red-600",
      icon: XCircle,
    },
  };

  const currentStyle = styles[variant];
  const Icon = currentStyle.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${currentStyle.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {status}
    </span>
  );
}
