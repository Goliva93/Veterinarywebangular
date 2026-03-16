// Mock data for El Mascotario

export const mockClients = [
  { 
    id: 1, 
    name: "María García", 
    phone: "987654321", 
    email: "maria@ejemplo.com",
    address: "Av. Principal 123, Surco",
    dni: "12345678",
    createdAt: "2024-01-15"
  },
  { 
    id: 2, 
    name: "Juan Pérez", 
    phone: "987654322", 
    email: "juan@ejemplo.com",
    address: "Calle Los Olivos 456, Chorrillos",
    dni: "23456789",
    createdAt: "2024-02-10"
  },
  { 
    id: 3, 
    name: "Ana Torres", 
    phone: "987654323", 
    email: "ana@ejemplo.com",
    address: "Jr. Las Flores 789, Surco",
    dni: "34567890",
    createdAt: "2024-03-05"
  },
];

export const mockPets = [
  { 
    id: 1, 
    clientId: 1, 
    name: "Max", 
    species: "Perro", 
    breed: "Labrador", 
    age: "3 años",
    weight: "28 kg",
    gender: "Macho",
    color: "Dorado",
    allergies: "Ninguna conocida"
  },
  { 
    id: 2, 
    clientId: 1, 
    name: "Luna", 
    species: "Gato", 
    breed: "Siamés", 
    age: "2 años",
    weight: "4 kg",
    gender: "Hembra",
    color: "Blanco y marrón",
    allergies: "Pollo"
  },
  { 
    id: 3, 
    clientId: 2, 
    name: "Rocky", 
    species: "Perro", 
    breed: "Golden Retriever", 
    age: "5 años",
    weight: "32 kg",
    gender: "Macho",
    color: "Dorado",
    allergies: "Ninguna conocida"
  },
];

export const mockAppointments = [
  { 
    id: 1, 
    date: "2026-02-24", 
    time: "09:00", 
    clientId: 1,
    petId: 1,
    service: "Consulta médica", 
    professionalId: "dr_rodriguez",
    locationId: "surco",
    status: "confirmed" as const,
    notes: "Primera consulta del mes",
    paymentStatus: "unpaid" as const
  },
  { 
    id: 2, 
    date: "2026-02-24", 
    time: "10:30", 
    clientId: 2,
    petId: 3,
    service: "Grooming", 
    professionalId: "groomer_ana",
    locationId: "chorrillos",
    status: "pending" as const,
    notes: "",
    paymentStatus: "unpaid" as const
  },
  { 
    id: 3, 
    date: "2026-02-24", 
    time: "11:00", 
    clientId: 3,
    petId: 3,
    service: "Control", 
    professionalId: "dr_martinez",
    locationId: "surco",
    status: "confirmed" as const,
    notes: "Control post-operatorio",
    paymentStatus: "paid" as const
  },
];

export const mockProfessionals = [
  { id: "dr_rodriguez", name: "Dr. Rodríguez", role: "Veterinario", specialty: "Medicina general" },
  { id: "dr_martinez", name: "Dr. Martínez", role: "Veterinario", specialty: "Cirugía" },
  { id: "groomer_ana", name: "Ana López", role: "Groomer", specialty: "Estética canina y felina" },
];

export const mockLocations = [
  { id: "surco", name: "Surco", address: "Av. Primavera 1234, Surco", phone: "012345678" },
  { id: "chorrillos", name: "Chorrillos", address: "Av. Huaylas 5678, Chorrillos", phone: "012345679" },
];

export const mockServices = [
  { id: "consulta", name: "Consulta médica", duration: 30, price: 80 },
  { id: "grooming", name: "Grooming", duration: 60, price: 120 },
  { id: "control", name: "Control", duration: 20, price: 50 },
  { id: "vacunacion", name: "Vacunación", duration: 15, price: 60 },
  { id: "cirugia", name: "Cirugía", duration: 120, price: 500 },
];

// Helper functions
export function getClientById(id: number) {
  return mockClients.find(c => c.id === id);
}

export function getPetById(id: number) {
  return mockPets.find(p => p.id === id);
}

export function getPetsByClientId(clientId: number) {
  return mockPets.filter(p => p.clientId === clientId);
}

export function getAppointmentById(id: number) {
  return mockAppointments.find(a => a.id === id);
}

export function getProfessionalById(id: string) {
  return mockProfessionals.find(p => p.id === id);
}

export function getLocationById(id: string) {
  return mockLocations.find(l => l.id === id);
}
