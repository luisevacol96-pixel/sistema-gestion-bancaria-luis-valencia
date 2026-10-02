"use server";

import { guardarSolicitudContacto } from "@/lib/data-storage";
import { ContactoForm } from "@/types";

export async function enviarSolicitudContactoAction(formData: {
  nombreCompleto: string;
  tipoDocumento: "CC" | "CE" | "NIT" | "Pasaporte";
  numeroDocumento: string;
  correo: string;
  telefono: string;
  tipoConsulta: "creditos" | "inversiones" | "cuentas" | "pqrs" | "asesoria";
  mensaje: string;
  aceptaTerminos: boolean;
}) {
  // Validación estricta en servidor (RF-04)
  if (!formData.nombreCompleto || formData.nombreCompleto.trim().length < 3) {
    return { success: false, error: "El nombre completo debe tener al menos 3 caracteres." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!formData.correo || !emailRegex.test(formData.correo)) {
    return { success: false, error: "Debe ingresar una dirección de correo electrónico válida." };
  }

  const telefonoLimpio = formData.telefono.replace(/\D/g, "");
  if (!telefonoLimpio || telefonoLimpio.length < 7 || telefonoLimpio.length > 12) {
    return { success: false, error: "El número de teléfono debe contener entre 7 y 12 dígitos numéricos." };
  }

  if (!formData.numeroDocumento || formData.numeroDocumento.trim().length < 5) {
    return { success: false, error: "El número de documento no es válido." };
  }

  if (!formData.aceptaTerminos) {
    return { success: false, error: "Debe aceptar la política de tratamiento de datos personales." };
  }

  try {
    const guardada = await guardarSolicitudContacto(formData);
    return {
      success: true,
      radicado: guardada.numeroRadicado,
      fecha: guardada.fechaRadicacion,
    };
  } catch (error) {
    console.error("Error al registrar solicitud en data-storage:", error);
    return { success: false, error: "Ocurrió un error al persistir la solicitud en el servidor." };
  }
}
