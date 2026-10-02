import React, { Suspense } from "react";
import SimuladorCDTClient from "@/components/cdt/SimuladorCDTClient";

export const metadata = {
  title: "Simulador de CDT Digital | FinanSer",
  description:
    "Simula tu inversión a término fijo con retención en la fuente del 4% calculada y respaldo Fogafín hasta $50.000.000 COP.",
};

export default function SimuladorCDTPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Cargando simulador de CDT...</div>}>
      <SimuladorCDTClient />
    </Suspense>
  );
}
