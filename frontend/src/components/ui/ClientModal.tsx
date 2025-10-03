import { FORM_CLIENTS } from "@/lib/constants";
import { XIcon } from "./Icons";
import { ClientInput } from "@/lib/types";

interface ClientModalProps {
  onClose: () => void;
  onSubmit: (data: ClientInput) => void;
}

export function ClientModal({ onClose, onSubmit }: ClientModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData);

    const data: ClientInput = {
      nombre: rawData.nombre as string,
      apellido: rawData.apellido as string,
      cedula: Number(rawData.cedula),
      telefono: rawData.telefono as string,
      correo: rawData.correo as string,
      direccion: rawData.direccion as string,
    };

    onSubmit(data);
  };

  return (
    <article className="flex flex-col gap-6 bg-white shadow-lg shadow-gray-300 min-w-md rounded-xl border border-gray-100 p-4">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl text-primary font-bold">Nuevo Cliente</h2>
        <button onClick={onClose}>
          <XIcon className="size-10 p-2 rounded-xl hover:bg-red-400 hover:text-white transition-all cursor-pointer" />
        </button>
      </header>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {FORM_CLIENTS.map(({ id, name, label, placeholder, type }) => (
          <label className="flex flex-col gap-2" key={name}>
            <span className="font-medium">{label}</span>
            <input
              className="text-sm px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary transition-all cursor-pointer"
              type={type}
              placeholder={placeholder}
              name={name}
            />
          </label>
        ))}
        <button className="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:scale-105 transition-all cursor-pointer mt-2">
          Crear Cliente
        </button>
      </form>
    </article>
  );
}
