import React from "react";
import Link from "next/link";
import { ArrowRight, Calculator, ShieldCheck, CheckCircle2, TrendingUp, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-blue-950 text-white py-16 lg:py-24">
      {/* Patrón de fondo geométrico sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-sky-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Columna Texto (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>Plataforma Financiera Oficial FinanSer 2026</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-tight">
              Construye tu futuro financiero hoy con{" "}
              <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-teal-300 bg-clip-text text-transparent">
                FinanSer.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
              Soluciones de crédito, ahorro e inversión estructuradas a la medida de tu patrimonio familiar
              y la escala operativa de tu empresa. Seguridad matemática con agilidad digital.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/productos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-900/40 hover:shadow-blue-700/50 transition-all text-sm group"
              >
                <span>Conoce nuestros productos</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/simulador-credito"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-semibold px-6 py-3.5 rounded-xl transition-all text-sm hover:border-slate-600"
              >
                <Calculator className="w-4 h-4 text-sky-400" />
                <span>Calcular simulación</span>
              </Link>
            </div>

            {/* Puntos de Confianza */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sin costos ocultos</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Fogafín hasta $50M COP</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <TrendingUp className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Tasas preferenciales</span>
              </div>
            </div>
          </div>

          {/* Columna Tarjeta Visual Destacada (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-300">Simulador Express Activo</span>
                </div>
                <span className="text-[11px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-md font-mono">
                  SFC Vigente
                </span>
              </div>

              {/* Muestra de cotización rápida en tiempo real */}
              <div className="py-6 space-y-4">
                <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                  <div className="text-xs text-slate-400 mb-1">Ejemplo Cotización Libre Inversión:</div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-400 font-medium">Monto solicitado:</span>
                    <span className="text-base font-bold text-white">$ 20.000.000 COP</span>
                  </div>
                  <div className="flex justify-between items-baseline mt-1">
                    <span className="text-xs text-slate-400 font-medium">Plazo diferido:</span>
                    <span className="text-xs font-semibold text-sky-300">48 Meses (4 años)</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-900/40 to-sky-900/30 p-4 rounded-xl border border-blue-500/30 flex justify-between items-center">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-blue-300 font-semibold block">
                      Cuota Fija Estimada
                    </span>
                    <span className="text-2xl font-black text-white">$ 572.525</span>
                    <span className="text-[11px] text-slate-400 block mt-0.5">/mes (incluye seguro de vida)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 block">Tasa M.V.</span>
                    <span className="text-sm font-bold text-emerald-400">1.15% M.V.</span>
                    <span className="text-[10px] text-slate-500 block">14.71% E.A.</span>
                  </div>
                </div>
              </div>

              <Link
                href="/simulador-credito"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl transition-all text-xs shadow-md"
              >
                <span>Personalizar esta cotización</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
