import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductService from "../services/ProductService";

const ProductForm = () => {
  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    origen: "",
    sostenibilidad: "",
    receta: "",
    imagen: "",
    categoria: ""
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      ProductService.getProductById(id).then((res) => {
        setProduct(res.data);
      });
    }
  }, [id]);

  const saveOrUpdate = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await ProductService.updateProduct(id, product);
      } else {
        await ProductService.createProduct(product);
      }
      navigate("/productos");
    } catch {
      alert("Error al guardar producto");
    }
  };

  return (
    <div>
      <h2>{id ? "Editar Producto" : "Nuevo Producto"}</h2>

      <form onSubmit={saveOrUpdate}>
        {Object.keys(product).map((key) => (
          <div key={key}>
            <label>{key}:</label>
            <input
              type="text"
              value={product[key]}
              onChange={(e) => setProduct({ ...product, [key]: e.target.value })}
            />
          </div>
        ))}

        <button type="submit">
          {id ? "Actualizar" : "Guardar"}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
