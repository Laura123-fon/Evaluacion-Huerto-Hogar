import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import LandingPage from "./components/pages/LandingPage";
import Catalogo from "./components/pages/Catalogo";
import Carrito from "./components/pages/Carrito";
import BoletaPage from "./components/pages/BoletaPage";
import Perfil from "./components/pages/Perfil";

import Login from "./components/organisms/Login";
import Register from "./components/organisms/Register";

import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="App min-h-screen flex flex-col">
      
      {isAuthenticated && <Header onLogout={logout} />}

      <main className="flex-grow">
        <Routes>
          
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <LandingPage />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <Login />
            }
          />

          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <Register />
            }
          />

          <Route path="/catalog" element={<ProtectedRoute><Catalogo /></ProtectedRoute>} />
          <Route path="/carrito" element={<ProtectedRoute><Carrito /></ProtectedRoute>} />
          <Route path="/historial" element={<ProtectedRoute><BoletaPage /></ProtectedRoute>} />
          <Route path="/perfil" element={<ProtectedRoute><Perfil /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </main>

      {isAuthenticated && (
          <Footer 
            isLogged={isAuthenticated}
            onLogout={logout} 
          />
        )}
    </div>
  );
}
