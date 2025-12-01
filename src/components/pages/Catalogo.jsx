// src/components/pages/Catalogo.jsx (Modificado)
import { useEffect, useState } from "react";
import ProductService from "../../services/ProductService"; // Importamos el servicio de la API
import Product from "../organisms/Product"; // Tu componente de tarjeta de producto (diseño original)
// Asegúrate de importar el CartContext o la lógica para añadir al carrito

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lógica para el carrito (debes mantenerla si la usas en otros archivos)
  // const { addToCart } = useCart(); 

  useEffect(() => {
    setLoading(true);
    ProductService.getAllProducts()
      .then((res) => {
        setProductos(res.data); // Cargamos los datos del backend
      })
      .catch((err) => {
        console.error("Error al cargar productos:", err);
        setError("No se pudieron cargar los productos del servidor.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando catálogo...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className="catalogo-page-container">
      <h2>Catálogo de Productos 🌱</h2>
      {/* Utiliza tu clase CSS para el contenedor de la cuadrícula, por ejemplo: product-grid */}
      <div className="product-grid"> 
        {productos.map((p) => (
          // Pasa el objeto del backend (p) a tu componente original Product
          <Product 
            key={p.id} 
            producto={p} 
            // onAddToCart={addToCart} // Mantén tu lógica original de carrito
          />
        ))}
      </div>
    </div>
  );
}