import axios, { AxiosError } from "axios";
import { APIError, Client } from "@/lib/types";
import { useState, useEffect } from "react";

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${API_URL}/clientes`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 🔑 enviar token
          },
        });
        setClients(res.data);
      } catch (err: unknown) {
        const axiosError = err as AxiosError<APIError>;
        setError(
          axiosError.response?.data?.message ||
            axiosError.response?.data?.error ||
            "Error al obtener clientes"
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchClients();
  }, []);

  const createClient = async (data: Client) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post(`${API_URL}/clientes`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setClients((prev) => [...prev, res.data]); // 🔑 actualizar lista
      return res.data;
    } catch (err: unknown) {
      const axiosError = err as AxiosError<APIError>;
      setError(
        axiosError.response?.data?.message ||
          axiosError.response?.data?.error ||
          "Error al crear el cliente"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    clients,
    createClient,
  };
}
