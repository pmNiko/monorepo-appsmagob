import { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { Box, Typography } from "@mui/material";
import { ItemTable } from "@shared/ui";
import { PaymentReceipt } from "../interfaces";

interface PaymentReceiptTableProps {
  paymentReceipts: PaymentReceipt[];
  isLoading: boolean;
  setSelection: (items: Array<string>) => void;
  selectionExists?: boolean;
}

export const PaymentReceiptTable = ({
  isLoading,
  paymentReceipts,
  setSelection,
  selectionExists = false,
}: PaymentReceiptTableProps) => {
  const columns = useMemo<MRT_ColumnDef<PaymentReceipt>[]>(
    () => [
      {
        header: "Tipo de cuota",
        accessorKey: "tipocuota",
      },
      {
        header: "Periodo",
        accessorKey: "periodo",
        AggregatedCell: ({ row }) => (
          <Box>
            <Typography
              fontWeight="bold"
              color="primary.main"
              variant="subtitle2"
              lineHeight={3}
              sx={{
                fontSize: {
                  lg: "1em",
                  md: "0.9em",
                  sm: "0.9em",
                  xs: "0.85em",
                },
              }}
            >
              {row.original.tipocuota}
            </Typography>
          </Box>
        ),
        // Cell: ({ cell }) => <> {cell.getValue<string>().substring(0, cell.getValue<string>().length - 3)}</>,
      },
      {
        header: "Importe cobrado",
        accessorKey: "imp_cobrado",
        Cell: ({ cell }) => (
          <>
            {cell.getValue<number>()?.toLocaleString?.("es-AR", {
              style: "currency",
              currency: "ARS",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </>
        ),
      },
      {
        header: "Nº recibo",
        accessorKey: "recibo",
      },
      {
        header: "Fecha de cobro",
        accessorKey: "fecha_cobro",
      },
      {
        header: "Fecha de vencimiento",
        accessorKey: "fecha_vencimiento",
      },
    ],
    [paymentReceipts]
  );

  return (
    <ItemTable
      columns={columns}
      grouping="tipocuota"
      heigth={350}
      isLoading={isLoading}
      msgFallback="Elija período y tributo"
      rowKey="recibo"
      data={paymentReceipts}
      setSelection={setSelection}
      selectionExists={selectionExists}
    />
  );
};
