"use client";

import { useState } from "react";
import { useClients } from "@/hooks/useClients";

import { Container } from "@/components/ui/Container";
import { PlusIcon } from "@/components/ui/Icons";
import { NoClients } from "@/components/ui/NoClients";
import { ClientModal } from "@/components/ui/ClientModal";

import { AnimatePresence, motion } from "motion/react";
import { Client } from "@/lib/types";
import { ClientList } from "../ui/ClientList";

export function ClientsManagment() {
  const { createClient, isLoading, error, clients } = useClients();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const variants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (data: Client) => {
    try {
      await createClient(data);
      closeModal();
      // Podés agregar un toast de éxito aquí
    } catch (err) {
      console.error("Error al crear cliente", err);
      // Podés mostrar un toast de error también
    }
  };

  return (
    <Container>
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold">Gestión de Clientes</h2>
          <p className="text-gray-500 text-lg">
            Crea y administra tus clientes
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:scale-110 transition-all cursor-pointer"
        >
          <PlusIcon />
          Nuevo Cliente
        </button>
      </header>
      <AnimatePresence>
        {clients.length > 0 ? (
          <ClientList clients={clients} />
        ) : (
          <NoClients onCreateClient={() => setIsModalOpen(true)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={variants}
          >
            <ClientModal onSubmit={handleSubmit} onClose={closeModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
}
