import { useState } from "react";
import { useNavigate } from "react-router";
import { MaterialCard, MaterialCardContent } from "../../components/material-card";
import { MaterialButton } from "../../components/material-button";
import { MaterialTextField } from "../../components/material-text-field";
import { MaterialSelect } from "../../components/material-select";
import { MaterialStepper } from "../../components/material-stepper";
import { Search, ArrowLeft, ArrowRight, Check, MapPin, User, Heart, Scissors } from "lucide-react";
import { toast } from "sonner";

const steps = [
  { label: "Sede", description: "Seleccionar sede" },
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

const mockServices = [
  { id: 1, name: "Consulta General", category: "consulta", duration: "60 min", price: "S/ 80" },
  { id: 2, name: "Grooming Básico", category: "grooming", duration: "120 min", price: "S/ 60" },
  { id: 3, name: "Vacunación", category: "vacuna", duration: "30 min", price: "S/ 50" },
  { id: 4, name: "Control de Rutina", category: "control", duration: "45 min", price: "S/ 60" },
];

export function NewAppointmentPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    location: "",
    client: "",
    pet: "",
    service: "",
    professional: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleNext = () => {
    // Validaciones por paso
    if (activeStep === 0 && !formData.location) {
      toast.error("Por favor selecciona una sede");
      return;
    }
    if (activeStep === 1 && !formData.client) {
      toast.error("Por favor selecciona un cliente");
      return;
    }
    if (activeStep === 2 && !formData.pet) {
      toast.error("Por favor selecciona una mascota");
      return;
    }
    if (activeStep === 3 && !formData.service) {
      toast.error("Por favor selecciona un servicio");
      return;
    }
    if (activeStep === 4 && (!formData.date || !formData.time)) {
      toast.error("Por favor selecciona fecha y hora");
      return;
    }

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
  const selectedService = mockServices.find(s => s.id === Number(formData.service));

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
          {/* Step 0: Location */}
          {activeStep === 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#7cb342]/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#7cb342]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Seleccionar Sede</h3>
                  <p className="text-sm text-muted-foreground">Elige la sede donde se realizará la atención</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, location: "chorrillos" })}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    formData.location === "chorrillos"
                      ? "border-[#7cb342] bg-[#7cb342]/10"
                      : "border-border hover:border-[#7cb342]/50"
                  }`}
                >
                  <h4 className="text-lg font-semibold mb-2">Sede Chorrillos</h4>
                  <p className="text-sm text-muted-foreground mb-3">Av. Principal 123, Chorrillos</p>
                  <p className="text-xs text-muted-foreground">Horario: L-V 9:00-18:00, S 9:00-14:00</p>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, location: "surco" })}
                  className={`p-6 rounded-xl border-2 transition-all text-left ${
                    formData.location === "surco"
                      ? "border-[#7cb342] bg-[#7cb342]/10"
                      : "border-border hover:border-[#7cb342]/50"
                  }`}
                >
                  <h4 className="text-lg font-semibold mb-2">Sede Surco / Barranco</h4>
                  <p className="text-sm text-muted-foreground mb-3">Calle Los Olivos 456, Surco</p>
                  <p className="text-xs text-muted-foreground">Horario: L-V 10:00-19:00, S 10:00-15:00</p>
                </button>
              </div>
            </div>
          )}

          {/* Step 1: Client */}
          {activeStep === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#42a5f5]/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-[#42a5f5]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Seleccionar Cliente</h3>
                  <p className="text-sm text-muted-foreground">Busca y selecciona al dueño de la mascota</p>
                </div>
              </div>
              
              <MaterialTextField
                placeholder="Buscar por nombre, teléfono o email..."
                startIcon={<Search className="w-5 h-5" />}
                fullWidth
              />

              <div className="space-y-3">
                {mockClients.map((client) => (
                  <button
                    key={client.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, client: client.id.toString(), pet: "" })}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      formData.client === client.id.toString()
                        ? "border-[#42a5f5] bg-[#42a5f5]/10"
                        : "border-border hover:border-[#42a5f5]/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#42a5f5] text-white flex items-center justify-center font-semibold">
                        {client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.phone} • {client.email}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Pet */}
          {activeStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#ef5350]/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#ef5350]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Seleccionar Mascota</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedClient ? `Mascotas de ${selectedClient.name}` : "Selecciona una mascota"}
                  </p>
                </div>
              </div>

              {filteredPets.length > 0 ? (
                <div className="space-y-3">
                  {filteredPets.map((pet) => (
                    <button
                      key={pet.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, pet: pet.id.toString() })}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        formData.pet === pet.id.toString()
                          ? "border-[#ef5350] bg-[#ef5350]/10"
                          : "border-border hover:border-[#ef5350]/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#ef5350] text-white flex items-center justify-center font-semibold">
                          {pet.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold">{pet.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {pet.species} • {pet.breed} • {pet.age}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Este cliente no tiene mascotas registradas</p>
                  <MaterialButton variant="text" className="mt-4">
                    + Registrar nueva mascota
                  </MaterialButton>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Service */}
          {activeStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#7cb342]/10 flex items-center justify-center">
                  <Scissors className="w-6 h-6 text-[#7cb342]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Seleccionar Servicio</h3>
                  <p className="text-sm text-muted-foreground">Elige el tipo de atención</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockServices.map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, service: service.id.toString() })}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      formData.service === service.id.toString()
                        ? "border-[#7cb342] bg-[#7cb342]/10"
                        : "border-border hover:border-[#7cb342]/50"
                    }`}
                  >
                    <h4 className="font-semibold mb-2">{service.name}</h4>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{service.duration}</span>
                      <span className="font-semibold text-[#7cb342]">{service.price}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-4">
                <MaterialSelect
                  label="Profesional asignado"
                  fullWidth
                  options={[
                    { value: "", label: "Seleccionar..." },
                    { value: "1", label: "Dr. Carlos Méndez" },
                    { value: "2", label: "Dra. Sofía Torres" },
                    { value: "3", label: "Juan Pérez (Groomer)" },
                  ]}
                  value={formData.professional}
                  onChange={(e) => setFormData({ ...formData, professional: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Step 4: Date and Time */}
          {activeStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Fecha y Hora</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    { value: "", label: "Seleccionar..." },
                    { value: "09:00", label: "09:00 AM" },
                    { value: "10:00", label: "10:00 AM" },
                    { value: "11:00", label: "11:00 AM" },
                    { value: "12:00", label: "12:00 PM" },
                    { value: "14:00", label: "02:00 PM" },
                    { value: "15:00", label: "03:00 PM" },
                    { value: "16:00", label: "04:00 PM" },
                  ]}
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>

              <MaterialTextField
                label="Notas adicionales (opcional)"
                placeholder="Motivo de la consulta, observaciones..."
                fullWidth
                multiline
                rows={4}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          )}

          {/* Step 5: Confirmation */}
          {activeStep === 5 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Confirmar Cita</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Sede</p>
                  <p className="font-semibold">
                    {formData.location === "chorrillos" ? "Sede Chorrillos" : "Sede Surco / Barranco"}
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Cliente</p>
                  <p className="font-semibold">{selectedClient?.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedClient?.phone}</p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Mascota</p>
                  <p className="font-semibold">{selectedPet?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedPet?.species} • {selectedPet?.breed}
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Servicio</p>
                  <p className="font-semibold">{selectedService?.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedService?.duration} • {selectedService?.price}
                  </p>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Fecha y Hora</p>
                  <p className="font-semibold">
                    {formData.date && new Date(formData.date + 'T00:00:00').toLocaleDateString('es-ES', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">{formData.time}</p>
                </div>

                {formData.notes && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Notas</p>
                    <p className="text-sm">{formData.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </MaterialCardContent>
      </MaterialCard>

      {/* Navigation Buttons */}
      <div className="mt-6 flex justify-between">
        <MaterialButton
          variant="outlined"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Anterior
        </MaterialButton>

        {activeStep < steps.length - 1 ? (
          <MaterialButton onClick={handleNext}>
            Siguiente
            <ArrowRight className="w-4 h-4 ml-2" />
          </MaterialButton>
        ) : (
          <MaterialButton onClick={handleSubmit}>
            <Check className="w-4 h-4 mr-2" />
            Confirmar cita
          </MaterialButton>
        )}
      </div>
    </div>
  );
}
