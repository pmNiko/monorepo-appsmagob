
export interface TramitePecasResponse {
  estado:           string;
  cod_proceso:      number;
  tramite:          string;
  iniciador:        string;
  fechahora_inicio: string;
  razon_social:     string;
}



export interface TramitePecasMovimiento {
  estado:            string;
  fechahora_fin:     string;
  fechahora_inicio:  string;
  descripcion_tarea: string;
  cod_tarea:         number;
  agente?:           string;
}


export interface FinderFileParams {
  NumeroTramite: string
  CuitCuil: string;
}

export interface FinderTrackingParams {
  CodigoProceso: number
}