import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'
import { BrowserRouter } from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext.jsx'; 
import { CartProvider } from "./components/organisms/CartContext";
import { BoletaProvider } from "./components/organisms/BoletaContext";

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
