"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  MessageSquare,
  Calendar,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2,
  ShieldCheck,
  Check,
} from "lucide-react";
import { enviarSolicitudContactoAction } from "@/app/actions/contacto";

export default function ContactoClient() {
  const searchParams = useSearchParams();

  const paramSolicitud = searchParams.get("solicitud");
  const paramLinea = searchParams.get("linea");
  const paramMonto = searchParams.get("monto");
  const paramPlazo = searchParams.get("plazo");

  const [nombreCompleto, setNombreCompleto] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState<"CC" | "CE" | "NIT" | "Pasaporte">("CC");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [tipoConsulta, setTipoConsulta] = useState<"creditos" | "inversiones" | "cuentas" | "pqrs" | "asesoria">(
    paramSolicitud === "creditos" || paramSolicitud === "inversiones" ? (paramSolicitud as any) : "asesoria"
  );
  const [mensaje, setMensaje] = useState(
    paramLinea && paramMonto
      ? `Hola, realicé una simulación de crédito ${paramLinea} por un valor de $${Number(paramMonto).toLocaleString("es-CO")} COP a ${paramPlazo} meses y deseo continuar con la radicación oficial.`
      : ""
  );
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [radicadoExitoso, setRadicadoExitoso] = useState<{ radicado: string; fecha: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Validación preliminar en cliente
    if (!aceptaTerminos) {
      setErrorMsg("Debe autorizar el tratamiento de datos personales para continuar.");
      return;
    }

    setLoading(true);

    try {
      const response = await enviarSolicitudContactoAction({
        nombreCompleto,
        tipoDocumento,
        numeroDocumento,
        correo,
        telefono,
        tipoConsulta,
        mensaje,
        aceptaTerminos,
      });

      if (response.success && response.radicado) {
        setRadicadoExitoso({
          radicado: response.radicado,
          fecha: response.fecha || new Date().toLocaleString(),
        });
      } else {
        setErrorMsg(response.error || "Ocurrió un error al enviar su solicitud.");
      }
    } catch (err) {
      setErrorMsg("Error de conexión con el servidor. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Cabecera Principal */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl mb-10">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs uppercase tracking-widest font-bold text-blue-400 block">
                Canales Oficiales FinanSer
              </span>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                Centro de Atención y Contacto Institucional
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Brindamos atención personalizada con solvencia y rigor bancario. Gestione consultas especializadas,
                radique solicitudes o comuníquese directamente con nuestros asesores patrimoniales.
              </p>
            </div>
            <div className="bg-slate-800/80 border border-slate-700 px-4 py-2.5 rounded-xl text-xs text-slate-300 shrink-0 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Mesa de Atención Operativa • Respuesta en &lt; 24h</span>
            </div>
          </div>
        </div>

        {/* Panel Formulario + Información de Contacto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Formulario Dinámico (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="mb-6 pb-4 border-b border-slate-100">
              <span className="text-[10px] uppercase font-bold text-blue-600 tracking-widest block">
                Radicación Oficial
              </span>
              <h2 className="text-xl font-bold text-slate-900">Formulario de Contacto y Solicitudes</h2>
              <p className="text-xs text-slate-500 mt-1">
                Diligencie los campos requeridos para canalizar su requerimiento ante la dependencia financiera competente.
              </p>
            </div>

            {radicadoExitoso ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4 animate-fadeIn">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900">¡Solicitud Radicada Exitosamente!</h3>
                  <p className="text-xs text-slate-600">
                    Su información fue guardada en el sistema de gestión bancaria FinanSer.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-emerald-200 inline-block font-mono text-center">
                  <span className="text-[11px] text-slate-500 block">Número de Radicado Oficial:</span>
                  <span className="text-xl font-black text-emerald-700">{radicadoExitoso.radicado}</span>
                </div>
                <p className="text-xs text-slate-500">
                  Un asesor financiero se comunicará a su correo <strong>{correo}</strong> o teléfono <strong>{telefono}</strong> en un lapso no mayor a 24 horas hábiles.
                </p>
                <button
                  onClick={() => {
                    setRadicadoExitoso(null);
                    setMensaje("");
                  }}
                  className="mt-2 text-xs font-bold text-blue-700 hover:underline"
                >
                  Radicar una nueva solicitud
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* Nombre Completo */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Luis Fernando Valencia"
                    value={nombreCompleto}
                    onChange={(e) => setNombreCompleto(e.target.value)}
                    className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>

                {/* Documento de Identidad */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Tipo Doc. *
                    </label>
                    <select
                      value={tipoDocumento}
                      onChange={(e) => setTipoDocumento(e.target.value as any)}
                      className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    >
                      <option value="CC">Cédula (CC)</option>
                      <option value="CE">Extranjería (CE)</option>
                      <option value="NIT">NIT Empresa</option>
                      <option value="Pasaporte">Pasaporte</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Número de Documento *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. 1020304050"
                      value={numeroDocumento}
                      onChange={(e) => setNumeroDocumento(e.target.value)}
                      className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white font-mono"
                    />
                  </div>
                </div>

                {/* Correo y Teléfono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="usuario@dominio.com"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Teléfono Móvil (Celular) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="Ej. 3001234567"
                      value={telefono}
                      onChange={(e) => setTelefono(e.target.value)}
                      className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white font-mono"
                    />
                  </div>
                </div>

                {/* Tipo de Consulta */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tipo de Solicitud o Consulta *
                  </label>
                  <select
                    value={tipoConsulta}
                    onChange={(e) => setTipoConsulta(e.target.value as any)}
                    className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white font-semibold text-slate-800"
                  >
                    <option value="creditos">Créditos de Consumo y Vivienda</option>
                    <option value="inversiones">Apertura y Asesoría CDT Digital</option>
                    <option value="cuentas">Cuentas de Ahorros y Transaccional</option>
                    <option value="pqrs">Peticiones, Quejas, Reclamos o Sugerencias (PQRS)</option>
                    <option value="asesoria">Asesoría Comercial General</option>
                  </select>
                </div>

                {/* Mensaje */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mensaje o Detalle del Requerimiento *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describa brevemente su requerimiento financiero..."
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    className="w-full text-sm bg-slate-50 border border-slate-300 rounded-xl p-4 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white"
                  />
                </div>

                {/* Tratamiento de Datos (Habeas Data) */}
                <div className="flex items-start gap-2.5 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <input
                    type="checkbox"
                    id="habeasData"
                    checked={aceptaTerminos}
                    onChange={(e) => setAceptaTerminos(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded-sm border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="habeasData" className="text-[11px] text-slate-600 leading-relaxed cursor-pointer">
                    Acepto y autorizo de forma previa y expresa el tratamiento de mis datos personales de acuerdo con las
                    Políticas de Protección de Datos Personales de FinanSer S.A. en cumplimiento de la Ley 1581 de 2012.
                  </label>
                </div>

                {/* Botón de Envío */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-800 hover:to-blue-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all text-sm disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? "Radicando solicitud..." : "Enviar mensaje y radicar requerimiento"}</span>
                </button>
              </form>
            )}
          </div>

          {/* Panel Lateral: Canales Directos (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tarjeta Canales Telefónicos */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                <Phone className="w-5 h-5 text-blue-600" />
                <span>Líneas Telefónicas Oficiales</span>
              </h3>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Línea Gratuita Nacional:</span>
                  <strong className="text-base text-slate-900 font-mono">01 8000 123 456</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">PBX Bogotá D.C.:</span>
                  <strong className="text-base text-slate-900 font-mono">+57 (601) 345 6789</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">WhatsApp Corporativo Certificado:</span>
                  <strong className="text-base text-emerald-600 font-mono">+57 300 123 4567</strong>
                </div>
              </div>
            </div>

            {/* Correos y Horarios */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Horarios de Atención Presencial y PBX</span>
              </h3>
              <div className="space-y-2 text-xs text-slate-700">
                <p>
                  <strong>Lunes a Viernes:</strong> 8:00 a.m. – 4:30 p.m. (Jornada Continua)
                </p>
                <p>
                  <strong>Sábados:</strong> 8:00 a.m. – 1:00 p.m.
                </p>
                <p className="pt-2 text-slate-500 border-t border-slate-100">
                  <Mail className="w-3.5 h-3.5 inline mr-1 text-blue-500" />
                  <strong>Correo institucional:</strong> contacto@finanser.com.co
                </p>
              </div>
            </div>

            {/* Sede Principal */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>Dirección y Sede Principal</span>
              </h3>
              <div className="text-xs text-slate-600 space-y-1.5">
                <p className="font-bold text-slate-900">Torre Financiera FinanSer</p>
                <p>Carrera 7 # 71-21, Piso 12, Bogotá D.C., Colombia</p>
                <p className="text-[11px] text-slate-500">
                  Parqueadero con validación presencial para clientes con cita activa.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Canales Complementarios de Autogestión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-7 rounded-2xl shadow-md flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-base font-bold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-sky-400" />
                <span>Chat Virtual Inteligente 24/7</span>
              </h4>
              <p className="text-xs text-blue-200">
                Consulta saldos preliminares, tasas vigentes de CDT y radicación guiada.
              </p>
            </div>
            <button
              onClick={() => alert("Asistente Virtual FinanSer: El servicio está disponible en línea 24/7.")}
              className="bg-white text-blue-900 hover:bg-blue-50 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shrink-0 shadow-xs"
            >
              Iniciar Chat
            </button>
          </div>

          <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white p-7 rounded-2xl shadow-md flex items-center justify-between">
            <div className="space-y-1">
              <h4 className="text-base font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-400" />
                <span>Agendamiento de Cita en Sucursal</span>
              </h4>
              <p className="text-xs text-emerald-200">
                Reserve su cita con un gestor patrimonial en la Torre Financiera FinanSer sin filas.
              </p>
            </div>
            <button
              onClick={() => alert("Agendamiento: Seleccione su horario de preferencia con su asesor.")}
              className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors shrink-0 shadow-xs"
            >
              Agendar Cita
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
