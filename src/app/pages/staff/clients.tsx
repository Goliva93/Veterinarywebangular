import { useState } from "react";
import { Link } from "react-router";
import { MaterialCard, MaterialCardContent } from "../../components/material-card";
import { MaterialButton } from "../../components/material-button";
import { MaterialTextField } from "../../components/material-text-field";
import { Search, Plus, Phone, Mail } from "lucide-react";

const clients = [
  { id: 1, name: "María García", phone: "987654321", email: "maria@ejemplo.com", pets: 2, lastVisit: "2026-02-20" },
  { id: 2, name: "Juan Pérez", phone: "987654322", email: "juan@ejemplo.com", pets: 1, lastVisit: "2026-02-18" },
  { id: 3, name: "Ana Torres", phone: "987654323", email: "ana@ejemplo.com", pets: 3, lastVisit: "2026-02-15" },
  { id: 4, name: "Carlos Ruiz", phone: "987654324", email: "carlos@ejemplo.com", pets: 1, lastVisit: "2026-02-12" },
  { id: 5, name: "Laura Flores", phone: "987654325", email: "laura@ejemplo.com", pets: 2, lastVisit: "2026-02-10" },
];

export function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6 max-w-[1600px] mx-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Clientes</h1>
          <p className="text-muted-foreground">Gestiona la información de tus clientes</p>
        </div>
        <MaterialButton>
          <Plus className="w-5 h-5" />
          Nuevo Cliente
        </MaterialButton>
      </div>

      <MaterialCard className="mb-6">
        <MaterialCardContent>
          <MaterialTextField
            placeholder="Buscar por nombre, teléfono o email..."
            startIcon={<Search className="w-5 h-5" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
        </MaterialCardContent>
      </MaterialCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredClients.map((client) => (
          <Link key={client.id} to={`/staff/clients/${client.id}`}>
            <MaterialCard hoverable>
              <MaterialCardContent>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#7cb342] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {client.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg mb-2">{client.name}</h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4" />
                        <span>{client.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        <span className="truncate">{client.email}</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{client.pets} mascota(s)</span>
                      <span className="text-muted-foreground">Última visita: {client.lastVisit}</span>
                    </div>
                  </div>
                </div>
              </MaterialCardContent>
            </MaterialCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
