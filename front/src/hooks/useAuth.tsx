import { useState, useEffect, useCallback } from 'react';

interface User {
  id: string;
  email: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cargar usuario desde localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    if (token && id) {
      setUser({ id, email: '' }); // Puedes obtener más detalles del usuario si es necesario
      setIsAuthenticated(true);
    }
  }, []);

  // Iniciar sesión
  const login = useCallback((token: string, id: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    setUser({ id, email: '' }); // Aquí puedes agregar más detalles si tienes un endpoint que retorna el perfil del usuario
    setIsAuthenticated(true);
  }, []);

  // Cerrar sesión
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
};
