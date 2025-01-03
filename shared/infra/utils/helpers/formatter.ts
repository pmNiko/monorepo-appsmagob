/** amountFormatter
 *  - Formato de Moneda
 */
export const amountFormatter = () => {
  return new Intl.NumberFormat("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/** dateFormatter
 *  - Formato de fecha
 */
export const dateFormatter = (currentDate: string | Date, reverse = false) => {
  const aDate =
    currentDate instanceof Date ? currentDate : new Date(currentDate);

  const formatted_date = aDate
    .toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .split("/")
    .join("-");

  return reverse
    ? formatted_date
        .split("-")
        .reverse()
        .join("-")
    : formatted_date;
};
