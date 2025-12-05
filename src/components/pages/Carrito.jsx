import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../organisms/CartContext";
import { BoletaContext } from "../organisms/BoletaContext";

const FORM_STORAGE_KEY = "datosClienteCarrito";

export default function Carrito() {
  const { carrito, eliminarDelCarrito, actualizarCantidad, limpiarCarrito } =
    useContext(CartContext);
  const { agregarBoleta, generarNumeroBoleta } = useContext(BoletaContext);

  const navigate = useNavigate();

  const [cliente, setCliente] = useState(() => {
    const savedData = localStorage.getItem(FORM_STORAGE_KEY);
    const initialForm = savedData ? JSON.parse(savedData) : {};

    const datosUsuario = {
      nombre: localStorage.getItem("nombre") || "",
      apellido: localStorage.getItem("apellido") || "",
      correo: localStorage.getItem("usuario") || "",
    };

    return {
      ...datosUsuario,
      direccion: initialForm.direccion || "",
      departamento: initialForm.departamento || "",
      region: initialForm.region || "",
      comuna: initialForm.comuna || "",
      indicaciones: initialForm.indicaciones || "",
    };
  });

  useEffect(() => {
    const { nombre, apellido, correo, ...soloDireccion } = cliente;
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(soloDireccion));
  }, [cliente]);


  const aumentarCantidad = (id, cantidad) => {
    const producto = carrito.find((p) => p.id === id);
    if (!producto) return;

    if (producto.stock && cantidad >= producto.stock) return;

    actualizarCantidad(id, cantidad + 1);
  };

  const disminuirCantidad = (id, cantidad) => {
    if (cantidad > 1) actualizarCantidad(id, cantidad - 1);
  };

  const cambiarCantidadManual = (id, valor) => {
    let cantidad = parseInt(valor, 10);

    if (!cantidad || cantidad < 1) cantidad = 1;
    if (cantidad > 100) cantidad = 100;

    actualizarCantidad(id, cantidad);
  };

  const eliminarProducto = (id) => eliminarDelCarrito(id);

  const subTotal = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );
  const costoEnvio = 3000;
  const iva = Math.round(subTotal * 0.19);
  const total = subTotal + costoEnvio + iva;

  const formatCLP = (n) => n.toLocaleString("es-CL");


  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleCompra = (e) => {
    e.preventDefault();

    if (carrito.length === 0) {
      alert("Tu carrito está vacío 😢");
      return;
    }

    const requeridos = [
      "nombre",
      "apellido",
      "correo",
      "direccion",
      "region",
      "comuna",
    ];

    const faltantes = requeridos.some(
      (campo) => cliente[campo].trim() === ""
    );

    if (faltantes) {
      alert("Por favor completa todos los datos del cliente y de entrega.");
      return;
    }

    const numero = generarNumeroBoleta();

    const nuevaBoleta = {
      numero,
      fecha: new Date().toLocaleString(),
      cliente,
      productos: carrito,
      subTotal,
      costoEnvio,
      iva,
      total,
    };

    agregarBoleta(nuevaBoleta);

    limpiarCarrito();
    localStorage.removeItem(FORM_STORAGE_KEY);

    setCliente({
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      correo: cliente.correo,
      direccion: "",
      departamento: "",
      region: "",
      comuna: "",
      indicaciones: "",
    });

    navigate("/boleta", {
      state: { boleta: nuevaBoleta },
    });
  };


  return (
    <div className="carrito-container">
      <h2 className="titulo-carrito">Carrito Huerto Hogar</h2>

      <button
        type="button"
        className="btn-volver-catalogo"
        onClick={() => navigate("/catalog")}
      >
        ← Volver al catálogo
      </button>

      {carrito.length === 0 ? (
        <p className="carrito-vacio">
          Tu carrito está vacío. ¡Agrega productos desde el catálogo!
        </p>
      ) : (
        <form className="carrito-wrapper" onSubmit={handleCompra}>
          <div className="cart-content-left">
            <table className="tabla-carrito">
              <thead>
                <tr>
                  <th style={{ width: "50%" }}>Producto</th>
                  <th style={{ width: "25%" }}>Precio</th>
                  <th style={{ width: "10%" }}>Cantidad</th>
                  <th style={{ width: "20%" }}>Subtotal</th>
                </tr>
              </thead>

              <tbody>
                {carrito.map((p) => (
                  <tr key={p.id}>
                    <td className="producto-info-cell">
                      <button
                        type="button"
                        className="btn-eliminar-producto"
                        onClick={() => eliminarProducto(p.id)}
                        aria-label={`Eliminar ${p.nombre}`}
                      >
                        ✕
                      </button>

                      <img
                        src={p.imagen}
                        alt={p.nombre}
                        className="carrito-img"
                      />

                      <div className="producto-detalles">
                        <span className="producto-nombre">{p.nombre}</span>
                        <span className="producto-atributos">
                          Origen: Chile
                        </span>
                      </div>
                    </td>

                    <td className="precio-cell">
                      ${formatCLP(p.precio)}
                    </td>

                    <td className="cantidad-cell">
                      <button
                        type="button"
                        onClick={() => disminuirCantidad(p.id, p.cantidad)}
                      >
                        -
                      </button>

                      <input
                        className="input-cantidad"
                        type="text"
                        value={p.cantidad}
                        onChange={(e) =>
                          cambiarCantidadManual(p.id, e.target.value)
                        }
                      />

                      <button
                        type="button"
                        onClick={() => aumentarCantidad(p.id, p.cantidad)}
                      >
                        +
                      </button>
                    </td>

                    <td className="subtotal-cell">
                      ${formatCLP(p.precio * p.cantidad)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop: "1rem" }}>
              <button
                type="button"
                className="clear-cart-link"
                onClick={limpiarCarrito}
              >
                Limpiar carrito
              </button>
            </div>
          </div>

          <div className="order-summary">
            <h3>Orden de Envío</h3>

            <div className="summary-details">
              <div>
                <span>Nombre</span>
                <span>
                  {cliente.nombre} {cliente.apellido}
                </span>
              </div>

              <div>
                <span>Correo</span>
                <span>{cliente.correo}</span>
              </div>

              <div>
                <span>Subtotal</span>
                <span>${formatCLP(subTotal)}</span>
              </div>

              <div>
                <span>Costo Envío</span>
                <span>${formatCLP(costoEnvio)}</span>
              </div>

              <div>
                <span>IVA (19%)</span>
                <span>${formatCLP(iva)}</span>
              </div>

              <div className="total-final">
                <span>Total</span>
                <span>${formatCLP(total)}</span>
              </div>
            </div>

            <h3 style={{ marginTop: "1.2rem" }}>Dirección</h3>

            <div className="form-grid-summary">
              <label>Calle:</label>
              <input
                required
                name="direccion"
                value={cliente.direccion}
                onChange={handleChange}
                placeholder="Ej: Los Álamos 1234"
              />

              <label>Departamento:</label>
              <input
                name="departamento"
                value={cliente.departamento}
                onChange={handleChange}
                placeholder="Ej: Depto 502"
              />

              <label>Región:</label>
              <input
                required
                name="region"
                value={cliente.region}
                onChange={handleChange}
                placeholder="Ej: RM"
              />

              <label>Comuna:</label>
              <input
                required
                name="comuna"
                value={cliente.comuna}
                onChange={handleChange}
                placeholder="Ej: Santiago"
              />

              <label className="full-width-label">Indicaciones:</label>
              <textarea
                name="indicaciones"
                value={cliente.indicaciones}
                onChange={handleChange}
                placeholder="Entre calles X e Y…"
              />
            </div>

            <button type="submit" className="btn-checkout">
              Finalizar Compra y Pagar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
