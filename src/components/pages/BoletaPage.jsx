import React, { useContext, useEffect } from "react";
import { BoletaContext } from "../organisms/BoletaContext.jsx";

export default function BoletaPage() {
  const { historialBoletas } = useContext(BoletaContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="historial-container">
      <h2>Historial de Boletas</h2>

      {historialBoletas.length === 0 ? (
        <div className="historial-vacio">
          <p>¡Aún no hay compras!</p>
          <p>No hay boletas registradas en tu historial.</p>
        </div>
      ) : (
        <ul className="historial-lista">
          {historialBoletas.map((b, index) => (
            <li key={b.numero || index}>
              <div>
                <p>Número de Boleta</p>
                <strong>{b.numero}</strong>
              </div>

              <div>
                <p>Fecha</p>
                <span>{b.fecha}</span>
              </div>

              <div>
                <p>Cliente</p>
                <strong>
                  {b.cliente.nombre} {b.cliente.apellido}
                </strong>
              </div>

              <div className="historial-productos-detalle">
                <p>Productos:</p>
                <ul>
                  {b.productos.map((p) => (
                    <li key={p.id}>
                      <span>
                        {p.nombre} x{p.cantidad}
                      </span>
                      <span>${p.precio.toLocaleString("es-CL")}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="historial-total">
                <span>Total:</span>
                <span>${b.total.toLocaleString("es-CL")}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
