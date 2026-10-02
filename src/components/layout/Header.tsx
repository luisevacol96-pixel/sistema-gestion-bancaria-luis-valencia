"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Phone, Lock, Menu, X, ArrowRight, Building2, Calculator } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Inicio", href: "/" },
    { name: "Productos Financieros", href: "/productos" },
    { name: "Simulador de Crédito", href: "/simulador-credito" },
    { name: "Simulador de CDT", href: "/simulador-cdt" },
    { name: "Contacto", href: "/contacto" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-100">
      {/* Barra Superior Institucional */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Línea Nacional: <strong>01 8000 123 456</strong></span>
            </span>
            <span className="hidden md:inline-block text-slate-500">|</span>
            <span className="hidden md:flex items-center gap-1.5">
              <span>PBX Bogotá: <strong>(601) 345 6789</strong></span>
            </span>
          </div>

          <div className="flex items-center space-x-5 text-xs">
            <span className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span className="tracking-wide">Transacciones Seguras SSL 256-bit</span>
            </span>
            <button
              onClick={() => alert("Módulo de Banca Virtual: En esta versión prototipo, las consultas y simulaciones son públicas y seguras.")}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium px-3 py-1 rounded transition-colors text-xs shadow-xs"
            >
              <Lock className="w-3 h-3" />
              <span>Banca Virtual</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navegación Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logotipo FinanSer */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-900 via-blue-700 to-sky-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-2xl font-black tracking-tight text-slate-900">Finan</span>
                <span className="text-2xl font-black tracking-tight text-blue-600">Ser</span>
              </div>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-500">
                Soluciones Financieras
              </span>
            </div>
          </Link>

          {/* Menú de Escritorio */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                    active
                      ? "text-blue-700 bg-blue-50/80 font-bold"
                      : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Simular Ahora */}
          <div className="hidden lg:flex items-center space-x-3">
            <Link
              href="/simulador-credito"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all text-sm group"
            >
              <Calculator className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform" />
              <span>Simular Ahora</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Botón Móvil */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-base font-medium ${
                isActive(link.href)
                  ? "bg-blue-50 text-blue-700 font-bold"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100">
            <Link
              href="/simulador-credito"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-sm"
            >
              <Calculator className="w-5 h-5" />
              <span>Simular Ahora</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
