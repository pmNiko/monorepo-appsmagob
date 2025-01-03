import { InfoModalResponse, MunismaCard } from "@shared/ui";
import { FormControl, MenuItem, Select } from "@mui/material";
import {
  ReceiptsBodyTable,
  ReceiptsFooterTable,
  ReceiptsHeaderTable,
} from "../components";
import { useReceiptFinder } from "../hooks";
import { T_Cuot, Taxes } from "../interfaces";

const ReceiptsTablePage = () => {
  const finder = useReceiptFinder();

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

      <InfoModalResponse notify={finder.notify} />
      {/* <>
          <Typography variant="subtitle2">
            No se registran recibos adeudados con los parámetros ingresados{" "}
          </Typography>
        </>
      </InfoModalResponse> */}
    </MunismaCard>
  );
};

export default ReceiptsTablePage;
