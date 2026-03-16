import { useState } from "react";
import { MaterialCard, MaterialCardContent, MaterialCardHeader } from "../../components/material-card";
import { MaterialButton } from "../../components/material-button";
import { MaterialTextField } from "../../components/material-text-field";
import { MaterialSelect } from "../../components/material-select";
import { MaterialDialog } from "../../components/material-dialog";
import { MaterialChip } from "../../components/material-chip";
import { Search, DollarSign, Calendar, CreditCard, Eye, Upload, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface Payment {
  id: number;
  appointmentId: number;
  client: string;
  pet: string;
  service: string;
  amount: number;
  method: "efectivo" | "tarjeta" | "yape" | "transferencia";
  status: "pagado" | "pendiente_evidencia" | "observado" | "pendiente";
  date: string;
  reference?: string;
  evidence?: string;
  notes?: string;
}

const mockPayments: Payment[] = [
  {
    id: 1,
    appointmentId: 101,
    client: "María García",
    pet: "Max",
    service: "Consulta General",
    amount: 80,
    method: "yape",
    status: "pagado",
    date: "2024-03-15",
    reference: "000-123-456",
    evidence: "yape_screenshot.jpg",
  },
  {
    id: 2,
    appointmentId: 102,
    client: "Juan Pérez",
    pet: "Rocky",
    service: "Grooming Básico",
    amount: 60,
    method: "yape",
    status: "pendiente_evidencia",
    date: "2024-03-16",
    reference: "000-123-457",
  },
  {
    id: 3,
    appointmentId: 103,
    client: "Ana Torres",
    pet: "Luna",
    service: "Vacunación",
    amount: 50,
    method: "efectivo",
    status: "pagado",
    date: "2024-03-16",
  },
  {
    id: 4,
    appointmentId: 104,
    client: "Carlos Ruiz",
    pet: "Toby",
    service: "Control de Rutina",
    amount: 60,
    method: "yape",
    status: "observado",
    date: "2024-03-17",
    reference: "000-123-458",
    evidence: "yape_screenshot_2.jpg",
    notes: "El monto no coincide",
  },
  {
    id: 5,
    appointmentId: 105,
    client: "Sofía Mendoza",
    pet: "Pelusa",
    service: "Grooming Premium",
    amount: 100,
    method: "pendiente",
    status: "pendiente",
    date: "2024-03-18",
  },
];

const statusLabels = {
  pagado: "Pagado",
  pendiente_evidencia: "Pendiente evidencia",
  observado: "Observado",
  pendiente: "Pendiente",
};

const statusColors = {
  pagado: "#7cb342",
  pendiente_evidencia: "#fdd835",
  observado: "#ef5350",
  pendiente: "#9e9e9e",
};

const methodLabels = {
  efectivo: "Efectivo",
  tarjeta: "Tarjeta",
  yape: "Yape",
  transferencia: "Transferencia",
  pendiente: "Pendiente",
};

export function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [evidenceDialogOpen, setEvidenceDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMethod, setFilterMethod] = useState("all");

  const handleViewEvidence = (payment: Payment) => {
    setSelectedPayment(payment);
    setEvidenceDialogOpen(true);
  };

  const handleApprovePayment = (paymentId: number) => {
    setPayments(payments.map(p =>
      p.id === paymentId ? { ...p, status: "pagado" as const } : p
    ));
    toast.success("Pago aprobado exitosamente");
    setEvidenceDialogOpen(false);
  };

  const handleRejectPayment = (paymentId: number) => {
    setPayments(payments.map(p =>
      p.id === paymentId ? { ...p, status: "observado" as const, notes: "Evidencia rechazada" } : p
    ));
    toast.success("Pago observado");
    setEvidenceDialogOpen(false);
  };

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.pet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || payment.status === filterStatus;
    const matchesMethod = filterMethod === "all" || payment.method === filterMethod;
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const totalAmount = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const paidAmount = filteredPayments.filter(p => p.status === "pagado").reduce((sum, p) => sum + p.amount, 0);
  const pendingAmount = filteredPayments.filter(p => p.status === "pendiente" || p.status === "pendiente_evidencia").reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Pagos</h1>
        <p className="text-muted-foreground">Gestiona los pagos y transacciones</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MaterialCard elevated>
          <MaterialCardContent className="py-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#7cb342]/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#7cb342]" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">S/ {totalAmount.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </MaterialCardContent>
        </MaterialCard>

        <MaterialCard elevated>
          <MaterialCardContent className="py-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#7cb342]/10 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-[#7cb342]" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#7cb342] mb-1">S/ {paidAmount.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Pagado</p>
          </MaterialCardContent>
        </MaterialCard>

        <MaterialCard elevated>
          <MaterialCardContent className="py-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#fdd835]/10 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-[#fdd835]" />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#fdd835] mb-1">S/ {pendingAmount.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Pendiente</p>
          </MaterialCardContent>
        </MaterialCard>

        <MaterialCard elevated>
          <MaterialCardContent className="py-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#42a5f5]/10 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-[#42a5f5]" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">{filteredPayments.length}</p>
            <p className="text-sm text-muted-foreground">Transacciones</p>
          </MaterialCardContent>
        </MaterialCard>
      </div>

      {/* Filters */}
      <MaterialCard className="mb-6">
        <MaterialCardContent className="py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <MaterialTextField
                placeholder="Buscar por cliente, mascota o referencia..."
                startIcon={<Search className="w-5 h-5" />}
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <MaterialSelect
                label="Estado"
                options={[
                  { value: "all", label: "Todos" },
                  { value: "pagado", label: "Pagado" },
                  { value: "pendiente_evidencia", label: "Pendiente evidencia" },
                  { value: "observado", label: "Observado" },
                  { value: "pendiente", label: "Pendiente" },
                ]}
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              />
              <MaterialSelect
                label="Método"
                options={[
                  { value: "all", label: "Todos" },
                  { value: "yape", label: "Yape" },
                  { value: "efectivo", label: "Efectivo" },
                  { value: "tarjeta", label: "Tarjeta" },
                  { value: "transferencia", label: "Transferencia" },
                ]}
                value={filterMethod}
                onChange={(e) => setFilterMethod(e.target.value)}
              />
            </div>
          </div>
        </MaterialCardContent>
      </MaterialCard>

      {/* Payments Table */}
      <MaterialCard elevated>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left p-4 font-semibold">ID</th>
                <th className="text-left p-4 font-semibold">Cliente / Mascota</th>
                <th className="text-left p-4 font-semibold">Servicio</th>
                <th className="text-left p-4 font-semibold">Monto</th>
                <th className="text-left p-4 font-semibold">Método</th>
                <th className="text-left p-4 font-semibold">Referencia</th>
                <th className="text-left p-4 font-semibold">Estado</th>
                <th className="text-left p-4 font-semibold">Fecha</th>
                <th className="text-right p-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <span className="font-mono text-sm">#{payment.appointmentId}</span>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold">{payment.client}</p>
                    <p className="text-sm text-muted-foreground">{payment.pet}</p>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{payment.service}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-semibold text-[#7cb342]">S/ {payment.amount.toFixed(2)}</span>
                  </td>
                  <td className="p-4">
                    <MaterialChip
                      label={methodLabels[payment.method]}
                      color={payment.method === "yape" ? "primary" : "default"}
                    />
                  </td>
                  <td className="p-4">
                    {payment.reference ? (
                      <span className="font-mono text-sm">{payment.reference}</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="p-4">
                    <MaterialChip
                      label={statusLabels[payment.status]}
                      style={{
                        backgroundColor: `${statusColors[payment.status]}20`,
                        color: statusColors[payment.status],
                      }}
                    />
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{new Date(payment.date).toLocaleDateString('es-ES')}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      {payment.method === "yape" && payment.status === "pendiente_evidencia" && (
                        <MaterialButton
                          variant="text"
                          size="sm"
                          onClick={() => handleViewEvidence(payment)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver
                        </MaterialButton>
                      )}
                      {payment.evidence && (
                        <MaterialButton
                          variant="text"
                          size="sm"
                          onClick={() => handleViewEvidence(payment)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Evidencia
                        </MaterialButton>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MaterialCard>

      {filteredPayments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron pagos</p>
        </div>
      )}

      {/* Evidence Dialog */}
      <MaterialDialog
        open={evidenceDialogOpen}
        onOpenChange={setEvidenceDialogOpen}
        title="Evidencia de Pago Yape"
        description={selectedPayment ? `Pago #${selectedPayment.appointmentId} - ${selectedPayment.client}` : ""}
        maxWidth="md"
      >
        {selectedPayment && (
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Monto</p>
                <p className="text-xl font-bold text-[#7cb342]">S/ {selectedPayment.amount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Referencia Yape</p>
                <p className="font-mono font-semibold">{selectedPayment.reference}</p>
              </div>
            </div>

            {selectedPayment.evidence ? (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Captura de pantalla</p>
                <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-border">
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm font-medium">{selectedPayment.evidence}</p>
                    <p className="text-xs text-muted-foreground">Archivo subido</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 bg-muted rounded-lg text-center">
                <AlertCircle className="w-12 h-12 text-[#fdd835] mx-auto mb-3" />
                <p className="font-semibold mb-1">Pendiente de evidencia</p>
                <p className="text-sm text-muted-foreground">
                  El cliente aún no ha subido la evidencia del pago
                </p>
              </div>
            )}

            {selectedPayment.notes && (
              <div className="p-4 bg-[#ef5350]/10 border border-[#ef5350]/30 rounded-lg">
                <p className="text-sm font-semibold mb-1">Observación:</p>
                <p className="text-sm">{selectedPayment.notes}</p>
              </div>
            )}

            {selectedPayment.evidence && selectedPayment.status === "pendiente_evidencia" && (
              <div className="flex gap-3 pt-4">
                <MaterialButton
                  variant="outlined"
                  fullWidth
                  onClick={() => handleRejectPayment(selectedPayment.id)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Rechazar
                </MaterialButton>
                <MaterialButton
                  variant="filled"
                  fullWidth
                  onClick={() => handleApprovePayment(selectedPayment.id)}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Aprobar pago
                </MaterialButton>
              </div>
            )}
          </div>
        )}
      </MaterialDialog>
    </div>
  );
}
