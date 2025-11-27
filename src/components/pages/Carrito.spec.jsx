import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Carrito from "./Carrito";
import { CartContext } from "../organisms/CartContext";
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

const carritoBase = [
  { id: 1, nombre: "Naranjas", precio: 3000, cantidad: 1, imagen: "n.jpg" }
];

const clienteBase = {
  nombre: "Juan",
  apellido: "Pérez",
  correo: "jp@mail.com",
  direccion: "Av 1",
  departamento: "",
  comuna: "Santiago",
  region: "RM",
  indicaciones: ""
};

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
        <Carrito />
      </CartContext.Provider>
    </BrowserRouter>
  );
}

describe("Carrito - FULL TEST SUITE", () => {

  test("1. Renderiza correctamente un producto", () => {
    renderUI();

    expect(screen.getByText("Naranjas")).toBeInTheDocument();
    expect(screen.getByText("$3.000", { selector: ".precio-cell" })).toBeInTheDocument();
  });

  test("2. Renderiza datos del cliente sin errores", () => {
    localStorage.setItem("nombre", clienteBase.nombre);
    localStorage.setItem("apellido", clienteBase.apellido);
    localStorage.setItem("usuario", clienteBase.correo);

    renderUI();

    expect(screen.getByText(/Juan Pérez/)).toBeInTheDocument();
    expect(screen.getByText(clienteBase.correo)).toBeInTheDocument();
  });

  test("3. Aumenta cantidad al presionar +", () => {
    renderUI();

    const btn = screen.getByRole("button", { name: "+" });
    fireEvent.click(btn);

    expect(mockActualizar).toHaveBeenCalled();
  });

  test("4. Disminuye cantidad al presionar -", () => {
    renderUI();

    const btn = screen.getByRole("button", { name: "-" });
    fireEvent.click(btn);

    expect(mockActualizar).toHaveBeenCalled();
  });

  test("5. Modificar cantidad manualmente llama a actualizarCantidad", () => {
    renderUI();

    const input = document.querySelector(".input-cantidad");
    fireEvent.change(input, { target: { value: "5" } });

    expect(mockActualizar).toHaveBeenCalled();
  });

  test("6. Eliminar producto llama a eliminarDelCarrito", () => {
    renderUI();

    const boton = screen.getByLabelText("Eliminar Naranjas");
    fireEvent.click(boton);

    expect(mockEliminar).toHaveBeenCalledWith(1);
  });

  test("7. Botón limpiar carrito activa limpiarCarrito()", () => {
    renderUI();

    const link = screen.getByText("Limpiar carrito");
    fireEvent.click(link);

    expect(mockLimpiar).toHaveBeenCalled();
  });

  test("8. Muestra mensaje de carrito vacío si no hay productos", () => {
    renderUI({ carrito: [] });

    expect(
      screen.getByText("Tu carrito está vacío. ¡Agrega productos desde el catálogo!")
    ).toBeInTheDocument();
  });

  test("9. No muestra el botón de finalizar compra cuando el carrito está vacío", () => {
    renderUI({ carrito: [] });

    const botonFinalizar = screen.queryByText("Finalizar Compra y Pagar");
    expect(botonFinalizar).not.toBeInTheDocument();
  });

  test("10. Datos completos redirigen a /boleta", () => {
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

    const btn = screen.getByText("Finalizar Compra y Pagar");
    fireEvent.click(btn);

    expect(mockNavigate).toHaveBeenCalledWith("/boleta", expect.any(Object));
  });
});
