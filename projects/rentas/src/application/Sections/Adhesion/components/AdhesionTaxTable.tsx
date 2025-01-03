import { useMemo } from "react";
import { MRT_ColumnDef } from "material-react-table";
import { Box, Typography } from "@mui/material";
import { ItemTable } from "@shared/ui";
import { TributosResponse } from "../interfaces";

interface AdhesionTaxTableProps {
  isLoading?: boolean;
  taxesTable: TributosResponse[];
  setSelection: (items: string[]) => void;
  selectionExists: boolean;
}

export const AdhesionTaxTable = ({
  isLoading = false,
  taxesTable,
  setSelection,
  selectionExists,
}: AdhesionTaxTableProps) => {
  const columns = useMemo<MRT_ColumnDef<TributosResponse>[]>(
    () => [
      {
        header: "Tributo",
        accessorKey: "tributodescr",
        Cell: ({ row }) => (
          <Box
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "95%",
            }}
          >
            <Typography
              fontWeight="grey"
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
              {row.original.tributodescr}
            </Typography>
          </Box>
        ),
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
              {row.original.tribuabrev}
            </Typography>
          </Box>
        ),
      },
      {
        header: "Email",
        accessorKey: "email",
        Cell: ({ row }) => (
          <Box>
            <Typography
              color="GrayText"
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
              {row.original.email}
            </Typography>
          </Box>
        ),
      },

      // Columnas de agrupamiento no se renderean pero deben estar presentes.
      {
        header: "Tipo",
        accessorKey: "tribuabrev",
      },
    ],
    [taxesTable]
  );

  return (
    <ItemTable
      columns={columns}
      grouping={"tribuabrev"}
      heigth={350}
      isLoading={isLoading}
      msgFallback="No hay tributos para mostrar"
      rowKey="n_serie"
      data={taxesTable}
      setSelection={setSelection}
      selectionExists={selectionExists}
    />
  );
};
