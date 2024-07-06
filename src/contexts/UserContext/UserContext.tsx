import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import UserService from '../../services/UserService';
import { TSignIn } from "../../models/types/requests/TSignIn";
import { TUser } from '../../models/types/entities/TUser';
import { TUserPatient } from '../../models/types/entities/TUserPatient'; // Asegúrate de importar el tipo correcto

// Define el tipo de datos del contexto
interface AuthContextType {
  user: TUser | null;
  isAuthenticated: boolean;
  userPatients: TUserPatient[]; // Cambiado a un array vacío en lugar de null
  login: (signInForm: TSignIn) => Promise<boolean>;
  logout: () => void;
  fetchUserPatients: () => Promise<void>;
}

// Define el tipo de las propiedades del AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Crea el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook para acceder al contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};

// Componente proveedor del contexto de autenticación
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [userPatients, setUserPatients] = useState<TUserPatient[]>([]); // Cambiado a un array vacío
  const isAuthenticated = Boolean(user);

  // Función para iniciar sesión
  const login = async (signInForm: TSignIn) => {
    try {
      const response = await UserService.login(signInForm);
      const userData: TUser = response.data; // Asume que la respuesta contiene los datos del usuario
      setUser(userData);
      await fetchUserPatients(); // Fetch user patients after login
      return true;
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    setUserPatients([]); // Limpia la lista de pacientes al cerrar sesión
  };

  // Función para obtener los pacientes del usuario
  const fetchUserPatients = async () => {
    try {
      const patients = await UserService.getUserPatient();
      setUserPatients(patients);
    } catch (error) {
      console.error('Error fetching user patients:', error);
    }
  };

  // Fetch user patients on initial load if user is already logged in
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserPatients();
    }
  }, [isAuthenticated]);

  const authContextValue: AuthContextType = {
    user,
    isAuthenticated,
    userPatients,
    login,
    logout,
    fetchUserPatients,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
