/*                                                    */
/*  ----  Interfaces de respuesta desde lo API  ----- */
/*                                                    */
export interface TenderSelectsResponse {
  ano: number;
  licitaciones: TenderTitle[];
}

export interface TenderTitle {
  idlicitacion: number;
  licitacionnombre: string;
}

export interface TenderByIDResponse {
  idlicitacion: number;
  licitacion: string;
  numero: string;
  ano: number;
  apertura: string;
  aperturahora: string;
  aperturalugar: string;
  consultasarea: string;
  consultastelefono: string;
  consultasemail: string;
  valorpliego: number;
  presupuestooficial: number;
  observaciones: string;
  idtipolicitacion: number;
  tipolicitacion: string;
  documentacion: TenderFileProps[];
}

export interface TenderFileProps {
  nombrearchivo: string;
  tipo: TenderTypeFile;
}

/*                                                    */
/*  ----  Interfaces para el manejo de datos    ----- */
/*                                                    */
export type TenderTypeFile = "PDF" | "JPG" | "DOC" | "XLS" | "ZIP";

export type TenderTypeDetail =
  | "licitacion"
  | "numero"
  | "apertura"
  | "aperturalugar"
  | "consultasarea"
  | "consultastelefono"
  | "consultasemail"
  | "valorpliego"
  | "presupuestooficial"
  | "observaciones"
  | "tipolicitacion";

export type TenderDetailsEnum = {
  [key in TenderTypeDetail]: string | number;
};

export interface TendersDataSelectsProps {
  ano: number;
  licitaciones: Array<{ idlicitacion: number; licitacionnombre: string }>;
}

export interface TenderDetailProps {
  title: string;
  description: string | number;
}

export type TenderTitlesForSelect = {
  idlicitacion: number;
  licitacionnombre: string;
};
