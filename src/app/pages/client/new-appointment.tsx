import { useState } from "react";
import { useNavigate } from "react-router";
import { MaterialCard, MaterialCardContent, MaterialCardHeader } from "../../components/material-card";
import { MaterialButton } from "../../components/material-button";
import { MaterialTextField } from "../../components/material-text-field";
import { MaterialSelect } from "../../components/material-select";
import { MaterialStepper } from "../../components/material-stepper";
import { Calendar, Heart, Briefcase, User, MapPin, CheckCircle2, Clock } from "lucide-react";
import { toast } from "sonner";
import { Calendar as CalendarComponent } from "../../components/ui/calendar";

const pets = [
  { value: "1", label: "Max - Perro Labrador" },
  { value: "2", label: "Luna - Gato Siamés" },
];

const services = [
  { value: "consulta", label: "Consulta médica", price: 80, duration: 30 },
  { value: "grooming", label: "Grooming", price: 120, duration: 60 },
  { value: "control", label: "Control", price: 50, duration: 20 },
  { value: "vacunacion", label: "Vacunación", price: 60, duration: 15 },
  { value: "cirugia", label: "Cirugía", price: 500, duration: 120 },
];

const locations = [
  { value: "surco", label: "Surco - Av. Primavera 1234" },
  { value: "chorrillos", label: "Chorrillos - Av. Huaylas 5678" },
];

const professionals = [
  { value: "dr_rodriguez", label: "Dr. Rodríguez - Veterinario" },
  { value: "dr_martinez", label: "Dr. Martínez - Veterinario" },
  { value: "groomer_ana", label: "Ana López - Groomer" },
];

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

const steps = [
  { label: "Mascota" },
  { label: "Servicio" },
  { label: "Ubicación" },
  { label: "Fecha y Hora" },
  { label: "Confirmar" },
];

export function ClientNewAppointmentPage() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedPet, setSelectedPet] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedProfessional, setSelectedProfessional] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [notes, setNotes] = useState("");

  const handleNext = () => {
    // Validations
    if (activeStep === 0 && !selectedPet) {
      toast.error("Por favor selecciona una mascota");
      return;
    }
    if (activeStep === 1 && !selectedService) {
      toast.error("Por favor selecciona un servicio");
      return;
    }
    if (activeStep === 2 && (!selectedLocation || !selectedProfessional)) {
      toast.error("Por favor selecciona una ubicación y profesional");
      return;
    }
    if (activeStep === 3 && (!selectedDate || !selectedTime)) {
      toast.error("Por favor selecciona fecha y hora");
      return;
    }

    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    toast.success("¡Cita solicitada exitosamente! Recibirás una confirmación pronto.");
    navigate("/client/appointments");
  };

  const selectedServiceData = services.find(s => s.value === selectedService);
  const selectedPetData = pets.find(p => p.value === selectedPet);
  const selectedLocationData = locations.find(l => l.value === selectedLocation);
  const selectedProfessionalData = professionals.find(p => p.value === selectedProfessional);

  return (
    <div className="p-4 md:p-6 max-w-[900px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Solicitar Cita</h1>
        <p className="text-muted-foreground">Agenda una nueva cita para tu mascota</p>
      </div>

      {/* Stepper */}
      <div className="mb-8">
        <MaterialStepper steps={steps} activeStep={activeStep} />
      </div>

      {/* Content */}
      <MaterialCard elevated>
        <MaterialCardContent className="p-6">
          {/* Step 0: Select Pet */}
          {activeStep === 0 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#7cb342]/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-[#7cb342]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Selecciona tu mascota</h3>
                  <p className="text-sm text-muted-foreground">¿Para quién es la cita?</p>
                </div>
              </div>

              <div className="grid gap-3">
                {pets.map((pet) => (
                  <button
                    key={pet.value}
                    onClick={() => setSelectedPet(pet.value)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedPet === pet.value
                        ? "border-[#7cb342] bg-[#7cb342]/5"
                        : "border-border hover:border-[#7cb342]/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#7cb342] text-white flex items-center justify-center font-bold">
                        {pet.label.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">{pet.label}</p>
                      </div>
                      {selectedPet === pet.value && (
                        <CheckCircle2 className="w-6 h-6 text-[#7cb342]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground mt-4">
                <p>
                  ¿No encuentras a tu mascota? Solicita agregar una nueva desde{" "}
                  <a href="/client/pets" className="text-[#7cb342] font-semibold underline">
                    Mis Mascotas
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* Step 1: Select Service */}
          {activeStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#42a5f5]/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-[#42a5f5]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Selecciona el servicio</h3>
                  <p className="text-sm text-muted-foreground">¿Qué necesitas?</p>
                </div>
              </div>

              <div className="grid gap-3">
                {services.map((service) => (
                  <button
                    key={service.value}
                    onClick={() => setSelectedService(service.value)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedService === service.value
                        ? "border-[#7cb342] bg-[#7cb342]/5"
                        : "border-border hover:border-[#7cb342]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-lg mb-1">{service.label}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {service.duration} min
                          </span>
                          <span className="font-bold text-[#7cb342]">S/ {service.price}</span>
                        </div>
                      </div>
                      {selectedService === service.value && (
                        <CheckCircle2 className="w-6 h-6 text-[#7cb342]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Location and Professional */}
          {activeStep === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#fdd835]/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#fdd835]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Ubicación y Profesional</h3>
                  <p className="text-sm text-muted-foreground">¿Dónde y con quién?</p>
                </div>
              </div>

              <MaterialSelect
                label="Sede"
                options={locations}
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              />

              <MaterialSelect
                label="Profesional"
                options={professionals}
                value={selectedProfessional}
                onChange={(e) => setSelectedProfessional(e.target.value)}
              />
            </div>
          )}

          {/* Step 3: Select Date and Time */}
          {activeStep === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#ef5350]/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#ef5350]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Fecha y Hora</h3>
                  <p className="text-sm text-muted-foreground">¿Cuándo te gustaría la cita?</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-3">Selecciona una fecha</p>
                <div className="flex justify-center">
                  <CalendarComponent
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    className="rounded-xl border"
                  />
                </div>
              </div>

              {selectedDate && (
                <div>
                  <p className="text-sm font-semibold mb-3">Selecciona un horario</p>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg border-2 transition-all font-semibold text-sm ${
                          selectedTime === time
                            ? "border-[#7cb342] bg-[#7cb342]/5 text-[#7cb342]"
                            : "border-border hover:border-[#7cb342]/50"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Confirm */}
          {activeStep === 4 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#7cb342]/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-[#7cb342]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Confirmar Cita</h3>
                  <p className="text-sm text-muted-foreground">Revisa los detalles de tu cita</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Mascota</p>
                      <p className="font-semibold">{selectedPetData?.label}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Servicio</p>
                      <p className="font-semibold">{selectedServiceData?.label}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Sede</p>
                      <p className="font-semibold">{selectedLocationData?.label}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Profesional</p>
                      <p className="font-semibold">{selectedProfessionalData?.label}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Fecha</p>
                      <p className="font-semibold">
                        {selectedDate?.toLocaleDateString('es-PE', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Hora</p>
                      <p className="font-semibold">{selectedTime}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#7cb342]/10 border border-[#7cb342]/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold mb-1">Costo del servicio</p>
                      <p className="text-xs text-muted-foreground">
                        Duración: {selectedServiceData?.duration} minutos
                      </p>
                    </div>
                    <p className="text-3xl font-bold text-[#7cb342]">
                      S/ {selectedServiceData?.price}
                    </p>
                  </div>
                </div>

                <MaterialTextField
                  label="Notas adicionales (opcional)"
                  placeholder="Alguna información importante que debamos saber..."
                  multiline
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />

                <div className="p-3 bg-muted rounded-lg text-sm text-muted-foreground">
                  <p>
                    Al confirmar, enviarás una solicitud de cita. El personal de El Mascotario 
                    revisará tu solicitud y te enviará una confirmación.
                  </p>
                </div>
              </div>
            </div>
          )}
        </MaterialCardContent>
      </MaterialCard>

      {/* Navigation Buttons */}
      <div className="flex gap-3 mt-6">
        <MaterialButton
          variant="outlined"
          onClick={handleBack}
          disabled={activeStep === 0}
          className="flex-1"
        >
          Atrás
        </MaterialButton>
        <MaterialButton
          variant="filled"
          onClick={handleNext}
          className="flex-1"
        >
          {activeStep === steps.length - 1 ? "Confirmar cita" : "Siguiente"}
        </MaterialButton>
      </div>
    </div>
  );
}
