export function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((item) => item.charAt(0))
    .join("");

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF4EF] text-xs font-semibold text-[#00875A]">
      {initials}
    </div>
  );
}
