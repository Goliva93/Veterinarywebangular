import { ButtonHTMLAttributes, forwardRef } from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

interface MaterialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined" | "text" | "elevated";
  color?: "primary" | "secondary" | "error";
  loading?: boolean;
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
}

export const MaterialButton = forwardRef<HTMLButtonElement, MaterialButtonProps>(
  ({ 
    variant = "filled", 
    color = "primary", 
    loading = false, 
    fullWidth = false,
    size = "md",
    className = "",
    children,
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = "relative inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const sizeStyles = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-2.5",
      lg: "px-8 py-3 text-lg",
    };
    
    const variantStyles = {
      filled: {
        primary: "bg-[#7cb342] text-white hover:bg-[#689f38] shadow-md hover:shadow-lg",
        secondary: "bg-[#fdd835] text-[#1e293b] hover:bg-[#fbc02d] shadow-md hover:shadow-lg",
        error: "bg-[#ef5350] text-white hover:bg-[#e53935] shadow-md hover:shadow-lg",
      },
      outlined: {
        primary: "border-2 border-[#7cb342] text-[#7cb342] hover:bg-[#7cb342]/10",
        secondary: "border-2 border-[#fdd835] text-[#1e293b] hover:bg-[#fdd835]/10",
        error: "border-2 border-[#ef5350] text-[#ef5350] hover:bg-[#ef5350]/10",
      },
      text: {
        primary: "text-[#7cb342] hover:bg-[#7cb342]/10",
        secondary: "text-[#1e293b] hover:bg-[#fdd835]/10",
        error: "text-[#ef5350] hover:bg-[#ef5350]/10",
      },
      elevated: {
        primary: "bg-white text-[#7cb342] shadow-lg hover:shadow-xl border border-border",
        secondary: "bg-white text-[#1e293b] shadow-lg hover:shadow-xl border border-border",
        error: "bg-white text-[#ef5350] shadow-lg hover:shadow-xl border border-border",
      },
    };

    const widthStyle = fullWidth ? "w-full" : "";

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant][color]} ${widthStyle} ${className}`}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </motion.button>
    );
  }
);

MaterialButton.displayName = "MaterialButton";