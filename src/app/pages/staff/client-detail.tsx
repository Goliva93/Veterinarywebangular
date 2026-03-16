import { useNavigate, useParams } from "react-router";
import { MaterialCard, MaterialCardContent, MaterialCardHeader } from "../../components/material-card";
import { MaterialButton } from "../../components/material-button";
import { ArrowLeft, Edit, Heart, Calendar, DollarSign } from "lucide-react";

export function ClientDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
      <button
        onClick={() => navigate("/staff/clients")}
        className="inline-flex items-center gap-2 text-[#7cb342] hover:underline mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a Clientes
      </button>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">María García</h1>
          <p className="text-muted-foreground">Cliente desde enero 2024</p>
        </div>
        <MaterialButton variant="outlined">
          <Edit className="w-4 h-4" />
          Editar
        </MaterialButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MaterialCard>
          <MaterialCardHeader>
            <h3 className="font-semibold">Información de Contacto</h3>
          </MaterialCardHeader>
          <MaterialCardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Teléfono</p>
              <p className="font-semibold">987654321</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-semibold">maria@ejemplo.com</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Dirección</p>
              <p className="font-semibold">Av. Principal 123, Surco</p>
            </div>
          </MaterialCardContent>
        </MaterialCard>

        <MaterialCard>
          <MaterialCardHeader>
            <h3 className="font-semibold flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Mascotas (2)
            </h3>
          </MaterialCardHeader>
          <MaterialCardContent className="space-y-3">
            {["Max - Perro", "Luna - Gato"].map((pet, i) => (
              <div key={i} className="p-3 bg-muted rounded-lg">
                <p className="font-semibold">{pet}</p>
              </div>
            ))}
          </MaterialCardContent>
        </MaterialCard>

        <MaterialCard>
          <MaterialCardHeader>
            <h3 className="font-semibold">Estadísticas</h3>
          </MaterialCardHeader>
          <MaterialCardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total citas</span>
              <span className="font-bold">24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Última visita</span>
              <span className="font-bold">20/02/2026</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total gastado</span>
              <span className="font-bold">S/ 3,500</span>
            </div>
          </MaterialCardContent>
        </MaterialCard>
      </div>
    </div>
  );
}
