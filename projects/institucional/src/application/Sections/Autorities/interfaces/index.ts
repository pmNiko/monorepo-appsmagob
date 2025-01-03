export interface AuthorityResponse {
  idsectorpadre: number;
  sectortipo: string;
  idsector: number;
  sector: string;
  responsable: string;
  telefono: string;
}

export interface Authority extends AuthorityResponse {
  children?: Authority[];
}
