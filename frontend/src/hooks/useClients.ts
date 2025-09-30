import { useState, useEffect } from "react";
import { Client } from "@/lib/types";
import axios from "axios";

export function useClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await axios.get("http://localhost:3001/clientes");
        setClients(res.data);
      } catch (err) {
        console.error("Error al obtener clientes", err);
      }
    };
    fetchClients();
  }, []);

  const createClient = async (data: Client) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:3001/clientes", data);
      return res.data;
    } catch (err: any) {
      setError(err.response.data.message || "Error al crear el cliente");
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
