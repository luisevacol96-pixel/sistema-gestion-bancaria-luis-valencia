import React from "react";
import Link from "next/link";
import { ArrowRight, MessageSquareCheck, Sparkles } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Atención Inmediata y Asesoría Gratuita</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
          ¿Listo para dar el siguiente paso en tu bienestar financiero?
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Únete a los más de 500,000 colombianos que han transformado sus metas en realidades respaldadas por FinanSer.
          Cotiza tu producto o comunícate con un asesor financiero certificado.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/productos"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg transition-all text-sm group"
          >
            <span>Explorar Productos Financieros</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/contacto"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl transition-all text-sm"
          >
            <MessageSquareCheck className="w-4 h-4 text-emerald-400" />
            <span>Contactar a un Asesor</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
