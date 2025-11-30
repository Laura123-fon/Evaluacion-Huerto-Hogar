import { createContext, useContext, useState, useEffect } from 'react';
import { isAuthenticated, getUsername, getRole, logout as logoutService } from '../services/AuthService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getUsername());
      setRole(getRole());
    }
  }, []);

  const login = (token, username, userRole) => {
    setUser(username);
    setRole(userRole);
  };

  const logout = () => {
    logoutService();
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      role,
      username: user, 
      isAuthenticated: !!user,
      isAdmin: role === 'ADMIN',
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
