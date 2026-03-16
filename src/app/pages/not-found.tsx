import { Link } from "react-router";
import { MaterialButton } from "../components/material-button";
import { Home } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-[#7cb342] mb-4">404</h1>
        <h2 className="text-3xl font-bold text-foreground mb-4">Página no encontrada</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Link to="/">
          <MaterialButton>
            <Home className="w-5 h-5" />
            Volver al inicio
          </MaterialButton>
        </Link>
      </div>
    </div>
  );
}
