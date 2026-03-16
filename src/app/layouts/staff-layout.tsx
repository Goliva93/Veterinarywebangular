import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Heart, 
  FileText, 
  DollarSign, 
  Package, 
  Briefcase, 
  BarChart3, 
  UserCog, 
  MapPin, 
  Settings, 
  Menu, 
  X,
  LogOut,
  Bell
} from "lucide-react";
import logoImage from "figma:asset/ca6dd4800b2ade3a8cd3a93e8df06dcb51f53fd0.png";

const menuItems = [
  { path: "/staff/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/staff/agenda", icon: Calendar, label: "Agenda / Citas" },
  { path: "/staff/clients", icon: Users, label: "Clientes" },
  { path: "/staff/pets", icon: Heart, label: "Mascotas" },
  { path: "/staff/payments", icon: DollarSign, label: "Pagos" },
  { path: "/staff/inventory", icon: Package, label: "Inventario" },
  { path: "/staff/services", icon: Briefcase, label: "Servicios" },
  { path: "/staff/reports", icon: BarChart3, label: "Reportes" },
  { path: "/staff/users", icon: UserCog, label: "Usuarios" },
  { path: "/staff/locations", icon: MapPin, label: "Sedes" },
  { path: "/staff/settings", icon: Settings, label: "Configuración" },
];

export function StaffLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/login");
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img src={logoImage} alt="El Mascotario" className="w-10 h-10" />
          {sidebarOpen && (
            <div>
              <h1 className="font-bold text-lg text-sidebar-foreground">El Mascotario</h1>
              <p className="text-xs text-muted-foreground">Panel Interno</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileSidebarOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all
                ${isActive 
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md" 
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
                }
                ${!sidebarOpen && "justify-center"}
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className={`
            flex items-center gap-3 px-3 py-2.5 rounded-xl w-full
            text-sidebar-foreground hover:bg-sidebar-accent transition-all
            ${!sidebarOpen && "justify-center"}
          `}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {sidebarOpen && <span className="text-sm font-medium">Cerrar sesión</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside 
        className={`
          hidden md:flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300
          ${sidebarOpen ? "w-64" : "w-20"}
        `}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="md:hidden fixed left-0 top-0 bottom-0 w-64 bg-sidebar border-r border-sidebar-border z-50">
            <SidebarContent />
          </aside>
        </>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top toolbar */}
        <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden md:block p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#ef5350] rounded-full" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-[#7cb342] text-white flex items-center justify-center font-semibold">
                A
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium">Admin Usuario</p>
                <p className="text-xs text-muted-foreground">Administrador</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
