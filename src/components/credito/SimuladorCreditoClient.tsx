"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Calculator,
  Download,
  ShieldCheck,
  Zap,
  RotateCcw,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  CreditCard,
  Home,
  Car,
  FileSpreadsheet,
  ArrowRight,
  Info,
} from "lucide-react";
import { calcularCreditoFrances } from "@/lib/financial-math";
import { formatCOP } from "@/lib/formatters";

type LineaId = "libre-inversion" | "vivienda" | "vehiculo";

interface LineaConfig {
  id: LineaId;
  nombre: string;
  subtitulo: string;
  tasaNMV: number;
  tasaEA: number;
  montoMin: number;
  montoMax: number;
  defaultMonto: number;
  plazos: number[];
  defaultPlazo: number;
  seguroVidaFijo: number;
}

const LINEAS_CONFIG: Record<LineaId, LineaConfig> = {
  "libre-inversion": {
    id: "libre-inversion",
    nombre: "Libre Inversión",
    subtitulo: "Desde 1.15% M.V.",
    tasaNMV: 1.15,
    tasaEA: 14.71,
    montoMin: 1000000,
    montoMax: 100000000,
    defaultMonto: 20000000,
    plazos: [12, 24, 36, 48, 60, 72],
    defaultPlazo: 48,
    seguroVidaFijo: 28000,
  },
  vivienda: {
    id: "vivienda",
    nombre: "Vivienda",
    subtitulo: "Desde 0.89% M.V.",
    tasaNMV: 0.89,
    tasaEA: 11.20,
    montoMin: 20000000,
    montoMax: 800000000,
    defaultMonto: 100000000,
    plazos: [60, 120, 180, 240],
    defaultPlazo: 180,
    seguroVidaFijo: 45000,
  },
  vehiculo: {
    id: "vehiculo",
    nombre: "Vehículo",
    subtitulo: "Desde 1.03% M.V.",
    tasaNMV: 1.03,
    tasaEA: 13.15,
    montoMin: 10000000,
    montoMax: 200000000,
    defaultMonto: 35000000,
    plazos: [12, 24, 36, 48, 60, 72],
    defaultPlazo: 48,
    seguroVidaFijo: 32000,
  },
};

export default function SimuladorCreditoClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const paramTipo = (searchParams.get("tipo") as LineaId) || "libre-inversion";
  const paramMonto = Number(searchParams.get("monto"));
  const paramPlazo = Number(searchParams.get("plazo"));

  const [linea, setLinea] = useState<LineaId>(
    LINEAS_CONFIG[paramTipo] ? paramTipo : "libre-inversion"
  );
  const [monto, setMonto] = useState<number>(
    paramMonto > 0 ? paramMonto : LINEAS_CONFIG[paramTipo]?.defaultMonto || 20000000
  );
  const [plazo, setPlazo] = useState<number>(
    paramPlazo > 0 ? paramPlazo : LINEAS_CONFIG[paramTipo]?.defaultPlazo || 48
  );
  const [verTodasCuotas, setVerTodasCuotas] = useState(false);

  const configActual = LINEAS_CONFIG[linea];

  // Cálculo financiero automático
  const resultado = calcularCreditoFrances(
    monto,
    plazo,
    configActual.tasaNMV,
    configActual.tasaEA,
    configActual.seguroVidaFijo
  );

  const handleCambioLinea = (nuevaLinea: LineaId) => {
    setLinea(nuevaLinea);
    const nuevaConfig = LINEAS_CONFIG[nuevaLinea];
    setMonto(nuevaConfig.defaultMonto);
    setPlazo(nuevaConfig.defaultPlazo);
  };

  const handleDescargarPDF = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Cabecera del Simulador */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl mb-10">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
                <Calculator className="w-3.5 h-3.5" />
                <span>Motor de Cotización Cuantitativa — Sistema Francés</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Simulador de Crédito FinanSer
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Calcule con precisión matemática su proyección de cuotas mensuales, amortización a capital y costo
                financiero total con tasas preferenciales vigiladas.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-xl text-xs text-slate-300 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Tasas actualizadas al periodo vigente</span>
            </div>
          </div>
        </div>

        {/* Panel Principal: Parámetros (Izquierda) + Resultados (Derecha) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Formulario de Entrada (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
            {/* 1. Selector de Línea de Crédito */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                1. Línea o Tipo de Crédito
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: "libre-inversion", icon: CreditCard },
                  { id: "vivienda", icon: Home },
                  { id: "vehiculo", icon: Car },
                ].map(({ id, icon: Icon }) => {
                  const conf = LINEAS_CONFIG[id as LineaId];
                  const selected = linea === id;
                  return (
                    <button
                      key={id}
                      onClick={() => handleCambioLinea(id as LineaId)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        selected
                          ? "bg-blue-50/80 border-blue-600 ring-2 ring-blue-600/20 shadow-xs"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-2 ${selected ? "text-blue-600" : "text-slate-500"}`} />
                      <div className="text-sm font-bold text-slate-900">{conf.nombre}</div>
                      <div className="text-xs text-slate-500">{conf.subtitulo}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Monto a Solicitar */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  2. ¿Cuánto dinero necesita solicitar?
                </label>
                <span className="text-xs text-slate-500">
                  Límites: {formatCOP(configActual.montoMin)} - {formatCOP(configActual.montoMax)}
                </span>
              </div>

              <div className="relative mb-3">
                <input
                  type="number"
                  min={configActual.montoMin}
                  max={configActual.montoMax}
                  step={1000000}
                  value={monto}
                  onChange={(e) => setMonto(Number(e.target.value))}
                  className="w-full text-2xl sm:text-3xl font-black text-slate-900 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-mono"
                />
                <span className="absolute right-4 top-4 text-xs font-bold text-slate-400">COP</span>
              </div>

              {/* Accesos rápidos */}
              <div className="flex flex-wrap gap-2">
                <span className="text-[11px] text-slate-400 self-center mr-1">Montos sugeridos:</span>
                {[10000000, 20000000, 50000000, 100000000].map((val) => {
                  if (val < configActual.montoMin || val > configActual.montoMax) return null;
                  return (
                    <button
                      key={val}
                      onClick={() => setMonto(val)}
                      className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                        monto === val
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {formatCOP(val)}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Plazo en Amortización */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  3. Plazo de amortización
                </label>
                <span className="text-sm font-bold text-blue-700">{plazo} Meses ({Math.round((plazo / 12) * 10) / 10} Años)</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {configActual.plazos.map((m) => (
                  <button
                    key={m}
                    onClick={() => setPlazo(m)}
                    className={`py-2.5 text-xs font-bold rounded-xl border text-center transition-all ${
                      plazo === m
                        ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {m} m
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Indicador de Tasa Vigente (RF-02) */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-xs font-bold text-slate-700 block">Tasa de Interés Aplicable (Cargada Automáticamente)</span>
                <span className="text-[11px] text-slate-500">
                  Parametrizada por FinanSer según la línea seleccionada (RF-02)
                </span>
              </div>
              <div className="text-right flex items-center gap-4">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Nominal Mensual</span>
                  <span className="text-base font-extrabold text-blue-700">{configActual.tasaNMV}% M.V.</span>
                </div>
                <div className="border-l border-slate-300 pl-4">
                  <span className="text-[10px] text-slate-500 block uppercase">Efectiva Anual</span>
                  <span className="text-base font-extrabold text-slate-800">{configActual.tasaEA}% E.A.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Panel de Resultados Destacados (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <span className="text-xs font-semibold text-blue-300 uppercase tracking-wider">
                  Protección Financiera
                </span>
                <span className="text-[11px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-semibold">
                  Tasa Fija Garantizada
                </span>
              </div>

              {/* Cuota Mensual Fija */}
              <div className="text-center py-4 bg-slate-950/60 rounded-2xl border border-slate-800/80 p-5">
                <span className="text-xs uppercase tracking-wider text-slate-400 block mb-1">
                  Cuota Fija Mensual Estimada
                </span>
                <div className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  {formatCOP(resultado.cuotaMensualFija)}
                  <span className="text-base font-normal text-slate-400">/mes</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-2">
                  Incluye amortización a capital, intereses ordinarios y seguro de vida deudor.
                </p>
              </div>

              {/* Discriminación de la Cuota y Costos */}
              <div className="bg-slate-800/60 rounded-xl p-4 space-y-2.5 text-xs border border-slate-700/60">
                <div className="flex justify-between text-slate-300">
                  <span>Monto solicitado (Capital inicial):</span>
                  <span className="font-semibold text-white">{formatCOP(resultado.monto)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Interés estimado mes 1:</span>
                  <span className="font-semibold text-white">
                    {formatCOP(resultado.tablaAmortizacion[0]?.interes || 0)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Seguro de vida deudor (mensual fijo):</span>
                  <span className="font-semibold text-white">{formatCOP(resultado.seguroVidaMensual)}</span>
                </div>
                <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-700">
                  <span>Total intereses en la vigencia:</span>
                  <span className="font-bold text-sky-300">{formatCOP(resultado.totalIntereses)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="font-bold text-white">Total a pagar al final del plazo:</span>
                  <span className="font-black text-emerald-400 text-sm">{formatCOP(resultado.totalPagar)}</span>
                </div>
              </div>
            </div>

            {/* Acciones: Solicitar y Exportar PDF */}
            <div className="space-y-3 pt-2">
              <Link
                href={`/contacto?solicitud=credito&linea=${linea}&monto=${monto}&plazo=${plazo}`}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all text-sm group"
              >
                <span>Solicitar este crédito</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                onClick={handleDescargarPDF}
                className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold py-3 px-4 rounded-xl transition-all text-xs"
              >
                <Download className="w-4 h-4 text-sky-400" />
                <span>Descargar simulación en PDF / Imprimir</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de Amortización Francesa */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-12">
          <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                  Cronograma Financiero Oficial
                </span>
              </div>
              <h3 className="text-xl font-black mt-1">Tabla de Amortización (Cuota Fija Francesa)</h3>
              <p className="text-xs text-slate-400">
                Detalle mensual del comportamiento de saldo, abono a capital e intereses generados.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-300 font-mono">
                {verTodasCuotas ? `Mostrando ${plazo} cuotas` : "Primeras 6 cuotas"}
              </span>
              <button
                onClick={() => setVerTodasCuotas(!verTodasCuotas)}
                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
              >
                {verTodasCuotas ? (
                  <>
                    <span>Ver resumen inicial</span>
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Ver proyección completa ({plazo} cuotas)</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 text-center">No. Cuota</th>
                  <th className="py-3 px-4">Saldo Inicial</th>
                  <th className="py-3 px-4">Cuota Mensual</th>
                  <th className="py-3 px-4">Abono Capital</th>
                  <th className="py-3 px-4">Intereses</th>
                  <th className="py-3 px-4">Seguro Vida</th>
                  <th className="py-3 px-4 text-right">Saldo Final</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {(verTodasCuotas ? resultado.tablaAmortizacion : resultado.tablaAmortizacion.slice(0, 6)).map(
                  (c) => (
                    <tr key={c.numero} className="hover:bg-blue-50/50 transition-colors">
                      <td className="py-3 px-4 text-center font-bold text-slate-800">#{c.numero}</td>
                      <td className="py-3 px-4 text-slate-600">{formatCOP(c.saldoInicial)}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{formatCOP(c.cuotaTotal)}</td>
                      <td className="py-3 px-4 font-semibold text-blue-700">{formatCOP(c.abonoCapital)}</td>
                      <td className="py-3 px-4 text-rose-600">{formatCOP(c.interes)}</td>
                      <td className="py-3 px-4 text-slate-500">{formatCOP(c.seguroVida)}</td>
                      <td className="py-3 px-4 text-right font-semibold text-slate-800">
                        {formatCOP(c.saldoFinal)}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bloque Informativo de Seguros y Políticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Desembolso Rápido</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Una vez aprobados los documentos, transferimos los fondos en menos de 24 horas a cualquier cuenta bancaria.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Abonos a Capital Sin Sanción</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Realice pagos extraordinarios totales o parciales sin ninguna penalización contractual, reduciendo plazo o cuota.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-1">Seguro Integral de Vida</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Póliza con respaldo asegurador vigilado por la Superfinanciera que cubre el saldo insoluto en caso de eventualidades.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
