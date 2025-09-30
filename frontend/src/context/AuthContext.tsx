import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  login: (token: string, usuario: Usuario) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("usuario");
    if (token && userData) {
      setUsuario(JSON.parse(userData));
    }
  }, []);

  const login = (token: string, usuario: Usuario) => {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setUsuario(usuario);
    router.push("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    setUsuario(null);
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ usuario, login, logout, isAuthenticated: !!usuario }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}
