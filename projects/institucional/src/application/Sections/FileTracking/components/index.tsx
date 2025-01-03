import { useMemo } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { MaterialReactTable } from "material-react-table";
import { FileTrackingResponse } from "../interfaces";

export const FileTrackingTable = ({
  tracking,
  isLoading,
}: {
  tracking: FileTrackingResponse[];
  isLoading: boolean;
}) => {
  // const title = tracking.at(0)?.tema;

  const columns = useMemo(
    () => [
      {
        header: "Fecha",
        accessorKey: "fechamovimietno",
        size: 100,
      },
      {
        header: "Tipo",
        accessorKey: "tipomovimiento",
        size: 150,
      },
      {
        header: "Sector Emisor",
        accessorKey: "sectoremisor",
        size: 200,
      },
      {
        header: "Sector Destino",
        accessorKey: "sectordestino",
        size: 150,
      },
      {
        header: "Folios",
        accessorKey: "cntfolios",
        size: 50,
      },
    ],
    [tracking]
  );

  return (
    <>
      <Box mx={4} mt={2} mb={2}>
        {isLoading && <LinearProgress />}
        {/* <Typography mx={1} mt={3} mb={2} fontWeight="bold" fontSize={"0.86em"}>
          {!!title && `Tema: ${title}`}
        </Typography> */}
        <MaterialReactTable
          autoResetAll
          state={{ showProgressBars: isLoading }}
          columns={columns}
          data={tracking}
          renderEmptyRowsFallback={() => (
            <Typography
              ml={2}
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
              No hay movimientos cargados.
            </Typography>
          )}
          enableTopToolbar={false}
          enableColumnActions={false}
          enableBottomToolbar={false}
          enablePagination={false}
          muiTableContainerProps={{
            sx: {
              maxHeight: 450,
              minHeight: 450,
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
