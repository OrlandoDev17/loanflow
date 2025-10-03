"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { useAuth } from "@/context/AuthContext";

import { Container } from "@/components/ui/Container";
import { EyeIcon, EyeOffIcon, LogoutIcon } from "@/components/ui/Icons";
import { AnimatePresence, motion } from "motion/react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const { login: loginRequest, isLoading, error } = useLogin();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const correo = formData.get("correo") as string;
    const password = formData.get("password") as string;

    const response = await loginRequest(correo, password);
    if (response) {
      login(localStorage.getItem("token")!, response);
    }
  };

  const handleShowPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
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
            <p className="text-gray-500">Inicia sesión en tu cuenta</p>
          </header>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <label className="flex flex-col gap-2">
              <span className="font-medium">Correo Electrónico</span>
              <input
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-primary transition-colors"
                type="email"
                placeholder="tucorreo@gmail.com"
                name="correo"
                required
              />
            </label>
            <label className="flex flex-col gap-2 relative">
              <span className="font-medium">Contraseña</span>
              <input
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-primary transition-colors"
                type={showPassword ? "text" : "password"}
                placeholder={showPassword ? "Contraseña" : "* * * * * * * *"}
                name="password"
                required
              />
              <button
                onClick={handleShowPassword}
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
                  Iniciar Sesión
                </>
              )}
            </button>
          </form>
          <span className="flex items-center justify-center gap-2 text-center text-gray-500">
            ¿No tienes una cuenta?
            <a
              href="/auth/register"
              className="text-primary hover:underline transition"
            >
              Regístrate Aqui
            </a>
          </span>
        </motion.div>
      </AnimatePresence>
    </Container>
  );
}
