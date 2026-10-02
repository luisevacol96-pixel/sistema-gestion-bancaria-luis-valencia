import fs from "fs/promises";
import path from "path";
import { ContactoForm, Producto } from "@/types";

const DATA_DIR = path.join(process.cwd(), "src", "data");

export async function getProductos(): Promise<Producto[]> {
  try {
    const filePath = path.join(DATA_DIR, "productos.json");
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error leyendo productos.json:", error);
    return [];
  }
}

export async function getParametrosCredito() {
  try {
    const filePath = path.join(DATA_DIR, "parametros-credito.json");
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error leyendo parametros-credito.json:", error);
    return null;
  }
}

export async function getParametrosCDT() {
  try {
    const filePath = path.join(DATA_DIR, "parametros-cdt.json");
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error leyendo parametros-cdt.json:", error);
    return null;
  }
}

export async function getOficinas() {
  try {
    const filePath = path.join(DATA_DIR, "oficinas.json");
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error leyendo oficinas.json:", error);
    return null;
  }
}

export async function getSolicitudesContacto(): Promise<ContactoForm[]> {
  try {
    const filePath = path.join(DATA_DIR, "solicitudes-contacto.json");
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Error leyendo solicitudes-contacto.json:", error);
    return [];
  }
}

export async function guardarSolicitudContacto(solicitud: Omit<ContactoForm, "id" | "fechaRadicacion" | "numeroRadicado">): Promise<ContactoForm> {
  const filePath = path.join(DATA_DIR, "solicitudes-contacto.json");
  const actuales = await getSolicitudesContacto();

  const fecha = new Date();
  const radicado = `FIN-${fecha.getFullYear()}${(fecha.getMonth() + 1).toString().padStart(2, "0")}-${Math.floor(1000 + Math.random() * 9000)}`;

  const nuevaSolicitud: ContactoForm = {
    ...solicitud,
    id: crypto.randomUUID(),
    fechaRadicacion: fecha.toISOString(),
    numeroRadicado: radicado,
  };

  actuales.unshift(nuevaSolicitud);
  await fs.writeFile(filePath, JSON.stringify(actuales, null, 2), "utf-8");

  return nuevaSolicitud;
}
