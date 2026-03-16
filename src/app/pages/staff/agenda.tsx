import { useState } from "react";
import { Link } from "react-router";
import { MaterialCard, MaterialCardContent, MaterialCardHeader } from "../../components/material-card";
import { MaterialChip } from "../../components/material-chip";
import { MaterialButton } from "../../components/material-button";
import { MaterialTextField } from "../../components/material-text-field";
import { MaterialSelect } from "../../components/material-select";
import { Calendar, Plus, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";

const appointments = [
  { id: 1, date: "2026-02-24", time: "09:00", client: "María García", pet: "Max", species: "Perro", service: "Consulta médica", vet: "Dr. Rodríguez", location: "Surco", status: "confirmed" as const },
  { id: 2, date: "2026-02-24", time: "10:30", client: "Juan Pérez", pet: "Luna", species: "Gato", service: "Grooming", vet: "Groomer Ana", location: "Chorrillos", status: "pending" as const },
  { id: 3, date: "2026-02-24", time: "11:00", client: "Ana Torres", pet: "Rocky", species: "Perro", service: "Control", vet: "Dr. Martínez", location: "Surco", status: "confirmed" as const },
  { id: 4, date: "2026-02-24", time: "14:00", client: "Carlos Ruiz", pet: "Bella", species: "Perro", service: "Consulta médica", vet: "Dr. Rodríguez", location: "Surco", status: "pending" as const },
  { id: 5, date: "2026-02-24", time: "15:30", client: "Laura Flores", pet: "Milo", species: "Gato", service: "Vacunación", vet: "Dr. Martínez", location: "Chorrillos", status: "confirmed" as const },
  { id: 6, date: "2026-02-25", time: "09:00", client: "Pedro Silva", pet: "Toby", species: "Perro", service: "Grooming", vet: "Groomer Ana", location: "Surco", status: "confirmed" as const },
  { id: 7, date: "2026-02-25", time: "11:00", client: "Sofía Castro", pet: "Nala", species: "Gato", service: "Consulta médica", vet: "Dr. Rodríguez", location: "Chorrillos", status: "pending" as const },
  { id: 8, date: "2026-02-23", time: "14:00", client: "Luis Mendoza", pet: "Rex", species: "Perro", service: "Control", vet: "Dr. Martínez", location: "Surco", status: "completed" as const },
  { id: 9, date: "2026-02-23", time: "16:00", client: "Carmen Díaz", pet: "Cleo", species: "Gato", service: "Grooming", vet: "Groomer Ana", location: "Chorrillos", status: "cancelled" as const },
];

export function AgendaPage() {
  const [view, setView] = useState<"list" | "calendar">("list");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 24)); // Feb 24, 2026

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.pet.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || apt.status === filterStatus;
    const matchesLocation = filterLocation === "all" || apt.location === filterLocation;
    return matchesSearch && matchesStatus && matchesLocation;
  });

  const groupedByDate = filteredAppointments.reduce((acc, apt) => {
    if (!acc[apt.date]) acc[apt.date] = [];
    acc[apt.date].push(apt);
    return acc;
  }, {} as Record<string, typeof appointments>);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-PE', options);
  };

  const isToday = (dateStr: string) => {
    const today = new Date(2026, 1, 24); // Mock today
    const date = new Date(dateStr);
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Agenda / Citas</h1>
          <p className="text-muted-foreground">Gestiona las citas programadas</p>
        </div>
        <Link to="/staff/agenda/new">
          <MaterialButton>
            <Plus className="w-5 h-5" />
            Nueva Cita
          </MaterialButton>
        </Link>
      </div>

      {/* Filters */}
      <MaterialCard className="mb-6">
        <MaterialCardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <MaterialTextField
              placeholder="Buscar cliente o mascota..."
              startIcon={<Search className="w-5 h-5" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />
            <MaterialSelect
              options={[
                { value: "all", label: "Todos los estados" },
                { value: "pending", label: "Pendientes" },
                { value: "confirmed", label: "Confirmadas" },
                { value: "completed", label: "Finalizadas" },
                { value: "cancelled", label: "Canceladas" },
              ]}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              fullWidth
            />
            <MaterialSelect
              options={[
                { value: "all", label: "Todas las sedes" },
                { value: "Surco", label: "Surco" },
                { value: "Chorrillos", label: "Chorrillos" },
              ]}
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              fullWidth
            />
            <div className="flex gap-2">
              <MaterialButton
                variant={view === "list" ? "filled" : "outlined"}
                onClick={() => setView("list")}
                className="flex-1"
              >
                Lista
              </MaterialButton>
              <MaterialButton
                variant={view === "calendar" ? "filled" : "outlined"}
                onClick={() => setView("calendar")}
                className="flex-1"
              >
                <Calendar className="w-4 h-4" />
              </MaterialButton>
            </div>
          </div>
        </MaterialCardContent>
      </MaterialCard>

      {/* Results Count */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {filteredAppointments.length} cita(s) encontrada(s)
        </p>
      </div>

      {/* Appointments List */}
      <div className="space-y-6">
        {Object.keys(groupedByDate).sort().reverse().map((date) => (
          <div key={date}>
            <div className="mb-3 flex items-center gap-3">
              <h3 className="text-lg font-semibold capitalize">
                {formatDate(date)}
              </h3>
              {isToday(date) && (
                <MaterialChip label="Hoy" color="primary" size="sm" />
              )}
            </div>

            <div className="space-y-3">
              {groupedByDate[date].map((appointment) => (
                <Link key={appointment.id} to={`/staff/agenda/${appointment.id}`}>
                  <MaterialCard hoverable>
                    <MaterialCardContent className="py-4">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        {/* Time */}
                        <div className="flex-shrink-0">
                          <p className="text-2xl font-bold text-[#7cb342]">{appointment.time}</p>
                        </div>

                        {/* Divider */}
                        <div className="hidden sm:block h-12 w-px bg-border" />

                        {/* Info */}
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Cliente</p>
                            <p className="font-semibold">{appointment.client}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Mascota</p>
                            <p className="font-semibold">{appointment.pet}</p>
                            <p className="text-xs text-muted-foreground">{appointment.species}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Servicio</p>
                            <p className="font-semibold">{appointment.service}</p>
                            <p className="text-xs text-muted-foreground">{appointment.vet}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Sede</p>
                            <p className="font-semibold">{appointment.location}</p>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="flex-shrink-0">
                          <MaterialChip 
                            label={
                              appointment.status === "confirmed" ? "Confirmada" :
                              appointment.status === "pending" ? "Pendiente" :
                              appointment.status === "completed" ? "Finalizada" :
                              "Cancelada"
                            }
                            color={appointment.status}
                          />
                        </div>
                      </div>
                    </MaterialCardContent>
                  </MaterialCard>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredAppointments.length === 0 && (
        <MaterialCard>
          <MaterialCardContent className="py-12 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-semibold text-foreground mb-2">No hay citas</p>
            <p className="text-muted-foreground mb-6">
              No se encontraron citas con los filtros seleccionados
            </p>
            <Link to="/staff/agenda/new">
              <MaterialButton>
                <Plus className="w-5 h-5" />
                Crear nueva cita
              </MaterialButton>
            </Link>
          </MaterialCardContent>
        </MaterialCard>
      )}
    </div>
  );
}
