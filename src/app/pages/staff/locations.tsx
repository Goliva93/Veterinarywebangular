import { useState } from "react";
import { MaterialCard, MaterialCardContent, MaterialCardHeader } from "../../components/material-card";
import { MaterialButton } from "../../components/material-button";
import { MaterialTextField } from "../../components/material-text-field";
import { MaterialDialog } from "../../components/material-dialog";
import { MaterialChip } from "../../components/material-chip";
import { Plus, Edit2, MapPin, Clock, Phone, Mail, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Switch } from "../../components/ui/switch";

interface Location {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: {
    day: string;
    open: string;
    close: string;
    enabled: boolean;
  }[];
  active: boolean;
}

const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

const mockLocations: Location[] = [
  {
    id: 1,
    name: "Chorrillos",
    address: "Av. Principal 123, Chorrillos, Lima",
    phone: "987654321",
    email: "chorrillos@mascotario.com",
    hours: [
      { day: "Lunes", open: "09:00", close: "18:00", enabled: true },
      { day: "Martes", open: "09:00", close: "18:00", enabled: true },
      { day: "Miércoles", open: "09:00", close: "18:00", enabled: true },
      { day: "Jueves", open: "09:00", close: "18:00", enabled: true },
      { day: "Viernes", open: "09:00", close: "18:00", enabled: true },
      { day: "Sábado", open: "09:00", close: "14:00", enabled: true },
      { day: "Domingo", open: "09:00", close: "14:00", enabled: false },
    ],
    active: true,
  },
  {
    id: 2,
    name: "Surco/Barranco",
    address: "Calle Los Olivos 456, Surco, Lima",
    phone: "987654322",
    email: "surco@mascotario.com",
    hours: [
      { day: "Lunes", open: "10:00", close: "19:00", enabled: true },
      { day: "Martes", open: "10:00", close: "19:00", enabled: true },
      { day: "Miércoles", open: "10:00", close: "19:00", enabled: true },
      { day: "Jueves", open: "10:00", close: "19:00", enabled: true },
      { day: "Viernes", open: "10:00", close: "19:00", enabled: true },
      { day: "Sábado", open: "10:00", close: "15:00", enabled: true },
      { day: "Domingo", open: "10:00", close: "15:00", enabled: false },
    ],
    active: true,
  },
];

export function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>(mockLocations);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const handleOpenDialog = (location?: Location) => {
    if (location) {
      setEditingLocation(location);
      setFormData({
        name: location.name,
        address: location.address,
        phone: location.phone,
        email: location.email,
      });
    } else {
      setEditingLocation(null);
      setFormData({
        name: "",
        address: "",
        phone: "",
        email: "",
      });
    }
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.address || !formData.phone || !formData.email) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    if (editingLocation) {
      setLocations(locations.map(l => 
        l.id === editingLocation.id 
          ? { ...l, ...formData }
          : l
      ));
      toast.success("Sede actualizada exitosamente");
    } else {
      const newLocation: Location = {
        id: Math.max(...locations.map(l => l.id)) + 1,
        ...formData,
        hours: daysOfWeek.map(day => ({
          day,
          open: "09:00",
          close: "18:00",
          enabled: day !== "Domingo",
        })),
        active: true,
      };
      setLocations([...locations, newLocation]);
      toast.success("Sede creada exitosamente");
    }
    setDialogOpen(false);
  };

  const handleToggleDay = (locationId: number, dayIndex: number) => {
    setLocations(locations.map(loc => {
      if (loc.id === locationId) {
        const newHours = [...loc.hours];
        newHours[dayIndex] = { ...newHours[dayIndex], enabled: !newHours[dayIndex].enabled };
        return { ...loc, hours: newHours };
      }
      return loc;
    }));
    toast.success("Horario actualizado");
  };

  const handleTimeChange = (locationId: number, dayIndex: number, field: 'open' | 'close', value: string) => {
    setLocations(locations.map(loc => {
      if (loc.id === locationId) {
        const newHours = [...loc.hours];
        newHours[dayIndex] = { ...newHours[dayIndex], [field]: value };
        return { ...loc, hours: newHours };
      }
      return loc;
    }));
  };

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Sedes y Horarios</h1>
          <p className="text-muted-foreground">Configura las sedes y su disponibilidad</p>
        </div>
        <MaterialButton onClick={() => handleOpenDialog()}>
          <Plus className="w-5 h-5 mr-2" />
          Nueva sede
        </MaterialButton>
      </div>

      {/* Locations */}
      <div className="space-y-6">
        {locations.map((location) => (
          <MaterialCard key={location.id} elevated>
            <MaterialCardHeader>
              <div className="flex items-start justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#7cb342]/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#7cb342]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{location.name}</h3>
                    <MaterialChip 
                      label={location.active ? "Activa" : "Inactiva"}
                      color={location.active ? "success" : "default"}
                    />
                  </div>
                </div>
                <MaterialButton
                  variant="outlined"
                  size="sm"
                  onClick={() => handleOpenDialog(location)}
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Editar
                </MaterialButton>
              </div>
            </MaterialCardHeader>
            <MaterialCardContent>
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-border">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Dirección</p>
                    <p className="font-semibold">{location.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Teléfono</p>
                    <p className="font-semibold">{location.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Correo</p>
                    <p className="font-semibold">{location.email}</p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <h4 className="font-semibold">Horarios de atención</h4>
                </div>
                <div className="space-y-3">
                  {location.hours.map((hour, index) => (
                    <div 
                      key={hour.day} 
                      className={`flex flex-col sm:flex-row sm:items-center gap-3 p-3 rounded-lg border ${
                        hour.enabled ? 'border-border bg-background' : 'border-border bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <Switch
                          checked={hour.enabled}
                          onCheckedChange={() => handleToggleDay(location.id, index)}
                        />
                        <span className={`font-medium w-24 ${!hour.enabled ? 'text-muted-foreground' : ''}`}>
                          {hour.day}
                        </span>
                      </div>
                      {hour.enabled ? (
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2">
                            <input
                              type="time"
                              value={hour.open}
                              onChange={(e) => handleTimeChange(location.id, index, 'open', e.target.value)}
                              className="px-3 py-2 border-2 border-border rounded-lg focus:border-[#7cb342] outline-none"
                            />
                            <span className="text-muted-foreground">a</span>
                            <input
                              type="time"
                              value={hour.close}
                              onChange={(e) => handleTimeChange(location.id, index, 'close', e.target.value)}
                              className="px-3 py-2 border-2 border-border rounded-lg focus:border-[#7cb342] outline-none"
                            />
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Cerrado</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Warning */}
              <div className="mt-6 p-4 bg-[#fdd835]/10 border border-[#fdd835]/30 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#fdd835] mt-0.5" />
                <div>
                  <p className="font-semibold text-sm mb-1">Nota importante</p>
                  <p className="text-sm text-muted-foreground">
                    Los cambios en los horarios afectarán la disponibilidad para nuevas citas. 
                    Las citas ya programadas no se verán afectadas.
                  </p>
                </div>
              </div>
            </MaterialCardContent>
          </MaterialCard>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <MaterialDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingLocation ? "Editar Sede" : "Nueva Sede"}
        description={editingLocation ? "Actualiza la información de la sede" : "Crea una nueva sede"}
        maxWidth="md"
      >
        <div className="p-6 space-y-4">
          <MaterialTextField
            label="Nombre de la sede"
            placeholder="Ej: Chorrillos"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          
          <MaterialTextField
            label="Dirección"
            placeholder="Av. Principal 123, Distrito, Lima"
            fullWidth
            multiline
            rows={2}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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

          <MaterialTextField
            label="Correo electrónico"
            type="email"
            placeholder="sede@mascotario.com"
            fullWidth
            startIcon={<Mail className="w-5 h-5" />}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          {!editingLocation && (
            <div className="p-4 bg-muted rounded-lg text-sm text-muted-foreground">
              <p className="font-semibold mb-1">Horarios predeterminados:</p>
              <p>Lunes a Viernes: 09:00 - 18:00</p>
              <p>Sábado: 09:00 - 14:00</p>
              <p>Domingo: Cerrado</p>
              <p className="mt-2 text-xs">Podrás personalizar los horarios después de crear la sede.</p>
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
              {editingLocation ? "Actualizar" : "Crear"} sede
            </MaterialButton>
          </div>
        </div>
      </MaterialDialog>
    </div>
  );
}
