import { createBrowserRouter } from "react-router";
import { AuthLayout } from "./layouts/auth-layout";
import { StaffLayout } from "./layouts/staff-layout";
import { ClientLayout } from "./layouts/client-layout";

// Auth Pages
import { LoginPage } from "./pages/auth/login";
import { ForgotPasswordPage } from "./pages/auth/forgot-password";

// Staff Pages
import { StaffDashboard } from "./pages/staff/dashboard";
import { AgendaPage } from "./pages/staff/agenda";
import { NewAppointmentPage } from "./pages/staff/new-appointment";
import { AppointmentDetailPage } from "./pages/staff/appointment-detail";
import { ClientsPage } from "./pages/staff/clients";
import { ClientDetailPage } from "./pages/staff/client-detail";
import { PetsPage } from "./pages/staff/pets";
import { PetDetailPage } from "./pages/staff/pet-detail";
import { MedicalHistoryPage } from "./pages/staff/medical-history";
import { PaymentsPage } from "./pages/staff/payments";
import { InventoryPage } from "./pages/staff/inventory";
import { ServicesPage } from "./pages/staff/services";
import { ReportsPage } from "./pages/staff/reports";
import { UsersPage } from "./pages/staff/users";
import { LocationsPage } from "./pages/staff/locations";
import { SettingsPage } from "./pages/staff/settings";

// Client Pages
import { ClientHomePage } from "./pages/client/home";
import { ClientPetsPage } from "./pages/client/pets";
import { ClientAppointmentsPage } from "./pages/client/appointments";
import { ClientNewAppointmentPage } from "./pages/client/new-appointment";
import { ClientPaymentsPage } from "./pages/client/payments";
import { ClientProfilePage } from "./pages/client/profile";

// Not Found
import { NotFoundPage } from "./pages/not-found";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { index: true, element: <LoginPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
    ],
  },
  {
    path: "/staff",
    element: <StaffLayout />,
    children: [
      { index: true, element: <StaffDashboard /> },
      { path: "dashboard", element: <StaffDashboard /> },
      { path: "agenda", element: <AgendaPage /> },
      { path: "agenda/new", element: <NewAppointmentPage /> },
      { path: "agenda/:id", element: <AppointmentDetailPage /> },
      { path: "clients", element: <ClientsPage /> },
      { path: "clients/:id", element: <ClientDetailPage /> },
      { path: "pets", element: <PetsPage /> },
      { path: "pets/:id", element: <PetDetailPage /> },
      { path: "medical-history/:petId", element: <MedicalHistoryPage /> },
      { path: "payments", element: <PaymentsPage /> },
      { path: "inventory", element: <InventoryPage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "users", element: <UsersPage /> },
      { path: "locations", element: <LocationsPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: "/client",
    element: <ClientLayout />,
    children: [
      { index: true, element: <ClientHomePage /> },
      { path: "home", element: <ClientHomePage /> },
      { path: "pets", element: <ClientPetsPage /> },
      { path: "appointments", element: <ClientAppointmentsPage /> },
      { path: "appointments/new", element: <ClientNewAppointmentPage /> },
      { path: "payments", element: <ClientPaymentsPage /> },
      { path: "profile", element: <ClientProfilePage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
