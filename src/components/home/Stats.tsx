import React from "react";
import { Users, CheckCircle, Percent, Coins } from "lucide-react";

export default function Stats() {
  const stats = [
    {
      icon: Users,
      value: "+500,000",
      label: "Clientes Satisfechos",
      description: "Personas y familias impulsando sus proyectos",
    },
    {
      icon: CheckCircle,
      value: "99.8%",
      label: "Disponibilidad de Servicio",
      description: "Operatividad garantizada en canales digitales",
    },
    {
      icon: Percent,
      value: "Desde 1.15%",
      label: "Tasa Mes Vencido",
      description: "Condiciones preferenciales y transparentes",
    },
    {
      icon: Coins,
      value: "$2.4 Billones",
      label: "Cartera Administrada",
      description: "Solidez patrimonial vigilada por la SFC",
    },
  ];

  return (
    <section className="bg-white border-y border-slate-200 py-10 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2 p-3 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-1">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {item.value}
                </div>
                <div className="text-sm font-bold text-slate-800">{item.label}</div>
                <div className="text-xs text-slate-500 leading-tight">{item.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
