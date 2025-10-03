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
    id: 1,
    name: "nombre",
    label: "Nombre",
    placeholder: "Orlando",
    type: "text",
  },
  {
    id: 2,
    name: "apellido",
    label: "Apellido",
    placeholder: "López",
    type: "text",
  },
  {
    id: 3,
    name: "cedula",
    label: "Cédula",
    placeholder: "123456789",
    type: "number",
  },
  {
    id: 4,
    name: "telefono",
    label: "Teléfono",
    placeholder: "04241234567",
    type: "number",
  },
  {
    id: 5,
    name: "correo",
    label: "Correo",
    placeholder: "orlando@gmail.com",
    type: "email",
  },
  {
    id: 6,
    name: "direccion",
    label: "Dirección",
    placeholder: "Calle 123",
    type: "text",
  },
];
