import { useState } from "react";
import { MaterialCard, MaterialCardContent, MaterialCardHeader } from "../../components/material-card";
import { MaterialButton } from "../../components/material-button";
import { MaterialChip } from "../../components/material-chip";
import { MaterialDialog } from "../../components/material-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { 
  DollarSign, 
  Calendar, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Download,
  Receipt,
  AlertCircle
} from "lucide-react";

interface Payment {
  id: number;
  date: string;
  service: string;
  pet: string;
  amount: number;
  status: "paid" | "pending" | "cancelled";
  paymentMethod?: string;
  transactionId?: string;
  appointmentId?: number;
}

const payments: Payment[] = [
  {
    id: 1,
    date: "2026-02-15",
    service: "Control",
    pet: "Max",
    amount: 50,
    status: "paid",
    paymentMethod: "Yape",
    transactionId: "YPE20260215-001",
    appointmentId: 3
  },
  {
    id: 2,
    date: "2026-02-24",
    service: "Consulta médica",
    pet: "Max",
    amount: 80,
    status: "pending",
    appointmentId: 1
  },
  {
    id: 3,
    date: "2026-02-10",
    service: "Consulta médica",
    pet: "Luna",
    amount: 80,
    status: "paid",
    paymentMethod: "Efectivo",
    transactionId: "EFE20260210-001",
    appointmentId: 4
  },
  {
    id: 4,
    date: "2026-01-20",
    service: "Vacunación",
    pet: "Max",
    amount: 60,
    status: "paid",
    paymentMethod: "Tarjeta",
    transactionId: "TRJ20260120-001",
    appointmentId: 5
  },
  {
    id: 5,
    date: "2026-01-10",
    service: "Grooming",
    pet: "Luna",
    amount: 120,
    status: "paid",
    paymentMethod: "Yape",
    transactionId: "YPE20260110-001"
  },
];

export function ClientPaymentsPage() {
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const paidPayments = payments.filter(p => p.status === "paid");
  const pendingPayments = payments.filter(p => p.status === "pending");
  
  const totalPaid = paidPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalPending = pendingPayments.reduce((sum, p) => sum + p.amount, 0);

  const PaymentCard = ({ payment }: { payment: Payment }) => {
    return (
      <MaterialCard elevated className="mb-4">
        <MaterialCardContent className="p-5">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Date and Status */}
            <div className="flex items-center gap-4 md:w-40 flex-shrink-0">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#7cb342]">
                  {new Date(payment.date).getDate()}
                </p>
                <p className="text-xs text-muted-foreground uppercase">
                  {new Date(payment.date).toLocaleDateString('es-PE', { month: 'short' })}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {new Date(payment.date).getFullYear()}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{payment.service}</h3>
                  <p className="text-sm text-muted-foreground">Mascota: {payment.pet}</p>
                </div>
                <MaterialChip 
                  label={
                    payment.status === "paid" ? "Pagado" :
                    payment.status === "pending" ? "Pendiente" : "Cancelado"
                  } 
                  color={
                    payment.status === "paid" ? "confirmed" :
                    payment.status === "pending" ? "pending" : "cancelled"
                  }
                  size="sm" 
                />
              </div>

              <div className="flex items-center gap-4 text-sm">
                {payment.paymentMethod && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CreditCard className="w-4 h-4" />
                    <span>{payment.paymentMethod}</span>
                  </div>
                )}
                {payment.transactionId && (
                  <div className="text-xs text-muted-foreground">
                    ID: {payment.transactionId}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Total:</span>
                <span className="text-2xl font-bold text-[#7cb342]">S/ {payment.amount.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex md:flex-col gap-2 md:w-32 flex-shrink-0">
              <MaterialButton
                variant="outlined"
                size="sm"
                onClick={() => setSelectedPayment(payment)}
                className="flex-1 md:w-full"
              >
                <Receipt className="w-4 h-4 md:mr-0 mr-2" />
                <span className="md:hidden">Ver</span>
              </MaterialButton>
              {payment.status === "paid" && (
                <MaterialButton
                  variant="text"
                  size="sm"
                  className="flex-1 md:w-full"
                >
                  <Download className="w-4 h-4 md:mr-0 mr-2" />
                  <span className="md:hidden">Recibo</span>
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Mis Pagos</h1>
        <p className="text-muted-foreground">Consulta el historial de pagos y facturas</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MaterialCard elevated>
          <MaterialCardContent className="py-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#7cb342]/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-[#7cb342]" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">S/ {totalPaid.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Total Pagado</p>
          </MaterialCardContent>
        </MaterialCard>

        <MaterialCard elevated>
          <MaterialCardContent className="py-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#fdd835]/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-[#fdd835]" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">S/ {totalPending.toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">Pendiente de Pago</p>
          </MaterialCardContent>
        </MaterialCard>

        <MaterialCard elevated>
          <MaterialCardContent className="py-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#42a5f5]/10 flex items-center justify-center">
                <Receipt className="w-6 h-6 text-[#42a5f5]" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">{payments.length}</p>
            <p className="text-sm text-muted-foreground">Total Transacciones</p>
          </MaterialCardContent>
        </MaterialCard>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6 w-full sm:w-auto">
          <TabsTrigger value="all" className="flex-1 sm:flex-none">
            <DollarSign className="w-4 h-4 mr-2" />
            Todos ({payments.length})
          </TabsTrigger>
          <TabsTrigger value="paid" className="flex-1 sm:flex-none">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Pagados ({paidPayments.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex-1 sm:flex-none">
            <Clock className="w-4 h-4 mr-2" />
            Pendientes ({pendingPayments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {payments.length > 0 ? (
            payments.map((payment) => (
              <PaymentCard key={payment.id} payment={payment} />
            ))
          ) : (
            <MaterialCard>
              <MaterialCardContent className="text-center py-12">
                <DollarSign className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-semibold mb-2">No hay transacciones</p>
                <p className="text-muted-foreground">
                  Aquí aparecerán tus pagos cuando realices servicios
                </p>
              </MaterialCardContent>
            </MaterialCard>
          )}
        </TabsContent>

        <TabsContent value="paid">
          {paidPayments.length > 0 ? (
            paidPayments.map((payment) => (
              <PaymentCard key={payment.id} payment={payment} />
            ))
          ) : (
            <MaterialCard>
              <MaterialCardContent className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-semibold mb-2">No hay pagos realizados</p>
                <p className="text-muted-foreground">
                  Aquí aparecerán los pagos completados
                </p>
              </MaterialCardContent>
            </MaterialCard>
          )}
        </TabsContent>

        <TabsContent value="pending">
          {pendingPayments.length > 0 ? (
            <>
              <div className="mb-4 p-4 bg-[#fdd835]/10 border border-[#fdd835]/20 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#fdd835] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground mb-1">Pagos pendientes</p>
                  <p className="text-sm text-muted-foreground">
                    Tienes {pendingPayments.length} pago(s) pendiente(s) por un total de S/ {totalPending.toFixed(2)}. 
                    Puedes realizar el pago en la clínica o mediante transferencia.
                  </p>
                </div>
              </div>
              {pendingPayments.map((payment) => (
                <PaymentCard key={payment.id} payment={payment} />
              ))}
            </>
          ) : (
            <MaterialCard>
              <MaterialCardContent className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-[#7cb342]" />
                <p className="text-lg font-semibold mb-2">¡Todo al día!</p>
                <p className="text-muted-foreground">
                  No tienes pagos pendientes
                </p>
              </MaterialCardContent>
            </MaterialCard>
          )}
        </TabsContent>
      </Tabs>

      {/* Payment Details Dialog */}
      <MaterialDialog
        open={selectedPayment !== null}
        onOpenChange={(open) => !open && setSelectedPayment(null)}
        title="Detalles del Pago"
        description="Información completa del pago"
      >
        {selectedPayment && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <p className="text-2xl font-bold text-[#7cb342]">S/ {selectedPayment.amount.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(selectedPayment.date).toLocaleDateString('es-PE', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <MaterialChip 
                label={
                  selectedPayment.status === "paid" ? "Pagado" :
                  selectedPayment.status === "pending" ? "Pendiente" : "Cancelado"
                } 
                color={
                  selectedPayment.status === "paid" ? "confirmed" :
                  selectedPayment.status === "pending" ? "pending" : "cancelled"
                }
              />
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Servicio</p>
                  <p className="font-semibold">{selectedPayment.service}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Mascota</p>
                  <p className="font-semibold">{selectedPayment.pet}</p>
                </div>
              </div>
              
              {selectedPayment.paymentMethod && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Método de pago</p>
                  <p className="font-semibold">{selectedPayment.paymentMethod}</p>
                </div>
              )}

              {selectedPayment.transactionId && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">ID de transacción</p>
                  <p className="font-mono text-sm font-semibold">{selectedPayment.transactionId}</p>
                </div>
              )}

              {selectedPayment.status === "pending" && (
                <div className="p-4 bg-[#fdd835]/10 border border-[#fdd835]/20 rounded-lg">
                  <p className="text-sm font-semibold mb-2">Información de pago</p>
                  <p className="text-sm text-muted-foreground">
                    Puedes realizar el pago en cualquiera de nuestras sedes o mediante transferencia a nuestra cuenta.
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4">
              <MaterialButton variant="outlined" onClick={() => setSelectedPayment(null)} className="flex-1">
                Cerrar
              </MaterialButton>
              {selectedPayment.status === "paid" && (
                <MaterialButton variant="filled" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar recibo
                </MaterialButton>
              )}
            </div>
          </div>
        )}
      </MaterialDialog>
    </div>
  );
}