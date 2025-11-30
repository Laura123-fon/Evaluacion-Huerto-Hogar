import React, { createContext, useState, useEffect } from "react";

export const BoletaContext = createContext();

export const BoletaProvider = ({ children }) => {
  // 1. Detectar usuario logueado
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
  const userId = usuarioActual?.email; // identificador del usuario

  // 2. Cargar historial solo del usuario activo
  const [historialBoletas, setHistorialBoletas] = useState(() => {
    if (!userId) return [];
    const saved = localStorage.getItem(`historialBoletas_${userId}`);
    return saved ? JSON.parse(saved) : [];
  });

  // 3. Guardar historial cuando cambie
  useEffect(() => {
    if (!userId) return;
    localStorage.setItem(
      `historialBoletas_${userId}`,
      JSON.stringify(historialBoletas)
    );
  }, [historialBoletas, userId]);

  // 4. Agregar boleta nueva
  const agregarBoleta = (nuevaBoleta) => {
    setHistorialBoletas((prev) => [nuevaBoleta, ...prev]);
  };

  // 5. Limpiar historial al cerrar sesión
  const limpiarHistorial = () => {
    setHistorialBoletas([]);
  };

  // 6. Generar número de boleta
  const generarNumeroBoleta = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0");
    return `BE-${timestamp}-${random}`;
  };

  return (
    <BoletaContext.Provider
      value={{
        historialBoletas,
        agregarBoleta,
        generarNumeroBoleta,
        limpiarHistorial,
      }}
    >
      {children}
    </BoletaContext.Provider>
  );
};
