"use client";
import React, { useEffect, useState } from "react";

interface FloatingWhatsAppButtonProps {
  phone?: string;
  text?: string;
  message?: string;
}

export function FloatingWhatsAppButton({
  phone = "5571992363943",
  text = "Fale em sigilo com a equipe",
  message = "Olá, vim pelo site e gostaria de iniciar o atendimento com a Dra. Bruna Dourado.",
}: FloatingWhatsAppButtonProps) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setExpanded(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-full shadow-xl font-semibold transition-all duration-500 bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/60 ${
        expanded ? "scale-105" : "scale-95 opacity-80"
      }`}
      style={{ boxShadow: "0 4px 24px 0 rgba(40,40,40,0.12)" }}
      aria-label="Fale no WhatsApp"
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2"
      >
        <circle cx="16" cy="16" r="16" fill="#fff" fillOpacity="0.15" />
        <path
          d="M16 6C10.477 6 6 10.477 6 16c0 1.61.41 3.13 1.13 4.47L6 26l5.7-1.12A9.96 9.96 0 0016 26c5.523 0 10-4.477 10-10S21.523 6 16 6z"
          fill="#fff"
          fillOpacity="0.25"
        />
        <path
          d="M16 8c4.418 0 8 3.582 8 8 0 4.418-3.582 8-8 8a7.96 7.96 0 01-3.93-1.04l-.28-.16-3.38.67.65-3.29-.18-.29A7.96 7.96 0 018 16c0-4.418 3.582-8 8-8zm-2.13 3.47c-.19-.42-.39-.43-.56-.44-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02 0 1.19.87 2.34 1 2.5.12.16 1.68 2.68 4.13 3.65.58.2 1.03.32 1.39.41.58.14 1.11.12 1.53.07.47-.06 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28-.24-.12-1.45-.71-1.67-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-.99-.37-1.89-1.18-.7-.62-1.18-1.39-1.32-1.63-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42z"
          fill="#fff"
        />
      </svg>
      <span className="hidden sm:inline text-base font-medium tracking-tight">
        {text}
      </span>
    </a>
  );
}
