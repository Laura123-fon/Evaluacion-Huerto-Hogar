import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="header__logo"></div>

      <nav className="header__nav">
        <Link to="/">Inicio</Link>
        <Link to="/catalog">Catálogo</Link>
        <Link to="/carrito" className="cart-link">Carrito</Link>
        <Link to="/historial">Historial de Boletas</Link>
        <Link to="/perfil">Perfil</Link>
      </nav>
    </header>
  );
}
