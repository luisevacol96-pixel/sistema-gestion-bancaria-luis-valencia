import React from "react";
import Link from "next/link";
import { Building2, Shield, Phone, Mail, MapPin, CheckCircle2, FileText, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Cabecera superior del Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Columna Institucional (2 columnas en LG) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-sky-400 flex items-center justify-center text-white shadow-lg">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-black tracking-tight text-white">Finan</span>
                  <span className="text-2xl font-black tracking-tight text-blue-400">Ser</span>
                </div>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400">
                  Soluciones Financieras
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Entidad financiera líder comprometida con el desarrollo patrimonial de personas y empresas.
              Transparencia, respaldo institucional y tecnología de precisión al servicio de sus metas financieras.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Vigilado Superintendencia Financiera de Colombia</span>
            </div>
          </div>

          {/* Enlaces de Navegación */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">Navegación</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/productos" className="hover:text-white transition-colors">
                  Productos Financieros
                </Link>
              </li>
              <li>
                <Link href="/simulador-credito" className="hover:text-white transition-colors">
                  Simulador de Crédito
                </Link>
              </li>
              <li>
                <Link href="/simulador-cdt" className="hover:text-white transition-colors">
                  Simulador de CDT
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors">
                  Contacto y PQRS
                </Link>
              </li>
            </ul>
          </div>

          {/* Seguridad y Legal */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">Seguridad y Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Protección de Datos Personales
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Términos y Condiciones
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Defensoría del Consumidor
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Seguro de Depósitos Fogafín
                </span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-white transition-colors">
                  Tasas y Tarifas Vigentes
                </span>
              </li>
            </ul>
          </div>

          {/* Contacto Directo */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">Contacto Directo</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs text-slate-500">Línea Gratuita Nacional</span>
                  <strong className="text-slate-200">01 8000 123 456</strong>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs text-slate-500">Atención al Cliente</span>
                  <span className="text-slate-200">contacto@finanser.com.co</span>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-xs text-slate-500">Oficina Principal</span>
                  <span className="text-slate-200">Cra. 7 # 71-21, Bogotá D.C.</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Sellos de Regulación Fogafín y Superfinanciera */}
        <div className="py-6 border-b border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-md">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-slate-300">VIGILADO SUPERINTENDENCIA FINANCIERA</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-md">
              <FileText className="w-4 h-4 text-blue-400" />
              <span className="font-semibold text-slate-300">INSCRITO A FOGAFÍN</span>
            </div>
          </div>
          <p className="text-slate-500 text-center md:text-right max-w-md text-[11px]">
            Este producto cuenta con seguro de depósitos Fogafín hasta por $50.000.000 COP por titular.
          </p>
        </div>

        {/* Derechos de Autor y Responsabilidad Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} FinanSer S.A. Compañía de Financiamiento Comercial. Todos los derechos reservados.
          </p>
          <p className="text-[11px]">
            NIT: 900.823.411-2 | República de Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
