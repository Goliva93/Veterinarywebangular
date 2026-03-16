import { Link } from "react-router";
import { MaterialCard, MaterialCardContent, MaterialCardHeader } from "../../components/material-card";
import { MaterialButton } from "../../components/material-button";
import { MaterialChip } from "../../components/material-chip";
import { Calendar, Heart, DollarSign, User, Plus, Clock } from "lucide-react";

export function ClientHomePage() {
  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">¡Hola, María! 👋</h1>
        <p className="text-muted-foreground">Bienvenida a tu portal de El Mascotario</p>
      </div>

      {/* Next Appointment */}
      <MaterialCard elevated className="mb-6">
        <MaterialCardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-lg font-semibold">Próxima Cita</h3>
            <MaterialChip label="Confirmada" color="confirmed" size="sm" />
          </div>
        </MaterialCardHeader>
        <MaterialCardContent>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-[#7cb342]/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#7cb342]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#7cb342]">24 Feb, 09:00</p>
                  <p className="text-sm text-muted-foreground">Consulta médica - Max</p>
                </div>
              </div>
              <div className="pl-15 space-y-1 text-sm">
                <p className="text-muted-foreground">
                  <strong>Profesional:</strong> Dr. Rodríguez
                </p>
                <p className="text-muted-foreground">
                  <strong>Sede:</strong> Surco
                </p>
              </div>
            </div>
            <Link to="/client/appointments">
              <MaterialButton variant="outlined">
                Ver detalles
              </MaterialButton>
            </Link>
          </div>
        </MaterialCardContent>
      </MaterialCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link to="/client/appointments/new">
          <MaterialCard hoverable className="h-full">
            <MaterialCardContent className="text-center py-6">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#7cb342]/10 flex items-center justify-center">
                <Plus className="w-6 h-6 text-[#7cb342]" />
              </div>
              <p className="font-semibold">Solicitar Cita</p>
            </MaterialCardContent>
          </MaterialCard>
        </Link>

        <Link to="/client/pets">
          <MaterialCard hoverable className="h-full">
            <MaterialCardContent className="text-center py-6">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#fdd835]/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#fdd835]" />
              </div>
              <p className="font-semibold">Mis Mascotas</p>
            </MaterialCardContent>
          </MaterialCard>
        </Link>

        <Link to="/client/appointments">
          <MaterialCard hoverable className="h-full">
            <MaterialCardContent className="text-center py-6">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#42a5f5]/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#42a5f5]" />
              </div>
              <p className="font-semibold">Mis Citas</p>
            </MaterialCardContent>
          </MaterialCard>
        </Link>

        <Link to="/client/payments">
          <MaterialCard hoverable className="h-full">
            <MaterialCardContent className="text-center py-6">
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#ef5350]/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#ef5350]" />
              </div>
              <p className="font-semibold">Pagos</p>
            </MaterialCardContent>
          </MaterialCard>
        </Link>
      </div>

      {/* My Pets Summary */}
      <MaterialCard>
        <MaterialCardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-lg font-semibold">Mis Mascotas</h3>
            <Link to="/client/pets">
              <MaterialButton variant="text" size="sm">
                Ver todas
              </MaterialButton>
            </Link>
          </div>
        </MaterialCardHeader>
        <MaterialCardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["Max - Perro Labrador", "Luna - Gato Siamés"].map((pet, i) => (
              <div key={i} className="p-4 bg-muted rounded-xl flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#7cb342] text-white flex items-center justify-center font-bold">
                  {pet.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{pet}</p>
                  <p className="text-sm text-muted-foreground">Última visita: {i === 0 ? "24 Feb" : "15 Feb"}</p>
                </div>
              </div>
            ))}
          </div>
        </MaterialCardContent>
      </MaterialCard>
    </div>
  );
}
