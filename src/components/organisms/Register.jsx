import { useState } from "react";

export default function Register({ switchToLogin }) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [clave1, setClave1] = useState("");
  const [clave2, setClave2] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
   e.preventDefault();
  
  const gmailRegex = /^[a-zA-Z0-9._%+-]{6,}@gmail\.com$/;
    if (!gmailRegex.test(correo)) {
      setError("El correo debe ser Gmail y tener al menos 6 caracteres antes del @(ejemplo@gmail.com)");
      return;
    }

    if (clave1 !== clave2) {
       setError("Las contraseñas no coinciden");
       return;
    }
    localStorage.setItem("nombre", nombre);
    localStorage.setItem("apellido", apellido);
    localStorage.setItem("usuario", correo);

    localStorage.setItem("clave", clave1); 

    setError("✅ Registro exitoso. Ahora inicia sesión.");
    setTimeout(() => switchToLogin(), 1200);
  };

  return (
     <div className="container">  
        <h2>Crear una cuenta</h2>
        <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
      <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
         />

        <label>Apellido:</label>
        <input
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />

        <label>Correo:</label>
        <input
          type="email"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
       />

        <label>Contraseña:</label>
        <input
          type="password" 
          value={clave1}
          onChange={(e) => setClave1(e.target.value)}
          required
          />

        <label>Repetir contraseña:</label>
        <input
          type="password"
          value={clave2}
          onChange={(e) => setClave2(e.target.value)}
          required
         />

       <button type="submit">Registrarse</button>
       </form>

      <p>
         ¿Ya tienes cuenta?{" "}
       <a href="#" onClick={switchToLogin}>
         Iniciar sesión
       </a>
     </p>

      <p id="errorRegistro">{error}</p>
     </div>
   );
}