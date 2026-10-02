"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  PiggyBank,
  TrendingUp,
  ShieldCheck,
  Download,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Lock,
  CheckCircle2,
  DollarSign,
  FileText,
} from "lucide-react";
import { liquidarCDT } from "@/lib/financial-math";
import { formatCOP } from "@/lib/formatters";

export default function SimuladorCDTClient() {
  const searchParams = useSearchParams();

  const paramMonto = Number(searchParams.get("monto"));
  const paramDias = Number(searchParams.get("dias"));

  const [monto, setMonto] = useState<number>(paramMonto > 0 ? paramMonto : 10000000);
  const [plazoDias, setPlazoDias] = useState<number>(
    [90, 180, 360, 540].includes(paramDias) ? paramDias : 360
  );
  const [modalidad, setModalidad] = useState<"vencimiento" | "mensual">("vencimiento");
  const [faqAbierta, setFaqAbierta] = useState<number | null>(0);

  const tasasPorPlazo: Record<number, number> = {
    90: 10.15,
    180: 10.75,
    360: 11.45,
    540: 11.85,
  };

  const tasaEA = tasasPorPlazo[plazoDias] || 11.45;

  const resultado = liquidarCDT(monto, plazoDias, tasaEA, modalidad);

  // Rendimiento tradicional de cuenta de ahorros (1.50% EA) para comparativa
  const rendimientoCuentaTradicional = Math.round(monto * 0.015 * (plazoDias / 360));

  const faqs = [
    {
      q: "¿Qué requisitos necesito para abrir mi CDT?",
      a: "Solo requieres ser mayor de 18 años, cédula de ciudadanía colombiana original vigente, correo electrónico personal y una cuenta bancaria activa para transferir por PSE.",
    },
    {
      q: "¿Cómo y cuándo se aplica la retención en la fuente?",
      a: "Aplica una retención legal del 4% calculada únicamente sobre los intereses brutos obtenidos. El valor se descuenta automáticamente al momento de la liquidación y pago de rendimientos.",
    },
    {
      q: "¿Puedo cancelar el CDT antes del tiempo pactado?",
      a: "Por regulación bancaria nacional, los CDT tienen vigencia fija hasta la fecha de vencimiento acordada. No obstante, puedes endosarlo o negociarlo en el mercado secundario de valores.",
    },
    {
      q: "¿Los depósitos están asegurados?",
      a: "Sí, FinanSer está vigilada por la Superintendencia Financiera de Colombia y amparada por el seguro de depósitos Fogafín, asegurando tus acreencias hasta $50 millones de pesos por titular.",
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Cabecera Principal */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl mb-10">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                <PiggyBank className="w-3.5 h-3.5" />
                <span>Renta Fija Digital con Respaldo Institucional</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Simulador de Inversión CDT
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Multiplica tu patrimonio con liquidez programada, cero volatilidad y el respaldo institucional
                de FinanSer. Calcula rendimientos exactos y apertura en minutos.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-900/60 border border-emerald-500/30 px-4 py-2.5 rounded-xl text-xs text-emerald-200 shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Seguro FOGAFÍN hasta $50.000.000 COP</span>
            </div>
          </div>
        </div>

        {/* Panel Central */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Panel Izquierdo: Configuración del CDT (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
            {/* Monto de Inversión */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Monto a Invertir
                </label>
                <span className="text-xs text-slate-500">Mínimo: $500.000 COP</span>
              </div>

              <div className="relative mb-3">
                <input
                  type="number"
                  min={500000}
                  max={500000000}
                  step={500000}
                  value={monto}
                  onChange={(e) => setMonto(Number(e.target.value))}
                  className="w-full text-2xl sm:text-3xl font-black text-slate-900 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all font-mono"
                />
                <span className="absolute right-4 top-4 text-xs font-bold text-slate-400">COP</span>
              </div>

              {/* Botones de accesos rápidos */}
              <div className="flex flex-wrap gap-2">
                <span className="text-[11px] text-slate-400 self-center mr-1">Accesos rápidos:</span>
                {[2000000, 5000000, 10000000, 20000000].map((val) => (
                  <button
                    key={val}
                    onClick={() => setMonto(val)}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                      monto === val
                        ? "bg-emerald-600 text-white border-emerald-600 shadow-xs"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    +{formatCOP(val)}
                  </button>
                ))}
              </div>
            </div>

            {/* Plazo de Inversión */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Plazo de Inversión
                </label>
                <span className="text-sm font-bold text-emerald-700">{plazoDias} Días ({Math.round(plazoDias / 30)} Meses)</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { dias: 90, label: "90 d", sub: "3 Meses", ea: 10.15 },
                  { dias: 180, label: "180 d", sub: "6 Meses", ea: 10.75 },
                  { dias: 360, label: "360 d", sub: "12 Meses", ea: 11.45 },
                  { dias: 540, label: "540 d", sub: "18 Meses", ea: 11.85 },
                ].map((item) => (
                  <button
                    key={item.dias}
                    onClick={() => setPlazoDias(item.dias)}
                    className={`p-3.5 rounded-xl border text-center transition-all ${
                      plazoDias === item.dias
                        ? "bg-emerald-50 border-emerald-600 ring-2 ring-emerald-600/20 shadow-xs"
                        : "bg-white border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <div className="text-sm font-black text-slate-900">{item.label}</div>
                    <div className="text-[11px] text-slate-500">{item.sub}</div>
                    <div className="text-xs font-extrabold text-emerald-600 mt-1">{item.ea}% E.A.</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Modalidad de Pago de Rendimientos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Tasa Efectiva Anual (E.A.)
                </label>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-lg font-black text-emerald-700">
                  {tasaEA}% E.A.
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Modalidad de Pago
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setModalidad("vencimiento")}
                    className={`py-3 text-xs font-bold rounded-xl border transition-all ${
                      modalidad === "vencimiento"
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    Al Vencimiento
                  </button>
                  <button
                    onClick={() => setModalidad("mensual")}
                    className={`py-3 text-xs font-bold rounded-xl border transition-all ${
                      modalidad === "mensual"
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    Mensual
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Derecho: Rendimientos Estimados (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-900 to-emerald-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
                  Resumen de Proyección
                </span>
                <span className="text-[11px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-semibold">
                  Tasa Fija Garantizada
                </span>
              </div>

              {/* Total Neto a Recibir */}
              <div className="text-center py-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 p-5">
                <span className="text-xs uppercase tracking-wider text-slate-400 block mb-1">
                  Total Neto a Recibir
                </span>
                <div className="text-3xl sm:text-5xl font-black text-emerald-400 tracking-tight">
                  {formatCOP(resultado.totalRecibir)}
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Capital inicial depositado + rendimientos netos finales.
                </p>
              </div>

              {/* Desglose Tributario (RF-03) */}
              <div className="bg-slate-800/60 rounded-xl p-4 space-y-2.5 text-xs border border-slate-700/60">
                <div className="flex justify-between text-slate-300">
                  <span>Capital inicial depositado:</span>
                  <span className="font-semibold text-white">{formatCOP(resultado.montoInversion)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Rendimiento bruto proyectado:</span>
                  <span className="font-semibold text-emerald-400">+{formatCOP(resultado.rendimientoBruto)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="flex items-center gap-1">
                    <span>Retención en la fuente (4%):</span>
                    <span className="text-[10px] text-slate-400">(RF-03)</span>
                  </span>
                  <span className="font-semibold text-rose-300">-{formatCOP(resultado.retencionFuente)}</span>
                </div>
                <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-700">
                  <span className="font-bold text-white">Ganancia Neta Real:</span>
                  <span className="font-black text-emerald-400 text-sm">+{formatCOP(resultado.rendimientoNeto)}</span>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="space-y-3 pt-2">
              <Link
                href={`/contacto?solicitud=inversiones&monto=${monto}&plazo=${plazoDias}`}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all text-sm group"
              >
                <span>Abrir CDT 100% Digital</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/contacto"
                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold py-3 px-4 rounded-xl transition-all text-xs"
              >
                <span>Hablar con un asesor patrimonial</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Sección Comparativa de Rendimiento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Gráfico / Comparativa (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Crecimiento Comparativo de tu Inversión</h3>
                <p className="text-xs text-slate-500">
                  Comparación de rentabilidad neta acumulada en el tiempo: FinanSer CDT vs. Cuenta Tradicional (1.5% E.A.)
                </p>
              </div>
            </div>

            <div className="space-y-6 pt-2">
              {/* Barra FinanSer CDT */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-emerald-700 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    CDT FinanSer ({tasaEA}% E.A.)
                  </span>
                  <span className="text-emerald-700 font-mono">+{formatCOP(resultado.rendimientoNeto)} COP</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden p-0.5">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-3 rounded-full w-full" />
                </div>
              </div>

              {/* Barra Cuenta de Ahorros Tradicional */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    Cuenta de Ahorros Tradicional (1.50% E.A.)
                  </span>
                  <span className="text-slate-600 font-mono">+{formatCOP(rendimientoCuentaTradicional)} COP</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden p-0.5">
                  <div
                    className="bg-slate-400 h-3 rounded-full"
                    style={{
                      width: `${Math.max(10, Math.min(100, (rendimientoCuentaTradicional / resultado.rendimientoNeto) * 100))}%`,
                    }}
                  />
                </div>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800 flex items-center justify-between">
                <span>Diferencial a tu favor con FinanSer CDT:</span>
                <strong className="text-sm font-black font-mono">
                  +{formatCOP(resultado.rendimientoNeto - rendimientoCuentaTradicional)} COP
                </strong>
              </div>
            </div>
          </div>

          {/* Seguridad del Capital (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-widest block mb-1">
                ¿Por qué FinanSer?
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-4">Máxima Seguridad para tu Capital</h3>
              <ul className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Cero Exposición Bursátil:</strong> Tasa pactada blindada frente a la inflación o caídas de mercado.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Firma Biométrica Inmediata:</strong> Sin desplazamientos físicos. Validación con tecnología de alta seguridad.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Abono Directo PSE:</strong> Transfiere los fondos de apertura desde cualquier banco de Colombia.</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full inline-flex items-center justify-center gap-2 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-4 rounded-xl text-xs transition-colors"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Descargar Ficha Técnica PDF / Imprimir</span>
            </button>
          </div>
        </div>

        {/* Acordeón de Preguntas Frecuentes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <h3 className="text-lg font-black text-slate-900">Preguntas Frecuentes sobre el CDT Digital</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => {
              const open = faqAbierta === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl p-4 cursor-pointer hover:border-emerald-300 transition-colors"
                  onClick={() => setFaqAbierta(open ? null : index)}
                >
                  <div className="flex justify-between items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">{faq.q}</h4>
                    {open ? <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
                  </div>
                  {open && <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">{faq.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
