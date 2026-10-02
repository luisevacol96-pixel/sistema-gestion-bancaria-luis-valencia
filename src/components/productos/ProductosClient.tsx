"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Home,
  CreditCard,
  PiggyBank,
  Car,
  Wallet,
  Check,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Calculator,
  SlidersHorizontal,
} from "lucide-react";
import { Producto } from "@/types";

interface Props {
  initialProductos: Producto[];
}

export default function ProductosClient({ initialProductos }: Props) {
  const [categoria, setCategoria] = useState<string>("todos");

  const filtrados =
    categoria === "todos"
      ? initialProductos
      : initialProductos.filter((p) => p.category === categoria);

  const getIcon = (id: string) => {
    switch (id) {
      case "credito-vivienda":
        return <Home className="w-6 h-6 text-blue-600" />;
      case "libre-inversion":
        return <CreditCard className="w-6 h-6 text-blue-600" />;
      case "credito-vehiculo":
        return <Car className="w-6 h-6 text-blue-600" />;
      case "cdt-digital":
        return <PiggyBank className="w-6 h-6 text-emerald-600" />;
      case "cuenta-ahorros":
        return <Wallet className="w-6 h-6 text-sky-600" />;
      default:
        return <CreditCard className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Cabecera Principal */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl mb-12">
          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs uppercase tracking-widest font-bold text-blue-400">
                Portafolio Institucional 2026
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                Soluciones Diseñadas para tu Solvencia y Crecimiento
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Estructura financiera transparente, tasas reguladas y respaldo del Fondo de Garantías Fogafín.
                Selecciona el instrumento financiero acorde a tu meta patrimonial.
              </p>
            </div>

            {/* Badges de Garantía */}
            <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
              <div className="bg-white/10 border border-white/15 px-4 py-2.5 rounded-xl flex items-center gap-3 backdrop-blur-xs">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-[10px] text-slate-300 uppercase">Tasa preferencial</div>
                  <div className="text-sm font-extrabold text-white">Desde 0.89% M.V.</div>
                </div>
              </div>
              <div className="bg-white/10 border border-white/15 px-4 py-2.5 rounded-xl flex items-center gap-3 backdrop-blur-xs">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="text-[10px] text-slate-300 uppercase">Respaldo Fogafín</div>
                  <div className="text-sm font-extrabold text-white">100% Amparado</div>
                </div>
              </div>
            </div>
          </div>

          {/* Filtros de Categoría */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 mr-2 flex items-center gap-1 font-semibold">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filtrar por:
            </span>
            {[
              { id: "todos", label: "Todos los Productos" },
              { id: "creditos", label: "Líneas de Crédito" },
              { id: "inversion", label: "Inversión y CDT" },
              { id: "cuentas", label: "Cuentas y Ahorro" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoria(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  categoria === cat.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-900/40"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Fichas de Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filtrados.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
            >
              <div className="p-7">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    {getIcon(prod.id)}
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    {prod.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{prod.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6 min-h-[48px]">
                  {prod.tagline}
                </p>

                {/* Métricas clave */}
                <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Tasa de Referencia:</span>
                    <span className="font-extrabold text-blue-700">{prod.tasaReferencial}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Plazo Permitido:</span>
                    <span className="font-semibold text-slate-800">
                      {prod.plazoMax ? `${prod.plazoMin} a ${prod.plazoMax} ${prod.category === "inversion" ? "días" : "meses"}` : "Sin plazo fijo"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Requisito Base:</span>
                    <span className="font-medium text-slate-700 truncate max-w-[160px] text-right">
                      {prod.requisitos}
                    </span>
                  </div>
                </div>

                {/* Lista de beneficios */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Beneficios destacados:
                  </span>
                  {prod.beneficios.map((ben, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{ben}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón de acción */}
              <div className="p-7 pt-0 border-t border-slate-100 mt-4">
                <Link
                  href={prod.linkSimulador}
                  className="w-full mt-4 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl text-xs shadow-md transition-colors"
                >
                  <Calculator className="w-4 h-4" />
                  <span>
                    {prod.category === "cuentas" ? "Solicitar Apertura Digital" : "Simular este Producto"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Matriz Comparativa de Características y Parámetros */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-16">
          <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-400 tracking-widest block">
                Cuadro Resumen Institucional
              </span>
              <h3 className="text-xl font-black">Matriz Comparativa de Características y Parámetros</h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">Actualizado periodo 2026</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">Producto</th>
                  <th className="py-4 px-6">Plazo / Vigencia</th>
                  <th className="py-4 px-6">Tasa Referencial (E.A.)</th>
                  <th className="py-4 px-6">Requisito Base</th>
                  <th className="py-4 px-6 text-center">Simulación Rápida</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {initialProductos.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900 flex items-center gap-2">
                      {getIcon(p.id)}
                      <span>{p.name}</span>
                    </td>
                    <td className="py-4 px-6 text-slate-600">
                      {p.plazoMax ? `${p.plazoMin} a ${p.plazoMax} ${p.category === "inversion" ? "días" : "meses"}` : "Indefinido"}
                    </td>
                    <td className="py-4 px-6 font-extrabold text-blue-700">{p.tasaReferencial}</td>
                    <td className="py-4 px-6 text-slate-600 max-w-xs">{p.requisitos}</td>
                    <td className="py-4 px-6 text-center">
                      <Link
                        href={p.linkSimulador}
                        className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg text-xs transition-colors shadow-xs"
                      >
                        <Calculator className="w-3.5 h-3.5" />
                        <span>Simular</span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Banner CTA Inferior */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-2xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h4 className="text-2xl font-black">¿Deseas conocer tu cuota mensual estimada?</h4>
            <p className="text-sm text-blue-200">
              Calcula tu plan de amortización detallado con un motor matemático financiero seguro.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/simulador-credito"
              className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-6 py-3 rounded-xl text-xs transition-colors shadow-md flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-blue-600" />
              <span>Simulador de Crédito</span>
            </Link>
            <Link
              href="/simulador-cdt"
              className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors shadow-md flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Simulador de CDT</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
