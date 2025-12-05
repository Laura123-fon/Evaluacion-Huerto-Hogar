import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register as registerService } from "../../services/AuthService";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave1, setClave1] = useState("");
  const [clave2, setClave2] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const gmailRegex = /^[a-zA-Z0-9._%+-]{6,}@gmail\.com$/;
    if (!gmailRegex.test(correo)) {
      setError("El correo debe ser Gmail y tener al menos 6 caracteres antes del @");
      setLoading(false);
      return;
    }

    if (clave1 !== clave2) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    try {
      await registerService(correo, clave1, "USER");
      setError("Registro exitoso. Ahora inicia sesión.");
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err.response?.data?.error || "Error en el registro.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Crear una cuenta</h2>

      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />

        <label>Apellido:</label>
        <input value={apellido} onChange={(e) => setApellido(e.target.value)} required />

        <label>Correo:</label>
        <input type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />

        <label>Contraseña:</label>
        <input type="password" value={clave1} onChange={(e) => setClave1(e.target.value)} required />

        <label>Repetir contraseña:</label>
        <input type="password" value={clave2} onChange={(e) => setClave2(e.target.value)} required />

        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Registrarse"}
        </button>
      </form>

      <p>
        ¿Ya tienes cuenta?{" "}
        <a onClick={() => navigate("/login")}>
          Iniciar sesión
        </a>
      </p>

      <p id="errorRegistro">{error}</p>
    </div>
  );
}
