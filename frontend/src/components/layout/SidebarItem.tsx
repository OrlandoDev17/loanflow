"use client";

import { usePathname } from "next/navigation";

import type { SidebarItem } from "@/lib/types";

export function SidebarItem({ item }: { item: SidebarItem }) {
  const pathname = usePathname();

  const isActive = pathname === item.href;

  return (
    <li>
      <a
        className={`flex items-center gap-4 rounded-xl p-4 text-gray-400 text-lg font-medium hover:bg-gray-100 hover:text-black transition ${
          isActive ? "bg-primary/10 text-primary shadow-md" : ""
        }`}
        href={item.href}
      >
        <item.icon />
        {item.label}
      </a>
    </li>
  );
}
