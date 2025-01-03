import { TendersDataSelectsProps } from "../interfaces";

/**
 * - useTenderGetYear
 *    - Retorna el año de una licitación seleccionada por ID.
 */
export const useTenderGetYearAdapter = (
  tenders: TendersDataSelectsProps[],
  tenderID: string
) => {
  const tenderExists = tenders.map((tender: TendersDataSelectsProps) => {
    const tenderFound = Object.values(tender.licitaciones).find(
      (ele) => `${ele.idlicitacion}` == tenderID
    );
    if (tenderFound) return tender.ano;
  });
 

  const yearFromTender =
    !!tenderExists && tenderExists.find((element) => !!element);

  return yearFromTender;
};
