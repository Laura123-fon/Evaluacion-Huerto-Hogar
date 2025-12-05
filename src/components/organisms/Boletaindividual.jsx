import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Boleta from "../organisms/Boleta.jsx";

export default function BoletaIndividual() {
  const navigate = useNavigate();
  const location = useLocation();

  const boleta = location.state?.boleta;

  useEffect(() => {
    if (!boleta) {
      navigate("/catalog");
    }
  }, [boleta, navigate]);

  if (!boleta) {
    return (
      <div className="p-8 text-center text-red-500 bg-red-100 rounded-lg m-4">
        <p className="font-bold">Error: No se encontró la boleta.</p>
      </div>
    );
  }

  const {
    cliente,
    productos,
    fecha,
    numero: numeroBoleta,
    subTotal,
    costoEnvio,
    total,
  } = boleta;

  return (
    <Boleta
      cliente={cliente}
      carrito={productos}
      fecha={fecha}
      numeroBoleta={numeroBoleta}
      subTotal={subTotal}
      costoEnvio={costoEnvio}
      total={total}
      metodoPago="Pago Online"
      onClose={() => navigate("/historial")}
    />
  );
}
