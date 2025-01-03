export interface FileTrackingResponse {
  idmovimiento: number;
  tema: string;
  fechamovimietno: string;
  tipomovimiento: string;
  codigoemisor: string;
  sectoremisor: string;
  codigodestino: string;
  sectordestino: string;
  cntfolios: number;
  idtipomovimiento: number;
}

export interface FileTrackingParams {
  expediente: string;
}
