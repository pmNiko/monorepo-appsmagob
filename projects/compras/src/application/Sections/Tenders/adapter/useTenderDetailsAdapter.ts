import { useEffect, useState } from "react";
import {
  TenderDetailProps,
  TenderDetailsEnum,
  TenderTypeDetail,
} from "../interfaces";
import { amountFormatter } from "@shared/infra";

type TupleDetail = [TenderTypeDetail, string | number];

type TenderMapDetails = {
  (description: string | number): string;
};

/** ---------- Map de licitaciones ------- */
const tenderMap = new Map<string, TenderMapDetails>([]);
tenderMap.set("apertura", (description) => `${description} hs`);
tenderMap.set(
  "valorpliego",
  (description) => `$ ${amountFormatter().format(description as number)}`
);
tenderMap.set(
  "presupuestooficial",
  (description) => `$ ${amountFormatter().format(description as number)}`
);
tenderMap.set("default", (description) => `${description}`);

/** ---------- Titulos del detalle de licitación ------- */
const tenderTitleDetails: TenderDetailsEnum = {
  licitacion: "Licitación",
  numero: "Número",
  apertura: "Fecha apertura",
  aperturalugar: "Lugar",
  consultasarea: "Aréa",
  consultastelefono: "Teléfono",
  consultasemail: "Email",
  valorpliego: "Valor pliego",
  presupuestooficial: "Presupuesto",
  observaciones: "Observaciones",
  tipolicitacion: "Tipo",
};

/**
 * - useTenderDetailsAdapter
 *  - Adapter encargado de dar formato a las key del detalle
 *    de la licitación seleccionada.
 */
export const useTenderDetailsAdapter = (details: TenderDetailsEnum) => {
  const [detailsFormat, setDetailsFormat] = useState([] as TenderDetailProps[]);

  useEffect(() => {
    const arrayDetail = Object.entries(details).map(
      (ele) => ele
    ) as TupleDetail[];

    setDetailsFormat([
      ...arrayDetail.map((element) => {
        const formatDescription = tenderMap.get(element[0])
          ? tenderMap.get(element[0])
          : tenderMap.get("default");

        return {
          ...detailsFormat,
          title: `${tenderTitleDetails[element[0]]}`,
          description: formatDescription!(element[1]),
        };
      }),
    ]);
  }, [details]);

  return detailsFormat;
};
