import { useState, useEffect } from "react";

export default function Perfil() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [editando, setEditando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const n = localStorage.getItem("nombre") || "";
    const a = localStorage.getItem("apellido") || "";
    const c = localStorage.getItem("usuario") || "";

    setNombre(n);
    setApellido(a);
    setCorreo(c);
  }, []);

  const guardarCambios = () => {
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("apellido", apellido);
    localStorage.setItem("usuario", correo);

    setMensaje("Datos actualizados correctamente ✔️");
    setEditando(false);

    setTimeout(() => setMensaje(""), 1800);
  };

  return (
    <div className="container" style={{ maxWidth: "520px" }}>
      <h2>Mi Perfil</h2>

      {/* Vista no editable */}
      {!editando && (
        <div className="perfil-info">
          <p><strong>Nombre:</strong> {nombre}</p>
          <p><strong>Apellido:</strong> {apellido}</p>
          <p><strong>Correo:</strong> {correo}</p>

          <button onClick={() => setEditando(true)}>
            Editar Perfil
          </button>
        </div>
      )}

      {/* Vista editable */}
      {editando && (
        <form className="perfil-form" onSubmit={(e) => e.preventDefault()}>
          <label>Nombre:</label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <label>Apellido:</label>
          <input
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />

          <label>Correo:</label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />

          <button onClick={guardarCambios}>Guardar</button>

          <button
            type="button"
            style={{ marginTop: "10px", background: "#666" }}
            onClick={() => setEditando(false)}
          >
            Cancelar
          </button>
        </form>
      )}

      {mensaje && (
        <p className="mensaje-feedback success-message">{mensaje}</p>
      )}
    </div>
  );
}
