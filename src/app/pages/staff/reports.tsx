import { useState } from "react";
import { MaterialCard, MaterialCardContent, MaterialCardHeader } from "../../components/material-card";
import { MaterialButton } from "../../components/material-button";
import { MaterialSelect } from "../../components/material-select";
import { Download, TrendingUp, Calendar, DollarSign, Users, Heart, FileText } from "lucide-react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { toast } from "sonner";

const appointmentsByMonth = [
  { month: "Ene", consulta: 45, grooming: 28, vacuna: 15, control: 20 },
  { month: "Feb", consulta: 52, grooming: 32, vacuna: 18, control: 22 },
  { month: "Mar", consulta: 48, grooming: 30, vacuna: 20, control: 25 },
  { month: "Abr", consulta: 61, grooming: 35, vacuna: 22, control: 28 },
  { month: "May", consulta: 58, grooming: 38, vacuna: 25, control: 30 },
  { month: "Jun", consulta: 65, grooming: 42, vacuna: 28, control: 32 },
];

const revenueByMonth = [
  { month: "Ene", ingresos: 12500, gastos: 8000 },
  { month: "Feb", ingresos: 14200, gastos: 8500 },
  { month: "Mar", ingresos: 13800, gastos: 8200 },
  { month: "Abr", ingresos: 16500, gastos: 9000 },
  { month: "May", ingresos: 15800, gastos: 8800 },
  { month: "Jun", ingresos: 18200, gastos: 9500 },
];

const appointmentsByLocation = [
  { name: "Chorrillos", value: 245 },
  { name: "Surco/Barranco", value: 198 },
];

const appointmentsByService = [
  { name: "Consulta", value: 329 },
  { name: "Grooming", value: 205 },
  { name: "Vacunación", value: 128 },
  { name: "Control", value: 157 },
];

const COLORS = ["#7cb342", "#fdd835", "#42a5f5", "#ef5350"];

export function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const handleExport = (reportType: string) => {
    toast.success(`Exportando reporte: ${reportType}`);
  };

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Reportes</h1>
        <p className="text-muted-foreground">Análisis y estadísticas del negocio</p>
      </div>

      {/* Filters */}
      <MaterialCard className="mb-6">
        <MaterialCardContent className="py-4">
          <div className="flex flex-wrap gap-4">
            <div className="w-full sm:w-48">
              <MaterialSelect
                label="Período"
                fullWidth
                options={[
                  { value: "week", label: "Última semana" },
                  { value: "month", label: "Último mes" },
                  { value: "quarter", label: "Último trimestre" },
                  { value: "year", label: "Último año" },
                ]}
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-48">
              <MaterialSelect
                label="Sede"
                fullWidth
                options={[
                  { value: "all", label: "Todas las sedes" },
                  { value: "chorrillos", label: "Chorrillos" },
                  { value: "surco", label: "Surco/Barranco" },
                ]}
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              />
            </div>
            <div className="flex items-end gap-2 ml-auto">
              <MaterialButton variant="outlined" onClick={() => handleExport("general")}>
                <Download className="w-4 h-4 mr-2" />
                Exportar PDF
              </MaterialButton>
              <MaterialButton variant="outlined" onClick={() => handleExport("excel")}>
                <Download className="w-4 h-4 mr-2" />
                Exportar Excel
              </MaterialButton>
            </div>
          </div>
        </MaterialCardContent>
      </MaterialCard>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MaterialCard elevated>
          <MaterialCardContent className="py-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#7cb342]/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#7cb342]" />
              </div>
              <span className="text-sm font-semibold text-[#7cb342]">+12%</span>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">819</p>
            <p className="text-sm text-muted-foreground">Total de citas</p>
          </MaterialCardContent>
        </MaterialCard>

        <MaterialCard elevated>
          <MaterialCardContent className="py-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#42a5f5]/10 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#42a5f5]" />
              </div>
              <span className="text-sm font-semibold text-[#7cb342]">+18%</span>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">S/ 91,000</p>
            <p className="text-sm text-muted-foreground">Ingresos totales</p>
          </MaterialCardContent>
        </MaterialCard>

        <MaterialCard elevated>
          <MaterialCardContent className="py-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#fdd835]/10 flex items-center justify-center">
                <Users className="w-6 h-6 text-[#fdd835]" />
              </div>
              <span className="text-sm font-semibold text-[#7cb342]">+8%</span>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">342</p>
            <p className="text-sm text-muted-foreground">Clientes activos</p>
          </MaterialCardContent>
        </MaterialCard>

        <MaterialCard elevated>
          <MaterialCardContent className="py-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#ef5350]/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-[#ef5350]" />
              </div>
              <span className="text-sm font-semibold text-[#7cb342]">+5%</span>
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">485</p>
            <p className="text-sm text-muted-foreground">Mascotas registradas</p>
          </MaterialCardContent>
        </MaterialCard>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Appointments by Month */}
        <MaterialCard elevated>
          <MaterialCardHeader>
            <div className="flex items-center justify-between w-full">
              <h3 className="text-lg font-semibold">Citas por Mes</h3>
              <MaterialButton variant="text" size="sm" onClick={() => handleExport("appointments-month")}>
                <FileText className="w-4 h-4" />
              </MaterialButton>
            </div>
          </MaterialCardHeader>
          <MaterialCardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={appointmentsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Legend />
                <Bar dataKey="consulta" fill="#7cb342" name="Consulta" />
                <Bar dataKey="grooming" fill="#fdd835" name="Grooming" />
                <Bar dataKey="vacuna" fill="#42a5f5" name="Vacuna" />
                <Bar dataKey="control" fill="#ef5350" name="Control" />
              </BarChart>
            </ResponsiveContainer>
          </MaterialCardContent>
        </MaterialCard>

        {/* Revenue Chart */}
        <MaterialCard elevated>
          <MaterialCardHeader>
            <div className="flex items-center justify-between w-full">
              <h3 className="text-lg font-semibold">Ingresos y Gastos</h3>
              <div className="flex items-center gap-2 text-sm text-[#7cb342]">
                <TrendingUp className="w-4 h-4" />
                <span>+18% vs. período anterior</span>
              </div>
            </div>
          </MaterialCardHeader>
          <MaterialCardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="ingresos" stroke="#7cb342" strokeWidth={3} name="Ingresos" />
                <Line type="monotone" dataKey="gastos" stroke="#ef5350" strokeWidth={3} name="Gastos" />
              </LineChart>
            </ResponsiveContainer>
          </MaterialCardContent>
        </MaterialCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointments by Location */}
        <MaterialCard elevated>
          <MaterialCardHeader>
            <h3 className="text-lg font-semibold">Citas por Sede</h3>
          </MaterialCardHeader>
          <MaterialCardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={appointmentsByLocation}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {appointmentsByLocation.map((entry, index) => (
                    <Cell key={`cell-${entry.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {appointmentsByLocation.map((location, index) => (
                <div key={`legend-location-${location.name}`} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-muted-foreground">{location.name}</span>
                  </div>
                  <span className="font-semibold">{location.value} citas</span>
                </div>
              ))}
            </div>
          </MaterialCardContent>
        </MaterialCard>

        {/* Appointments by Service */}
        <MaterialCard elevated>
          <MaterialCardHeader>
            <h3 className="text-lg font-semibold">Citas por Servicio</h3>
          </MaterialCardHeader>
          <MaterialCardContent>
            <ResponsiveContainer width="100%" height={300}>
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
                <div key={`legend-service-${service.name}`} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-muted-foreground">{service.name}</span>
                  </div>
                  <span className="font-semibold">{service.value} citas</span>
                </div>
              ))}
            </div>
          </MaterialCardContent>
        </MaterialCard>
      </div>
    </div>
  );
}
