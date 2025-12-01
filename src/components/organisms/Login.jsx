// src/components/organisms/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginService } from "../../services/AuthService";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { token, username: user, role } = await loginService(
        username,
        password
      );

      // Guardar en el AuthContext
      login(token, user, role);

      // Redirigir al home
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Error al iniciar sesión. Verifica usuario o contraseña."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Iniciar sesión</h2>

      <form onSubmit={handleSubmit}>
        <label>Usuario / Correo:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Cargando..." : "Entrar"}
        </button>
      </form>

      <p>
        ¿No tienes cuenta?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/register");
          }}
        >
          Registrarse
        </a>
      </p>

      <p id="errorLogin">{error}</p>
    </div>
  );
}
