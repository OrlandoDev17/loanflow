import { ClientsManagment } from "@/components/sections/ClientsManagment";
import { Welcome } from "@/components/ui/Welcome";

export default function Home() {
  return (
    <>
      <Welcome />
      <ClientsManagment />
    </>
  );
}
