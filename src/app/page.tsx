import React from "react";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import QuickSimulator from "@/components/home/QuickSimulator";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TrustFeatures from "@/components/home/TrustFeatures";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/home/CtaBanner";
import { getProductos } from "@/lib/data-storage";

export default async function HomePage() {
  const productos = await getProductos();

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Institucional */}
      <Hero />

      {/* 2. Métricas y Estadísticas Institucionales */}
      <Stats />

      {/* 3. Widget de Simulación Rápida de Crédito y CDT */}
      <QuickSimulator />

      {/* 4. Soluciones Integrales y Productos Destacados */}
      <FeaturedProducts productos={productos} />

      {/* 5. Razones contundentes para confiar en FinanSer */}
      <TrustFeatures />

      {/* 6. Testimonios de Clientes */}
      <Testimonials />

      {/* 7. Llamado a la Acción Final */}
      <CtaBanner />
    </div>
  );
}
