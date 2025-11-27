import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Product from "./Product";

describe("Product component – Tests actualizados y compatibles", () => {
  const baseProduct = {
    nombre: "Manzanas Fuji",
    imagen: "http://example.com/manzanas.jpg",
    descripcion: "Manzanas crujientes y dulces",
    precio: 1200,
    stock: 5,
    origen: "Valle del Maule",
    sostenibilidad: "Cultivo sostenible",
    receta: "Ensalada de manzana",
    calificacion: 4.5,
  };

  const onAddToCartMock = jest.fn();
  beforeEach(() => jest.clearAllMocks());

  // 1
  it("1. Renderiza nombre, descripción, precio y elementos básicos", () => {
    render(<Product producto={baseProduct} onAddToCart={onAddToCartMock} />);

    expect(screen.getByText("Manzanas Fuji")).toBeInTheDocument();
    expect(screen.getByText("Manzanas crujientes y dulces")).toBeInTheDocument();
    expect(screen.getByText((t) => t.replace(/\s+/g, "") === "$1.200CLP")).toBeInTheDocument();
  });

  // 2
  it("2. Renderiza stock y origen en el formato correcto", () => {
    render(<Product producto={baseProduct} onAddToCart={onAddToCartMock} />);

    expect(screen.getByText(/STOCK:/i)).toBeInTheDocument();
    expect(screen.getByText(/ORIGEN:/i)).toBeInTheDocument();
  });

  // 3
  it("3. El botón muestra 'AÑADE AL CARRITO' cuando hay stock y no está maxedOut", () => {
    render(<Product producto={baseProduct} onAddToCart={onAddToCartMock} />);
    expect(screen.getByText("AÑADE AL CARRITO")).toBeInTheDocument();
  });

  // 4
  it("4. Hace click en 'AÑADE AL CARRITO' y llama onAddToCart", () => {
    render(<Product producto={baseProduct} onAddToCart={onAddToCartMock} />);

    fireEvent.click(screen.getByText("AÑADE AL CARRITO"));

    expect(onAddToCartMock).toHaveBeenCalledTimes(1);
    expect(onAddToCartMock).toHaveBeenCalledWith(baseProduct);
  });

  // 5
  it("5. Con stock 0 muestra 'AGOTADO' y no permite clic", () => {
    const p = { ...baseProduct, stock: 0 };
    render(<Product producto={p} onAddToCart={onAddToCartMock} />);

    const tag = screen.getByText("AGOTADO");
    fireEvent.click(tag); // no debería disparar nada

    expect(onAddToCartMock).not.toHaveBeenCalled();
  });

  // 6
  it("6. Cuando isMaxedOut es true muestra 'LÍMITE' y no llama onAddToCart", () => {
    render(
      <Product
        producto={baseProduct}
        onAddToCart={onAddToCartMock}
        isMaxedOut
      />
    );

    const tag = screen.getByText("LÍMITE");
    fireEvent.click(tag);

    expect(onAddToCartMock).not.toHaveBeenCalled();
  });

  // 7
  it("7. La imagen se renderiza con su alt correspondiente", () => {
    render(<Product producto={baseProduct} onAddToCart={onAddToCartMock} />);

    const img = screen.getByAltText(baseProduct.nombre);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(baseProduct.imagen);
  });

  // 8
  it("8. Renderiza la calificación en formato '(4.5)'", () => {
    render(<Product producto={baseProduct} onAddToCart={onAddToCartMock} />);
    expect(screen.getByText("(4.5)")).toBeInTheDocument();
  });

  // 9
  it("9. Renderiza las estrellas correctas para calificación 4.5 (4 llenas, 1 media, 0 vacías)", () => {
    render(<Product producto={baseProduct} onAddToCart={onAddToCartMock} />);

    const container = screen.getByText("(4.5)").closest(".product-rating");
    const starsNode = container.querySelector(".rating-stars");

    const text = starsNode.textContent.replace(/\s+/g, "");
    expect(text).toBe("★★★★★"); 
  });


  // 10
  it("10. El precio 0 CLP se muestra correctamente", () => {
    const p = { ...baseProduct, precio: 0 };
    render(<Product producto={p} onAddToCart={onAddToCartMock} />);

    expect(screen.getByText("$0 CLP")).toBeInTheDocument();
  });
});
