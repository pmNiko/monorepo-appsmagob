export type TaxValue = "01" | "02" | "03" | "AA" | "13" | "BB";

export interface ValidateAdhesionParams {
  tribu: TaxValue;
  cuitcuil: string;
  datoabuscar: string;
}

export interface ValidateResponse {
  tribu: TaxValue;
  n_serie: number;
  codigoreparto: number;
}

export interface AdhesionReceiptsParams {
  n_cont: number;
  tribu: TaxValue;
}

export interface TributosResponse {
  tribu: string;
  n_serie: number;
  tribuabrev: string;
  tributodescr: string;
  email: string;
}

export interface AdhesionConfirmResponse {
  email: string;
  tributo: string;
  tribu: string;
  n_serie: number;
}
