import React, { Suspense } from "react";
import ContactoClient from "@/components/contacto/ContactoClient";

export const metadata = {
  title: "Centro de Atención y Contacto Institucional | FinanSer",
  description:
    "Radica tus consultas, solicitudes de crédito o PQRS y encuentra nuestros canales telefónicos, virtuales y sede principal.",
};

export default function ContactoPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Cargando centro de contacto...</div>}>
      <ContactoClient />
    </Suspense>
  );
}
