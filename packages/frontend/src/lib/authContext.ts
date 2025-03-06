import { createContext, useContext } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: useAuthContext,
});

export function useAuthContext() {
  return useContext(AuthContext);
}
