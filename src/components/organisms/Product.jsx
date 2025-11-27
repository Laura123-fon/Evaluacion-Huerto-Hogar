import React from "react";

export default function Product({ producto, onAddToCart, isMaxedOut = false }) {
  const { nombre, imagen, descripcion, precio, stock, origen, sostenibilidad, receta, calificacion } = producto;

  const disabled = stock === 0 || isMaxedOut;

  const renderStars = () => {
    const full = Math.floor(calificacion);
    const half = calificacion % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;

    return (
      <span className="rating-stars">
        {"★".repeat(full)}
        {half === 1 && <span className="half-star">★</span>}
        {"☆".repeat(empty)}
      </span>
    );
  };

  return (
    <div className="product-card horizontal-card">

      {/* 🟢 Botón/etiqueta grande al estilo "burbuja" */}
      <div
        className="big-cart-tag"
        onClick={() => !disabled && onAddToCart(producto)}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
      >
        {stock === 0 ? "AGOTADO" : isMaxedOut ? "LÍMITE" : "AÑADE AL CARRITO"}
      </div>

      {/* Contenedor general horizontal */}
      <div className="product-row">

        {/* IMAGEN */}
        <div className="product-image-side">
          <img src={imagen} alt={nombre} />
        </div>

        {/* TEXTO */}
        <div className="product-info-side">
          <div className="product-price">${precio.toLocaleString()} CLP</div>

          <h3>{nombre}</h3>

          <p className="product-description">{descripcion}</p>

          <p className="meta">STOCK: <strong>{stock}</strong></p>
          <p className="meta">ORIGEN: <strong>{origen}</strong></p>

          <p className="meta">{sostenibilidad}</p>
          <p className="meta">Receta sugerida: {receta}</p>

          {/* Rating */}
          <p className="product-rating">
            ({calificacion.toFixed(1)}) {renderStars()}
          </p>
        </div>

      </div>
    </div>
  );
}
