import React, { Suspense } from "react";
import SimuladorCreditoClient from "@/components/credito/SimuladorCreditoClient";

export const metadata = {
  title: "Simulador de Crédito FinanSer | Amortización Cuota Fija",
  description:
    "Calcula tu cuota mensual bajo el sistema de amortización francés para crédito de vivienda, libre inversión o vehículo con tasas preferenciales.",
};

export default function SimuladorCreditoPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">Cargando simulador financiero...</div>}>
      <SimuladorCreditoClient />
    </Suspense>
  );
}
