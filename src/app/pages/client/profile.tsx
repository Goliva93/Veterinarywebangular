import { useState } from "react";
import { MaterialCard, MaterialCardContent, MaterialCardHeader } from "../../components/material-card";
import { MaterialButton } from "../../components/material-button";
import { MaterialTextField } from "../../components/material-text-field";
import { MaterialDialog } from "../../components/material-dialog";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  Edit2, 
  Lock,
  Bell,
  Shield,
  Trash2,
  CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import { Switch } from "../../components/ui/switch";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  dni: string;
}

const initialProfile: UserProfile = {
  name: "María García",
  email: "maria@ejemplo.com",
  phone: "987654321",
  address: "Av. Principal 123, Surco",
  dni: "12345678"
};

export function ClientProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(initialProfile);
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [promotionalEmails, setPromotionalEmails] = useState(false);

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setEditDialogOpen(false);
    toast.success("Perfil actualizado exitosamente");
  };

  const handleChangePassword = () => {
    setPasswordDialogOpen(false);
    toast.success("Contraseña actualizada exitosamente");
  };

  const handleCancelEdit = () => {
    setEditedProfile(profile);
    setEditDialogOpen(false);
  };

  return (
    <div className="p-4 md:p-6 max-w-[1000px] mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Mi Perfil</h1>
        <p className="text-muted-foreground">Actualiza tu información personal y configuración</p>
      </div>

      {/* Profile Card */}
      <MaterialCard elevated className="mb-6">
        <MaterialCardHeader>
          <div className="flex items-center justify-between w-full">
            <h3 className="text-lg font-semibold">Información Personal</h3>
            <MaterialButton
              variant="outlined"
              size="sm"
              onClick={() => {
                setEditedProfile(profile);
                setEditDialogOpen(true);
              }}
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Editar
            </MaterialButton>
          </div>
        </MaterialCardHeader>
        <MaterialCardContent>
          {/* Profile Header */}
          <div className="flex items-center gap-4 pb-6 border-b border-border mb-6">
            <div className="w-20 h-20 rounded-full bg-[#7cb342] text-white flex items-center justify-center font-bold text-3xl">
              {profile.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{profile.name}</h2>
              <p className="text-muted-foreground">Cliente de El Mascotario</p>
            </div>
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Correo electrónico</p>
                <p className="font-semibold">{profile.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Teléfono</p>
                <p className="font-semibold">{profile.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Dirección</p>
                <p className="font-semibold">{profile.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">DNI</p>
                <p className="font-semibold">{profile.dni}</p>
              </div>
            </div>
          </div>
        </MaterialCardContent>
      </MaterialCard>

      {/* Security */}
      <MaterialCard elevated className="mb-6">
        <MaterialCardHeader>
          <div className="flex items-center gap-2 w-full">
            <Shield className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Seguridad</h3>
          </div>
        </MaterialCardHeader>
        <MaterialCardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold mb-1">Contraseña</p>
              <p className="text-sm text-muted-foreground">
                Última actualización: hace 3 meses
              </p>
            </div>
            <MaterialButton
              variant="outlined"
              size="sm"
              onClick={() => setPasswordDialogOpen(true)}
            >
              <Lock className="w-4 h-4 mr-2" />
              Cambiar
            </MaterialButton>
          </div>
        </MaterialCardContent>
      </MaterialCard>

      {/* Notifications */}
      <MaterialCard elevated className="mb-6">
        <MaterialCardHeader>
          <div className="flex items-center gap-2 w-full">
            <Bell className="w-5 h-5" />
            <h3 className="text-lg font-semibold">Notificaciones</h3>
          </div>
        </MaterialCardHeader>
        <MaterialCardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="font-semibold mb-1">Notificaciones por email</p>
                <p className="text-sm text-muted-foreground">
                  Recibe actualizaciones por correo electrónico
                </p>
              </div>
              <Switch
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="font-semibold mb-1">Notificaciones por SMS</p>
                <p className="text-sm text-muted-foreground">
                  Recibe mensajes de texto para citas importantes
                </p>
              </div>
              <Switch
                checked={smsNotifications}
                onCheckedChange={setSmsNotifications}
              />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <div>
                <p className="font-semibold mb-1">Recordatorios de citas</p>
                <p className="text-sm text-muted-foreground">
                  Recibe recordatorios antes de tus citas
                </p>
              </div>
              <Switch
                checked={appointmentReminders}
                onCheckedChange={setAppointmentReminders}
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-semibold mb-1">Correos promocionales</p>
                <p className="text-sm text-muted-foreground">
                  Recibe ofertas y promociones especiales
                </p>
              </div>
              <Switch
                checked={promotionalEmails}
                onCheckedChange={setPromotionalEmails}
              />
            </div>
          </div>
        </MaterialCardContent>
      </MaterialCard>

      {/* Danger Zone */}
      <MaterialCard elevated className="border-[#ef5350] border">
        <MaterialCardHeader>
          <div className="flex items-center gap-2 w-full">
            <Trash2 className="w-5 h-5 text-[#ef5350]" />
            <h3 className="text-lg font-semibold text-[#ef5350]">Zona de Peligro</h3>
          </div>
        </MaterialCardHeader>
        <MaterialCardContent>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold mb-1">Eliminar cuenta</p>
              <p className="text-sm text-muted-foreground">
                Esta acción no se puede deshacer. Todos tus datos serán eliminados permanentemente.
              </p>
            </div>
            <MaterialButton
              variant="outlined"
              size="sm"
              className="border-[#ef5350] text-[#ef5350] hover:bg-[#ef5350]/10 w-full sm:w-auto"
              onClick={() => toast.error("Contacta a soporte para eliminar tu cuenta")}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Eliminar cuenta
            </MaterialButton>
          </div>
        </MaterialCardContent>
      </MaterialCard>

      {/* Edit Profile Dialog */}
      <MaterialDialog
        open={editDialogOpen}
        onOpenChange={(open) => !open && handleCancelEdit()}
        title="Editar Perfil"
        description="Actualiza tu información personal"
      >
        <div className="space-y-4">
          <MaterialTextField
            label="Nombre completo"
            value={editedProfile.name}
            onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
          />
          <MaterialTextField
            label="Correo electrónico"
            type="email"
            value={editedProfile.email}
            onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
          />
          <MaterialTextField
            label="Teléfono"
            value={editedProfile.phone}
            onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
          />
          <MaterialTextField
            label="Dirección"
            value={editedProfile.address}
            onChange={(e) => setEditedProfile({ ...editedProfile, address: e.target.value })}
            multiline
            rows={2}
          />
          <MaterialTextField
            label="DNI"
            value={editedProfile.dni}
            onChange={(e) => setEditedProfile({ ...editedProfile, dni: e.target.value })}
          />
          <div className="flex gap-2 pt-4">
            <MaterialButton variant="outlined" onClick={handleCancelEdit} className="flex-1">
              Cancelar
            </MaterialButton>
            <MaterialButton variant="filled" onClick={handleSaveProfile} className="flex-1">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Guardar cambios
            </MaterialButton>
          </div>
        </div>
      </MaterialDialog>

      {/* Change Password Dialog */}
      <MaterialDialog
        open={passwordDialogOpen}
        onOpenChange={setPasswordDialogOpen}
        title="Cambiar Contraseña"
        description="Actualiza tu contraseña de acceso"
      >
        <div className="space-y-4">
          <MaterialTextField
            label="Contraseña actual"
            type="password"
            placeholder="Ingresa tu contraseña actual"
          />
          <MaterialTextField
            label="Nueva contraseña"
            type="password"
            placeholder="Ingresa tu nueva contraseña"
          />
          <MaterialTextField
            label="Confirmar nueva contraseña"
            type="password"
            placeholder="Confirma tu nueva contraseña"
          />
          <div className="p-3 bg-muted rounded-lg text-sm text-muted-foreground">
            <p className="font-semibold mb-1">Requisitos de contraseña:</p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Mínimo 8 caracteres</li>
              <li>Al menos una letra mayúscula</li>
              <li>Al menos un número</li>
              <li>Al menos un carácter especial</li>
            </ul>
          </div>
          <div className="flex gap-2 pt-4">
            <MaterialButton variant="outlined" onClick={() => setPasswordDialogOpen(false)} className="flex-1">
              Cancelar
            </MaterialButton>
            <MaterialButton variant="filled" onClick={handleChangePassword} className="flex-1">
              <Lock className="w-4 h-4 mr-2" />
              Cambiar contraseña
            </MaterialButton>
          </div>
        </div>
      </MaterialDialog>
    </div>
  );
}