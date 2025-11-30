import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { CartProvider } from "./components/organisms/CartContext";
import { BoletaProvider, BoletaContext } from "./components/organisms/BoletaContext";

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


// ================================================================
//  Componente principal de la App (maneja login y rutas)
// ================================================================
function AppContent() {
    
    const [isLogged, setIsLogged] = useState(false);
    const [showLogin, setShowLogin] = useState(true);

    const navigate = useNavigate();
    const { limpiarHistorial } = useContext(BoletaContext);


    // Leer estado de login al cargar
    useEffect(() => {
        const logueado = localStorage.getItem("logueado");
        setIsLogged(logueado === "true");
    }, []);


    // Cuando el login es exitoso
    const handleLoginSuccess = () => {
        setIsLogged(true);
    };


    // Cuando cerramos sesión
    const handleLogout = () => {

        // Borrar datos de usuario
        localStorage.removeItem("logueado");
        localStorage.removeItem("usuarioActual");

        [
            "nombre", "apellido", "usuario", 
            "fotoPerfil", "telefono", "ciudad", "direccion"
        ].forEach(k => localStorage.removeItem(k));

        // Borrar boletas del contexto
        limpiarHistorial();

        // Reset de estados
        setIsLogged(false);
        setShowLogin(true);

        // Redirigir
        navigate("/");
    };


    return (
        <div className="App min-h-screen flex flex-col">

            {isLogged && <Header onLogout={handleLogout} />}

            <main className="flex-grow">
                <Routes>

                    {/* ------ Página raíz ------ */}
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
                                    <Register 
                                        switchToLogin={() => setShowLogin(true)}
                                    />
                                )
                            ) : (
                                <LandingPage />
                            )
                        }
                    />

                    {/* ------ Rutas privadas ------ */}
                    <Route path="/catalog"       element={isLogged ? <Catalogo />          : <Navigate to="/" replace />} />
                    <Route path="/carrito"       element={isLogged ? <Carrito />          : <Navigate to="/" replace />} />
                    <Route path="/boleta"        element={isLogged ? <BoletaIndividual /> : <Navigate to="/" replace />} />
                    <Route path="/historial"     element={isLogged ? <BoletaPage />       : <Navigate to="/" replace />} />
                    <Route path="/perfil"        element={isLogged ? <Perfil />           : <Navigate to="/" replace />} />

                    {/* ------ Cualquier otra ruta ------ */}
                    <Route path="*" element={<Navigate to="/" replace />} />

                </Routes>
            </main>

            <Footer isLogged={isLogged} onLogout={handleLogout} />

        </div>
    );
}


// ================================================================
//  Proveedores globales + Router
// ================================================================
export default function App() {
    return (
        <CartProvider>
            <BoletaProvider>
                <BrowserRouter>
                    <AppContent />
                </BrowserRouter>
            </BoletaProvider>
        </CartProvider>
    );
}
