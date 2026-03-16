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

    // Mock login - check credentials
    if (formData.email && formData.password) {
      toast.success("Inicio de sesión exitoso");
      
      // Redirect based on email domain (mock role detection)
      if (formData.email.includes("staff") || formData.email.includes("admin")) {
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

        <div className="pt-6 border-t border-border">
          <p className="text-sm text-center text-muted-foreground mb-4">
            Acceso rápido de demostración:
          </p>
          <div className="space-y-2">
            <MaterialButton
              type="button"
              variant="outlined"
              fullWidth
              onClick={() => {
                setFormData({ email: "admin@elmascotario.com", password: "demo123", remember: false });
                setTimeout(() => navigate("/staff/dashboard"), 500);
              }}
            >
              Panel Interno (Staff)
            </MaterialButton>
            <MaterialButton
              type="button"
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => {
                setFormData({ email: "cliente@ejemplo.com", password: "demo123", remember: false });
                setTimeout(() => navigate("/client/home"), 500);
              }}
            >
              Portal Cliente
            </MaterialButton>
          </div>
        </div>
      </form>
    </div>
  );
}
