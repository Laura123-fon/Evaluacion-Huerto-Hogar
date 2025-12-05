import React, { useState } from "react";

export default function Product({ producto, onAddToCart, isMaxedOut = false }) {
  const {
    nombre,
    imagenUrl,
    descripcion,
    precio,
    stock,
    origen,
    sostenibilidad,
    receta,
    calificacion
  } = producto;

  const [anim, setAnim] = useState(false);

  const disabled = stock === 0 || isMaxedOut;

  const handleAdd = () => {
    if (disabled) return;

    setAnim(true);
    setTimeout(() => setAnim(false), 400);

    onAddToCart(producto);
  };

  const renderStars = () => {
    const full = Math.floor(calificacion);
    const half = calificacion % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <span className="rating-stars">
        {"★".repeat(full)}
        {half && <span className="half-star">★</span>}
        {"☆".repeat(empty)}
      </span>
    );
  };

  return (
    <div className={`product-card horizontal-card ${disabled ? "producto-agotado" : ""}`}>
      
      <div
        className={`big-cart-tag ${anim ? "anim-add" : ""} ${disabled ? "disabled" : ""}`}
        onClick={handleAdd}
        style={{ cursor: disabled ? "not-allowed" : "pointer" }}
      >
        {stock === 0
          ? "AGOTADO"
          : isMaxedOut
          ? "LÍMITE"
          : "AÑADE AL CARRITO"}
      </div>

      <div className="product-row">

        <div className="product-image-side">
          <img src={imagenUrl} alt={nombre} />
        </div>

        <div className="product-info-side">
          <div className="product-price">${precio.toLocaleString()} CLP</div>

          <h3>{nombre}</h3>
          <p className="product-description">{descripcion}</p>

          <p className="meta">STOCK: <strong>{stock}</strong></p>
          <p className="meta">ORIGEN: <strong>{origen}</strong></p>
          <p className="meta">{sostenibilidad}</p>
          <p className="meta">Receta sugerida: {receta}</p>

          <p className="product-rating">
            ({calificacion.toFixed(1)}) {renderStars()}
          </p>
        </div>
      </div>
    </div>
  );
}
