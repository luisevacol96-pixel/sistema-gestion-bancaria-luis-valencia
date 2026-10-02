"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, ShieldCheck, TrendingUp, Sparkles } from "lucide-react";
import { calcularCreditoFrances, liquidarCDT } from "@/lib/financial-math";
import { formatCOP } from "@/lib/formatters";

export default function QuickSimulator() {
  const [tab, setTab] = useState<"credito" | "cdt">("credito");

  // Estado para crédito rápido
  const [lineaCredito, setLineaCredito] = useState<"libre-inversion" | "vivienda" | "vehiculo">("libre-inversion");
  const [montoCredito, setMontoCredito] = useState<number>(15000000);
  const [plazoMeses, setPlazoMeses] = useState<number>(36);

  // Parámetros por línea de crédito
  const tasasPorLinea = {
    "libre-inversion": { nmv: 1.15, ea: 14.71, seguro: 28000 },
    vivienda: { nmv: 0.89, ea: 11.20, seguro: 45000 },
    vehiculo: { nmv: 1.03, ea: 13.15, seguro: 32000 },
  };

  // Cálculo en tiempo real de crédito
  const resultadoCredito = calcularCreditoFrances(
    montoCredito,
    plazoMeses,
    tasasPorLinea[lineaCredito].nmv,
    tasasPorLinea[lineaCredito].ea,
    tasasPorLinea[lineaCredito].seguro
  );

  // Estado para CDT rápido
  const [montoCDT, setMontoCDT] = useState<number>(10000000);
  const [plazoCDT, setPlazoCDT] = useState<number>(360);

  const tasasCDTPorPlazo: Record<number, number> = {
    90: 10.15,
    180: 10.75,
    360: 11.45,
    540: 11.85,
  };

  const resultadoCDT = liquidarCDT(montoCDT, plazoCDT, tasasCDTPorPlazo[plazoCDT] || 11.45, "vencimiento");

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Cabecera de la sección */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
            <Calculator className="w-3.5 h-3.5" />
            <span>Motor de Cálculo Financiero Estandarizado</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Planifica tus decisiones con precisión matemática
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Simula en pocos segundos tu cuota mensual de crédito o la rentabilidad neta de tu inversión en CDT
            con tasas vigentes 100% parametrizadas.
          </p>
        </div>

        {/* Contenedor del Simulador Rápido */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Tabs Selector */}
          <div className="grid grid-cols-2 bg-slate-100 p-1.5 border-b border-slate-200">
            <button
              onClick={() => setTab("credito")}
              className={`py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                tab === "credito"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Simulador de Crédito</span>
            </button>
            <button
              onClick={() => setTab("cdt")}
              className={`py-3 text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
                tab === "cdt"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Simulador de CDT</span>
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {tab === "credito" ? (
              /* TAB CRÉDITO RÁPIDO */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  {/* Selector de Línea */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Línea de Crédito
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "libre-inversion", label: "Libre Inversión" },
                        { id: "vivienda", label: "Vivienda" },
                        { id: "vehiculo", label: "Vehículo" },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setLineaCredito(item.id as any);
                            if (item.id === "vivienda" && montoCredito < 20000000) {
                              setMontoCredito(50000000);
                            }
                          }}
                          className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                            lineaCredito === item.id
                              ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selector de Monto */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Monto Solicitado
                      </label>
                      <span className="text-base font-extrabold text-blue-700">
                        {formatCOP(montoCredito)} COP
                      </span>
                    </div>
                    <input
                      type="range"
                      min={lineaCredito === "vivienda" ? 20000000 : 2000000}
                      max={lineaCredito === "vivienda" ? 300000000 : 80000000}
                      step={1000000}
                      value={montoCredito}
                      onChange={(e) => setMontoCredito(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                      <span>{lineaCredito === "vivienda" ? "$20M" : "$2M"}</span>
                      <span>{lineaCredito === "vivienda" ? "$300M" : "$80M"}</span>
                    </div>
                  </div>

                  {/* Selector de Plazo */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Plazo en Meses
                      </label>
                      <span className="text-sm font-bold text-slate-900">{plazoMeses} Meses</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[12, 24, 36, 48, 60].map((m) => (
                        <button
                          key={m}
                          onClick={() => setPlazoMeses(m)}
                          className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                            plazoMeses === m
                              ? "bg-slate-900 text-white border-slate-900"
                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          {m} Meses
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tarjeta Resumen de Resultado */}
                <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-blue-800/60 text-xs">
                      <span className="text-blue-300 font-semibold">Tasa Asignada</span>
                      <span className="font-bold text-emerald-400">
                        {tasasPorLinea[lineaCredito].nmv}% M.V. ({tasasPorLinea[lineaCredito].ea}% E.A.)
                      </span>
                    </div>

                    <div className="py-4 text-center">
                      <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold block mb-1">
                        Cuota Fija Mensual Estimada
                      </span>
                      <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                        {formatCOP(resultadoCredito.cuotaMensualFija)}
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Capital + Interés + Seguro obligatorio
                      </span>
                    </div>

                    <div className="bg-slate-800/60 rounded-xl p-3 text-xs space-y-1.5 border border-slate-700/60">
                      <div className="flex justify-between text-slate-300">
                        <span>Abono cuota pura:</span>
                        <span className="font-medium text-white">{formatCOP(resultadoCredito.cuotaPura)}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Seguro vida deudor:</span>
                        <span className="font-medium text-white">{formatCOP(resultadoCredito.seguroVidaMensual)}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/simulador-credito?tipo=${lineaCredito}&monto=${montoCredito}&plazo=${plazoMeses}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all text-sm group"
                  >
                    <span>Continuar Solicitud Completa</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ) : (
              /* TAB CDT RÁPIDO */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  {/* Selector Monto CDT */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Monto de Inversión
                      </label>
                      <span className="text-base font-extrabold text-blue-700">
                        {formatCOP(montoCDT)} COP
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {[5000000, 10000000, 20000000].map((val) => (
                        <button
                          key={val}
                          onClick={() => setMontoCDT(val)}
                          className={`py-1.5 text-xs font-semibold rounded-lg border transition-all ${
                            montoCDT === val
                              ? "bg-blue-50 border-blue-600 text-blue-700 font-bold"
                              : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          +{formatCOP(val)}
                        </button>
                      ))}
                    </div>
                    <input
                      type="range"
                      min={500000}
                      max={50000000}
                      step={500000}
                      value={montoCDT}
                      onChange={(e) => setMontoCDT(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  {/* Selector Plazo CDT */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Plazo de Inversión
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { dias: 90, label: "90 días", ea: "10.15%" },
                        { dias: 180, label: "180 días", ea: "10.75%" },
                        { dias: 360, label: "360 días", ea: "11.45%" },
                        { dias: 540, label: "540 días", ea: "11.85%" },
                      ].map((item) => (
                        <button
                          key={item.dias}
                          onClick={() => setPlazoCDT(item.dias)}
                          className={`p-2 text-center rounded-xl border transition-all ${
                            plazoCDT === item.dias
                              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                          }`}
                        >
                          <div className="text-xs font-bold">{item.label}</div>
                          <div className={`text-[10px] ${plazoCDT === item.dias ? "text-blue-100" : "text-emerald-600"}`}>
                            {item.ea} E.A.
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tarjeta Resumen CDT */}
                <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-6 text-white shadow-xl flex flex-col justify-between space-y-6">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                      <span className="text-blue-300 font-semibold">Tasa E.A. Fija</span>
                      <span className="font-bold text-emerald-400">{tasasCDTPorPlazo[plazoCDT]}% E.A.</span>
                    </div>

                    <div className="py-4 text-center">
                      <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold block mb-1">
                        Total Neto a Recibir
                      </span>
                      <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">
                        {formatCOP(resultadoCDT.totalRecibir)}
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Capital + Rendimientos Netos
                      </span>
                    </div>

                    <div className="bg-slate-800/60 rounded-xl p-3 text-xs space-y-1.5 border border-slate-700/60">
                      <div className="flex justify-between text-slate-300">
                        <span>Rendimiento Bruto:</span>
                        <span className="font-medium text-emerald-400">+{formatCOP(resultadoCDT.rendimientoBruto)}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Retención en la fuente (4%):</span>
                        <span className="font-medium text-rose-300">-{formatCOP(resultadoCDT.retencionFuente)}</span>
                      </div>
                      <div className="flex justify-between text-slate-300 pt-1 border-t border-slate-700">
                        <span>Ganancia neta real:</span>
                        <span className="font-bold text-white">+{formatCOP(resultadoCDT.rendimientoNeto)}</span>
                      </div>
                    </div>
                  </div>

                  <Link
                    href={`/simulador-cdt?monto=${montoCDT}&dias=${plazoCDT}`}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all text-sm group"
                  >
                    <span>Abrir CDT 100% Digital</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
