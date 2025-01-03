import { useMemo } from 'react'
import { MRT_ColumnDef } from 'material-react-table'
import { Box, Typography } from '@mui/material'
import { SorteoDHResponse } from '../interfaces';
import { ItemTableWithFilter } from './ItemTableWithFilter';

interface BeneficiariesTableProps {
    isLoading?: boolean,
    ganadores: SorteoDHResponse[]
}

export const HousingDemandBeneficiariesTable = ({ isLoading = false, ganadores }: BeneficiariesTableProps) => {

    const columns = useMemo<MRT_ColumnDef<SorteoDHResponse>[]>(
        () => [
          {
            
            header: 'Documento',
            accessorKey: 'dni',
            size: 100,
            enableColumnFilter: false,
            Cell: ({ cell }) => (
              <Box textAlign='center'>
                <Typography variant='subtitle2' fontSize={12} >
                  {cell.getValue<string>()}
                </Typography>
              </Box>
            ),
            AggregatedCell: ({ row }) => (
              <Box>
                  <Typography
                      fontWeight="bold"
                      color="primary.main"
                      variant="h5"
                      lineHeight={3}
                      sx={{
                          fontSize: {
                              lg: '1em',
                              md: '0.9em',
                              sm: '0.9em',
                              xs: '0.85em'
                            }
                          }}
                          >
                      {row.original.barriogrupo}
                  </Typography>
              </Box>
            )
          },
          {
            header: 'Nombre',
            accessorKey: 'nombre',
            size: 160,
            enableColumnFilter: false,
            Cell: ({ cell }) => (
                <Typography variant='h5' fontSize={12} >
                  {cell.getValue<string>()}
                </Typography>
            )
          },
          {
            header: 'Barrio-Grupo',
            accessorKey: 'barr_grupo',
            size: 120,
            enableColumnFilter: false,
            Cell: ({ cell }) => (
              <Box width={120} textAlign='center' >
                <Typography variant='h5' fontSize={12} >
                  {cell.getValue<string>()}
                </Typography>
              </Box>
            )
          },          
          {
            header: 'Manzana',
            accessorKey: 'manzana',
            size: 70,
            enableColumnFilter: false,
            Cell: ({ cell }) => (
              <Box width={60} textAlign='center' >
                <Typography variant='h5' fontSize={12} >
                  {cell.getValue<string>()}
                </Typography>
              </Box>
            )
          },
          {
            header: 'Lote',
            accessorKey: 'lote',
            enableColumnFilter: false,
            size: 50,
            Cell: ({ cell }) => (
              <Box  width={40} textAlign='center' >
                <Typography variant='h5' fontSize={12} >
                  {cell.getValue<string>()}
                </Typography>
              </Box>
            )
          },
          {
            header: 'Orden de Grupo',
            accessorKey: 'ordendegrupo',
            size: 130,
            enableColumnFilter: false,
            Cell: ({ cell }) => (
              <Box width={130} textAlign='center' >
                <Typography variant='h5' fontSize={12} >
                  {cell.getValue<string>()}
                </Typography>
              </Box>
            )
          },
          

          // Columna de agrupamiento no se renderea pero debe estar presente.
          {
            header: 'Barrio-Grupo',
            accessorKey: 'barriogrupo'
          }
        ],
        [ganadores]
    )

    return (
        <ItemTableWithFilter
            columns={columns}
            grouping={'barriogrupo'}
            extraInvisibleColumn={'barriogrupo'}
            heigth={600}
            isLoading={isLoading}
            msgFallback="No hay recibos para mostrar"
            rowKey="dni"
            items={ganadores}
        />
    )
}
