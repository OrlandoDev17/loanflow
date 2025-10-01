"use client";

import { SIDEBAR_ITEMS } from "@/lib/constants";
import { SidebarItem } from "./SidebarItem";
import { LogoutIcon } from "@/components/ui/Icons";
import { useAuth } from "@/context/AuthContext";

export function Sidebar() {
  const { logout } = useAuth();
  return (
    <aside className="flex flex-col h-screen w-64 bg-white shadow-lg shadow-gray-300 z-20 fixed top-0 left-0">
      <header className="flex items-center border-b border-gray-200 px-4 py-6">
        <h2 className="text-3xl text-primary font-bold">LoanFlow</h2>
      </header>
      <nav className="flex flex-col flex-1 px-4 py-8">
        <ul className="flex flex-col gap-3">
          {SIDEBAR_ITEMS.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </ul>
      </nav>
      <footer className="flex items-center border-t border-gray-200 px-4 py-4 w-full">
        <button
          onClick={logout}
          className="flex items-center gap-2 font-medium text-red-500 px-4 py-2 rounded-lg w-full hover:bg-red-400 hover:text-white 
        transition cursor-pointer"
        >
          <LogoutIcon className="size-5" />
          Cerrar Sesión
        </button>
      </footer>
    </aside>
  );
}
