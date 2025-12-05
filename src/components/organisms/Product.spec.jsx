import { render, fireEvent, screen } from "@testing-library/react";
import Product from "../components/organisms/Product";

const mockProduct = {
  id: 1,
  nombre: "Manzana Roja",
  imagenUrl: "https://img.com/manzana.jpg",
  descripcion: "Fresca y dulce",
  precio: 1200,
  stock: 5,
  origen: "Chile",
  sostenibilidad: "100% orgánico",
  receta: "Pie de manzana",
  calificacion: 4.5
};

describe("Product Component", () => {

  test("1) Renderiza el nombre del producto", () => {
    render(<Product producto={mockProduct} onAddToCart={() => {}} />);
    expect(screen.getByText("Manzana Roja")).toBeInTheDocument();
  });

  test("2) Muestra el precio correctamente", () => {
    render(<Product producto={mockProduct} onAddToCart={() => {}} />);
    expect(screen.getByText("$1,200 CLP")).toBeInTheDocument();
  });

  test("3) Deshabilita botón cuando stock es 0", () => {
    const p = { ...mockProduct, stock: 0 };
    render(<Product producto={p} onAddToCart={() => {}} />);

    expect(screen.getByText("AGOTADO")).toBeInTheDocument();
  });

  test("4) Llama a onAddToCart al hacer click", () => {
    const mockFn = jest.fn();

    render(<Product producto={mockProduct} onAddToCart={mockFn} />);

    fireEvent.click(screen.getByText("AÑADE AL CARRITO"));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test("5) No llama a onAddToCart si isMaxedOut=true", () => {
    const mockFn = jest.fn();

    render(<Product producto={mockProduct} onAddToCart={mockFn} isMaxedOut />);

    fireEvent.click(screen.getByText("LÍMITE"));
    expect(mockFn).not.toHaveBeenCalled();
  });
});
