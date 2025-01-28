import { ItemTable } from "@shared/ui";
import { Box, Typography } from "@mui/material";
import { MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { RecibosListarResp, T_Cuot, Taxes } from "../../../interfaces";

interface ReceiptsTableProps {
  isLoading?: boolean;
  receiptsTable: RecibosListarResp[];
  tax?: string;
  setSelection: (items: Array<string>) => void;
  selectionExists: boolean;
  t_cuot?: T_Cuot;
}

type ColGroupping = "t_cuotdescr" | "colgroup";

// Define la prop de agrupamiento
const grouppingTax = (tax: string) => {
  const groupping =
    tax === Taxes.ClaveFiscal ||
    tax === Taxes.Email ||
    tax === Taxes.OficinaVirtual
      ? "colgroup"
      : "t_cuotdescr";

  return groupping;
};

const periodSelected = (t_cuot?: T_Cuot) => {
  switch (t_cuot) {
    case "X":
      return "Semestrales";
    case "Y":
      return "Anuales";
    default:
      return "Mensuales";
  }
};

/** ReceiptsBodyTable
 * Tabla de recibos a pagar
 * Solicita:
 *  - isLoading: estado de carga
 *  - receipts: listado de recibos a pagar
 *  - grouping: propiedad de agrupación o corte de control
 *  - setSelectedItems: acción a ejecutar cuando se selelcciona un item
 *  - noItemsSelected: será true cuando no se hayan seleccionado items
 */
export const ReceiptsBodyTable = ({
  isLoading = false,
  receiptsTable,
  tax,
  setSelection,
  selectionExists,
  t_cuot,
}: ReceiptsTableProps) => {
  const [colGrouppingTax, setcolGrouppingTax] = useState<ColGroupping>(
    "colgroup"
  );
  const [extraInvisibleColumn, setExtraInvisibleColumn] = useState<
    ColGroupping
  >("t_cuotdescr");

  useEffect(() => {
    if (tax) {
      setcolGrouppingTax(grouppingTax(tax));
      setExtraInvisibleColumn(
        colGrouppingTax === "colgroup" ? "t_cuotdescr" : "colgroup"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useMemo<MRT_ColumnDef<RecibosListarResp>[]>(
    () => [
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
              {colGrouppingTax === "colgroup"
                ? row.original.colgroup
                : row.original.t_cuotdescr}
            </Typography>
          </Box>
        ),
      },
      {
        header: "Importe",
        accessorKey: "importe",
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
        accessorKey: "n_recibo",
      },
      {
        header: "Fecha de vencimiento",
        accessorKey: "fvalidez",
      },

      // Columnas de agrupamiento no se renderean pero deben estar presentes.
      {
        header: "Colgroup",
        accessorKey: "colgroup",
      },
      {
        header: "t_cuotdescr",
        accessorKey: "t_cuotdescr",
      },
    ],
    [receiptsTable]
  );

  return (
    <ItemTable
      columns={columns}
      grouping={colGrouppingTax}
      extraInvisibleColumn={extraInvisibleColumn}
      heigth={350}
      isLoading={isLoading}
      msgFallback={
        <Typography
          my={10}
          pl={2}
          variant="subtitle1"
          fontSize={{ xs: 16, sm: 18, md: 22 }}
          textAlign={{ xs: "left", sm: "left", md: "center" }}
        >
          No hay recibos <b>{periodSelected(t_cuot)}</b> para pagar
        </Typography>
      }
      rowKey="n_recibo"
      data={receiptsTable}
      setSelection={setSelection}
      selectionExists={selectionExists}
    />
  );
};
