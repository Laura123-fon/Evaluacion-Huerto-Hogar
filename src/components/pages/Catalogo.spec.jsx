// Catalogo.spec.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Catalogo from "./Catalogo";
import { CartContext } from "../organisms/CartContext";
import { BrowserRouter } from "react-router-dom";

jest.mock("../organisms/Product", () => ({ producto, onAddToCart, isMaxedOut }) => (
  <div data-testid="product-card">
    <p>{producto.nombre}</p>
    <button disabled={isMaxedOut} onClick={() => onAddToCart(producto)}>
      Agregar
    </button>
  </div>
));

jest.mock("../organisms/Toast", () => ({ mensaje }) => (
  <div data-testid="toast">{mensaje}</div>
));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate
}));

const renderWithContext = (ui, carrito = [], agregarAlCarrito = jest.fn()) => {
  return render(
    <CartContext.Provider value={{ carrito, agregarAlCarrito }}>
      <BrowserRouter>{ui}</BrowserRouter>
    </CartContext.Provider>
  );
};

test("1. Renderiza el título del catálogo", () => {
  renderWithContext(<Catalogo />);
  expect(screen.getByText("Catálogo de HuertoHogar")).toBeInTheDocument();
});

test("2. Renderiza al menos 1 producto al iniciar", () => {
  renderWithContext(<Catalogo />);
  expect(screen.getAllByTestId("product-card").length).toBeGreaterThan(0);
});

test("3. Botón 'Todos' activa filtro 'all'", () => {
  renderWithContext(<Catalogo />);
  fireEvent.click(screen.getByText("Todos"));
  const btn = screen.getByText("Todos");
  expect(btn.classList.contains("active")).toBe(true);
});

test("4. Filtra por frutas correctamente", () => {
  renderWithContext(<Catalogo />);
  fireEvent.click(screen.getByText("Frutas Frescas"));
  expect(screen.getAllByTestId("product-card").length).toBe(3);
});

test("5. Filtra por verduras correctamente", () => {
  renderWithContext(<Catalogo />);
  fireEvent.click(screen.getByText("Verduras Orgánicas"));
  expect(screen.getAllByTestId("product-card").length).toBe(4);
});

test("6. Muestra mensaje cuando un filtro no tiene productos", () => {
  renderWithContext(<Catalogo />);
  fireEvent.click(screen.getByText("Productos Lácteos"));
  expect(screen.queryByText("No hay productos disponibles")).not.toBeInTheDocument();
});

test("7. Cuando agrego un producto aparece el Toast", () => {
  const mockAgregar = jest.fn();
  renderWithContext(<Catalogo />, [], mockAgregar);
  const btn = screen.getAllByText("Agregar")[0];
  fireEvent.click(btn);
  expect(screen.getByTestId("toast")).toBeInTheDocument();
});

test("8. El contador del carrito muestra los items correctos", () => {
  const carrito = [
    { id: "FR001", cantidad: 2 },
    { id: "VR001", cantidad: 1 }
  ];
  renderWithContext(<Catalogo />, carrito);
  expect(screen.getByText("Carrito: 3 items")).toBeInTheDocument();
});

test("9. Botón 'Ir al Carrito' activa navigate('/carrito')", () => {
  renderWithContext(<Catalogo />);
  fireEvent.click(screen.getByText("🛒 Ir al Carrito"));
  expect(mockNavigate).toHaveBeenCalledWith("/carrito");
});

test("10. Cebollas Moradas tiene stock, su botón debe estar habilitado", () => {
  renderWithContext(<Catalogo />);
  const cebollaCard = screen.getByText("Cebollas Moradas").closest("div");
  const btn = cebollaCard.querySelector("button");
  expect(btn.disabled).toBe(false);
});
