import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { CartProvider } from "./components/organisms/CartContext";

import Catalogo from "./components/pages/Catalogo";
import LandingPage from "./components/pages/LandingPage";
import Login from "./components/organisms/Login";
import Register from "./components/organisms/Register";
import Footer from "./components/organisms/Footer";
import Header from "./components/organisms/Header";
import Carrito from "./components/pages/Carrito";
import BoletaPage from "./components/pages/BoletaPage";
import PerfilUsuario from "./components/pages/PerfilUsuario";
import React from "react";

//gfjgnbkbnk
function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const logueado = localStorage.getItem("logueado");
    setIsLogged(logueado === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("logueado");
    setIsLogged(false);
    setShowLogin(true);
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="App">
          {isLogged && <Header onLogout={handleLogout} />}

          <Routes>
            {!isLogged ? (
              <>
                <Route
                  path="/"
                  element={
                    showLogin ? (
                      <Login
                        switchToRegister={() => setShowLogin(false)}
                        onLogin={() => setIsLogged(true)}
                      />
                    ) : (
                      <Register switchToLogin={() => setShowLogin(true)} />
                    )
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            ) : (
              <>
                <Route path="/" element={<LandingPage />} />
                <Route path="/catalog" element={<Catalogo />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/boleta" element={<BoletaPage />} />
                <Route path="/perfil" element={<PerfilUsuario onLogout={handleLogout} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )}
          </Routes>

          <Footer isLogged={isLogged} onLogout={handleLogout} />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
