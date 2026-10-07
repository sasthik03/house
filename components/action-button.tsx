import type { ElementType } from "react";

type ActionButtonProps = {
  icon: ElementType;
  label: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
};

export function ActionButton({
  icon: Icon,
  label,
  onClick,
  href,
  target,
  rel,
}: ActionButtonProps) {
  const className =
    "flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-[#00875A]";

  if (href) {
    return (
      <a
        href={href}
        aria-label={label}
        target={target}
        rel={rel}
        className={className}
      >
        <Icon className="h-4 w-4" />
      </a>
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={className}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
