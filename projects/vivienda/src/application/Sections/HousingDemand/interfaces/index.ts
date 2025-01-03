// ?? Registro de Demanda Habitacional
export interface RegistroDHResponse {
  nro_registro: number;
  apellido: string;
  nombre: string;
  dni: number;
}

export interface RegistroDHParams {
  dni: string;
}

// ?? Registro de Instituciones Demanda Habitacional
export interface RegistroInstitucionesDHResponse {
  norden: number;
  apellido: string;
  nombre: string;
  dni: number;
  grupo: string;
}

// ?? Sorteo de demanda Habitacional
export interface SorteoDHResponse {
  barriogrupo: string;
  manzana: string;
  lote: number;
  ordendegrupo: number;
  nombre: string;
  dni: number;
  idgrupo: number;
  grupo: string;
  barrio: string;
  barr_grupo: string;
}

// ?? Suplentes del sorteo de Demanda Habitacional
export interface SuplentesSorteoDHResponse {
  prioridad: number;
  n_orden: number;
  nombre: string;
  dni: number;
}
