export interface ParamsForMacroClick {
  recibos: string;
  productos: string;
  montoProductos: string;
}

/** ------ Detalles de los tributos -------- */
export interface DetallesContribuyenteResp {
  cuitcuil: string;
  denominacion: string;
  email: null;
  deudaenlegales: boolean;
  deudauvi: boolean;
  deudamultas: boolean;
  montototaldeuda: number;
  recibos: string;
  productos: string;
  montoproductos: string;
  semestraldisponible: boolean;
  anualdisponible: boolean;
}

export interface DetallesContribuyenteTributosResp {
  tribu: string;
  n_serie: number;
  tribuabrev: string;
  titulo: string;
  email: string;
  relaciontributo: string;
  deudaenlegales: boolean;
  deudauvi: boolean;
  deudamultas: boolean;
  montototaldeuda: number | null;
  recibos: null | string;
  productos: null | string;
  montoproductos: null | string;
  semestraldisponible: boolean;
  anualdisponible: boolean;
}
