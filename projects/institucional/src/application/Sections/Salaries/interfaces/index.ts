export interface SalaryPeriodResponse {
  valuecmb: string;
  labelcmb: string;
}

export interface SalaryPeriods {
  value: string;
  label: string;
}

export interface SalaryResponse {
  idsecretaria: number;
  secretaria: string;
  idtipocontratacion: number;
  tipocontratacion: string;
  tot_remunerativo: number;
  tot_familiar: number;
  tot_exento: number;
  retencion_ley: number;
  neto: number;
  hsextras_50: number;
  hsextras_100: number;
  cantidadempleados: number;
}

export interface Info {
  title: string;
  totalEmp: number;
  totalRem: number;
  totalFam: number;
  totalExc: number;
  totalRet: number;
  total: number;
}

export interface SalaryGroup extends Partial<SalaryResponse> {
  info?: Info;
}

export interface Salaries {
  groups: SalaryGroup[][];
  quantityGroups: number;
  titles: string[];
}
