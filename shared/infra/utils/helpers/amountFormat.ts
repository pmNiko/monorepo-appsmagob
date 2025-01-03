/**
 * Formato de moneda
 *  - value el "." separa los decimales
 * @returns {string} "$ xx.xxx,00"
 */
export const amountFormat = (value?: string | number) => {
  let draftValue = typeof value === "string" ? parseFloat(value) : value;

  if (!draftValue) {
    draftValue = 0
  }

  return draftValue.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
