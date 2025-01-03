import { useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { MRT_ColumnDef, MaterialReactTable } from "material-react-table";
import { SuplentesSorteoDHResponse } from '../interfaces';

export const HousingDemandSubstitutesTable = ({
  isLoading,
  substituttes,
}: {
  isLoading: boolean,
  substituttes: SuplentesSorteoDHResponse[];
}) => {

  const columns = useMemo<MRT_ColumnDef<SuplentesSorteoDHResponse>[]>(
    () => [
      {
        header: "Prioridad",
        accessorKey: "prioridad",
        size: 50,
        Cell: ({ cell }) => (
          <Box width={50} textAlign='center' >
            <Typography variant='subtitle2' fontSize={12} >
              {cell.getValue<string>()}
            </Typography>
          </Box>
        ),
      },
      {
        header: "Nº de Orden",
        accessorKey: "n_orden",
        size: 80,
        Cell: ({ cell }) => (
          <Box width={80} textAlign='center' >
            <Typography variant='h5' fontSize={12} >
              {cell.getValue<string>()}
            </Typography>
          </Box>
      )
      },
      {
        header: "Nombre",
        accessorKey: "nombre",
        size: 120,
        Cell: ({ cell }) => (
          <Typography variant='h5' fontSize={12} >
            {cell.getValue<string>()}
          </Typography>
      )
      },
      {
        header: "Documento",
        accessorKey: "dni",
        size: 80,
        Cell: ({ cell }) => (
          <Box width={70} textAlign='center' >
            <Typography variant='h5' fontSize={12} >
              {cell.getValue<string>()}
            </Typography>
          </Box>
      )
      },
    ],
    [substituttes]
  );

  return (
    <>
      <Box mx={2} my={2} >
        <MaterialReactTable
          autoResetAll
          columns={columns}
          data={substituttes}
          state={{showProgressBars: isLoading }}
          enableStickyHeader
          enableToolbarInternalActions={false}  
          enableGlobalFilterModes
          positionGlobalFilter="left"
          muiSearchTextFieldProps={{
            placeholder: 'Buscar',
            sx: { minWidth: '300px' },
            variant: 'outlined',
          }}
          initialState={{
              showGlobalFilter: true,
          }}
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
          enableColumnActions={false}
          enableBottomToolbar={false}
          enablePagination={false}
          muiTableContainerProps={{
            sx: {
              maxHeight: 600,
              minHeight: 600,
              "--header-mrt_row_expand-size": "0",
              "--col-mrt_row_expand-size": "0",
              "& tr:nth-of-type(even)": {
                backgroundColor: "#f5f5f5",
              },
            },
          }}
          muiToolbarAlertBannerProps={{
              sx: {
                height: 0,
                visibility: 'hidden'
              }
          }}
          muiTopToolbarProps={{
            sx: {
              margin: '0.5em',
              marginBottom: '1em'
            }
          }}
        />
      </Box>
    </>
  );
};
