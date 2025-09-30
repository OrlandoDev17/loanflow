import { useState } from "react";
import axios from "axios";

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (nombre: string, correo: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post("http://localhost:3001/auth/register", {
        nombre,
        correo,
        password,
      });
      return res.data.usuario;
    } catch (err: any) {
      setError(err.response?.data?.error || "Error al registrar usuario");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
}
