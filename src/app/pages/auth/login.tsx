import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { MaterialTextField } from "../../components/material-text-field";
import { MaterialButton } from "../../components/material-button";
import { MaterialChip } from "../../components/material-chip";
import { Mail, Lock, Eye, EyeOff, Shield, User } from "lucide-react";
import { toast } from "sonner";

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<"staff" | "client">("staff");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Demo mode - accept any email and password
    if (formData.email && formData.password) {
      toast.success("Inicio de sesión exitoso");
      
      // Redirect based on selected user type
      if (userType === "staff") {
        navigate("/staff/dashboard");
      } else {
        navigate("/client/home");
      }
    } else {
      toast.error("Por favor completa todos los campos");
    }

    setLoading(false);
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Bienvenido</h2>
        <p className="text-muted-foreground">Ingresa tus credenciales para continuar</p>
      </div>

      {/* User Type Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3 text-center">Tipo de acceso</label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setUserType("staff")}
            className={`flex-1 p-4 rounded-xl border-2 transition-all ${
              userType === "staff"
                ? "border-[#7cb342] bg-[#7cb342]/10"
                : "border-border hover:border-[#7cb342]/50"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                userType === "staff" ? "bg-[#7cb342] text-white" : "bg-muted"
              }`}>
                <Shield className="w-6 h-6" />
              </div>
              <span className="font-semibold">Panel Interno</span>
              <span className="text-xs text-muted-foreground">Staff</span>
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => setUserType("client")}
            className={`flex-1 p-4 rounded-xl border-2 transition-all ${
              userType === "client"
                ? "border-[#42a5f5] bg-[#42a5f5]/10"
                : "border-border hover:border-[#42a5f5]/50"
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                userType === "client" ? "bg-[#42a5f5] text-white" : "bg-muted"
              }`}>
                <User className="w-6 h-6" />
              </div>
              <span className="font-semibold">Portal Cliente</span>
              <span className="text-xs text-muted-foreground">Cliente</span>
            </div>
          </button>
        </div>
      </div>

      {/* Demo Mode Notice */}
      <div className="mb-6 p-4 bg-[#fdd835]/10 border border-[#fdd835]/30 rounded-xl">
        <p className="text-sm text-center font-medium">
          <span className="inline-block w-2 h-2 bg-[#fdd835] rounded-full mr-2"></span>
          Modo demo: ingresa cualquier correo y cualquier contraseña
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <MaterialTextField
          label="Correo electrónico"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          fullWidth
          startIcon={<Mail className="w-5 h-5" />}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <MaterialTextField
          label="Contraseña"
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          fullWidth
          startIcon={<Lock className="w-5 h-5" />}
          endIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          }
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.remember}
              onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
              className="w-4 h-4 rounded border-border text-[#7cb342] focus:ring-[#7cb342]"
            />
            <span className="text-sm text-foreground">Recordarme</span>
          </label>

          <Link to="/forgot-password" className="text-sm text-[#7cb342] hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <MaterialButton
          type="submit"
          fullWidth
          loading={loading}
        >
          Iniciar sesión
        </MaterialButton>
      </form>
    </div>
  );
}