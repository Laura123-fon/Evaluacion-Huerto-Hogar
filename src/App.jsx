import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { CartProvider } from "./components/organisms/CartContext";
import { BoletaProvider } from "./components/organisms/BoletaContext";

import Catalogo from "./components/pages/Catalogo";
import LandingPage from "./components/pages/LandingPage"; 
import Login from "./components/organisms/Login";
import Register from "./components/organisms/Register";
import BoletaIndividual from "./components/organisms/Boletaindividual";
import Footer from "./components/organisms/Footer";
import Header from "./components/organisms/Header";

import Perfil from "./components/pages/Perfil";
import Carrito from "./components/pages/Carrito";
import BoletaPage from "./components/pages/BoletaPage";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    const logueado = localStorage.getItem("logueado");
    setIsLogged(logueado === "true");
  }, []);

  const handleLoginSuccess = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("logueado");
    localStorage.removeItem("usuarioActual");
    setIsLogged(false);
    setShowLogin(true);
  };

  return (
    <CartProvider>
      <BoletaProvider>
        <BrowserRouter>
          <div className="App min-h-screen flex flex-col">
            {isLogged && <Header onLogout={handleLogout} />}

            <main className="flex-grow">
              <Routes>
                <Route
                  path="/"
                  element={
                    !isLogged ? (
                      showLogin ? (
                        <Login
                          switchToRegister={() => setShowLogin(false)}
                          onLogin={handleLoginSuccess}
                        />
                      ) : (
                        <Register switchToLogin={() => setShowLogin(true)} />
                      )
                    ) : (
                      <LandingPage />
                    )
                  }
                />

                <Route
                  path="/catalog"
                  element={isLogged ? <Catalogo /> : <Navigate to="/" replace />}
                />
                <Route
                  path="/carrito"
                  element={isLogged ? <Carrito /> : <Navigate to="/" replace />}
                />

                <Route 
                  path="/boleta" 
                  element={isLogged ? <BoletaIndividual /> : <Navigate to="/" replace />} 
                />

                <Route 
                  path="/historial" 
                  element={isLogged ? <BoletaPage /> : <Navigate to="/" replace />} 
                />
                
                <Route path="/perfil" element={isLogged ? <Perfil /> : <Navigate to="/" replace />} />


                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>

            </main>

            <Footer isLogged={isLogged} onLogout={handleLogout} />
          </div>
        </BrowserRouter>
      </BoletaProvider>
    </CartProvider>
  );
}

export default App;