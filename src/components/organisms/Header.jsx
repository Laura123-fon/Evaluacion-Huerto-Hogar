import { Link } from "react-router-dom";

export default function Header({ onLogout }) {
  return (
    <header>
      <div className="logo">
      <div className="header__logo"></div>
      </div>
      <nav className="header__nav">
        <Link to="/">Inicio</Link>
        <Link to="/catalog">Catálogo</Link>
        <Link to="/carrito"  className="cart-link">Carrito</Link>
        <Link to="/historial">Historial de Boletas</Link>
        <Link to="/perfil">Perfil</Link>
      </nav>
    </header>
  );
}
