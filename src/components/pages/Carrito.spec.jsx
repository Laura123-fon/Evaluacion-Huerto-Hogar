import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Carrito from "./Carrito";
import { CartContext } from "../organisms/CartContext";
import { BoletaContext } from "../organisms/BoletaContext";
import { BrowserRouter } from "react-router-dom";

window.alert = jest.fn();

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate
}));

const mockActualizar = jest.fn();
const mockEliminar = jest.fn();
const mockLimpiar = jest.fn();
const mockGenerar = jest.fn(() => 999);
const mockAgregar = jest.fn();

const carritoBase = [
  { id: 1, nombre: "Naranjas", precio: 3000, cantidad: 1, imagen: "n.jpg" }
];

function renderUI(ctx = {}) {
  return render(
    <BrowserRouter>
      <CartContext.Provider
        value={{
          carrito: ctx.carrito ?? carritoBase,
          actualizarCantidad: mockActualizar,
          eliminarDelCarrito: mockEliminar,
          limpiarCarrito: mockLimpiar
        }}
      >
        <BoletaContext.Provider
          value={{
            agregarBoleta: mockAgregar,
            generarNumeroBoleta: mockGenerar
          }}
        >
          <Carrito />
        </BoletaContext.Provider>
      </CartContext.Provider>
    </BrowserRouter>
  );
}

describe("Carrito - FULL TEST SUITE", () => {

  test("1. Renderiza correctamente un producto", () => {
  renderUI();

  const precioUnitario = screen.getByText("$3.000", {
    selector: ".precio-cell"
  });

  expect(precioUnitario).toBeInTheDocument();
});

  test("2. Renderiza datos del cliente", () => {
    localStorage.setItem("nombre", "Juan");
    localStorage.setItem("apellido", "Pérez");
    localStorage.setItem("usuario", "jp@mail.com");

    renderUI();

    expect(screen.getByText(/Juan Pérez/)).toBeInTheDocument();
    expect(screen.getByText("jp@mail.com")).toBeInTheDocument();
  });

  test("3. Aumenta cantidad", () => {
    renderUI();
    fireEvent.click(screen.getByRole("button", { name: "+" }));
    expect(mockActualizar).toHaveBeenCalled();
  });

  test("4. Disminuye cantidad", () => {
    renderUI();
    fireEvent.click(screen.getByRole("button", { name: "-" }));
    expect(mockActualizar).toHaveBeenCalled();
  });

  test("5. Cambiar cantidad manual", () => {
    renderUI();
    const input = screen.getByDisplayValue("1");
    fireEvent.change(input, { target: { value: "5" } });
    expect(mockActualizar).toHaveBeenCalled();
  });

  test("6. Eliminar producto", () => {
    renderUI();
    fireEvent.click(screen.getByLabelText("Eliminar Naranjas"));
    expect(mockEliminar).toHaveBeenCalledWith(1);
  });

  test("7. Limpiar carrito", () => {
    renderUI();
    fireEvent.click(screen.getByText("Limpiar carrito"));
    expect(mockLimpiar).toHaveBeenCalled();
  });

  test("8. Carrito vacío muestra mensaje", () => {
    renderUI({ carrito: [] });
    expect(
      screen.getByText("Tu carrito está vacío. ¡Agrega productos desde el catálogo!")
    ).toBeInTheDocument();
  });

  test("9. Carrito vacío no muestra finalizar compra", () => {
    renderUI({ carrito: [] });
    const boton = screen.queryByText("Finalizar Compra y Pagar");
    expect(boton).not.toBeInTheDocument();
  });

  test("10. Redirige cuando datos completos", () => {
    renderUI();

    fireEvent.change(screen.getByPlaceholderText("Ej: Los Álamos 1234"), {
      target: { value: "Av 1" }
    });
    fireEvent.change(screen.getByPlaceholderText("Ej: RM"), {
      target: { value: "RM" }
    });
    fireEvent.change(screen.getByPlaceholderText("Ej: Santiago"), {
      target: { value: "Santiago" }
    });

    fireEvent.click(screen.getByText("Finalizar Compra y Pagar"));

    expect(mockNavigate).toHaveBeenCalledWith("/boleta", expect.any(Object));
  });
});
