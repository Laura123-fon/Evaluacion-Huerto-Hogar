import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const STORAGE_KEY = "carrito";

  const [carrito, setCarrito] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((p) => p.id === producto.id);

      if (existe) {
        return prev.map((p) =>
          p.id === producto.id
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      }

      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((p) => p.id !== id));
  };

  const actualizarCantidad = (id, nuevaCantidad) => {
    setCarrito((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, cantidad: nuevaCantidad } : p
      )
    );
  };

  const limpiarCarrito = () => {
    setCarrito([]);
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        actualizarCantidad,
        limpiarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
