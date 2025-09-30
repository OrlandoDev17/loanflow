//Tipos
import type { Client, FormClient, SidebarItem } from "@/lib/types";

//Iconos
import {
  HomeIcon,
  DashboardIcon,
  UsersIcon,
  DollarIcon,
} from "@/components/ui/Icons";

export const SIDEBAR_ITEMS: SidebarItem[] = [
  {
    id: 1,
    label: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    id: 2,
    label: "Dashboard",
    href: "/dashboard",
    icon: DashboardIcon,
  },
  {
    id: 3,
    label: "Prestamos",
    href: "/loans",
    icon: DollarIcon,
  },
  {
    id: 4,
    label: "Clientes",
    href: "/clients",
    icon: UsersIcon,
  },
];

export const FORM_CLIENTS: FormClient[] = [
  {
    id: "nombre",
    label: "Nombre",
    placeholder: "Orlando",
    type: "text",
  },
  {
    id: "apellido",
    label: "Apellido",
    placeholder: "López",
    type: "text",
  },
  {
    id: "cedula",
    label: "Cédula",
    placeholder: "123456789",
    type: "number",
  },
  {
    id: "telefono",
    label: "Teléfono",
    placeholder: "04241234567",
    type: "number",
  },
  {
    id: "correo",
    label: "Correo",
    placeholder: "orlando@gmail.com",
    type: "email",
  },
  {
    id: "direccion",
    label: "Dirección",
    placeholder: "Calle 123",
    type: "text",
  },
];
