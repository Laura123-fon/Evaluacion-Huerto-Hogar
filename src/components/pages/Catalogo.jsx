import React, { useState, useContext, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import Product from "../organisms/Product";
import Toast from "../organisms/Toast";
import { CartContext } from "../organisms/CartContext";

// ⚠️ Recomendación futura: mover esto a /data/productos.js
const productos = [
  {
    id: 'FR001',
    nombre: 'Manzanas Fuji',
    categoria: 'frutas',
    precio: 1200,
    stock: 150,
    descripcion: 'Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule.',
    origen: 'Valle del Maule',
    sostenibilidad: 'Cultivo sostenible sin pesticidas',
    receta: 'Ensalada de manzana con nueces',
    imagen: './imagenes/manzanas.jpg',
    calificacion: 4.5
  },
  {
    id: 'FR002',
    nombre: 'Naranjas Valencia',
    categoria: 'frutas',
    precio: 1000,
    stock: 200,
    descripcion: 'Jugosas y ricas en vitamina C, ideales para zumos frescos.',
    origen: 'Región de Valparaíso',
    sostenibilidad: 'Agricultura responsable',
    receta: 'Jugo de naranja natural',
    imagen: './imagenes/Naranjas.png',
    calificacion: 4.7
  },
  {
    id: 'FR003',
    nombre: 'Plátanos Cavendish',
    categoria: 'frutas',
    precio: 800,
    stock: 250,
    descripcion: 'Plátanos maduros y dulces, perfectos para desayuno o snack.',
    origen: 'Zona Central',
    sostenibilidad: 'Cultivo orgánico y responsable',
    receta: 'Smoothie de plátano',
    imagen: './imagenes/Plátanos.png',
    calificacion: 4.4
  },
  {
    id: 'VR001',
    nombre: 'Zanahorias Orgánicas',
    categoria: 'verduras',
    precio: 900,
    stock: 100,
    descripcion: 'Zanahorias crujientes cultivadas sin pesticidas en O\'Higgins.',
    origen: 'O\'Higgins',
    sostenibilidad: 'Agricultura orgánica',
    receta: 'Crema de zanahoria',
    imagen: './imagenes/Zanahoria.jpg',
    calificacion: 4.3
  },
  {
    id: 'VR002',
    nombre: 'Espinacas Frescas',
    categoria: 'verduras',
    precio: 700,
    stock: 80,
    descripcion: 'Perfectas para ensaladas y batidos verdes.',
    origen: 'Región Metropolitana',
    sostenibilidad: 'Cultivo sostenible sin químicos',
    receta: 'Batido verde detox',
    imagen: './imagenes/Espinacas.png',
    calificacion: 4.6
  },
  {
    id: 'VR003',
    nombre: 'Pimientos Tricolores',
    categoria: 'verduras',
    precio: 1500,
    stock: 120,
    descripcion: 'Ricos en antioxidantes y vitaminas, ideales para salteados.',
    origen: 'Región de Valparaíso',
    sostenibilidad: 'Agricultura responsable',
    receta: 'Salteado de pimientos',
    imagen: './imagenes/Pimientos.png',
    calificacion: 4.5
  },
  {
    id: 'VR004',
    nombre: 'Cebollas Moradas',
    categoria: 'verduras',
    precio: 500,
    stock: 0,
    descripcion: 'Cebollas moradas orgánicas de sabor suave.',
    origen: 'Región Metropolitana',
    sostenibilidad: 'Cultivo orgánico',
    receta: 'Acompañamiento para ensaladas',
    imagen: './imagenes/cebollas.png',
    calificacion: 4.0
  },
  {
    id: 'PO001',
    nombre: 'Miel Orgánica',
    categoria: 'organicos',
    precio: 5000,
    stock: 50,
    descripcion: 'Miel pura y orgánica producida por apicultores locales.',
    origen: 'Valle Central',
    sostenibilidad: 'Apicultura sostenible',
    receta: 'Endulzar té o postres',
    imagen: './imagenes/Miel.webp',
    calificacion: 4.8
  },
  {
    id: 'PO003',
    nombre: 'Quinua Orgánica',
    categoria: 'organicos',
    precio: 3000,
    stock: 70,
    descripcion: 'Granos de quinua orgánica, perfectos para una dieta saludable.',
    origen: 'Región de Tarapacá',
    sostenibilidad: 'Cultivo orgánico',
    receta: 'Ensalada de quinua',
    imagen: './imagenes/Quinua.png',
    calificacion: 4.6
  },
  {
    id: 'PL001',
    nombre: 'Leche Entera',
    categoria: 'lacteos',
    precio: 1200,
    stock: 100,
    descripcion: 'Leche fresca de granjas locales, rica en calcio.',
    origen: 'Región del Biobío',
    sostenibilidad: 'Ganadería responsable',
    receta: 'Ideal para café o cereal',
    imagen: './imagenes/leches.webp',
    calificacion: 4.6
  }
];

export default function Catalogo() {
  const [filtro, setFiltro] = useState("all");
  const [toastMsg, setToastMsg] = useState("");
  const [toastKey, setToastKey] = useState(0);

  const { carrito, agregarAlCarrito } = useContext(CartContext);
  const navigate = useNavigate();

  // 🔍 Filtrado optimizado (solo se recalcula si cambia filtro)
  const productosFiltrados = useMemo(() => {
    return productos.filter(
      (p) => filtro === "all" || p.categoria === filtro
    );
  }, [filtro]);

  const handleAdd = (producto) => {
    if (!producto) return;

    agregarAlCarrito(producto);

    setToastMsg(`${producto.nombre} agregado al carrito 🛒`);
    setToastKey((prev) => prev + 1);
  };

  return (
    <div className="catalog-page">
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

      {/* FILTROS */}
      <section className="filters">
        <div className="filter-buttons">
          <button className={filtro === "all" ? "active" : ""} onClick={() => setFiltro("all")}>Todos</button>
          <button className={filtro === "frutas" ? "active" : ""} onClick={() => setFiltro("frutas")}>Frutas Frescas</button>
          <button className={filtro === "verduras" ? "active" : ""} onClick={() => setFiltro("verduras")}>Verduras Orgánicas</button>
          <button className={filtro === "organicos" ? "active" : ""} onClick={() => setFiltro("organicos")}>Productos Orgánicos</button>
          <button className={filtro === "lacteos" ? "active" : ""} onClick={() => setFiltro("lacteos")}>Productos Lácteos</button>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="product-list">
        {productosFiltrados.length === 0 ? (
          <p className="no-products-message">No hay productos disponibles</p>
        ) : (
          productosFiltrados.map(producto => {
            const itemInCart = carrito.find(item => item.id === producto.id);
            const cantidadEnCarrito = itemInCart ? itemInCart.cantidad : 0;

            const isMaxedOut = cantidadEnCarrito >= producto.stock && producto.stock > 0;

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
