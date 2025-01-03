import { useMemo } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { MRT_ColumnDef, MaterialReactTable } from "material-react-table";
import { RegistroInstitucionesDHResponse } from "../interfaces";

export const HousingDemandInstitutionsTable = ({
  inscriptos,
  isLoading,
}: {
  inscriptos: RegistroInstitucionesDHResponse[];
  isLoading: boolean;
}) => {
  const columns = useMemo<MRT_ColumnDef<RegistroInstitucionesDHResponse>[]>(
    () => [
      {
        header: "Grupo",
        accessorKey: "grupo",
        size: 100,
      },
      {
        header: "Nº Orden",
        accessorKey: "norden",
        size: 100,
      },
      {
        header: "Documento",
        accessorKey: "dni",
        size: 150,
      },
      {
        header: "Apellido",
        accessorKey: "apellido",
        size: 150,
      },
      {
        header: "Nombre",
        accessorKey: "nombre",
        size: 200,
      },
    ],
    [inscriptos]
  );

  return (
    <>
      <Box mx={2} my={2}>
        {isLoading && <LinearProgress />}
        <MaterialReactTable
          columns={columns}
          data={inscriptos}
          autoResetAll
          renderEmptyRowsFallback={() => (
            <Typography
              textAlign="center"
              mt={"25%"}
              sx={{
                fontSize: {
                  lg: "1em",
                  md: "0.9em",
                  sm: "0.9em",
                  xs: "0.8em",
                },
                fontStyle: "italic",
              }}
            >
              No hay registros cargados
            </Typography>
          )}
          enableTopToolbar={false}
          enableColumnActions={false}
          enableBottomToolbar={false}
          enablePagination={false}
          muiTableContainerProps={{
            sx: {
              maxHeight: 350,
              minHeight: 350,
              "--header-mrt_row_expand-size": "0",
              "--col-mrt_row_expand-size": "0",
              "& tr:nth-of-type(even)": {
                backgroundColor: "#f5f5f5",
              },
            },
          }}
        />
      </Box>
    </>
  );
};
