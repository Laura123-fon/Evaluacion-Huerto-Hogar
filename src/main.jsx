// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'
import { BrowserRouter } from 'react-router-dom'; // Asegúrate de importar BrowserRouter
import { AuthProvider } from './context/AuthContext.jsx'; // 👈 IMPORTANTE
import { CartProvider } from "./components/organisms/CartContext";
import { BoletaProvider } from "./components/organisms/BoletaContext";
// Importa tus archivos CSS globales aquí

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> 
      <CartProvider>
        <BoletaProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </BoletaProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);
//