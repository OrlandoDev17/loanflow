"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useRegister } from "@/hooks/useRegister";
import { Container } from "@/components/ui/Container";
import { EyeIcon, EyeOffIcon, LogoutIcon } from "@/components/ui/Icons";
import { AnimatePresence, motion } from "motion/react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, isLoading, error } = useRegister();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nombre = formData.get("nombre") as string;
    const correo = formData.get("correo") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const usuario = await register(nombre, correo, password);
    if (usuario) router.push("/");
  };

  const variants = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -40 },
  };

  return (
    <Container className="flex items-center justify-center w-full h-screen">
      <AnimatePresence>
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="flex flex-col gap-6 p-8 bg-white border border-gray-200 rounded-xl shadow-lg shadow-gray-300 max-w-md w-full"
        >
          <header className="flex flex-col items-center gap-2">
            <h2 className="text-3xl text-primary font-bold">LoanFlow</h2>
            <p className="text-gray-500">Únete a LoanFlow ahora</p>
          </header>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <label className="flex flex-col gap-2">
              <span className="font-medium">Nombre Completo</span>
              <input
                name="nombre"
                type="text"
                placeholder="Orlando López"
                required
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-primary transition-colors"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-medium">Correo Electrónico</span>
              <input
                name="correo"
                type="email"
                placeholder="tucorreo@gmail.com"
                required
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-primary transition-colors"
              />
            </label>

            <label className="flex flex-col gap-2 relative">
              <span className="font-medium">Contraseña</span>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder={showPassword ? "Contraseña" : "* * * * * * * *"}
                required
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-primary transition-colors"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword((prev) => !prev);
                }}
                className="absolute right-2 bottom-2.5"
                type="button"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </label>

            <label className="flex flex-col gap-2 relative">
              <span className="font-medium">Confirmar Contraseña</span>
              <input
                name="confirm-password"
                type={showPassword ? "text" : "password"}
                placeholder={showPassword ? "Contraseña" : "* * * * * * * *"}
                required
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-primary transition-colors"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword((prev) => !prev);
                }}
                className="absolute right-2 bottom-2.5"
                type="button"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </label>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl text-lg font-semibold hover:-translate-y-1 transition cursor-pointer disabled:opacity-70"
            >
              {isLoading ? (
                <span className="animate-spin">↻</span>
              ) : (
                <>
                  <LogoutIcon />
                  Registrarse
                </>
              )}
            </button>
          </form>

          <span className="flex items-center justify-center gap-2 text-center text-gray-500">
            ¿Ya tienes una cuenta?
            <a
              href="/auth/login"
              className="text-primary hover:underline transition"
            >
              Inicia Sesión
            </a>
          </span>
        </motion.div>
      </AnimatePresence>
    </Container>
  );
}
