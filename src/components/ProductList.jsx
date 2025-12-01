import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../../services/ProductService";
import { useAuth } from "../../context/AuthContext";

export default function ProductList() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const loadProducts = () => {
    ProductService.getAllProducts()
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error al cargar productos:", err));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    await ProductService.deleteProduct(id);
    loadProducts();
  };

  return (
    <div>
      <h1>Lista de Productos</h1>

      {isAdmin && (
        <button onClick={() => navigate("/productos/nuevo")}>
          Nuevo Producto
        </button>
      )}

      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            {p.nombre} – ${p.precio}

            {isAdmin && (
              <>
                <button onClick={() => navigate(`/productos/editar/${p.id}`)}>
                  Editar
                </button>
                <button onClick={() => handleDelete(p.id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
