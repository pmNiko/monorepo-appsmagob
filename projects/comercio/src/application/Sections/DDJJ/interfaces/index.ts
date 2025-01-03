export interface DDJJResponse {
  n_cont: number;
  cuitcuil: string;
  pin: string;
  n_serie: number;
  nrlic: number;
  nomco: string;
  iddecjurada: number;
  rectificatoria: number;
  maxfactproyect: number;
  idcantempleados: number;
  idsuperficie: number;
  cntabonados: number;
  esproveedorinternet: boolean;
  anoultimadj: number;
  esPrecarga: boolean;
}

export interface ToDeclareProps {
  n_serie: number;
  ano: number;
  maxfactproyect: number;
  idsuperficie: number;
  idcantempleados: number;
  cantidadabonados: number;
}

export interface ValuesOnSubmit
  extends Omit<ToDeclareProps, "n_serie" | "ano"> {}

export interface DDJJToDeclareFormProps extends ValuesOnSubmit {
  terms: boolean;
}
