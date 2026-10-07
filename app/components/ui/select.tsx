import { ChevronDown } from "lucide-react";
import { forwardRef, type ReactNode, type SelectHTMLAttributes } from "react";

export type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
  options: SelectOption[];
  placeholder?: string;
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      hint,
      required,
      icon,
      options,
      placeholder = "নির্বাচন করুন",
      className = "",
      id,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className="mb-1.5 flex items-center gap-1 text-[13px] font-medium text-[#112233]"
          >
            <span>{label}</span>

            {required && (
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Select */}
        <div className="relative">
          {icon && (
            <span
              className="
                pointer-events-none absolute left-3 top-1/2 z-10
                -translate-y-1/2 text-gray-400
              "
            >
              {icon}
            </span>
          )}

          <select
            ref={ref}
            id={id}
            required={required}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${id}-error` : hint ? `${id}-hint` : undefined
            }
            className={`
              h-10 w-full appearance-none rounded-lg border
              bg-white px-3 pr-9
              text-sm text-[#112233]
              outline-none transition-all duration-150

              disabled:cursor-not-allowed
              disabled:bg-gray-50
              disabled:text-gray-400

              ${icon ? "pl-10" : ""}

              ${
                error
                  ? `
                    border-red-300
                    focus:border-red-500
                    focus:ring-2
                    focus:ring-red-500/10
                  `
                  : `
                    border-gray-200
                    focus:border-[#00875A]
                    focus:ring-2
                    focus:ring-[#00875A]/10
                  `
              }

              ${className}
            `}
            {...props}
          >
            {/* Placeholder */}
            <option value="" disabled>
              {placeholder}
            </option>

            {/* Options */}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          <ChevronDown
            className="
              pointer-events-none absolute right-3 top-1/2
              h-4 w-4 -translate-y-1/2 text-gray-400
            "
          />
        </div>

        {/* Error */}
        {error && (
          <p
            id={`${id}-error`}
            className="mt-1.5 text-xs font-medium text-red-600"
          >
            {error}
          </p>
        )}

        {/* Hint */}
        {!error && hint && (
          <p id={`${id}-hint`} className="mt-1.5 text-xs text-gray-400">
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
