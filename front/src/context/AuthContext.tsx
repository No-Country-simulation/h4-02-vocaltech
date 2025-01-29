import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: string | null;
  isAuthenticated: boolean;
  login: (token: string, id: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    if (token && id) {
      setUser(id);
    }
  }, []);

  const login = (token: string, id: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("id", id);
    setUser(id);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
