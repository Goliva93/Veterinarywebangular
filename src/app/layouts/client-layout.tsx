import { useState } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router";
import { Home, Heart, Calendar, DollarSign, User, Menu, X, LogOut, Bell, ChevronDown } from "lucide-react";
import logoImage from "figma:asset/ca6dd4800b2ade3a8cd3a93e8df06dcb51f53fd0.png";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "../components/ui/dropdown-menu";

const menuItems = [
  { path: "/client/home", icon: Home, label: "Inicio" },
  { path: "/client/pets", icon: Heart, label: "Mascotas" },
  { path: "/client/appointments", icon: Calendar, label: "Citas" },
  { path: "/client/payments", icon: DollarSign, label: "Pagos" },
  { path: "/client/profile", icon: User, label: "Perfil" },
];

export function ClientLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      {/* Top toolbar */}
      <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 md:px-6 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link to="/client/home" className="flex items-center gap-3">
            <img src={logoImage} alt="El Mascotario" className="w-10 h-10" />
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg text-foreground">El Mascotario</h1>
              <p className="text-xs text-muted-foreground">Portal Cliente</p>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm font-medium
                  ${isActive 
                    ? "bg-[#7cb342] text-white shadow-md" 
                    : "text-foreground hover:bg-muted"
                  }
                `}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#ef5350] rounded-full" />
          </button>
          
          {/* Desktop User Menu with Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hidden md:flex items-center gap-2 pl-3 border-l border-border hover:bg-muted px-2 py-1 rounded-lg transition-colors">
                <div className="w-8 h-8 rounded-full bg-[#7cb342] text-white flex items-center justify-center font-semibold">
                  M
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">María García</p>
                  <p className="text-xs text-muted-foreground">Cliente</p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/client/profile")}>
                <User className="w-4 h-4 mr-2" />
                Mi Perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/client/appointments")}>
                <Calendar className="w-4 h-4 mr-2" />
                Mis Citas
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar sesión
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {mobileSidebarOpen && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="md:hidden fixed left-0 top-0 bottom-0 w-64 bg-white border-r border-border z-50">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={logoImage} alt="El Mascotario" className="w-10 h-10" />
                  <div>
                    <h1 className="font-bold text-lg">El Mascotario</h1>
                    <p className="text-xs text-muted-foreground">Portal Cliente</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex-1 p-2">
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
                          ? "bg-[#7cb342] text-white shadow-md" 
                          : "text-foreground hover:bg-muted"
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-border">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-foreground hover:bg-muted transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm font-medium">Cerrar sesión</span>
                </button>
              </div>
            </div>
          </aside>
        </>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden flex items-center justify-around bg-white border-t border-border p-2 flex-shrink-0">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all
                ${isActive ? "text-[#7cb342]" : "text-muted-foreground"}
              `}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}