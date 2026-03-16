import { InputHTMLAttributes, TextareaHTMLAttributes, forwardRef, useState } from "react";

interface BaseTextFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

interface InputProps extends BaseTextFieldProps, InputHTMLAttributes<HTMLInputElement> {
  multiline?: false;
  rows?: never;
}

interface TextAreaProps extends BaseTextFieldProps, Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className'> {
  multiline: true;
  rows?: number;
}

type MaterialTextFieldProps = InputProps | TextAreaProps;

export const MaterialTextField = forwardRef<HTMLInputElement | HTMLTextAreaElement, MaterialTextFieldProps>(
  ({ 
    label, 
    error, 
    helperText, 
    fullWidth = false, 
    startIcon,
    endIcon,
    className = "",
    multiline = false,
    rows,
    ...props 
  }, ref) => {
    const [focused, setFocused] = useState(false);
    
    const widthStyle = fullWidth ? "w-full" : "";
    const errorStyle = error ? "border-[#ef5350] focus:border-[#ef5350]" : "border-border focus:border-[#7cb342]";

    const inputClasses = `
      w-full px-4 py-3 rounded-xl border-2 bg-input-background
      transition-all duration-200 outline-none
      ${errorStyle}
      ${focused ? "ring-2 ring-primary/20" : ""}
      ${startIcon ? "pl-10" : ""}
      ${endIcon ? "pr-10" : ""}
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    return (
      <div className={`${widthStyle} ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-foreground mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {startIcon}
            </div>
          )}
          {multiline ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              rows={rows || 3}
              className={inputClasses}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              className={inputClasses}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              {...(props as InputHTMLAttributes<HTMLInputElement>)}
            />
          )}
          {endIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {endIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p className={`mt-1.5 text-sm ${error ? "text-[#ef5350]" : "text-muted-foreground"}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

MaterialTextField.displayName = "MaterialTextField";