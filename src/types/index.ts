export interface Producto {
  id: string;
  category: "creditos" | "inversion" | "cuentas";
  name: string;
  tagline: string;
  badge: string;
  tasaReferencial: string;
  tasaMensual: string;
  plazoMin: number;
  plazoMax: number;
  montoMin: number;
  montoMax: number;
  requisitos: string;
  beneficios: string[];
  linkSimulador: string;
}

export interface LineaCreditoConfig {
  id: string;
  nombre: string;
  descripcion: string;
  tasaNMV: number;
  tasaEA: number;
  montoMin: number;
  montoMax: number;
  defaultMonto: number;
  plazos: number[];
  defaultPlazo: number;
  seguroVidaFijo: number;
}

export interface AmortizacionCuota {
  numero: number;
  saldoInicial: number;
  cuotaTotal: number;
  abonoCapital: number;
  interes: number;
  seguroVida: number;
  saldoFinal: number;
}

export interface CreditoResultado {
  monto: number;
  plazoMeses: number;
  tasaNMV: number;
  tasaEA: number;
  cuotaMensualFija: number;
  cuotaPura: number;
  seguroVidaMensual: number;
  totalIntereses: number;
  totalSeguros: number;
  totalPagar: number;
  tablaAmortizacion: AmortizacionCuota[];
}

export interface CDTPlazoConfig {
  dias: number;
  meses: number;
  label: string;
  sublabel: string;
  tasaEA: number;
}

export interface CDTResultado {
  montoInversion: number;
  diasPlazo: number;
  tasaEA: number;
  modalidadPago: "vencimiento" | "mensual";
  rendimientoBruto: number;
  retencionFuente: number;
  rendimientoNeto: number;
  totalRecibir: number;
}

export interface ContactoForm {
  id?: string;
  nombreCompleto: string;
  tipoDocumento: "CC" | "CE" | "NIT" | "Pasaporte";
  numeroDocumento: string;
  correo: string;
  telefono: string;
  tipoConsulta: "creditos" | "inversiones" | "cuentas" | "pqrs" | "asesoria";
  mensaje: string;
  aceptaTerminos: boolean;
  fechaRadicacion?: string;
  numeroRadicado?: string;
}
