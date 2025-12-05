import React, { createContext, useState, useEffect } from "react";

export const BoletaContext = createContext();

export const BoletaProvider = ({ children }) => {
  const usuarioActual = JSON.parse(localStorage.getItem("usuarioActual"));
  const userId = usuarioActual?.email; 

  const [historialBoletas, setHistorialBoletas] = useState(() => {
    if (!userId) return [];
    const saved = localStorage.getItem(`historialBoletas_${userId}`);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (!userId) return;
    localStorage.setItem(
      `historialBoletas_${userId}`,
      JSON.stringify(historialBoletas)
    );
  }, [historialBoletas, userId]);

  const agregarBoleta = (nuevaBoleta) => {
    setHistorialBoletas((prev) => [nuevaBoleta, ...prev]);
  };

  const limpiarHistorial = () => {
    setHistorialBoletas([]);
  };

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
