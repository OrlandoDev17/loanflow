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
