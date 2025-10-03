import { Client } from "@/lib/types";
import { LocationIcon, MailIcon, PhoneIcon } from "./Icons";

export function ClientList({ clients }: { clients: Client[] }) {
  const abbrName = (nombre: string, apellido: string) => {
    return nombre.charAt(0).toUpperCase() + apellido.charAt(0).toUpperCase();
  };

  return (
    <div className="flex items-center gap-6 w-full flex-wrap">
      {clients.map((client) => (
        <article
          className="flex flex-col gap-4 bg-white p-6 rounded-xl border border-gray-200 w-full max-w-lg hover:-translate-y-2 transition-transform"
          key={client.id || client.cedula}
        >
          <header className="flex items-center gap-4">
            <span className="p-3 rounded-full bg-primary text-white text-xl font-medium">
              {abbrName(client.nombre, client.apellido)}
            </span>
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">
                {client.nombre} {client.apellido}
              </h3>
              <p className="text-gray-600">V-{client.cedula}</p>
            </div>
          </header>
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-gray-500 text-sm">
              <PhoneIcon className="size-5" />
              {client.telefono}
            </span>
            <span className="flex items-center gap-2 text-gray-500 text-sm">
              <MailIcon className="size-5" />
              {client.correo}
            </span>
            <span className="flex items-center gap-2 text-gray-500 text-sm">
              <LocationIcon className="size-5" />
              {client.direccion}
            </span>
          </div>
          <button className="border border-primary text-primary font-medium p-2 rounded-xl hover:bg-primary hover:text-white transition-colors cursor-pointer">
            Ver Detalles
          </button>
        </article>
      ))}
    </div>
  );
}
