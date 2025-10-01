import { useState } from "react";
import axios, { AxiosError } from "axios";
import { APIError } from "@/lib/types";

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
    } catch (err: unknown) {
      const axiosError = err as AxiosError<APIError>;
      setError(
        axiosError.response?.data?.message ||
          axiosError.response?.data?.error ||
          "Error al iniciar sesión"
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
}
