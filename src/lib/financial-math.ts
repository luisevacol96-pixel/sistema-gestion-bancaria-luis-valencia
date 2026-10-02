import { AmortizacionCuota, CreditoResultado, CDTResultado } from "@/types";

/**
 * Calcula la proyección de crédito bajo el sistema de amortización francés (cuota fija)
 */
export function calcularCreditoFrances(
  monto: number,
  plazoMeses: number,
  tasaNMV: number,
  tasaEA: number,
  seguroVidaFijo: number = 28000
): CreditoResultado {
  const i = tasaNMV / 100;
  const n = plazoMeses;

  // Fórmula de cuota constante francesa: R = P * [ i * (1+i)^n ] / [ (1+i)^n - 1 ]
  let cuotaPura = 0;
  if (i === 0) {
    cuotaPura = monto / n;
  } else {
    const factor = Math.pow(1 + i, n);
    cuotaPura = monto * ((i * factor) / (factor - 1));
  }

  const cuotaMensualFija = Math.round(cuotaPura + seguroVidaFijo);

  const tablaAmortizacion: AmortizacionCuota[] = [];
  let saldoActual = monto;
  let sumaIntereses = 0;

  for (let cuotaNum = 1; cuotaNum <= n; cuotaNum++) {
    const interesMes = Math.round(saldoActual * i);
    let abonoCapitalMes = Math.round(cuotaPura - interesMes);

    // En la última cuota ajustamos para liquidar exactamente el saldo restante
    if (cuotaNum === n || abonoCapitalMes > saldoActual) {
      abonoCapitalMes = saldoActual;
    }

    const saldoFinalMes = Math.max(0, saldoActual - abonoCapitalMes);
    sumaIntereses += interesMes;

    tablaAmortizacion.push({
      numero: cuotaNum,
      saldoInicial: saldoActual,
      cuotaTotal: Math.round(abonoCapitalMes + interesMes + seguroVidaFijo),
      abonoCapital: abonoCapitalMes,
      interes: interesMes,
      seguroVida: seguroVidaFijo,
      saldoFinal: saldoFinalMes,
    });

    saldoActual = saldoFinalMes;
  }

  const totalSeguros = seguroVidaFijo * n;
  const totalPagar = monto + sumaIntereses + totalSeguros;

  return {
    monto,
    plazoMeses,
    tasaNMV,
    tasaEA,
    cuotaMensualFija,
    cuotaPura: Math.round(cuotaPura),
    seguroVidaMensual: seguroVidaFijo,
    totalIntereses: sumaIntereses,
    totalSeguros,
    totalPagar,
    tablaAmortizacion,
  };
}

/**
 * Realiza la liquidación financiera del CDT con retención legal del 4%
 */
export function liquidarCDT(
  montoInversion: number,
  diasPlazo: number,
  tasaEA: number,
  modalidadPago: "vencimiento" | "mensual" = "vencimiento"
): CDTResultado {
  // Convención bancaria 360 días
  const factorTiempo = diasPlazo / 360;
  const rendimientoBruto = Math.round(montoInversion * (tasaEA / 100) * factorTiempo);
  const retencionFuente = Math.round(rendimientoBruto * 0.04); // 4% legal Colombia
  const rendimientoNeto = rendimientoBruto - retencionFuente;
  const totalRecibir = montoInversion + rendimientoNeto;

  return {
    montoInversion,
    diasPlazo,
    tasaEA,
    modalidadPago,
    rendimientoBruto,
    retencionFuente,
    rendimientoNeto,
    totalRecibir,
  };
}
