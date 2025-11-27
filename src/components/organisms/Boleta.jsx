import React from "react";

export default function Boleta({
  cliente,
  carrito,
  fecha,
  numeroBoleta,
  metodoPago,
  onClose,
  total,
  subTotal,
  costoEnvio,
}) {
  const formatCLP = (n) => n.toLocaleString("es-CL");

  return (
    <div className="boleta-documento">
      <div className="boleta-header">
        <div>
          <h2>Huerto Hogar</h2>
          <h3>Boleta Electrónica</h3>
        </div>

        <div className="boleta-info">
          <p>
            <strong>N° Boleta:</strong> {numeroBoleta}
          </p>
          <p>
            <strong>Fecha:</strong> {fecha}
          </p>
          <p>
            <strong>Método de Pago:</strong> {metodoPago}
          </p>
        </div>
      </div>

      <div>
        <h4>Datos de Cliente y Envío</h4>
        <div className="cliente-info">
          <p>
            <strong>Cliente:</strong> {cliente?.nombre} {cliente?.apellido}
          </p>
          <p>
            <strong>Correo:</strong> {cliente?.correo}
          </p>
          <p>
            <strong>Dirección:</strong> {cliente?.direccion}, {cliente?.comuna},{" "}
            {cliente?.region}
          </p>
        </div>
      </div>

      <div className="detalle-productos">
        <h4>Detalle de Productos</h4>
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cant.</th>
              <th>Unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {carrito?.map((item) => (
              <tr key={item.id}>
                <td>{item.nombre}</td>
                <td>{item.cantidad}</td>
                <td>${formatCLP(item.precio)}</td>
                <td>${formatCLP(item.precio * item.cantidad)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="boleta-totales">
        <p>
          <span>Subtotal Productos:</span> <span>${formatCLP(subTotal)}</span>
        </p>
        <p>
          <span>Costo de Envío:</span> <span>${formatCLP(costoEnvio)}</span>
        </p>
        <p>
          <span>TOTAL PAGADO:</span> <span>${formatCLP(total)}</span>
        </p>
      </div>

      <div className="boleta-footer">
        <p>¡Gracias por tu compra en Huerto Hogar!</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}
