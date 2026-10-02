import React from "react";
import Link from "next/link";
import { ArrowRight, Home, CreditCard, PiggyBank, Car, Check } from "lucide-react";
import { Producto } from "@/types";

interface Props {
  productos: Producto[];
}

export default function FeaturedProducts({ productos }: Props) {
  // Tomamos los 3 productos principales para el Home: Libre Inversión, CDT, Vivienda
  const destacados = productos.slice(0, 3);

  const getProductIcon = (id: string) => {
    switch (id) {
      case "credito-vivienda":
        return <Home className="w-6 h-6 text-blue-600" />;
      case "libre-inversion":
        return <CreditCard className="w-6 h-6 text-blue-600" />;
      case "credito-vehiculo":
        return <Car className="w-6 h-6 text-blue-600" />;
      case "cdt-digital":
        return <PiggyBank className="w-6 h-6 text-emerald-600" />;
      default:
        return <CreditCard className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">
              Portafolio Integral
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Soluciones integrales de banca y crecimiento
            </h2>
          </div>
          <Link
            href="/productos"
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 hover:text-blue-800 group"
          >
            <span>Explorar catálogo completo (5 productos)</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destacados.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-7">
                {/* Header de la Card */}
                <div className="flex justify-between items-start mb-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getProductIcon(prod.id)}
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                    {prod.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-2">
                  {prod.name}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">
                  {prod.tagline}
                </p>

                {/* Tasa y Plazo */}
                <div className="bg-slate-50 rounded-xl p-3.5 mb-6 border border-slate-100 space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Tasa referencial:</span>
                    <span className="font-extrabold text-blue-700">{prod.tasaReferencial}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Vigencia máxima:</span>
                    <span className="font-semibold text-slate-800">
                      {prod.plazoMax ? `${prod.plazoMax} ${prod.category === "inversion" ? "días" : "meses"}` : "Indefinido"}
                    </span>
                  </div>
                </div>

                {/* Beneficios */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Beneficios destacados:
                  </span>
                  {prod.beneficios.slice(0, 2).map((ben, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{ben}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón de Acción */}
              <div className="p-7 pt-0 border-t border-slate-100/60 mt-4">
                <Link
                  href={prod.linkSimulador}
                  className="w-full mt-4 inline-flex items-center justify-center gap-2 bg-slate-900 group-hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-xl text-xs transition-colors shadow-sm"
                >
                  <span>Simular este producto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
