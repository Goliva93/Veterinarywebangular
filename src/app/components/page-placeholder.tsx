import { FileQuestion } from "lucide-react";

interface PagePlaceholderProps {
  title: string;
  description: string;
}

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="bg-white rounded-2xl border border-border p-12 text-center">
        <FileQuestion className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <p className="text-lg font-semibold text-foreground mb-2">Página en desarrollo</p>
        <p className="text-muted-foreground">
          Esta sección estará disponible próximamente
        </p>
      </div>
    </div>
  );
}
