import { MunismaCard } from "@shared/ui";
import { FormControl, MenuItem, Select } from "@mui/material";
import {
  ReceiptsBodyTable,
  ReceiptsFooterTable,
  ReceiptsHeaderTable,
} from "../components";
import { useReceiptFinder } from "../hooks";
import { T_Cuot, Taxes } from "../interfaces";
import { useEffect, useState } from "react";

const ReceiptsTablePage = () => {
  const [openSelect, setOpenSelect] = useState(false);
  const finder = useReceiptFinder();

  useEffect(() => {
    if (finder.selectorIsVisibility() === "visible") {
      setTimeout(() => {
        setOpenSelect(true);
      }, 800);
    }
  }, []);

  return (
    <MunismaCard sm={11} md={10} lg={6} mb={5}>
      <ReceiptsHeaderTable
        tax={finder.params.tribu as Taxes}
        target={finder.target.toString()}
        receipt={finder.receiptsTable.at(0)!}
        hasLegalReceipts={finder.hasLegalReceipts}
      >
        <span
          style={{
            visibility: finder.selectorIsVisibility() ? "visible" : "hidden",
          }}
        >
          <FormControl fullWidth>
            <Select
              value={finder.params.t_cuot || "1"}
              onChange={({ target }) => finder.setTCout(target.value as T_Cuot)}
              disabled={finder.isLoading}
              open={openSelect}
              onClick={() => setOpenSelect(!openSelect)}
            >
              <MenuItem value={"1"}>Mensual</MenuItem>
              <MenuItem value={"X"}>Semestral</MenuItem>
              <MenuItem value={"Y"}>Anual</MenuItem>
            </Select>
          </FormControl>
        </span>
      </ReceiptsHeaderTable>

      <ReceiptsBodyTable
        isLoading={finder.isLoading}
        tax={finder.params?.tribu}
        setSelection={finder.setSelection}
        receiptsTable={finder.receiptsTable}
        selectionExists={finder.selectionExists}
        t_cuot={finder.params.t_cuot}
      />

      <ReceiptsFooterTable
        goBack={finder.goBack}
        amountPay={finder.totalAmountPay}
        receiptsSelected={finder.receiptsSelected}
        quantitySelected={finder.quantitySelectedItems}
        selectionExists={finder.selectionExists}
        resetSelection={finder.resetSelection}
        selectedItems={finder.selectedItems}
      />

      {/* <InfoModalResponse notify={finder.notify} /> */}
    </MunismaCard>
  );
};

export default ReceiptsTablePage;
