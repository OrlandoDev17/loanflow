import { useState } from "react";
import axios, { AxiosError } from "axios";
import { APIError } from "@/lib/types";
import { triggerConfetti } from "@/lib/confetti";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_LOCAL_URL;

  const login = async (correo: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        correo,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
      // Trigger confetti effect
      setTimeout(triggerConfetti, 500);
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
