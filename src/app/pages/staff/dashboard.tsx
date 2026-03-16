import { MaterialCard, MaterialCardContent, MaterialCardHeader } from "../../components/material-card";
import { MaterialChip } from "../../components/material-chip";
import { MaterialButton } from "../../components/material-button";
import { Calendar, Users, DollarSign, AlertTriangle, TrendingUp, Clock, CheckCircle2, XCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Link } from "react-router";

const kpis = [
  { 
    label: "Citas Hoy", 
    value: "12", 
    icon: Calendar, 
    color: "bg-[#7cb342]",
    change: "+8%",
    changePositive: true
  },
  { 
    label: "Pendientes", 
    value: "5", 
    icon: Clock, 
    color: "bg-[#fdd835]",
    change: "-2",
    changePositive: true
  },
  { 
    label: "Ingresos Hoy", 
    value: "S/ 1,250", 
    icon: DollarSign, 
    color: "bg-[#42a5f5]",
    change: "+15%",
    changePositive: true
  },
  { 
    label: "Alertas Stock", 
    value: "3", 
    icon: AlertTriangle, 
    color: "bg-[#ef5350]",
    change: "Crítico",
    changePositive: false
  },
];

const upcomingAppointments = [
  { id: 1, time: "09:00", client: "María García", pet: "Max", service: "Consulta médica", status: "confirmed" as const },
  { id: 2, time: "10:30", client: "Juan Pérez", pet: "Luna", service: "Grooming", status: "pending" as const },
  { id: 3, time: "11:00", client: "Ana Torres", pet: "Rocky", service: "Control", status: "confirmed" as const },
  { id: 4, time: "14:00", client: "Carlos Ruiz", pet: "Bella", service: "Consulta médica", status: "pending" as const },
  { id: 5, time: "15:30", client: "Laura Flores", pet: "Milo", service: "Vacunación", status: "confirmed" as const },
];

const appointmentsByService = [
  { name: "Consulta", value: 45 },
  { name: "Grooming", value: 28 },
  { name: "Control", value: 18 },
  { name: "Vacunación", value: 15 },
];

const weeklyStats = [
  { day: "Lun", citas: 12 },
  { day: "Mar", citas: 15 },
  { day: "Mié", citas: 18 },
  { day: "Jue", citas: 14 },
  { day: "Vie", citas: 20 },
  { day: "Sáb", citas: 10 },
  { day: "Dom", citas: 5 },
];

const COLORS = ["#7cb342", "#fdd835", "#42a5f5", "#ef5350"];

export function StaffDashboard() {
  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenido al panel de control de El Mascotario
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <MaterialCard key={kpi.label} elevated>
              <MaterialCardContent className="py-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-xl ${kpi.color} bg-opacity-10 flex items-center justify-center`}>
                    <Icon className="w-6 h-6" style={{ color: kpi.color.replace('bg-', '') }} />
                  </div>
                  <span className={`text-sm font-semibold ${kpi.changePositive ? 'text-[#7cb342]' : 'text-[#ef5350]'}`}>
                    {kpi.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground mb-1">{kpi.value}</p>
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
              </MaterialCardContent>
            </MaterialCard>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2">
          <MaterialCard>
            <MaterialCardHeader>
              <div className="flex items-center justify-between w-full">
                <h3 className="text-lg font-semibold">Próximas Citas</h3>
                <Link to="/staff/agenda">
                  <MaterialButton variant="text" size="sm">
                    Ver todas
                  </MaterialButton>
                </Link>
              </div>
            </MaterialCardHeader>
            <MaterialCardContent className="p-0">
              <div className="divide-y divide-border">
                {upcomingAppointments.map((appointment) => (
                  <div key={appointment.id} className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-[#7cb342]">{appointment.time}</p>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-semibold text-foreground">{appointment.client}</p>
                            <span className="text-muted-foreground">•</span>
                            <p className="text-sm text-muted-foreground">{appointment.pet}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{appointment.service}</p>
                        </div>
                      </div>
                      <MaterialChip 
                        label={appointment.status === "confirmed" ? "Confirmada" : "Pendiente"}
                        color={appointment.status}
                        size="sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </MaterialCardContent>
          </MaterialCard>
        </div>

        {/* Appointments by Service */}
        <MaterialCard>
          <MaterialCardHeader>
            <h3 className="text-lg font-semibold">Citas por Servicio</h3>
          </MaterialCardHeader>
          <MaterialCardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={appointmentsByService}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {appointmentsByService.map((entry, index) => (
                    <Cell key={`cell-${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {appointmentsByService.map((service, index) => (
                <div key={`legend-${service.name}`} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-muted-foreground">{service.name}</span>
                  </div>
                  <span className="font-semibold">{service.value}</span>
                </div>
              ))}
            </div>
          </MaterialCardContent>
        </MaterialCard>
      </div>

      {/* Weekly Stats */}
      <MaterialCard>
        <MaterialCardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-lg font-semibold">Estadísticas Semanales</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="w-4 h-4 text-[#7cb342]" />
              <span>+12% vs. semana anterior</span>
            </div>
          </div>
        </MaterialCardHeader>
        <MaterialCardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#ffffff', 
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              <Bar dataKey="citas" fill="#7cb342" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </MaterialCardContent>
      </MaterialCard>
    </div>
  );
}