import React from "react";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Dra. Claudia Martínez Ríos",
      role: "Médica Especialista",
      city: "Bogotá D.C.",
      comment:
        "La simulación en FinanSer fue exactamente igual a la liquidación final que me aplicaron en el desembolso de mi crédito de vivienda. Cero sorpresas y una cuota fija real.",
      rating: 5,
    },
    {
      name: "Ing. Andrés Felipe Gómez",
      role: "Gerente Operativo Pyme",
      city: "Medellín, Antioquia",
      comment:
        "El crédito de libre inversión nos permitió capitalizar maquinaria en tiempo récord. El asesor financiero en sala me atendió con la misma herramienta en minutos.",
      rating: 5,
    },
    {
      name: "Vicente Jaramillo M.",
      role: "Inversionista Patrimonial",
      city: "Cali, Valle del Cauca",
      comment:
        "Tener la certeza de la retención del 4% calculada antes de constituir el CDT me dio la tranquilidad tributaria que no encontraba en otros bancos. Muy recomendado.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block">
            Testimonios Verificados
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            La voz de quienes crecen con FinanSer
          </h2>
          <p className="text-sm text-slate-600">
            Conoce las experiencias de nuestros clientes que ya disfrutan de un servicio financiero transparente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="bg-slate-50 p-7 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">{item.name}</div>
                  <div className="text-[11px] text-slate-500">{item.role} • {item.city}</div>
                </div>
                <Quote className="w-6 h-6 text-slate-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
