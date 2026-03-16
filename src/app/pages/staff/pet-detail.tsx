import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { MaterialCard, MaterialCardContent, MaterialCardHeader } from "../../components/material-card";
import { MaterialButton } from "../../components/material-button";
import { MaterialChip } from "../../components/material-chip";
import { ArrowLeft, Edit2, Heart, User, Calendar, Syringe, FileText, Phone, Mail } from "lucide-react";
import { Switch } from "../../components/ui/switch";
import { toast } from "sonner";

export function PetDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isActive, setIsActive] = useState(true);

  // Mock data
  const pet = {
    id: id,
    name: "Max",
    species: "Perro",
    breed: "Golden Retriever",
    age: "3 años",
    birthDate: "2021-03-15",
    gender: "Macho",
    weight: "12 kg",
    color: "Dorado",
    microchip: "123456789012345",
    allergies: "Ninguna conocida",
    notes: "Muy activo y sociable",
    owner: {
      name: "María García",
      phone: "987654321",
      email: "maria@ejemplo.com",
      address: "Av. Principal 123, Chorrillos",
    },
    vaccines: [
      { id: 1, name: "Séxtuple", date: "2024-02-15", nextDate: "2025-02-15", veterinarian: "Dr. Carlos Méndez" },
      { id: 2, name: "Antirrábica", date: "2023-08-10", nextDate: "2024-08-10", veterinarian: "Dr. Carlos Méndez" },
    ],
    medicalRecords: [
      { id: 1, date: "2024-03-10", type: "Consulta", diagnosis: "Infección respiratoria leve", veterinarian: "Dr. Carlos Méndez" },
      { id: 2, date: "2024-02-15", type: "Vacunación", diagnosis: "Vacuna Séxtuple", veterinarian: "Dr. Carlos Méndez" },
      { id: 3, date: "2024-01-20", type: "Control", diagnosis: "Control de rutina", veterinarian: "Dra. Sofía Torres" },
    ],
    appointments: [
      { id: 1, date: "2024-03-20", time: "10:00", service: "Control de Rutina", status: "Confirmada" },
    ],
  };

  const handleToggleActive = () => {
    setIsActive(!isActive);
    toast.success(isActive ? "Mascota desactivada" : "Mascota reactivada");
  };

  return (
    <div className="p-4 md:p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/staff/pets")}
          className="inline-flex items-center gap-2 text-[#7cb342] hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Mascotas
        </button>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-2xl bg-[#7cb342] text-white flex items-center justify-center text-3xl font-bold">
              {pet.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{pet.name}</h1>
                <MaterialChip
                  label={isActive ? "Activa" : "Inactiva"}
                  color={isActive ? "success" : "default"}
                />
              </div>
              <p className="text-muted-foreground">{pet.species} • {pet.breed} • {pet.age}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <MaterialButton
              variant="outlined"
              onClick={() => navigate(`/staff/pets/${id}/edit`)}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Editar
            </MaterialButton>
            <MaterialButton
              variant="outlined"
              onClick={() => navigate(`/staff/medical-history?pet=${id}`)}
            >
              <FileText className="w-4 h-4 mr-2" />
              Historia clínica
            </MaterialButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <MaterialCard elevated>
            <MaterialCardHeader>
              <div className="flex items-center justify-between w-full">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Información General
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {isActive ? "Desactivar" : "Reactivar"}
                  </span>
                  <Switch
                    checked={isActive}
                    onCheckedChange={handleToggleActive}
                  />
                </div>
              </div>
            </MaterialCardHeader>
            <MaterialCardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Especie</p>
                  <p className="font-semibold">{pet.species}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Raza</p>
                  <p className="font-semibold">{pet.breed}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Sexo</p>
                  <p className="font-semibold">{pet.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Fecha de nacimiento</p>
                  <p className="font-semibold">{new Date(pet.birthDate).toLocaleDateString('es-ES')}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Edad</p>
                  <p className="font-semibold">{pet.age}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Peso actual</p>
                  <p className="font-semibold">{pet.weight}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Color</p>
                  <p className="font-semibold">{pet.color}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-muted-foreground mb-1">Microchip</p>
                  <p className="font-semibold font-mono">{pet.microchip}</p>
                </div>
                <div className="col-span-2 md:col-span-3">
                  <p className="text-sm text-muted-foreground mb-1">Alergias</p>
                  <p className="font-semibold">{pet.allergies}</p>
                </div>
                <div className="col-span-2 md:col-span-3">
                  <p className="text-sm text-muted-foreground mb-1">Notas</p>
                  <p className="text-sm">{pet.notes}</p>
                </div>
              </div>
            </MaterialCardContent>
          </MaterialCard>

          {/* Medical History Summary */}
          <MaterialCard elevated>
            <MaterialCardHeader>
              <div className="flex items-center justify-between w-full">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Historial Médico Reciente
                </h2>
                <MaterialButton
                  variant="text"
                  size="sm"
                  onClick={() => navigate(`/staff/medical-history?pet=${id}`)}
                >
                  Ver todo
                </MaterialButton>
              </div>
            </MaterialCardHeader>
            <MaterialCardContent>
              <div className="space-y-3">
                {pet.medicalRecords.map((record) => (
                  <div key={record.id} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-10 h-10 rounded-lg bg-[#7cb342]/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-[#7cb342]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-semibold">{record.type}</p>
                        <span className="text-sm text-muted-foreground">
                          {new Date(record.date).toLocaleDateString('es-ES')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{record.diagnosis}</p>
                      <p className="text-xs text-muted-foreground">{record.veterinarian}</p>
                    </div>
                  </div>
                ))}
              </div>
            </MaterialCardContent>
          </MaterialCard>

          {/* Upcoming Appointments */}
          <MaterialCard elevated>
            <MaterialCardHeader>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Próximas Citas
              </h2>
            </MaterialCardHeader>
            <MaterialCardContent>
              <div className="space-y-3">
                {pet.appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-semibold">{appointment.service}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(appointment.date).toLocaleDateString('es-ES')} • {appointment.time}
                      </p>
                    </div>
                    <MaterialChip label={appointment.status} color="primary" />
                  </div>
                ))}
              </div>
            </MaterialCardContent>
          </MaterialCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Owner Information */}
          <MaterialCard elevated>
            <MaterialCardHeader>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5" />
                Dueño
              </h2>
            </MaterialCardHeader>
            <MaterialCardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Nombre</p>
                  <p className="font-semibold">{pet.owner.name}</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <a href={`tel:${pet.owner.phone}`} className="text-[#7cb342] hover:underline">
                    {pet.owner.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <a href={`mailto:${pet.owner.email}`} className="text-[#7cb342] hover:underline">
                    {pet.owner.email}
                  </a>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Dirección</p>
                  <p className="text-sm">{pet.owner.address}</p>
                </div>
                <MaterialButton
                  variant="outlined"
                  fullWidth
                  size="sm"
                  onClick={() => navigate(`/staff/clients/${pet.owner.name}`)}
                >
                  Ver perfil completo
                </MaterialButton>
              </div>
            </MaterialCardContent>
          </MaterialCard>

          {/* Vaccines */}
          <MaterialCard elevated>
            <MaterialCardHeader>
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Syringe className="w-5 h-5" />
                Vacunas
              </h2>
            </MaterialCardHeader>
            <MaterialCardContent>
              <div className="space-y-3">
                {pet.vaccines.map((vaccine) => {
                  const isUpcoming = new Date(vaccine.nextDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                  return (
                    <div
                      key={vaccine.id}
                      className={`p-3 rounded-lg border-2 ${
                        isUpcoming ? 'border-[#fdd835] bg-[#fdd835]/10' : 'border-border bg-muted'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-semibold">{vaccine.name}</p>
                        {isUpcoming && (
                          <MaterialChip label="Próxima" color="warning" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Última: {new Date(vaccine.date).toLocaleDateString('es-ES')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Próxima: {new Date(vaccine.nextDate).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  );
                })}
              </div>
            </MaterialCardContent>
          </MaterialCard>
        </div>
      </div>
    </div>
  );
}
