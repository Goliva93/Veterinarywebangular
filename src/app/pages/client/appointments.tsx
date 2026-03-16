import { useState } from "react";
import { Link } from "react-router";
import { MaterialCard, MaterialCardContent, MaterialCardHeader } from "../../components/material-card";
import { MaterialButton } from "../../components/material-button";
import { MaterialChip } from "../../components/material-chip";
import { MaterialDialog } from "../../components/material-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Calendar, Clock, MapPin, User, Heart, Plus, Info, XCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface Appointment {
  id: number;
  date: string;
  time: string;
  pet: string;
  service: string;
  professional: string;
  location: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  notes?: string;
  price?: number;
}

const appointments: Appointment[] = [
  {
    id: 1,
    date: "2026-02-24",
    time: "09:00",
    pet: "Max",
    service: "Consulta médica",
    professional: "Dr. Rodríguez",
    location: "Surco",
    status: "confirmed",
    notes: "Primera consulta del mes",
    price: 80
  },
  {
    id: 2,
    date: "2026-03-05",
    time: "14:30",
    pet: "Luna",
    service: "Grooming",
    professional: "Ana López",
    location: "Chorrillos",
    status: "pending",
    price: 120
  },
  {
    id: 3,
    date: "2026-02-15",
    time: "10:00",
    pet: "Max",
    service: "Control",
    professional: "Dr. Martínez",
    location: "Surco",
    status: "completed",
    notes: "Control de vacunas",
    price: 50
  },
  {
    id: 4,
    date: "2026-02-10",
    time: "11:30",
    pet: "Luna",
    service: "Consulta médica",
    professional: "Dr. Rodríguez",
    location: "Surco",
    status: "completed",
    price: 80
  },
  {
    id: 5,
    date: "2026-01-20",
    time: "15:00",
    pet: "Max",
    service: "Vacunación",
    professional: "Dr. Martínez",
    location: "Chorrillos",
    status: "completed",
    price: 60
  },
];

export function ClientAppointmentsPage() {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState<Appointment | null>(null);

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status === "confirmed" || apt.status === "pending"
  );

  const pastAppointments = appointments.filter(
    (apt) => apt.status === "completed" || apt.status === "cancelled"
  );

  const handleCancelAppointment = () => {
    if (appointmentToCancel) {
      toast.success(`Cita del ${new Date(appointmentToCancel.date).toLocaleDateString('es-PE')} cancelada exitosamente`);
      setCancelDialogOpen(false);
      setAppointmentToCancel(null);
    }
  };

  const openCancelDialog = (appointment: Appointment) => {
    setAppointmentToCancel(appointment);
    setCancelDialogOpen(true);
  };

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => {
    const isPast = appointment.status === "completed" || appointment.status === "cancelled";
    
    return (
      <MaterialCard elevated className="mb-4">
        <MaterialCardContent className="p-5">
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            {/* Date/Time */}
            <div className="flex items-center gap-4 md:w-40 flex-shrink-0">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#7cb342]">
                  {new Date(appointment.date).getDate()}
                </p>
                <p className="text-xs text-muted-foreground uppercase">
                  {new Date(appointment.date).toLocaleDateString('es-PE', { month: 'short' })}
                </p>
                <p className="text-sm font-semibold mt-1">{appointment.time}</p>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{appointment.service}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Heart className="w-4 h-4" />
                    <span>{appointment.pet}</span>
                  </div>
                </div>
                <MaterialChip label={
                  appointment.status === "confirmed" ? "Confirmada" :
                  appointment.status === "pending" ? "Pendiente" :
                  appointment.status === "completed" ? "Finalizada" : "Cancelada"
                } color={appointment.status} size="sm" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{appointment.professional}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>Sede {appointment.location}</span>
                </div>
              </div>

              {appointment.notes && (
                <div className="p-3 bg-muted rounded-lg text-sm">
                  <p className="text-muted-foreground">
                    <strong>Notas:</strong> {appointment.notes}
                  </p>
                </div>
              )}

              {appointment.price && (
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span className="text-muted-foreground">Costo:</span>
                  <span className="text-[#7cb342]">S/ {appointment.price.toFixed(2)}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex md:flex-col gap-2 md:w-32 flex-shrink-0">
              <MaterialButton
                variant="outlined"
                size="sm"
                onClick={() => setSelectedAppointment(appointment)}
                className="flex-1 md:w-full"
              >
                <Info className="w-4 h-4 md:mr-0 mr-2" />
                <span className="md:hidden">Detalles</span>
              </MaterialButton>
              {!isPast && (
                <MaterialButton
                  variant="text"
                  size="sm"
                  onClick={() => openCancelDialog(appointment)}
                  className="flex-1 md:w-full text-[#ef5350]"
                >
                  <XCircle className="w-4 h-4 md:mr-0 mr-2" />
                  <span className="md:hidden">Cancelar</span>
                </MaterialButton>
              )}
            </div>
          </div>
        </MaterialCardContent>
      </MaterialCard>
    );
  };

  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Mis Citas</h1>
          <p className="text-muted-foreground">Revisa y gestiona tus citas programadas</p>
        </div>
        <Link to="/client/appointments/new">
          <MaterialButton variant="filled" className="w-full sm:w-auto">
            <Plus className="w-5 h-5 mr-2" />
            Solicitar cita
          </MaterialButton>
        </Link>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-6 w-full sm:w-auto">
          <TabsTrigger value="upcoming" className="flex-1 sm:flex-none">
            <Calendar className="w-4 h-4 mr-2" />
            Próximas ({upcomingAppointments.length})
          </TabsTrigger>
          <TabsTrigger value="past" className="flex-1 sm:flex-none">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Historial ({pastAppointments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <MaterialCard>
              <MaterialCardContent className="text-center py-12">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-semibold mb-2">No tienes citas programadas</p>
                <p className="text-muted-foreground mb-4">
                  Solicita una cita para cuidar de tu mascota
                </p>
                <Link to="/client/appointments/new">
                  <MaterialButton variant="filled">
                    <Plus className="w-5 h-5 mr-2" />
                    Solicitar cita
                  </MaterialButton>
                </Link>
              </MaterialCardContent>
            </MaterialCard>
          )}
        </TabsContent>

        <TabsContent value="past">
          {pastAppointments.length > 0 ? (
            pastAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <MaterialCard>
              <MaterialCardContent className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-semibold mb-2">No hay citas en el historial</p>
                <p className="text-muted-foreground">
                  Aquí aparecerán tus citas finalizadas o canceladas
                </p>
              </MaterialCardContent>
            </MaterialCard>
          )}
        </TabsContent>
      </Tabs>

      {/* Appointment Details Dialog */}
      <MaterialDialog
        open={selectedAppointment !== null}
        onOpenChange={(open) => !open && setSelectedAppointment(null)}
        title="Detalles de la Cita"
        description="Información completa de tu cita"
      >
        {selectedAppointment && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <p className="text-2xl font-bold text-[#7cb342]">
                  {new Date(selectedAppointment.date).toLocaleDateString('es-PE', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-lg font-semibold mt-1">{selectedAppointment.time}</p>
              </div>
              <MaterialChip 
                label={
                  selectedAppointment.status === "confirmed" ? "Confirmada" :
                  selectedAppointment.status === "pending" ? "Pendiente" :
                  selectedAppointment.status === "completed" ? "Finalizada" : "Cancelada"
                } 
                color={selectedAppointment.status}
              />
            </div>

            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Servicio</p>
                <p className="font-semibold text-lg">{selectedAppointment.service}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Mascota</p>
                  <p className="font-semibold">{selectedAppointment.pet}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Profesional</p>
                  <p className="font-semibold">{selectedAppointment.professional}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Sede</p>
                <p className="font-semibold">{selectedAppointment.location}</p>
              </div>
              {selectedAppointment.notes && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Notas</p>
                  <p className="font-semibold">{selectedAppointment.notes}</p>
                </div>
              )}
              {selectedAppointment.price && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Costo</p>
                  <p className="font-semibold text-[#7cb342]">S/ {selectedAppointment.price.toFixed(2)}</p>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <MaterialButton variant="outlined" onClick={() => setSelectedAppointment(null)} className="flex-1">
                Cerrar
              </MaterialButton>
              {selectedAppointment.status !== "completed" && selectedAppointment.status !== "cancelled" && (
                <MaterialButton 
                  variant="filled" 
                  className="flex-1 bg-[#ef5350] hover:bg-[#ef5350]/90"
                  onClick={() => {
                    setSelectedAppointment(null);
                    openCancelDialog(selectedAppointment);
                  }}
                >
                  Cancelar cita
                </MaterialButton>
              )}
            </div>
          </div>
        )}
      </MaterialDialog>

      {/* Cancel Appointment Dialog */}
      <MaterialDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        title="Cancelar Cita"
        description="Confirma la cancelación de tu cita"
      >
        <div className="space-y-4">
          <p className="text-muted-foreground">
            ¿Estás seguro que deseas cancelar esta cita?
          </p>
          {appointmentToCancel && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-semibold mb-1">{appointmentToCancel.service}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(appointmentToCancel.date).toLocaleDateString('es-PE')} a las {appointmentToCancel.time}
              </p>
              <p className="text-sm text-muted-foreground">
                {appointmentToCancel.pet} - {appointmentToCancel.professional}
              </p>
            </div>
          )}
          <p className="text-sm text-muted-foreground">
            Esta acción no se puede deshacer. Si necesitas reagendar, puedes solicitar una nueva cita.
          </p>
          <div className="flex gap-2 pt-4">
            <MaterialButton variant="outlined" onClick={() => setCancelDialogOpen(false)} className="flex-1">
              No, mantener cita
            </MaterialButton>
            <MaterialButton 
              variant="filled" 
              onClick={handleCancelAppointment} 
              className="flex-1 bg-[#ef5350] hover:bg-[#ef5350]/90"
            >
              Sí, cancelar
            </MaterialButton>
          </div>
        </div>
      </MaterialDialog>
    </div>
  );
}