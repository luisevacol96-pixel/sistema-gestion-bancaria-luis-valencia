import React from "react";
import { getProductos } from "@/lib/data-storage";
import ProductosClient from "@/components/productos/ProductosClient";

export const metadata = {
  title: "Catálogo Digital de Productos Financieros | FinanSer",
  description:
    "Conoce nuestro portafolio de créditos de vivienda, libre inversión, vehículos, CDT y cuentas de ahorros con tasas transparentes vigiladas por la SFC.",
};

export default async function ProductosPage() {
  const productos = await getProductos();

  return <ProductosClient initialProductos={productos} />;
}
