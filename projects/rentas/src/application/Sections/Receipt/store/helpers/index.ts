import { RecibosListarResp } from "../../interfaces";

export const processValidData = (data: RecibosListarResp[]) => {
  const receiptsTable = data.filter((ele) => !ele.enlegales);
  const hasLegalReceipts = data.some((ele) => ele.enlegales);

  return {
    receiptsTable,
    hasLegalReceipts,
  };
};

export const processSelectionDetails = (
  items: string[],
  receipts: RecibosListarResp[]
) => {
  const receiptsSelected = receipts.filter((receipt) =>
    items.includes(`${receipt.n_recibo}`)
  );

  const totalAmountPay = receiptsSelected
    .reduce((total, obj) => total + obj.importe, 0)
    .toString();

  const quantitySelectedItems = items.length;
  const selectionExists = quantitySelectedItems > 0;

  return {
    receiptsSelected,
    totalAmountPay,
    quantitySelectedItems,
    selectionExists,
  };
};
