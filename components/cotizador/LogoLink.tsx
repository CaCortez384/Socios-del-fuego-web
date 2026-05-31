"use client";

import Link from "next/link";
import Image from "next/image";
import { useAdminDoubleTap } from "@/hooks/useAdminDoubleTap";
import { ReactNode } from "react";

interface LogoLinkProps {
  className?: string;
  textClassName?: string;
  showText?: boolean;
  customText?: ReactNode;
  children?: ReactNode;
}

export default function LogoLink({ 
  className = "flex items-center gap-2 cursor-pointer select-none active:scale-95 transition-transform", 
  textClassName = "font-oswald text-xl font-bold tracking-wide text-white uppercase",
  showText = true,
  customText,
  children
}: LogoLinkProps) {
  const handleDoubleTap = useAdminDoubleTap();

  return (
    <Link href="/" onClick={handleDoubleTap} className={className}>
      <div className="relative h-10 w-10 overflow-hidden rounded-full border border-orange-600/20 group-hover:border-orange-600 transition-colors">
        <Image
          src="/logo.webp"
          alt="Logo Socios del Fuego"
          fill
          className="object-cover"
        />
      </div>
      {children || (
        showText && (
          customText ? (
            customText
          ) : (
            <span className={textClassName}>
              Socios del Fuego
            </span>
          )
        )
      )}
    </Link>
  );
}
