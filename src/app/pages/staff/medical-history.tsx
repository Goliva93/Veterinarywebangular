import { useState } from "react";
import { MaterialCard, MaterialCardContent, MaterialCardHeader } from "../../components/material-card";
import { MaterialButton } from "../../components/material-button";
import { MaterialTextField } from "../../components/material-text-field";
import { MaterialDialog } from "../../components/material-dialog";
import { MaterialChip } from "../../components/material-chip";
import { Plus, FileText, Syringe, Heart, Calendar, User, Upload, Download } from "lucide-react";
import { toast } from "sonner";

interface MedicalRecord {
  id: number;
  date: string;
  type: "consulta" | "vacuna" | "cirugia" | "control";
  veterinarian: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}

interface Vaccine {
  id: number;
  name: string;
  date: string;
  nextDate: string;
  veterinarian: string;
}

const mockRecords: MedicalRecord[] = [
  {
    id: 1,
    date: "2024-03-10",
    type: "consulta",
    veterinarian: "Dr. Carlos Méndez",
    diagnosis: "Infección respiratoria leve",
    treatment: "Antibiótico cada 12h por 7 días",
    notes: "Control en 7 días. Mantener hidratado.",
  },
  {
    id: 2,
    date: "2024-02-15",
    type: "vacuna",
    veterinarian: "Dr. Carlos Méndez",
    diagnosis: "Vacunación anual",
    treatment: "Vacuna Séxtuple",
    notes: "Próxima vacuna en 1 año.",
  },
  {
    id: 3,
    date: "2024-01-20",
    type: "control",
    veterinarian: "Dra. Sofía Torres",
    diagnosis: "Control de rutina",
    treatment: "Desparasitación interna",
    notes: "Peso: 12kg. Estado general: Excelente",
  },
];

const mockVaccines: Vaccine[] = [
  { id: 1, name: "Séxtuple", date: "2024-02-15", nextDate: "2025-02-15", veterinarian: "Dr. Carlos Méndez" },
  { id: 2, name: "Antirrábica", date: "2023-08-10", nextDate: "2024-08-10", veterinarian: "Dr. Carlos Méndez" },
];

const typeLabels = {
  consulta: "Consulta",
  vacuna: "Vacunación",
  cirugia: "Cirugía",
  control: "Control",
};

const typeColors = {
  consulta: "#7cb342",
  vacuna: "#42a5f5",
  cirugia: "#ef5350",
  control: "#fdd835",
};

export function MedicalHistoryPage() {
  const [records, setRecords] = useState<MedicalRecord[]>(mockRecords);
  const [vaccines, setVaccines] = useState<Vaccine[]>(mockVaccines);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [vaccineDialogOpen, setVaccineDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "consulta" as MedicalRecord["type"],
    diagnosis: "",
    treatment: "",
    notes: "",
  });

  const handleSaveRecord = () => {
    if (!formData.diagnosis || !formData.treatment) {
      toast.error("Por favor completa los campos requeridos");
      return;
    }

    const newRecord: MedicalRecord = {
      id: Math.max(...records.map(r => r.id)) + 1,
      date: new Date().toISOString().split('T')[0],
      veterinarian: "Dr. Carlos Méndez",
      ...formData,
    };

    setRecords([newRecord, ...records]);
    toast.success("Registro médico creado exitosamente");
    setDialogOpen(false);
    setFormData({
      type: "consulta",
      diagnosis: "",
      treatment: "",
      notes: "",
    });
  };

  return (
    <div className="p-4 md:p-6 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Historia Clínica</h1>
          <p className="text-muted-foreground">Max - Perro Golden Retriever</p>
          <p className="text-sm text-muted-foreground">Dueño: María García</p>
        </div>
        <div className="flex gap-2">
          <MaterialButton variant="outlined" onClick={() => toast.success("Descargando historial...")}>
            <Download className="w-4 h-4 mr-2" />
            Descargar
          </MaterialButton>
          <MaterialButton onClick={() => setDialogOpen(true)}>
            <Plus className="w-5 h-5 mr-2" />
            Nuevo registro
          </MaterialButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Medical Records */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Registros Médicos
          </h2>

          {records.map((record) => (
            <MaterialCard key={record.id} elevated>
              <MaterialCardHeader>
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${typeColors[record.type]}20` }}
                    >
                      <FileText className="w-5 h-5" style={{ color: typeColors[record.type] }} />
                    </div>
                    <div>
                      <MaterialChip 
                        label={typeLabels[record.type]}
                        style={{ backgroundColor: `${typeColors[record.type]}20`, color: typeColors[record.type] }}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        {new Date(record.date).toLocaleDateString('es-ES', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </MaterialCardHeader>
              <MaterialCardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Veterinario</p>
                    <p className="font-semibold flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {record.veterinarian}
                    </p>
                  </div>

                  <div className="border-t border-border pt-3">
                    <p className="text-sm text-muted-foreground mb-1">Diagnóstico</p>
                    <p className="font-semibold">{record.diagnosis}</p>
                  </div>

                  <div className="border-t border-border pt-3">
                    <p className="text-sm text-muted-foreground mb-1">Tratamiento</p>
                    <p>{record.treatment}</p>
                  </div>

                  {record.notes && (
                    <div className="border-t border-border pt-3">
                      <p className="text-sm text-muted-foreground mb-1">Notas adicionales</p>
                      <p className="text-sm">{record.notes}</p>
                    </div>
                  )}
                </div>
              </MaterialCardContent>
            </MaterialCard>
          ))}
        </div>

        {/* Sidebar - Vaccines & Info */}
        <div className="space-y-4">
          {/* Vaccines */}
          <MaterialCard elevated>
            <MaterialCardHeader>
              <div className="flex items-center justify-between w-full">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Syringe className="w-5 h-5" />
                  Vacunas
                </h3>
                <MaterialButton 
                  size="sm" 
                  variant="text"
                  onClick={() => setVaccineDialogOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                </MaterialButton>
              </div>
            </MaterialCardHeader>
            <MaterialCardContent>
              <div className="space-y-3">
                {vaccines.map((vaccine) => {
                  const isUpcoming = new Date(vaccine.nextDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                  return (
                    <div 
                      key={vaccine.id} 
                      className={`p-3 rounded-lg border-2 ${
                        isUpcoming ? 'border-[#fdd835] bg-[#fdd835]/10' : 'border-border bg-muted'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="font-semibold">{vaccine.name}</p>
                        {isUpcoming && (
                          <MaterialChip label="Próxima" color="warning" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Última: {new Date(vaccine.date).toLocaleDateString('es-ES')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Próxima: {new Date(vaccine.nextDate).toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  );
                })}
              </div>
            </MaterialCardContent>
          </MaterialCard>

          {/* Pet Info Summary */}
          <MaterialCard elevated>
            <MaterialCardHeader>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Heart className="w-5 h-5" />
                Información General
              </h3>
            </MaterialCardHeader>
            <MaterialCardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Especie</p>
                  <p className="font-semibold">Perro</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Raza</p>
                  <p className="font-semibold">Golden Retriever</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Edad</p>
                  <p className="font-semibold">3 años</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Peso actual</p>
                  <p className="font-semibold">12 kg</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Alergias</p>
                  <p className="font-semibold">Ninguna conocida</p>
                </div>
              </div>
            </MaterialCardContent>
          </MaterialCard>
        </div>
      </div>

      {/* New Record Dialog */}
      <MaterialDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Nuevo Registro Médico"
        description="Completa la información de la atención"
        maxWidth="lg"
      >
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de atención</label>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(typeLabels) as Array<keyof typeof typeLabels>).map((type) => (
                  <MaterialButton
                    key={type}
                    size="sm"
                    variant={formData.type === type ? "filled" : "outlined"}
                    onClick={() => setFormData({ ...formData, type })}
                  >
                    {typeLabels[type]}
                  </MaterialButton>
                ))}
              </div>
            </div>
          </div>

          <MaterialTextField
            label="Diagnóstico / Motivo"
            placeholder="Describe el diagnóstico..."
            fullWidth
            multiline
            rows={2}
            value={formData.diagnosis}
            onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
          />

          <MaterialTextField
            label="Tratamiento / Medicación"
            placeholder="Describe el tratamiento prescrito..."
            fullWidth
            multiline
            rows={3}
            value={formData.treatment}
            onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
          />

          <MaterialTextField
            label="Notas adicionales (opcional)"
            placeholder="Observaciones, indicaciones, próximos controles..."
            fullWidth
            multiline
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />

          <div>
            <label className="block text-sm font-medium mb-2">Adjuntar archivos (opcional)</label>
            <MaterialButton variant="outlined" fullWidth>
              <Upload className="w-4 h-4 mr-2" />
              Subir exámenes, radiografías, etc.
            </MaterialButton>
          </div>

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
              onClick={handleSaveRecord}
            >
              Guardar registro
            </MaterialButton>
          </div>
        </div>
      </MaterialDialog>

      {/* Vaccine Dialog */}
      <MaterialDialog
        open={vaccineDialogOpen}
        onOpenChange={setVaccineDialogOpen}
        title="Registrar Vacuna"
        description="Completa la información de la vacuna aplicada"
        maxWidth="md"
      >
        <div className="p-6 space-y-4">
          <MaterialTextField
            label="Nombre de la vacuna"
            placeholder="Ej: Séxtuple"
            fullWidth
          />

          <div className="grid grid-cols-2 gap-4">
            <MaterialTextField
              label="Fecha de aplicación"
              type="date"
              fullWidth
            />
            <MaterialTextField
              label="Próxima dosis"
              type="date"
              fullWidth
            />
          </div>

          <MaterialTextField
            label="Notas"
            placeholder="Observaciones..."
            fullWidth
            multiline
            rows={2}
          />

          <div className="flex gap-3 pt-4">
            <MaterialButton
              variant="outlined"
              fullWidth
              onClick={() => setVaccineDialogOpen(false)}
            >
              Cancelar
            </MaterialButton>
            <MaterialButton
              variant="filled"
              fullWidth
              onClick={() => {
                toast.success("Vacuna registrada");
                setVaccineDialogOpen(false);
              }}
            >
              Guardar vacuna
            </MaterialButton>
          </div>
        </div>
      </MaterialDialog>
    </div>
  );
}
