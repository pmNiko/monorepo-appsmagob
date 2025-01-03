import { PaymentReceipYearsByTax, PaymentReceiptTaxesByNCont } from '../interfaces';

export const adaterPaymentReceipts = (paymentReceipts: PaymentReceiptTaxesByNCont[]) => {
  return paymentReceipts.map(opt => ({ label: opt.tributo, value: opt.tribu__n_serie }))
}

export const adapterYearsPaymentReceipt = (taxes: PaymentReceipYearsByTax[]) => {
  return taxes.map(item => ({ label: `${item.ano}`, value: item.ano }))
}