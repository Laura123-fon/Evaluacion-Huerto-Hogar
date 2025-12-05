import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("username");
    const r = localStorage.getItem("role");

    if (t && u && r) {
      setToken(t);
      setUsername(u);
      setRole(r);
    }
  }, []);

  const login = (token, username, role) => {
    setToken(token);
    setUsername(username);
    setRole(role);

    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("role", role);
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        username,
        role,
        isAuthenticated: !!token,
        isAdmin: role === "ADMIN",
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
