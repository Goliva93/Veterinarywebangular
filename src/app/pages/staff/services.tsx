import { useState } from "react";
import { MaterialCard, MaterialCardContent, MaterialCardHeader } from "../../components/material-card";
import { MaterialButton } from "../../components/material-button";
import { MaterialTextField } from "../../components/material-text-field";
import { MaterialSelect } from "../../components/material-select";
import { MaterialDialog } from "../../components/material-dialog";
import { Plus, Edit2, Trash2, Clock, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface Service {
  id: number;
  name: string;
  category: string;
  duration: number; // in minutes
  price: number;
  location: string;
  active: boolean;
}

const mockServices: Service[] = [
  { id: 1, name: "Consulta General", category: "consulta", duration: 60, price: 80, location: "Todas", active: true },
  { id: 2, name: "Consulta Especializada", category: "consulta", duration: 90, price: 120, location: "Todas", active: true },
  { id: 3, name: "Grooming Básico", category: "grooming", duration: 120, price: 60, location: "Todas", active: true },
  { id: 4, name: "Grooming Premium", category: "grooming", duration: 180, price: 100, location: "Todas", active: true },
  { id: 5, name: "Vacunación", category: "vacuna", duration: 30, price: 50, location: "Todas", active: true },
  { id: 6, name: "Control de Rutina", category: "control", duration: 45, price: 60, location: "Todas", active: true },
  { id: 7, name: "Desparasitación", category: "control", duration: 30, price: 40, location: "Todas", active: true },
  { id: 8, name: "Cirugía Menor", category: "cirugia", duration: 120, price: 300, location: "Sede Surco / Barranco", active: true },
];

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "consulta",
    duration: "",
    price: "",
    location: "Todas",
  });
  const [filterCategory, setFilterCategory] = useState("all");

  const handleOpenDialog = (service?: Service) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        category: service.category,
        duration: service.duration.toString(),
        price: service.price.toString(),
        location: service.location,
      });
    } else {
      setEditingService(null);
      setFormData({
        name: "",
        category: "consulta",
        duration: "",
        price: "",
        location: "Todas",
      });
    }
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.duration || !formData.price) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    if (editingService) {
      setServices(services.map(s => 
        s.id === editingService.id 
          ? { ...s, ...formData, duration: parseInt(formData.duration), price: parseFloat(formData.price) }
          : s
      ));
      toast.success("Servicio actualizado exitosamente");
    } else {
      const newService: Service = {
        id: Math.max(...services.map(s => s.id)) + 1,
        ...formData,
        duration: parseInt(formData.duration),
        price: parseFloat(formData.price),
        active: true,
      };
      setServices([...services, newService]);
      toast.success("Servicio creado exitosamente");
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar este servicio?")) {
      setServices(services.filter(s => s.id !== id));
      toast.success("Servicio eliminado exitosamente");
    }
  };

  const filteredServices = filterCategory === "all" 
    ? services 
    : services.filter(s => s.category === filterCategory);

  const categoryLabels: Record<string, string> = {
    consulta: "Consulta",
    grooming: "Grooming",
    vacuna: "Vacunación",
    control: "Control",
    cirugia: "Cirugía",
  };

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Servicios y Tarifas</h1>
          <p className="text-muted-foreground">Gestiona los servicios disponibles y sus precios</p>
        </div>
        <MaterialButton onClick={() => handleOpenDialog()}>
          <Plus className="w-5 h-5 mr-2" />
          Nuevo servicio
        </MaterialButton>
      </div>

      {/* Filters */}
      <MaterialCard className="mb-6">
        <MaterialCardContent className="py-4">
          <div className="flex flex-wrap gap-2">
            <MaterialButton
              variant={filterCategory === "all" ? "filled" : "outlined"}
              size="sm"
              onClick={() => setFilterCategory("all")}
            >
              Todos ({services.length})
            </MaterialButton>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <MaterialButton
                key={key}
                variant={filterCategory === key ? "filled" : "outlined"}
                size="sm"
                onClick={() => setFilterCategory(key)}
              >
                {label} ({services.filter(s => s.category === key).length})
              </MaterialButton>
            ))}
          </div>
        </MaterialCardContent>
      </MaterialCard>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service) => (
          <MaterialCard key={service.id} elevated>
            <MaterialCardHeader>
              <div className="flex items-start justify-between w-full">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{service.name}</h3>
                  <span className="inline-block px-2 py-1 bg-[#7cb342]/10 text-[#7cb342] text-xs font-medium rounded-lg">
                    {categoryLabels[service.category]}
                  </span>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleOpenDialog(service)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 hover:bg-[#ef5350]/10 text-[#ef5350] rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </MaterialCardHeader>
            <MaterialCardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Duración:</span>
                  <span className="font-semibold">{service.duration} min</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Precio:</span>
                  <span className="font-semibold text-[#7cb342]">S/ {service.price.toFixed(2)}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Sede:</span>
                  <span className="ml-2 font-medium">{service.location}</span>
                </div>
              </div>
            </MaterialCardContent>
          </MaterialCard>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hay servicios en esta categoría</p>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <MaterialDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingService ? "Editar Servicio" : "Nuevo Servicio"}
        description={editingService ? "Actualiza la información del servicio" : "Crea un nuevo servicio"}
        maxWidth="md"
      >
        <div className="p-6 space-y-4">
          <MaterialTextField
            label="Nombre del servicio"
            placeholder="Ej: Consulta General"
            fullWidth
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          
          <MaterialSelect
            label="Categoría"
            fullWidth
            options={Object.entries(categoryLabels).map(([value, label]) => ({
              value,
              label,
            }))}
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <MaterialTextField
              label="Duración (minutos)"
              type="number"
              placeholder="60"
              fullWidth
              startIcon={<Clock className="w-5 h-5" />}
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
            <MaterialTextField
              label="Precio (S/)"
              type="number"
              placeholder="0.00"
              fullWidth
              startIcon={<DollarSign className="w-5 h-5" />}
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>

          <MaterialSelect
            label="Sede disponible"
            fullWidth
            options={[
              { value: "Todas", label: "Todas las sedes" },
              { value: "Sede Chorrillos", label: "Sede Chorrillos" },
              { value: "Sede Surco / Barranco", label: "Sede Surco / Barranco" },
            ]}
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />

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
              {editingService ? "Actualizar" : "Crear"} servicio
            </MaterialButton>
          </div>
        </div>
      </MaterialDialog>
    </div>
  );
}