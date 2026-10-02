/**
 * Formatea un número en formato moneda colombiana COP
 */
export function formatCOP(valor: number, conSimbolo: boolean = true): string {
  const formateado = new Intl.NumberFormat("es-CO", {
    maximumFractionDigits: 0,
  }).format(valor);

  return conSimbolo ? `$ ${formateado}` : formateado;
}

/**
 * Formatea porcentaje con 2 decimales
 */
export function formatPercent(valor: number): string {
  return `${valor.toFixed(2)}%`;
}
