
export interface ValidateResponse {
  tribu: string;
  n_serie: number;
  codigoreparto: number;
}

export interface ValidateByMD5Response
  extends Omit<ValidateResponse, "codigoreparto"> {
  anualsemestral: boolean;
}

export interface ValidateSearchParams {
  tribu: string;
  cuitcuil: string | number;
  datoabuscar: string;
}



export enum Taxes {
  Nomenclatura = "01",
  Licencia = "02",
  Patentes = "03",
  NroRecibo = "AA",
  RentasVarias = "13",
  ClaveFiscal = "BB",
  Email = "CE",
  OficinaVirtual = "OV",
}

export interface MacroClickProps {
  recibos: string;
  productos: string;
  montoProductos: string;
}



/** ---------- Cambio en la busqueda de recibos---------------- */


export type T_Cuot = '1' | 'x' | 'y'



export interface RecibosListarParams {
  tribu?: string;
  n_serie?: number;
  t_cuot?: T_Cuot;
  md5?: string
}



/**
 * Respuesta de busqueda de tributos a pagar
 * * enlegales: si es null es porque no tiene recibos en legales
 * * fvalidez:  fecha de pago
 * * periodo:   periodo del tributo
 * * importe:   monto a pagar
 * * t_cuot:   
 *      - '01': Todos los tipos de cuota
 *      - 'X':  Tipo de cuota Semestral
 *      - 'Y':  Tipo de cuota Anual
 */
export interface RecibosListarResp {
  colgroup: string;
  email: string;   // + 
  enlegales: boolean;
  fvalidez: Date;
  importe: number;
  n_recibo: number;
  n_serie: number;
  periodo: Date;   // +       
  relaciontributo: string;
  t_cuot: T_Cuot;
  t_cuotdescr: string;
  titulo: string;
  tribu: string;
  tribuabrev: string;
  tribudescr: string;
}


