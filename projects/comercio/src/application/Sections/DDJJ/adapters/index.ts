import { DDJJResponse } from "../interfaces";

export const ddjjAdapter = (
  data: DDJJResponse[],
  year: number
): DDJJResponse[] => {
  return data.map((ddjj) => ({
    ...ddjj,
    esPrecarga: ddjj.anoultimadj !== year,
  }));
};
