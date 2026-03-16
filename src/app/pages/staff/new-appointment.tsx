import { useState } from "react";
import { useNavigate } from "react-router";
import { MaterialCard, MaterialCardContent } from "../../components/material-card";
import { MaterialButton } from "../../components/material-button";
import { MaterialTextField } from "../../components/material-text-field";
import { MaterialSelect } from "../../components/material-select";
import { MaterialStepper } from "../../components/material-stepper";
import { Search, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";

const steps = [
  { label: "Cliente", description: "Seleccionar cliente" },
  { label: "Mascota", description: "Elegir mascota" },
  { label: "Servicio", description: "Tipo de servicio" },
  { label: "Fecha y Hora", description: "Agendar" },
  { label: "Confirmación", description: "Revisar" },
];

const mockClients = [
  { id: 1, name: "María García", phone: "987654321", email: "maria@ejemplo.com" },
  { id: 2, name: "Juan Pérez", phone: "987654322", email: "juan@ejemplo.com" },
  { id: 3, name: "Ana Torres", phone: "987654323", email: "ana@ejemplo.com" },
];

const mockPets = [
  { id: 1, clientId: 1, name: "Max", species: "Perro", breed: "Labrador", age: "3 años" },
  { id: 2, clientId: 1, name: "Luna", species: "Gato", breed: "Siamés", age: "2 años" },
  { id: 3, clientId: 2, name: "Rocky", species: "Perro", breed: "Golden Retriever", age: "5 años" },
];

export function NewAppointmentPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    client: "",
    pet: "",
    service: "",
    professional: "",
    location: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleSubmit = () => {
    toast.success("Cita creada exitosamente");
    navigate("/staff/agenda");
  };

  const selectedClient = mockClients.find(c => c.id === Number(formData.client));
  const filteredPets = mockPets.filter(p => p.clientId === Number(formData.client));
  const selectedPet = mockPets.find(p => p.id === Number(formData.pet));

  return (
    <div className="p-4 md:p-6 max-w-[1000px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/staff/agenda")}
          className="inline-flex items-center gap-2 text-[#7cb342] hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Agenda
        </button>
        <h1 className="text-3xl font-bold text-foreground mb-2">Nueva Cita</h1>
        <p className="text-muted-foreground">Completa los siguientes pasos para agendar una cita</p>
      </div>

      {/* Stepper */}
      <div className="mb-8">
        <MaterialStepper steps={steps} activeStep={activeStep} />
      </div>

      {/* Form Steps */}
      <MaterialCard>
        <MaterialCardContent className="p-6">
          {/* Step 1: Client */}
          {activeStep === 0 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Seleccionar Cliente</h3>
              
              <MaterialTextField
                placeholder="Buscar por nombre, teléfono o email..."
                startIcon={<Search className="w-5 h-5" />}
                fullWidth
              />

              <div className="space-y-3">
                {mockClients.map((client) => (
                  <label
                    key={client.id}
                    className={`
                      block p-4 border-2 rounded-xl cursor-pointer transition-all
                      ${formData.client === String(client.id)
                        ? "border-[#7cb342] bg-[#7cb342]/5"
                        : "border-border hover:border-[#7cb342]/50"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="client"
                      value={client.id}
                      checked={formData.client === String(client.id)}
                      onChange={(e) => setFormData({ ...formData, client: e.target.value, pet: "" })}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.phone} • {client.email}</p>
                      </div>
                      {formData.client === String(client.id) && (
                        <Check className="w-5 h-5 text-[#7cb342]" />
                      )}
                    </div>
                  </label>
                ))}
              </div>

              <MaterialButton variant="outlined" fullWidth>
                + Crear nuevo cliente
              </MaterialButton>
            </div>
          )}

          {/* Step 2: Pet */}
          {activeStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Seleccionar Mascota</h3>
              
              <div className="p-4 bg-muted rounded-xl">
                <p className="text-sm text-muted-foreground mb-1">Cliente seleccionado:</p>
                <p className="font-semibold">{selectedClient?.name}</p>
              </div>

              <div className="space-y-3">
                {filteredPets.map((pet) => (
                  <label
                    key={pet.id}
                    className={`
                      block p-4 border-2 rounded-xl cursor-pointer transition-all
                      ${formData.pet === String(pet.id)
                        ? "border-[#7cb342] bg-[#7cb342]/5"
                        : "border-border hover:border-[#7cb342]/50"
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="pet"
                      value={pet.id}
                      checked={formData.pet === String(pet.id)}
                      onChange={(e) => setFormData({ ...formData, pet: e.target.value })}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-foreground">{pet.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {pet.species} • {pet.breed} • {pet.age}
                        </p>
                      </div>
                      {formData.pet === String(pet.id) && (
                        <Check className="w-5 h-5 text-[#7cb342]" />
                      )}
                    </div>
                  </label>
                ))}
              </div>

              <MaterialButton variant="outlined" fullWidth>
                + Registrar nueva mascota
              </MaterialButton>
            </div>
          )}

          {/* Step 3: Service */}
          {activeStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Detalles del Servicio</h3>

              <MaterialSelect
                label="Tipo de Servicio"
                fullWidth
                options={[
                  { value: "", label: "Selecciona un servicio" },
                  { value: "consulta", label: "Consulta médica" },
                  { value: "grooming", label: "Grooming" },
                  { value: "control", label: "Control" },
                  { value: "vacunacion", label: "Vacunación" },
                  { value: "cirugia", label: "Cirugía" },
                ]}
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              />

              <MaterialSelect
                label="Profesional"
                fullWidth
                options={[
                  { value: "", label: "Selecciona un profesional" },
                  { value: "dr_rodriguez", label: "Dr. Rodríguez (Veterinario)" },
                  { value: "dr_martinez", label: "Dr. Martínez (Veterinario)" },
                  { value: "groomer_ana", label: "Ana López (Groomer)" },
                ]}
                value={formData.professional}
                onChange={(e) => setFormData({ ...formData, professional: e.target.value })}
              />

              <MaterialSelect
                label="Sede"
                fullWidth
                options={[
                  { value: "", label: "Selecciona una sede" },
                  { value: "surco", label: "Surco" },
                  { value: "chorrillos", label: "Chorrillos" },
                ]}
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>
          )}

          {/* Step 4: Date & Time */}
          {activeStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Fecha y Hora</h3>

              <MaterialTextField
                label="Fecha"
                type="date"
                fullWidth
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />

              <MaterialSelect
                label="Hora"
                fullWidth
                options={[
                  { value: "", label: "Selecciona una hora" },
                  { value: "09:00", label: "09:00 AM" },
                  { value: "10:00", label: "10:00 AM" },
                  { value: "11:00", label: "11:00 AM" },
                  { value: "14:00", label: "02:00 PM" },
                  { value: "15:00", label: "03:00 PM" },
                  { value: "16:00", label: "04:00 PM" },
                  { value: "17:00", label: "05:00 PM" },
                ]}
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />

              <MaterialTextField
                label="Notas adicionales (opcional)"
                placeholder="Agrega cualquier información relevante..."
                fullWidth
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          )}

          {/* Step 5: Confirmation */}
          {activeStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Confirmación</h3>

              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Cliente</p>
                  <p className="font-semibold">{selectedClient?.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedClient?.phone}</p>
                </div>

                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Mascota</p>
                  <p className="font-semibold">{selectedPet?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedPet?.species} • {selectedPet?.breed}
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Servicio</p>
                  <p className="font-semibold capitalize">{formData.service}</p>
                  <p className="text-sm text-muted-foreground capitalize">{formData.professional.replace("_", " ")}</p>
                </div>

                <div className="p-4 bg-muted rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Fecha y Hora</p>
                  <p className="font-semibold">{formData.date} a las {formData.time}</p>
                  <p className="text-sm text-muted-foreground capitalize">Sede {formData.location}</p>
                </div>

                {formData.notes && (
                  <div className="p-4 bg-muted rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1">Notas</p>
                    <p>{formData.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </MaterialCardContent>
      </MaterialCard>

      {/* Navigation Buttons */}
      <div className="mt-6 flex items-center justify-between">
        <MaterialButton
          variant="text"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          <ArrowLeft className="w-4 h-4" />
          Anterior
        </MaterialButton>

        {activeStep < steps.length - 1 ? (
          <MaterialButton onClick={handleNext}>
            Siguiente
            <ArrowRight className="w-4 h-4" />
          </MaterialButton>
        ) : (
          <MaterialButton onClick={handleSubmit}>
            <Check className="w-4 h-4" />
            Crear Cita
          </MaterialButton>
        )}
      </div>
    </div>
  );
}
