import { useState } from "react";
import { useNavigate } from "react-router";
import { MaterialCard, MaterialCardContent } from "../../components/material-card";
import { MaterialButton } from "../../components/material-button";
import { MaterialTextField } from "../../components/material-text-field";
import { MaterialChip } from "../../components/material-chip";
import { Search, Plus, Eye, Edit2 } from "lucide-react";
import { Switch } from "../../components/ui/switch";
import { toast } from "sonner";

interface Pet {
  id: number;
  name: string;
  species: string;
  breed: string;
  age: string;
  owner: string;
  ownerPhone: string;
  active: boolean;
}

const mockPets: Pet[] = [
  { id: 1, name: "Max", species: "Perro", breed: "Golden Retriever", age: "3 años", owner: "María García", ownerPhone: "987654321", active: true },
  { id: 2, name: "Luna", species: "Gato", breed: "Siamés", age: "2 años", owner: "María García", ownerPhone: "987654321", active: true },
  { id: 3, name: "Rocky", species: "Perro", breed: "Labrador", age: "5 años", owner: "Juan Pérez", ownerPhone: "987654322", active: true },
  { id: 4, name: "Michi", species: "Gato", breed: "Persa", age: "4 años", owner: "Ana Torres", ownerPhone: "987654323", active: true },
  { id: 5, name: "Toby", species: "Perro", breed: "Beagle", age: "1 año", owner: "Carlos Ruiz", ownerPhone: "987654324", active: false },
  { id: 6, name: "Pelusa", species: "Gato", breed: "Angora", age: "6 años", owner: "Sofía Mendoza", ownerPhone: "987654325", active: false },
];

export function PetsPage() {
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>(mockPets);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSpecies, setFilterSpecies] = useState("all");
  const [showInactive, setShowInactive] = useState(false);

  const handleToggleActive = (id: number) => {
    setPets(pets.map(pet =>
      pet.id === id ? { ...pet, active: !pet.active } : pet
    ));
    const pet = pets.find(p => p.id === id);
    if (pet) {
      toast.success(pet.active ? "Mascota desactivada" : "Mascota reactivada");
    }
  };

  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.owner.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecies = filterSpecies === "all" || pet.species === filterSpecies;
    const matchesActive = showInactive || pet.active;
    return matchesSearch && matchesSpecies && matchesActive;
  });

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Mascotas</h1>
          <p className="text-muted-foreground">Gestiona la información de todas las mascotas</p>
        </div>
        <MaterialButton onClick={() => navigate("/staff/pets/new")}>
          <Plus className="w-5 h-5 mr-2" />
          Nueva mascota
        </MaterialButton>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MaterialCard elevated>
          <MaterialCardContent className="py-4">
            <p className="text-2xl font-bold text-foreground">{pets.filter(p => p.active).length}</p>
            <p className="text-sm text-muted-foreground">Activas</p>
          </MaterialCardContent>
        </MaterialCard>
        <MaterialCard elevated>
          <MaterialCardContent className="py-4">
            <p className="text-2xl font-bold text-foreground">{pets.filter(p => p.species === "Perro").length}</p>
            <p className="text-sm text-muted-foreground">Perros</p>
          </MaterialCardContent>
        </MaterialCard>
        <MaterialCard elevated>
          <MaterialCardContent className="py-4">
            <p className="text-2xl font-bold text-foreground">{pets.filter(p => p.species === "Gato").length}</p>
            <p className="text-sm text-muted-foreground">Gatos</p>
          </MaterialCardContent>
        </MaterialCard>
        <MaterialCard elevated>
          <MaterialCardContent className="py-4">
            <p className="text-2xl font-bold text-foreground">{pets.filter(p => !p.active).length}</p>
            <p className="text-sm text-muted-foreground">Inactivas</p>
          </MaterialCardContent>
        </MaterialCard>
      </div>

      {/* Filters */}
      <MaterialCard className="mb-6">
        <MaterialCardContent className="py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <MaterialTextField
                placeholder="Buscar por nombre de mascota o dueño..."
                startIcon={<Search className="w-5 h-5" />}
                fullWidth
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <MaterialButton
                variant={filterSpecies === "all" ? "filled" : "outlined"}
                size="sm"
                onClick={() => setFilterSpecies("all")}
              >
                Todas
              </MaterialButton>
              <MaterialButton
                variant={filterSpecies === "Perro" ? "filled" : "outlined"}
                size="sm"
                onClick={() => setFilterSpecies("Perro")}
              >
                Perros
              </MaterialButton>
              <MaterialButton
                variant={filterSpecies === "Gato" ? "filled" : "outlined"}
                size="sm"
                onClick={() => setFilterSpecies("Gato")}
              >
                Gatos
              </MaterialButton>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={showInactive}
                onCheckedChange={setShowInactive}
              />
              <span className="text-sm whitespace-nowrap">Mostrar inactivas</span>
            </div>
          </div>
        </MaterialCardContent>
      </MaterialCard>

      {/* Pets Table */}
      <MaterialCard elevated>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left p-4 font-semibold">Mascota</th>
                <th className="text-left p-4 font-semibold">Especie</th>
                <th className="text-left p-4 font-semibold">Raza</th>
                <th className="text-left p-4 font-semibold">Edad</th>
                <th className="text-left p-4 font-semibold">Dueño</th>
                <th className="text-left p-4 font-semibold">Estado</th>
                <th className="text-right p-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPets.map((pet) => (
                <tr key={pet.id} className={`border-b border-border hover:bg-muted/50 transition-colors ${
                  !pet.active ? 'opacity-60' : ''
                }`}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#7cb342] text-white flex items-center justify-center font-semibold">
                        {pet.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold">{pet.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <MaterialChip
                      label={pet.species}
                      color={pet.species === "Perro" ? "primary" : "secondary"}
                    />
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{pet.breed}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm">{pet.age}</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{pet.owner}</p>
                      <p className="text-xs text-muted-foreground">{pet.ownerPhone}</p>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={pet.active}
                        onCheckedChange={() => handleToggleActive(pet.id)}
                      />
                      <MaterialChip
                        label={pet.active ? "Activa" : "Inactiva"}
                        color={pet.active ? "success" : "default"}
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/staff/pets/${pet.id}`)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="Ver detalle"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => navigate(`/staff/pets/${pet.id}/edit`)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </MaterialCard>

      {filteredPets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron mascotas</p>
        </div>
      )}
    </div>
  );
}
