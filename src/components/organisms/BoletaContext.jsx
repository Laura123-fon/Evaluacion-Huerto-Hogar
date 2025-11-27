import React, { createContext, useState, useEffect } from "react";

export const BoletaContext = createContext();

export const BoletaProvider = ({ children }) => {
  const [historialBoletas, setHistorialBoletas] = useState(() => {
    const savedHistorial = localStorage.getItem("historialBoletas");
    return savedHistorial ? JSON.parse(savedHistorial) : [];
  });

  // Guardar historial en localStorage
  useEffect(() => {
    localStorage.setItem("historialBoletas", JSON.stringify(historialBoletas));
  }, [historialBoletas]);

  const agregarBoleta = (nuevaBoleta) => {
    setHistorialBoletas((prev) => [nuevaBoleta, ...prev]);
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
      value={{ historialBoletas, agregarBoleta, generarNumeroBoleta }}
    >
      {children}
    </BoletaContext.Provider>
  );
};
