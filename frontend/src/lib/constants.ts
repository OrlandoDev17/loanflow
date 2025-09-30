//Tipos
import type { SidebarItem } from "@/lib/types";

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
