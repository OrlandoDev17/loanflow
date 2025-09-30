import { UserIcon } from "./Icons";

export function NoClients({ onCreateClient }: { onCreateClient: () => void }) {
  return (
    <article className="flex flex-col justify-center items-center gap-4 w-full py-10 bg-white shadow-lg shadow-gray-300 rounded-xl border border-gray-100">
      <UserIcon className="size-20 p-4 bg-primary/20 text-primary rounded-full" />
      <h3 className="text-2xl font-bold">No hay clientes aún</h3>
      <p className="text-gray-500 text-lg">
        Comienza creando tu primer cliente
      </p>
      <button
        className="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:scale-110 transition-all cursor-pointer"
        onClick={onCreateClient}
      >
        Crear Primer Cliente
      </button>
    </article>
  );
}
