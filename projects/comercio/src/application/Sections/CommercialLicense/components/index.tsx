import { useMemo } from "react";
import { MRT_ColumnDef, MaterialReactTable } from "material-react-table";
import { Box, Typography } from "@mui/material";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import Chip from '@material-ui/core/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import { TramitePecasMovimiento } from '../interfaces';
import { dateFormatter } from "@shared/infra";



export const ProcedureCheckingTable = ({
  title,
  tracking,
  isLoading
}: {
  title: string | null,
  tracking: TramitePecasMovimiento[] | null,
  isLoading: boolean
}) => {

  
  
  const columns = useMemo<MRT_ColumnDef<TramitePecasMovimiento>[]>(
    () => [
      {
        header: "Estado",
        accessorKey: "estado",
        size: 100,
      },
      {
        header: "Descripción",
        accessorKey: "descripcion_tarea",
        size: 150,
      },
      {
        header: "Finalizado",
        accessorKey: "fechahora_fin",
        size: 100,
        Cell: ({cell, row}) => {          
          return row.original.estado === 'terminada'
                  ? <Chip color='primary'  label={dateFormatter(cell.getValue<string>())} />          
                  : <Chip  label='-' style={{paddingLeft: 30, paddingRight: 30}} /> 
        }
      }
 
    ],
    [tracking]
  );

  return (
    <>
      <Box mx={4} mt={2} mb={2}>
        <>
          {!!title && 
            <Box sx={{ display: 'flex', mb: 2 }} >
              <RadioButtonCheckedIcon sx={{color: 'green'}}/>
              <Typography mt={0.5} ml={1} variant='caption' fontWeight='bold' >Tema: {title}</Typography>
            </Box>
          }
          <Box sx={{ width: '100%' }}>
            { isLoading && <LinearProgress /> }
          </Box>
        </>
        <MaterialReactTable
          columns={columns}
          data={tracking ||= []}
          autoResetAll
          renderEmptyRowsFallback={() => (
            <Typography
              textAlign="center"
              mt={"15%"}
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
              No hay trámites cargados.
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
