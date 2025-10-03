"use client";

import { useState } from "react";
import { useClients } from "@/hooks/useClients";
import { triggerConfetti } from "@/lib/confetti";
import { ClientInput } from "@/lib/types";
import { Container } from "@/components/ui/Container";
import { ClientModal } from "@/components/ui/ClientModal";
import { ClientList } from "@/components/ui/ClientList";
import { NoClients } from "@/components/ui/NoClients";
import { AnimatePresence, motion } from "motion/react";

import { PlusIcon } from "@/components/ui/Icons";

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

  const handleSubmit = async (data: ClientInput) => {
    try {
      await createClient(data);
      closeModal();
      // Trigger confetti effect
      setTimeout(triggerConfetti, 300);
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
          <motion.div key="clients-list">
            <ClientList clients={clients} />
          </motion.div>
        ) : (
          <motion.div key="no-clients">
            <NoClients onCreateClient={() => setIsModalOpen(true)} />
          </motion.div>
        )}
        {error && (
          <motion.div key="error">
            <p className="text-red-500">{error}</p>
          </motion.div>
        )}
        {isLoading && (
          <motion.div key="loading">
            <p className="text-gray-500">Creando cliente...</p>
          </motion.div>
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
