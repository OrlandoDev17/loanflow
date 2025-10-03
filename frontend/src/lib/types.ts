import { ComponentType } from "react";

export interface Icon {
  className?: string;
}

export interface SidebarItem {
  id: number;
  label: string;
  href: string;
  icon: ComponentType<Icon>;
}

export interface Client {
  id: string;
  nombre: string;
  apellido: string;
  cedula: number;
  correo: string;
  telefono: string;
  direccion: string;
}

export interface ClientInput {
  nombre: string;
  apellido: string;
  cedula: number;
  correo: string;
  telefono: string;
  direccion: string;
}

export interface FormClient {
  id: number;
  name: keyof ClientInput;
  label: string;
  placeholder: string;
  type: string;
}

export interface APIError {
  error?: string;
  message?: string;
}
