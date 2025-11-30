import React from "react";


export default function Footer({ isLogged = false, onLogout }) {
  const instagramUrl = "https://www.instagram.com/laloquilla.2.0?utm_source=qr&igsh=NGV1c2Y2b3Vjemli";
  const facebookUrl = "https://www.facebook.com/share/1Bft1zPLhK/";

  return (
    <footer className="footer">
      <div className="footer-content">
        
        <div className="social-links">
          <span>Síguenos:</span>
          
          <a 
            href={instagramUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon instagram-qr"
          >
            <img src="./imagenes/instagra.webp" alt="@Instagram" />
          </a>

          <a 
            href={facebookUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-icon facebook-logo"
          >
            <img src="./imagenes/facebook.png" alt="Facebook" />
          </a>

        </div>        
        <p className="copyright-text">© 2025 HuertoHogar. Todos los derechos reservados.</p>

        {isLogged && (
          <button className="logoutBtn" onClick={onLogout}>
            Cerrar sesión
          </button>
        )}
      </div>
    </footer>
  );
}