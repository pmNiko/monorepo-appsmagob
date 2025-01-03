export type TaxValue = '01' | '02' | '03' | 'AA' | '13' | 'BB'

export interface PaymentReceiptTaxesByNCont {
    tribu: string
    n_serie: number
    tribu__n_serie: `${TaxValue}__${string}`
    tributo: string
}

export interface PaymentReceiptStateLocation {
    cuitcuil: string
    n_cont: number
    taxes: OptionListSelector[]
}

export interface PaymentReceipt {
    n_cont: number
    tribu: string
    n_serie: number
    ano: number
    tributo: string
    tipocuota: string
    recibo: number
    periodo: string
    fecha_cobro: string
    imp_cobrado: number
    fecha_vencimiento: string
}

export interface PaymentReceipYearsByTax {
  ano: number
}

export type OptionListSelector = {
    label: string
    value: string | number
}


export interface AdapterPaymentReceipts {
  label: string;
  value: string;
}
