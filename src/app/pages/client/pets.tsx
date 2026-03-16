import { useState } from "react";
import { Link } from "react-router";
import { MaterialCard, MaterialCardContent, MaterialCardHeader } from "../../components/material-card";
import { MaterialButton } from "../../components/material-button";
import { MaterialChip } from "../../components/material-chip";
import { MaterialDialog } from "../../components/material-dialog";
import { MaterialTextField } from "../../components/material-text-field";
import { MaterialSelect } from "../../components/material-select";
import { Heart, Calendar, Weight, Cake, Info, Plus, FileText, Syringe } from "lucide-react";
import { toast } from "sonner";

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: string;
  weight: string;
  gender: string;
  color: string;
  allergies: string;
  lastVisit?: string;
  nextVaccination?: string;
}

const myPets: Pet[] = [
  {
    id: 1,
    name: "Max",
    species: "Perro",
    breed: "Labrador",
    age: "3 años",
    weight: "28 kg",
    gender: "Macho",
    color: "Dorado",
    allergies: "Ninguna conocida",
    lastVisit: "2026-02-20",
    nextVaccination: "2026-03-15"
  },
  {
    id: 2,
    name: "Luna",
    species: "Gato",
    breed: "Siamés",
    age: "2 años",
    weight: "4 kg",
    gender: "Hembra",
    color: "Blanco y marrón",
    allergies: "Pollo",
    lastVisit: "2026-02-15",
    nextVaccination: "2026-04-10"
  },
];

export function ClientPetsPage() {
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [addPetOpen, setAddPetOpen] = useState(false);

  const handleAddPet = () => {
    toast.success("Solicitud enviada. El personal revisará y agregará a tu mascota.");
    setAddPetOpen(false);
  };

  return (
    <div className="p-4 md:p-6 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Mis Mascotas</h1>
          <p className="text-muted-foreground">Gestiona la información de tus compañeros peludos</p>
        </div>
        <MaterialButton
          variant="filled"
          onClick={() => setAddPetOpen(true)}
          className="w-full sm:w-auto"
        >
          <Plus className="w-5 h-5 mr-2" />
          Solicitar agregar mascota
        </MaterialButton>
      </div>

      {/* Pets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {myPets.map((pet) => (
          <MaterialCard key={pet.id} elevated>
            <MaterialCardHeader>
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-[#7cb342] text-white flex items-center justify-center font-bold text-xl">
                    {pet.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{pet.name}</h3>
                    <p className="text-sm text-muted-foreground">{pet.breed}</p>
                  </div>
                </div>
                <MaterialChip 
                  label={pet.species} 
                  color="confirmed" 
                  size="sm"
                />
              </div>
            </MaterialCardHeader>
            <MaterialCardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <Cake className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Edad</p>
                    <p className="font-semibold">{pet.age}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Weight className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Peso</p>
                    <p className="font-semibold">{pet.weight}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Info className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Género</p>
                    <p className="font-semibold">{pet.gender}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Heart className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Color</p>
                    <p className="font-semibold">{pet.color}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-muted rounded-lg mb-4">
                <p className="text-xs text-muted-foreground mb-1">Alergias</p>
                <p className="text-sm font-medium">{pet.allergies}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-border">
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Calendar className="w-3 h-3" />
                    <span>Última visita</span>
                  </div>
                  <p className="text-sm font-semibold">{pet.lastVisit ? new Date(pet.lastVisit).toLocaleDateString('es-PE') : 'N/A'}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                    <Syringe className="w-3 h-3" />
                    <span>Próxima vacuna</span>
                  </div>
                  <p className="text-sm font-semibold">{pet.nextVaccination ? new Date(pet.nextVaccination).toLocaleDateString('es-PE') : 'N/A'}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <MaterialButton
                  variant="outlined"
                  size="sm"
                  className="flex-1"
                  onClick={() => setSelectedPet(pet)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Ver detalles
                </MaterialButton>
                <Link to="/client/appointments/new" className="flex-1">
                  <MaterialButton variant="filled" size="sm" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Agendar cita
                  </MaterialButton>
                </Link>
              </div>
            </MaterialCardContent>
          </MaterialCard>
        ))}
      </div>

      {/* Pet Details Dialog */}
      <MaterialDialog
        open={selectedPet !== null}
        onOpenChange={(open) => !open && setSelectedPet(null)}
        title={selectedPet?.name || ""}
        description="Información detallada de tu mascota"
      >
        {selectedPet && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Especie</p>
                <p className="font-semibold">{selectedPet.species}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Raza</p>
                <p className="font-semibold">{selectedPet.breed}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Edad</p>
                <p className="font-semibold">{selectedPet.age}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Peso</p>
                <p className="font-semibold">{selectedPet.weight}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Género</p>
                <p className="font-semibold">{selectedPet.gender}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Color</p>
                <p className="font-semibold">{selectedPet.color}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Alergias conocidas</p>
              <p className="font-semibold">{selectedPet.allergies}</p>
            </div>
            <div className="flex gap-2 pt-4">
              <MaterialButton variant="outlined" onClick={() => setSelectedPet(null)} className="flex-1">
                Cerrar
              </MaterialButton>
              <Link to="/client/appointments/new" className="flex-1">
                <MaterialButton variant="filled" className="w-full" onClick={() => setSelectedPet(null)}>
                  Agendar cita
                </MaterialButton>
              </Link>
            </div>
          </div>
        )}
      </MaterialDialog>

      {/* Add Pet Dialog */}
      <MaterialDialog
        open={addPetOpen}
        onOpenChange={setAddPetOpen}
        title="Solicitar agregar mascota"
        description="Completa la información de tu nueva mascota"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Completa la información de tu mascota. El personal revisará y agregará a tu mascota.
          </p>
          <MaterialTextField label="Nombre" placeholder="Ej: Max" />
          <MaterialSelect
            label="Especie"
            options={[
              { value: "perro", label: "Perro" },
              { value: "gato", label: "Gato" },
              { value: "otro", label: "Otro" },
            ]}
          />
          <MaterialTextField label="Raza" placeholder="Ej: Labrador" />
          <div className="grid grid-cols-2 gap-4">
            <MaterialTextField label="Edad" placeholder="Ej: 3 años" />
            <MaterialTextField label="Peso" placeholder="Ej: 28 kg" />
          </div>
          <MaterialSelect
            label="Género"
            options={[
              { value: "macho", label: "Macho" },
              { value: "hembra", label: "Hembra" },
            ]}
          />
          <MaterialTextField label="Color" placeholder="Ej: Dorado" />
          <MaterialTextField 
            label="Alergias conocidas" 
            placeholder="Ej: Pollo, ninguna" 
            multiline
            rows={2}
          />
          <div className="flex gap-2 pt-4">
            <MaterialButton variant="outlined" onClick={() => setAddPetOpen(false)} className="flex-1">
              Cancelar
            </MaterialButton>
            <MaterialButton variant="filled" onClick={handleAddPet} className="flex-1">
              Enviar solicitud
            </MaterialButton>
          </div>
        </div>
      </MaterialDialog>
    </div>
  );
}