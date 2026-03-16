import { useState } from "react";
import { MaterialCard, MaterialCardContent, MaterialCardHeader } from "../../components/material-card";
import { MaterialButton } from "../../components/material-button";
import { MaterialTextField } from "../../components/material-text-field";
import { MaterialSelect } from "../../components/material-select";
import { MaterialDialog } from "../../components/material-dialog";
import { MaterialChip } from "../../components/material-chip";
import { Plus, Edit2, Trash2, Shield, User, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "../../components/ui/switch";

interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: "admin" | "recepcion" | "veterinario" | "groomer";
  location: string;
  active: boolean;
}

const mockUsers: UserData[] = [
  { id: 1, name: "Dr. Carlos Méndez", email: "carlos@mascotario.com", phone: "987654321", role: "veterinario", location: "Todas", active: true },
  { id: 2, name: "Ana López", email: "ana@mascotario.com", phone: "987654322", role: "recepcion", location: "Chorrillos", active: true },
  { id: 3, name: "Juan Pérez", email: "juan@mascotario.com", phone: "987654323", role: "groomer", location: "Surco/Barranco", active: true },
  { id: 4, name: "María García", email: "maria@mascotario.com", phone: "987654324", role: "admin", location: "Todas", active: true },
  { id: 5, name: "Sofía Torres", email: "sofia@mascotario.com", phone: "987654325", role: "veterinario", location: "Surco/Barranco", active: true },
];

const roleLabels: Record<string, string> = {
  admin: "Administrador",
  recepcion: "Recepción",
  veterinario: "Veterinario",
  groomer: "Groomer",
};

const roleColors: Record<string, string> = {
  admin: "#ef5350",
  recepcion: "#42a5f5",
  veterinario: "#7cb342",
  groomer: "#fdd835",
};

const rolePermissions: Record<string, string[]> = {
  admin: ["Todo el sistema", "Gestión de usuarios", "Configuración", "Reportes avanzados"],
  recepcion: ["Agenda y citas", "Clientes y mascotas", "Pagos", "Reportes básicos"],
  veterinario: ["Historia clínica", "Citas médicas", "Ver pagos", "Resumen de atenciones"],
  groomer: ["Agenda grooming", "Finalizar atención", "Ver pagos", "Resumen"],
};

export function UsersPage() {
  const [users, setUsers] = useState<UserData[]>(mockUsers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [permissionsDialogOpen, setPermissionsDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "recepcion" as UserData["role"],
    location: "Todas",
  });
  const [filterRole, setFilterRole] = useState("all");

  const handleOpenDialog = (user?: UserData) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        location: user.location,
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "recepcion",
        location: "Todas",
      });
    }
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    if (editingUser) {
      setUsers(users.map(u => 
        u.id === editingUser.id 
          ? { ...u, ...formData }
          : u
      ));
      toast.success("Usuario actualizado exitosamente");
    } else {
      const newUser: UserData = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...formData,
        active: true,
      };
      setUsers([...users, newUser]);
      toast.success("Usuario creado exitosamente");
    }
    setDialogOpen(false);
  };

  const handleToggleActive = (id: number) => {
    setUsers(users.map(u => 
      u.id === id ? { ...u, active: !u.active } : u
    ));
    toast.success("Estado actualizado");
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
      setUsers(users.filter(u => u.id !== id));
      toast.success("Usuario eliminado exitosamente");
    }
  };

  const filteredUsers = filterRole === "all" 
    ? users 
    : users.filter(u => u.role === filterRole);

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Usuarios y Roles</h1>
          <p className="text-muted-foreground">Administra usuarios y permisos del sistema</p>
        </div>
        <MaterialButton onClick={() => handleOpenDialog()}>
          <Plus className="w-5 h-5 mr-2" />
          Nuevo usuario
        </MaterialButton>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Object.entries(roleLabels).map(([role, label]) => (
          <MaterialCard key={role} elevated>
            <MaterialCardContent className="py-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${roleColors[role]}20` }}
                >
                  <Shield className="w-5 h-5" style={{ color: roleColors[role] }} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{users.filter(u => u.role === role).length}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              </div>
            </MaterialCardContent>
          </MaterialCard>
        ))}
      </div>

      {/* Filters */}
      <MaterialCard className="mb-6">
        <MaterialCardContent className="py-4">
          <div className="flex flex-wrap gap-2">
            <MaterialButton
              variant={filterRole === "all" ? "filled" : "outlined"}
              size="sm"
              onClick={() => setFilterRole("all")}
            >
              Todos ({users.length})
            </MaterialButton>
            {Object.entries(roleLabels).map(([key, label]) => (
              <MaterialButton
                key={key}
                variant={filterRole === key ? "filled" : "outlined"}
                size="sm"
                onClick={() => setFilterRole(key)}
              >
                {label} ({users.filter(u => u.role === key).length})
              </MaterialButton>
            ))}
          </div>
        </MaterialCardContent>
      </MaterialCard>

      {/* Users Table */}
      <MaterialCard elevated>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left p-4 font-semibold">Usuario</th>
                <th className="text-left p-4 font-semibold">Rol</th>
                <th className="text-left p-4 font-semibold">Sede</th>
                <th className="text-left p-4 font-semibold">Estado</th>
                <th className="text-left p-4 font-semibold">Permisos</th>
                <th className="text-right p-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#7cb342] text-white flex items-center justify-center font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {user.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <MaterialChip 
                      label={roleLabels[user.role]}
                      style={{ backgroundColor: `${roleColors[user.role]}20`, color: roleColors[user.role] }}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {user.location}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={user.active}
                        onCheckedChange={() => handleToggleActive(user.id)}
                      />
                      <span className="text-sm">
                        {user.active ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <MaterialButton
                      variant="text"
                      size="sm"
                      onClick={() => {
                        setSelectedRole(user.role);
                        setPermissionsDialogOpen(true);
                      }}
                    >
                      <Shield className="w-4 h-4 mr-1" />
                      Ver permisos
                    </MaterialButton>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenDialog(user)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="p-2 hover:bg-[#ef5350]/10 text-[#ef5350] rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MaterialCard>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hay usuarios con este rol</p>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <MaterialDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingUser ? "Editar Usuario" : "Nuevo Usuario"}
        description={editingUser ? "Actualiza la información del usuario" : "Crea un nuevo usuario"}
        maxWidth="md"
      >
        <div className="p-6 space-y-4">
          <MaterialTextField
            label="Nombre completo"
            placeholder="Ej: Dr. Carlos Méndez"
            fullWidth
            startIcon={<User className="w-5 h-5" />}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          
          <MaterialTextField
            label="Correo electrónico"
            type="email"
            placeholder="correo@mascotario.com"
            fullWidth
            startIcon={<Mail className="w-5 h-5" />}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <MaterialTextField
            label="Teléfono"
            type="tel"
            placeholder="987654321"
            fullWidth
            startIcon={<Phone className="w-5 h-5" />}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />

          <MaterialSelect
            label="Rol"
            fullWidth
            options={Object.entries(roleLabels).map(([value, label]) => ({
              value,
              label,
            }))}
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as UserData["role"] })}
          />

          <MaterialSelect
            label="Sede asignada"
            fullWidth
            options={[
              { value: "Todas", label: "Todas las sedes" },
              { value: "Chorrillos", label: "Chorrillos" },
              { value: "Surco/Barranco", label: "Surco/Barranco" },
            ]}
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />

          {!editingUser && (
            <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground">
              <p className="font-semibold mb-1">Contraseña temporal:</p>
              <p>Se enviará una contraseña temporal al correo del usuario.</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <MaterialButton
              variant="outlined"
              fullWidth
              onClick={() => setDialogOpen(false)}
            >
              Cancelar
            </MaterialButton>
            <MaterialButton
              variant="filled"
              fullWidth
              onClick={handleSave}
            >
              {editingUser ? "Actualizar" : "Crear"} usuario
            </MaterialButton>
          </div>
        </div>
      </MaterialDialog>

      {/* Permissions Dialog */}
      <MaterialDialog
        open={permissionsDialogOpen}
        onOpenChange={setPermissionsDialogOpen}
        title={selectedRole ? `Permisos - ${roleLabels[selectedRole]}` : "Permisos"}
        description="Lista de permisos asignados a este rol"
        maxWidth="sm"
      >
        <div className="p-6">
          {selectedRole && (
            <div className="space-y-3">
              {rolePermissions[selectedRole].map((permission, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <Shield className="w-5 h-5 text-[#7cb342]" />
                  <span className="font-medium">{permission}</span>
                </div>
              ))}
            </div>
          )}
          <div className="mt-6">
            <MaterialButton
              variant="filled"
              fullWidth
              onClick={() => setPermissionsDialogOpen(false)}
            >
              Cerrar
            </MaterialButton>
          </div>
        </div>
      </MaterialDialog>
    </div>
  );
}