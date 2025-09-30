import { useState } from "react";
import axios from "axios";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (correo: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post("http://localhost:3001/auth/login", {
        correo,
        password,
      });
      localStorage.setItem("token", res.data.token);
      return res.data.usuario;
    } catch (err: any) {
      setError(err.response.data.error || "Error al iniciar sesión");
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
}
