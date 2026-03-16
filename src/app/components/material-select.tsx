import { forwardRef, SelectHTMLAttributes } from "react";

interface MaterialSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  options: { value: string; label: string }[];
}

export const MaterialSelect = forwardRef<HTMLSelectElement, MaterialSelectProps>(
  ({ 
    label, 
    error, 
    helperText, 
    fullWidth = false,
    options,
    className = "",
    ...props 
  }, ref) => {
    const widthStyle = fullWidth ? "w-full" : "";
    const errorStyle = error ? "border-[#ef5350] focus:border-[#ef5350]" : "border-border focus:border-[#7cb342]";

    return (
      <div className={`${widthStyle} ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-xl border-2 bg-input-background
            transition-all duration-200 outline-none cursor-pointer
            ${errorStyle}
            focus:ring-2 focus:ring-primary/20
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {(error || helperText) && (
          <p className={`mt-1.5 text-sm ${error ? "text-[#ef5350]" : "text-muted-foreground"}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

MaterialSelect.displayName = "MaterialSelect";
