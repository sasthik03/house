import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className = "", id, ...props }, ref) => {
    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={id}
            className="mb-1.5 flex items-center gap-1 text-[13px] font-medium text-[#112233]"
          >
            <span>{label}</span>

            {props.required && (
              <span className="text-red-500" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        {/* Input */}
        <div className="relative">
          {/* Left Icon */}
          {props.icon && (
            <span
              className="
                pointer-events-none absolute left-3.5 top-1/2
                flex -translate-y-1/2 items-center
                text-gray-400
              "
            >
              {props.icon}
            </span>
          )}

          <input
            ref={ref}
            id={id}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${id}-error` : hint ? `${id}-hint` : undefined
            }
            className={`
              h-11 w-full rounded-xl border
              bg-white px-3.5
              text-sm text-[#112233]
              shadow-sm
              outline-none
              transition-all duration-150
              placeholder:text-gray-400
              hover:border-gray-300
              focus:bg-white
              focus:outline-none
              disabled:cursor-not-allowed
              disabled:border-gray-200
              disabled:bg-gray-50
              disabled:text-gray-400
              disabled:shadow-none
              read-only:bg-gray-50

              ${props.icon ? "pl-10" : ""}

              ${
                error
                  ? `
                    border-red-300
                    focus:border-red-500
                    focus:ring-4
                    focus:ring-red-500/10
                  `
                  : `
                    border-gray-200
                    focus:border-[#00875A]
                    focus:ring-4
                    focus:ring-[#00875A]/10
                  `
              }

              ${className}
            `}
            {...props}
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

Input.displayName = "Input";

export default Input;
