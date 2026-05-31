"use client";

import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { app } from "@/lib/firebase";
import AdminLoginModal from "@/components/cotizador/AdminLoginModal";

export default function GlobalAdminModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-admin-modal", handleOpen);
    return () => window.removeEventListener("open-admin-modal", handleOpen);
  }, []);

  const handleLoginSubmit = async (username, password) => {
    const auth = getAuth(app);
    const email = username.includes("@") ? username : `${username}@socios.com`;
    await signInWithEmailAndPassword(auth, email, password);
    setIsOpen(false);
    // Redirigir al dashboard dentro del cotizador si es exitoso
    router.push("/cotizar");
  };

  return (
    <AdminLoginModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onLogin={handleLoginSubmit}
    />
  );
}
