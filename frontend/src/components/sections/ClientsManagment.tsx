import { Container } from "@/components/ui/Container";
import { PlusIcon } from "../ui/Icons";
import { NoClients } from "../ui/NoClients";

export function ClientsManagment() {
  return (
    <Container>
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h2 className="text-4xl font-bold">Gestión de Clientes</h2>
          <p className="text-gray-500 text-lg">
            Crea y administra tus clientes
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:scale-110 transition-all cursor-pointer">
          <PlusIcon />
          Nuevo Cliente
        </button>
      </header>
      <NoClients />
    </Container>
  );
}
