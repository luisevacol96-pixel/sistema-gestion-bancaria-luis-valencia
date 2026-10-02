import React from "react";
import { ShieldCheck, Eye, Zap, Headphones } from "lucide-react";

export default function TrustFeatures() {
  const features = [
    {
      icon: Eye,
      title: "Cero Costos Ocultos",
      description: "Transparencia contractual absoluta en tasas, comisiones y seguros. Sabes exactamente cuánto pagas desde el primer día.",
    },
    {
      icon: ShieldCheck,
      title: "Máxima Ciberseguridad",
      description: "Cifrado bancario de grado militar SSL 256-bit y autenticación rigurosa para blindar tu patrimonio.",
    },
    {
      icon: Zap,
      title: "Desembolso Ágil",
      description: "Aprobación express con desembolso en tu cuenta bancaria en menos de 24 horas sin trámites engorrosos.",
    },
    {
      icon: Headphones,
      title: "Atención Humana 24/7",
      description: "Asesores financieros reales y calificados disponibles en sala y en canales virtuales para resolver tus inquietudes.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">
            Solidez y Garantía
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Razones contundentes para confiar en FinanSer
          </h2>
          <p className="text-sm text-slate-600">
            Nuestros principios corporativos garantizan una experiencia de asesoría financiera sin contratiempos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
