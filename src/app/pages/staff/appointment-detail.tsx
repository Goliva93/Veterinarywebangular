import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { MaterialCard, MaterialCardContent, MaterialCardHeader, MaterialCardActions } from "../../components/material-card";
import { MaterialButton } from "../../components/material-button";
import { MaterialChip } from "../../components/material-chip";
import { MaterialDialog, MaterialDialogContent, MaterialDialogActions } from "../../components/material-dialog";
import { MaterialTextField } from "../../components/material-text-field";
import { MaterialSelect } from "../../components/material-select";
import { ArrowLeft, Calendar, User, Heart, MapPin, Clock, FileText, DollarSign, CheckCircle2, XCircle, Edit, Upload } from "lucide-react";
import { toast } from "sonner";

export function AppointmentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [paymentData, setPaymentData] = useState({
    amount: "",
    method: "yape",
    reference: "",
  });

  // Mock data
  const appointment = {
    id: id,
    date: "2026-02-24",
    time: "09:00",
    client: {
      name: "María García",
      phone: "987654321",
      email: "maria@ejemplo.com",
      address: "Av. Principal 123, Surco",
    },
    pet: {
      name: "Max",
      species: "Perro",
      breed: "Labrador",
      age: "3 años",
      weight: "28 kg",
    },
    service: "Consulta médica",
    professional: "Dr. Rodríguez",
    location: "Surco",
    status: "confirmed" as const,
    notes: "Primera consulta del mes",
    payment: {
      status: "unpaid",
      amount: null,
    },
    timeline: [
      { date: "2026-02-20 10:30", action: "Cita creada", user: "Recepción" },
      { date: "2026-02-20 14:15", action: "Cita confirmada", user: "Sistema" },
    ],
  };

  const handleConfirmPayment = () => {
    toast.success("Pago registrado exitosamente");
    setShowPaymentDialog(false);
  };

  const handleCancelAppointment = () => {
    toast.success("Cita cancelada");
    setShowCancelDialog(false);
    navigate("/staff/agenda");
  };

  const handleCompleteAppointment = () => {
    toast.success("Cita marcada como finalizada");
    navigate("/staff/agenda");
  };

  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/staff/agenda")}
          className="inline-flex items-center gap-2 text-[#7cb342] hover:underline mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a Agenda
        </button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Detalle de Cita</h1>
            <p className="text-muted-foreground">Cita #{appointment.id}</p>
          </div>
          <MaterialChip 
            label={appointment.status === "confirmed" ? "Confirmada" : "Pendiente"}
            color={appointment.status}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Date & Time */}
          <MaterialCard>
            <MaterialCardHeader>
              <h3 className="text-lg font-semibold">Fecha y Hora</h3>
            </MaterialCardHeader>
            <MaterialCardContent>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#7cb342]/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#7cb342]" />
                </div>
                <div>
                  <p className="font-semibold text-lg">{appointment.date}</p>
                  <p className="text-muted-foreground">{appointment.time} - Sede {appointment.location}</p>
                </div>
              </div>
            </MaterialCardContent>
          </MaterialCard>

          {/* Client Info */}
          <MaterialCard>
            <MaterialCardHeader>
              <h3 className="text-lg font-semibold">Información del Cliente</h3>
            </MaterialCardHeader>
            <MaterialCardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold">{appointment.client.name}</p>
                    <p className="text-sm text-muted-foreground">{appointment.client.phone}</p>
                    <p className="text-sm text-muted-foreground">{appointment.client.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <p className="text-sm text-muted-foreground">{appointment.client.address}</p>
                </div>
              </div>
            </MaterialCardContent>
          </MaterialCard>

          {/* Pet Info */}
          <MaterialCard>
            <MaterialCardHeader>
              <h3 className="text-lg font-semibold">Información de la Mascota</h3>
            </MaterialCardHeader>
            <MaterialCardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Nombre</p>
                  <p className="font-semibold">{appointment.pet.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Especie</p>
                  <p className="font-semibold">{appointment.pet.species}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Raza</p>
                  <p className="font-semibold">{appointment.pet.breed}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Edad</p>
                  <p className="font-semibold">{appointment.pet.age}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Peso</p>
                  <p className="font-semibold">{appointment.pet.weight}</p>
                </div>
              </div>
              <MaterialButton variant="outlined" className="mt-4" size="sm">
                Ver historia clínica
              </MaterialButton>
            </MaterialCardContent>
          </MaterialCard>

          {/* Service Info */}
          <MaterialCard>
            <MaterialCardHeader>
              <h3 className="text-lg font-semibold">Servicio</h3>
            </MaterialCardHeader>
            <MaterialCardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tipo de servicio</p>
                  <p className="font-semibold">{appointment.service}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Profesional asignado</p>
                  <p className="font-semibold">{appointment.professional}</p>
                </div>
                {appointment.notes && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Notas</p>
                    <p className="text-sm">{appointment.notes}</p>
                  </div>
                )}
              </div>
            </MaterialCardContent>
          </MaterialCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <MaterialCard>
            <MaterialCardHeader>
              <h3 className="text-lg font-semibold">Acciones</h3>
            </MaterialCardHeader>
            <MaterialCardContent className="space-y-2">
              {appointment.status === "confirmed" && (
                <MaterialButton fullWidth onClick={handleCompleteAppointment}>
                  <CheckCircle2 className="w-4 h-4" />
                  Marcar como finalizada
                </MaterialButton>
              )}
              <MaterialButton variant="outlined" fullWidth>
                <Edit className="w-4 h-4" />
                Reprogramar
              </MaterialButton>
              <MaterialButton 
                variant="outlined" 
                color="error" 
                fullWidth
                onClick={() => setShowCancelDialog(true)}
              >
                <XCircle className="w-4 h-4" />
                Cancelar cita
              </MaterialButton>
            </MaterialCardContent>
          </MaterialCard>

          {/* Payment */}
          <MaterialCard>
            <MaterialCardHeader>
              <h3 className="text-lg font-semibold">Pago</h3>
            </MaterialCardHeader>
            <MaterialCardContent>
              {appointment.payment.status === "unpaid" ? (
                <div className="text-center py-4">
                  <DollarSign className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-4">
                    No se ha registrado un pago
                  </p>
                  <MaterialButton 
                    variant="outlined" 
                    fullWidth
                    onClick={() => setShowPaymentDialog(true)}
                  >
                    Registrar pago
                  </MaterialButton>
                </div>
              ) : (
                <div>
                  <p className="text-2xl font-bold text-[#7cb342] mb-2">
                    S/ {appointment.payment.amount}
                  </p>
                  <MaterialChip label="Pagado" color="confirmed" size="sm" />
                </div>
              )}
            </MaterialCardContent>
          </MaterialCard>

          {/* Timeline */}
          <MaterialCard>
            <MaterialCardHeader>
              <h3 className="text-lg font-semibold">Historial</h3>
            </MaterialCardHeader>
            <MaterialCardContent>
              <div className="space-y-3">
                {appointment.timeline.map((event, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-2 h-2 rounded-full bg-[#7cb342]" />
                      {index < appointment.timeline.length - 1 && (
                        <div className="w-px h-full bg-border mt-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-3">
                      <p className="text-sm font-semibold">{event.action}</p>
                      <p className="text-xs text-muted-foreground">{event.user}</p>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </MaterialCardContent>
          </MaterialCard>
        </div>
      </div>

      {/* Payment Dialog */}
      <MaterialDialog
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        title="Registrar Pago"
        description="Completa los datos del pago para esta cita"
        maxWidth="sm"
      >
        <MaterialDialogContent>
          <div className="space-y-4">
            <MaterialTextField
              label="Monto"
              type="number"
              placeholder="0.00"
              fullWidth
              startIcon={<DollarSign className="w-5 h-5" />}
              value={paymentData.amount}
              onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
            />
            <MaterialSelect
              label="Método de pago"
              fullWidth
              options={[
                { value: "yape", label: "Yape" },
                { value: "qr", label: "QR" },
                { value: "efectivo", label: "Efectivo" },
                { value: "tarjeta", label: "Tarjeta" },
              ]}
              value={paymentData.method}
              onChange={(e) => setPaymentData({ ...paymentData, method: e.target.value })}
            />
            <MaterialTextField
              label="Referencia / Observación"
              placeholder="Número de operación..."
              fullWidth
              value={paymentData.reference}
              onChange={(e) => setPaymentData({ ...paymentData, reference: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium mb-2">
                Evidencia de pago (opcional)
              </label>
              <MaterialButton variant="outlined" fullWidth>
                <Upload className="w-4 h-4" />
                Subir imagen
              </MaterialButton>
            </div>
          </div>
        </MaterialDialogContent>
        <MaterialDialogActions>
          <MaterialButton variant="text" onClick={() => setShowPaymentDialog(false)}>
            Cancelar
          </MaterialButton>
          <MaterialButton onClick={handleConfirmPayment}>
            Confirmar pago
          </MaterialButton>
        </MaterialDialogActions>
      </MaterialDialog>

      {/* Cancel Dialog */}
      <MaterialDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        title="Cancelar Cita"
        description="Confirma la cancelación de esta cita"
        maxWidth="sm"
      >
        <MaterialDialogContent>
          <p className="text-muted-foreground mb-4">
            ¿Estás seguro de que deseas cancelar esta cita? Esta acción no se puede deshacer.
          </p>
          <MaterialTextField
            label="Motivo de cancelación"
            placeholder="Describe el motivo..."
            fullWidth
          />
        </MaterialDialogContent>
        <MaterialDialogActions>
          <MaterialButton variant="text" onClick={() => setShowCancelDialog(false)}>
            Cerrar
          </MaterialButton>
          <MaterialButton color="error" onClick={handleCancelAppointment}>
            Cancelar cita
          </MaterialButton>
        </MaterialDialogActions>
      </MaterialDialog>
    </div>
  );
}