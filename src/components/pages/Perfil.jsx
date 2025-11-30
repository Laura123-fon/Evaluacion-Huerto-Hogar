import { useState, useEffect } from "react";

export default function Perfil() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [foto, setFoto] = useState("");
  const [telefono, setTelefono] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [direccion, setDireccion] = useState("");


  const [editando, setEditando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [original, setOriginal] = useState({});

  useEffect(() => {
    const datos = {
      nombre: localStorage.getItem("nombre") || "",
      apellido: localStorage.getItem("apellido") || "",
      correo: localStorage.getItem("usuario") || "",
      foto: localStorage.getItem("fotoPerfil") || "",
      telefono: localStorage.getItem("telefono") || "",
      ciudad: localStorage.getItem("ciudad") || "",
      direccion: localStorage.getItem("direccion") || "",
    };

    setNombre(datos.nombre);
    setApellido(datos.apellido);
    setCorreo(datos.correo);
    setFoto(datos.foto);
    setTelefono(datos.telefono);
    setCiudad(datos.ciudad);
    setDireccion(datos.direccion);

    setOriginal(datos); 
  }, []);

  const guardarCambios = () => {
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("apellido", apellido);
    localStorage.setItem("fotoPerfil", foto);
    localStorage.setItem("telefono", telefono);
    localStorage.setItem("ciudad", ciudad);
    localStorage.setItem("direccion", direccion);

    setOriginal({
      nombre,
      apellido,
      foto,
      telefono,
      ciudad,
      direccion,
    });

    setMensaje("Datos actualizados correctamente ✔️");
    setEditando(false);
    setTimeout(() => setMensaje(""), 1800);
  };

  const cancelarEdicion = () => {
    setNombre(original.nombre);
    setApellido(original.apellido);
    setFoto(original.foto);
    setTelefono(original.telefono);
    setCiudad(original.ciudad);
    setDireccion(original.direccion);
    setEditando(false);
  };

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setFoto(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="perfil-card-layout">

      <div className="perfil-left-column">
        <div className="perfil-foto-container">
          <img
            src={foto || "/imagenes/user.png"}
            alt="Foto de perfil"
            className="perfil-foto-circular"
          />
        </div>

        <div className="perfil-nombre-pequeno">
          {nombre} {apellido}
          <small>Usuario HuertoHogar</small>
        </div>

        <hr className="divider-line" />

        <div className="perfil-contacto">
          <p><span>📞</span> {telefono || "Agregar número"}</p>
          <p><span>📧</span> {correo}</p>
          <p><span>📍</span> {ciudad || "Agregar ciudad"}</p>
          {direccion && <p><span>🏠</span> {direccion}</p>}
        </div>
      </div>

      <div className="perfil-right-column">
        <h1 className="perfil-nombre-titulo">{nombre} {apellido}</h1>
        <p className="perfil-rol-descripcion">
          Administrador de tu perfil HuertoHogar.
        </p>

        {mensaje && (
          <p className="mensaje-feedback success-message">{mensaje}</p>
        )}

        {!editando && (
          <div className="perfil-info">
            <button onClick={() => setEditando(true)}>
              ⚙️ Editar Perfil
            </button>
          </div>
        )}

        {editando && (
          <form className="perfil-form" onSubmit={(e) => e.preventDefault()}>

            <label>Nombre:</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} />

            <label>Apellido:</label>
            <input value={apellido} onChange={(e) => setApellido(e.target.value)} />

            <label>Correo:</label>
            <input type="email" value={correo} readOnly className="input-readonly" />

            <label>Teléfono:</label>
            <input value={telefono} onChange={(e) => setTelefono(e.target.value)} />

            <label>Ciudad:</label>
            <input value={ciudad} onChange={(e) => setCiudad(e.target.value)} />

            <label>Dirección:</label>
            <input value={direccion} onChange={(e) => setDireccion(e.target.value)} />

            <label>Foto de perfil:</label>
            <input type="file" accept="image/*" onChange={handleImgChange} />

            <button onClick={guardarCambios}>Guardar Cambios</button>
            <button type="button" onClick={cancelarEdicion} style={{ background: "#666" }}>
              Cancelar
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
