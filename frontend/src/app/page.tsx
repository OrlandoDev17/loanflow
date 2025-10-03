"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { ClientsManagment } from "@/components/sections/ClientsManagment";
import { Welcome } from "@/components/ui/Welcome";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
    }
  }, []);

  return (
    <>
      <Welcome />
      <ClientsManagment />
    </>
  );
}
