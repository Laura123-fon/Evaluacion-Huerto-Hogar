// src/components/pages/Catalogo.jsx
import { useState, useContext, useMemo, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Product from "../organisms/Product";
import Toast from "../organisms/Toast";
import { CartContext } from "../organisms/CartContext";
import ProductService from "../../services/ProductService";

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState("all");
  const [toastMsg, setToastMsg] = useState("");
  const [toastKey, setToastKey] = useState(0);
  const [loading, setLoading] = useState(true);

  const { carrito, agregarAlCarrito } = useContext(CartContext);
  const navigate = useNavigate();

  // Cargar productos desde backend
  useEffect(() => {
    setLoading(true);
    ProductService.getAllProducts()
      .then((res) => {
        setProductos(res.data);
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filtrado igual que antes
  const productosFiltrados = useMemo(() => {
    return productos.filter(
      (p) => filtro === "all" || p.categoria?.toLowerCase() === filtro
    );
  }, [filtro, productos]);

  const handleAdd = (producto) => {
    agregarAlCarrito(producto);

    setToastMsg(`${producto.nombre} agregado al carrito 🛒`);
    setToastKey((prev) => prev + 1);
  };

  if (loading) return <p>Cargando catálogo...</p>;

  return (
    <div className="catalog-page">

      {/* HEADER ANTIGUO (VOLVER + CARRITO + TÍTULO) */}
      <header className="catalog-header">
        <Link to="/" className="back-btn-strong">← Volver al inicio</Link>

        <h1>Catálogo de HuertoHogar</h1>

        <div className="cart-info">
          Carrito: {carrito.reduce((acc, item) => acc + item.cantidad, 0)} items
          <button className="cart-info2" onClick={() => navigate("/carrito")}>
            🛒 Ir al Carrito
          </button>
        </div>
      </header>

      {/* FILTROS IGUALES QUE ANTES */}
      <section className="filters">
        <div className="filter-buttons">
          <button className={filtro === "all" ? "active" : ""} onClick={() => setFiltro("all")}>Todos</button>
          <button className={filtro === "frutas" ? "active" : ""} onClick={() => setFiltro("frutas")}>Frutas</button>
          <button className={filtro === "verduras" ? "active" : ""} onClick={() => setFiltro("verduras")}>Verduras</button>
          <button className={filtro === "organicos" ? "active" : ""} onClick={() => setFiltro("organicos")}>Orgánicos</button>
          <button className={filtro === "lacteos" ? "active" : ""} onClick={() => setFiltro("lacteos")}>Lácteos</button>
        </div>
      </section>

      {/* LISTA DE PRODUCTOS */}
      <section className="product-list">
        {productosFiltrados.length === 0 ? (
          <p className="no-products-message">No hay productos disponibles</p>
        ) : (
          productosFiltrados.map((producto) => {
            const itemInCart = carrito.find((item) => item.id === producto.id);
            const cantidadEnCarrito = itemInCart ? itemInCart.cantidad : 0;

            const isMaxedOut =
              cantidadEnCarrito >= producto.stock && producto.stock > 0;

            return (
              <Product
                key={producto.id}
                producto={producto}
                onAddToCart={() => handleAdd(producto)}
                isMaxedOut={isMaxedOut}
              />
            );
          })
        )}
      </section>

      {/* TOAST */}
      <div id="toast-container">
        {toastMsg && (
          <Toast
            key={toastKey}
            mensaje={toastMsg}
            onClose={() => setToastMsg("")}
          />
        )}
      </div>
    </div>
  );
}
