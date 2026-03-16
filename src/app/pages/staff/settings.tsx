import { useState } from "react";
import { MaterialCard, MaterialCardContent, MaterialCardHeader } from "../../components/material-card";
import { MaterialButton } from "../../components/material-button";
import { MaterialTextField } from "../../components/material-text-field";
import { Settings, Upload, Mail, Bell, Shield, Palette, FileText, Save } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "../../components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";

export function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    clinicName: "El Mascotario",
    phone: "987654321",
    email: "contacto@elmascotario.com",
    address: "Av. Principal 123, Lima",
    taxId: "20123456789",
  });

  const [notifications, setNotifications] = useState({
    emailNewAppointment: true,
    emailCancellation: true,
    smsReminders: true,
    emailReports: false,
  });

  const [colors, setColors] = useState({
    primary: "#7cb342",
    secondary: "#fdd835",
  });

  const [templates, setTemplates] = useState({
    appointmentConfirmation: "Hola {cliente}, tu cita para {mascota} está confirmada para el {fecha} a las {hora} en {sede}.",
    appointmentReminder: "Recordatorio: Tu cita es mañana {fecha} a las {hora}. ¡Te esperamos en {sede}!",
    appointmentCancellation: "Tu cita del {fecha} a las {hora} ha sido cancelada. Contactanos para reprogramar.",
  });

  const handleSaveGeneral = () => {
    toast.success("Configuración general actualizada");
  };

  const handleSaveNotifications = () => {
    toast.success("Preferencias de notificaciones actualizadas");
  };

  const handleSaveColors = () => {
    toast.success("Colores del sistema actualizados");
  };

  const handleSaveTemplates = () => {
    toast.success("Plantillas de mensajes actualizadas");
  };

  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Configuración</h1>
        <p className="text-muted-foreground">Ajustes generales del sistema</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="general">
            <Settings className="w-4 h-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="w-4 h-4 mr-2" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="w-4 h-4 mr-2" />
            Apariencia
          </TabsTrigger>
          <TabsTrigger value="templates">
            <FileText className="w-4 h-4 mr-2" />
            Plantillas
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <MaterialCard elevated>
            <MaterialCardHeader>
              <h3 className="text-lg font-semibold">Información General</h3>
            </MaterialCardHeader>
            <MaterialCardContent>
              <div className="space-y-4">
                <MaterialTextField
                  label="Nombre de la clínica"
                  fullWidth
                  value={generalSettings.clinicName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, clinicName: e.target.value })}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MaterialTextField
                    label="Teléfono principal"
                    type="tel"
                    fullWidth
                    value={generalSettings.phone}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, phone: e.target.value })}
                  />
                  <MaterialTextField
                    label="Correo electrónico"
                    type="email"
                    fullWidth
                    value={generalSettings.email}
                    onChange={(e) => setGeneralSettings({ ...generalSettings, email: e.target.value })}
                  />
                </div>

                <MaterialTextField
                  label="Dirección principal"
                  fullWidth
                  multiline
                  rows={2}
                  value={generalSettings.address}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                />

                <MaterialTextField
                  label="RUC"
                  fullWidth
                  value={generalSettings.taxId}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, taxId: e.target.value })}
                />

                <div>
                  <label className="block text-sm font-medium mb-2">Logo de la clínica</label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-xl bg-[#7cb342]/10 flex items-center justify-center border-2 border-dashed border-border">
                      <span className="text-4xl font-bold text-[#7cb342]">M</span>
                    </div>
                    <MaterialButton variant="outlined">
                      <Upload className="w-4 h-4 mr-2" />
                      Cambiar logo
                    </MaterialButton>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Formatos recomendados: PNG, JPG. Tamaño máximo: 2MB
                  </p>
                </div>

                <div className="pt-4 flex justify-end">
                  <MaterialButton onClick={handleSaveGeneral}>
                    <Save className="w-4 h-4 mr-2" />
                    Guardar cambios
                  </MaterialButton>
                </div>
              </div>
            </MaterialCardContent>
          </MaterialCard>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <MaterialCard elevated>
            <MaterialCardHeader>
              <h3 className="text-lg font-semibold">Preferencias de Notificaciones</h3>
            </MaterialCardHeader>
            <MaterialCardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Email de nueva cita</p>
                      <p className="text-sm text-muted-foreground">
                        Recibe un correo cuando se registra una nueva cita
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.emailNewAppointment}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailNewAppointment: checked })}
                  />
                </div>

                <div className="flex items-center justify-between py-4 border-b border-border">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Email de cancelación</p>
                      <p className="text-sm text-muted-foreground">
                        Recibe un correo cuando se cancela una cita
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.emailCancellation}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailCancellation: checked })}
                  />
                </div>

                <div className="flex items-center justify-between py-4 border-b border-border">
                  <div className="flex items-start gap-3">
                    <Bell className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Recordatorios por SMS</p>
                      <p className="text-sm text-muted-foreground">
                        Envía recordatorios automáticos a los clientes vía SMS
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.smsReminders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, smsReminders: checked })}
                  />
                </div>

                <div className="flex items-center justify-between py-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="font-semibold mb-1">Reportes semanales por email</p>
                      <p className="text-sm text-muted-foreground">
                        Recibe un resumen semanal de estadísticas
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications.emailReports}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailReports: checked })}
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <MaterialButton onClick={handleSaveNotifications}>
                    <Save className="w-4 h-4 mr-2" />
                    Guardar cambios
                  </MaterialButton>
                </div>
              </div>
            </MaterialCardContent>
          </MaterialCard>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <MaterialCard elevated>
            <MaterialCardHeader>
              <h3 className="text-lg font-semibold">Colores del Sistema</h3>
            </MaterialCardHeader>
            <MaterialCardContent>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-3">Color primario</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={colors.primary}
                      onChange={(e) => setColors({ ...colors, primary: e.target.value })}
                      className="w-20 h-20 rounded-xl border-2 border-border cursor-pointer"
                    />
                    <div>
                      <p className="font-mono font-semibold">{colors.primary}</p>
                      <p className="text-sm text-muted-foreground">
                        Usado en botones principales, encabezados y elementos destacados
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">Color secundario</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="color"
                      value={colors.secondary}
                      onChange={(e) => setColors({ ...colors, secondary: e.target.value })}
                      className="w-20 h-20 rounded-xl border-2 border-border cursor-pointer"
                    />
                    <div>
                      <p className="font-mono font-semibold">{colors.secondary}</p>
                      <p className="text-sm text-muted-foreground">
                        Usado en estados pendientes, alertas y elementos informativos
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-semibold mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Vista previa
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <div 
                      className="px-4 py-2 rounded-lg text-white font-medium"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Botón Primario
                    </div>
                    <div 
                      className="px-4 py-2 rounded-lg font-medium"
                      style={{ backgroundColor: colors.secondary }}
                    >
                      Botón Secundario
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <MaterialButton 
                    variant="outlined"
                    onClick={() => setColors({ primary: "#7cb342", secondary: "#fdd835" })}
                  >
                    Restaurar predeterminados
                  </MaterialButton>
                  <MaterialButton onClick={handleSaveColors}>
                    <Save className="w-4 h-4 mr-2" />
                    Guardar cambios
                  </MaterialButton>
                </div>
              </div>
            </MaterialCardContent>
          </MaterialCard>
        </TabsContent>

        {/* Message Templates */}
        <TabsContent value="templates">
          <MaterialCard elevated>
            <MaterialCardHeader>
              <h3 className="text-lg font-semibold">Plantillas de Mensajes</h3>
            </MaterialCardHeader>
            <MaterialCardContent>
              <div className="space-y-4">
                <div>
                  <MaterialTextField
                    label="Confirmación de cita"
                    fullWidth
                    multiline
                    rows={3}
                    value={templates.appointmentConfirmation}
                    onChange={(e) => setTemplates({ ...templates, appointmentConfirmation: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Variables disponibles: {"{cliente}"}, {"{mascota}"}, {"{fecha}"}, {"{hora}"}, {"{sede}"}
                  </p>
                </div>

                <div>
                  <MaterialTextField
                    label="Recordatorio de cita"
                    fullWidth
                    multiline
                    rows={3}
                    value={templates.appointmentReminder}
                    onChange={(e) => setTemplates({ ...templates, appointmentReminder: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Variables disponibles: {"{cliente}"}, {"{mascota}"}, {"{fecha}"}, {"{hora}"}, {"{sede}"}
                  </p>
                </div>

                <div>
                  <MaterialTextField
                    label="Cancelación de cita"
                    fullWidth
                    multiline
                    rows={3}
                    value={templates.appointmentCancellation}
                    onChange={(e) => setTemplates({ ...templates, appointmentCancellation: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Variables disponibles: {"{cliente}"}, {"{mascota}"}, {"{fecha}"}, {"{hora}"}, {"{motivo}"}
                  </p>
                </div>

                <div className="pt-4 flex justify-end">
                  <MaterialButton onClick={handleSaveTemplates}>
                    <Save className="w-4 h-4 mr-2" />
                    Guardar cambios
                  </MaterialButton>
                </div>
              </div>
            </MaterialCardContent>
          </MaterialCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}