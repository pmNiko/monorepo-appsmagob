
/**
 * Formato de fecha
 *   1. currentDate sera devuelta como string "dd-mm-yyyy"
 *   2. reverse invierte el formato
 */
export const dateFormat = (currentDate: string | Date, reverse = false) => {
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
