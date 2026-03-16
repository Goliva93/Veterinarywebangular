import { X } from "lucide-react";

interface MaterialChipProps {
  label: string;
  color?: "pending" | "confirmed" | "cancelled" | "completed" | "default";
  onDelete?: () => void;
  icon?: React.ReactNode;
  size?: "sm" | "md";
}

export function MaterialChip({ 
  label, 
  color = "default", 
  onDelete,
  icon,
  size = "md" 
}: MaterialChipProps) {
  const colorStyles = {
    pending: "bg-[#fdd835] text-[#1e293b] border-[#fdd835]",
    confirmed: "bg-[#7cb342] text-white border-[#7cb342]",
    cancelled: "bg-[#ef5350] text-white border-[#ef5350]",
    completed: "bg-[#78909c] text-white border-[#78909c]",
    default: "bg-[#e2e8f0] text-[#1e293b] border-[#e2e8f0]",
  };

  const sizeStyles = {
    sm: "text-xs px-2 py-1 gap-1",
    md: "text-sm px-3 py-1.5 gap-1.5",
  };

  return (
    <div className={`inline-flex items-center rounded-full font-medium border ${colorStyles[color]} ${sizeStyles[size]}`}>
      {icon && <span className="w-4 h-4">{icon}</span>}
      <span>{label}</span>
      {onDelete && (
        <button
          onClick={onDelete}
          className="ml-1 hover:opacity-70 transition-opacity"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
