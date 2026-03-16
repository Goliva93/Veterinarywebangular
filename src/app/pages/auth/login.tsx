import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { MaterialTextField } from "../../components/material-text-field";
import { MaterialButton } from "../../components/material-button";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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
      
      // Redirect based on email domain (automatic role detection)
      const email = formData.email.toLowerCase();
      
      // Cliente emails
      if (email.includes("cliente@demo.com") || email.includes("client")) {
        navigate("/client/home");
      } 
      // Staff emails (admin, recepcion, vet, groomer, or any other)
      else {
        navigate("/staff/dashboard");
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

      {/* Demo Mode Notice */}
      <div className="mb-6 p-4 bg-[#fdd835]/10 border border-[#fdd835]/30 rounded-xl">
        <p className="text-sm text-center font-medium mb-3">
          <span className="inline-block w-2 h-2 bg-[#fdd835] rounded-full mr-2"></span>
          Modo demo: el sistema redirige automáticamente según el rol del usuario. Usa un correo de ejemplo y cualquier contraseña.
        </p>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center justify-between px-3 py-2 bg-white/50 dark:bg-black/20 rounded-lg">
            <span className="text-muted-foreground">Panel Interno:</span>
            <div className="flex flex-col gap-1 text-right">
              <span className="font-mono text-xs text-foreground">admin@demo.com</span>
              <span className="font-mono text-xs text-foreground">recepcion@demo.com</span>
              <span className="font-mono text-xs text-foreground">vet@demo.com</span>
              <span className="font-mono text-xs text-foreground">groomer@demo.com</span>
            </div>
          </div>
          <div className="flex items-center justify-between px-3 py-2 bg-white/50 dark:bg-black/20 rounded-lg">
            <span className="text-muted-foreground">Portal Cliente:</span>
            <span className="font-mono text-xs text-foreground">cliente@demo.com</span>
          </div>
        </div>
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