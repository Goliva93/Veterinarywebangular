import { ReactNode } from "react";

interface MaterialCardProps {
  children: ReactNode;
  className?: string;
  elevated?: boolean;
  onClick?: () => void;
  hoverable?: boolean;
}

export function MaterialCard({ 
  children, 
  className = "", 
  elevated = false,
  onClick,
  hoverable = false 
}: MaterialCardProps) {
  const baseStyles = "bg-white rounded-2xl border border-border overflow-hidden";
  const shadowStyles = elevated ? "shadow-lg" : "shadow-sm";
  const hoverStyles = hoverable || onClick ? "hover:shadow-md transition-shadow cursor-pointer" : "";
  
  return (
    <div 
      className={`${baseStyles} ${shadowStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

interface MaterialCardHeaderProps {
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

export function MaterialCardHeader({ children, className = "", action }: MaterialCardHeaderProps) {
  return (
    <div className={`px-6 py-4 border-b border-border flex items-center justify-between ${className}`}>
      <div className="flex-1">{children}</div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  );
}

interface MaterialCardContentProps {
  children: ReactNode;
  className?: string;
}

export function MaterialCardContent({ children, className = "" }: MaterialCardContentProps) {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
}

interface MaterialCardActionsProps {
  children: ReactNode;
  className?: string;
}

export function MaterialCardActions({ children, className = "" }: MaterialCardActionsProps) {
  return (
    <div className={`px-6 py-3 border-t border-border flex items-center gap-2 ${className}`}>
      {children}
    </div>
  );
}
