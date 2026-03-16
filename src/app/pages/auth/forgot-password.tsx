import { useState } from "react";
import { Link } from "react-router";
import { MaterialTextField } from "../../components/material-text-field";
import { MaterialButton } from "../../components/material-button";
import { Mail, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success("Instrucciones enviadas a tu correo");
    setSent(true);
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="w-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#7cb342]/10 flex items-center justify-center">
          <Mail className="w-8 h-8 text-[#7cb342]" />
        </div>
        
        <h2 className="text-3xl font-bold text-foreground mb-2">Revisa tu correo</h2>
        <p className="text-muted-foreground mb-8">
          Te hemos enviado instrucciones para recuperar tu contraseña a <strong>{email}</strong>
        </p>

        <Link to="/login">
          <MaterialButton variant="outlined">
            <ArrowLeft className="w-4 h-4" />
            Volver al inicio de sesión
          </MaterialButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Link to="/login" className="inline-flex items-center gap-2 text-[#7cb342] hover:underline mb-6">
        <ArrowLeft className="w-4 h-4" />
        Volver
      </Link>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">Recuperar contraseña</h2>
        <p className="text-muted-foreground">
          Ingresa tu correo y te enviaremos instrucciones para recuperar tu contraseña
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <MaterialTextField
          label="Correo electrónico"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          fullWidth
          startIcon={<Mail className="w-5 h-5" />}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <MaterialButton
          type="submit"
          fullWidth
          loading={loading}
        >
          Enviar instrucciones
        </MaterialButton>
      </form>
    </div>
  );
}
