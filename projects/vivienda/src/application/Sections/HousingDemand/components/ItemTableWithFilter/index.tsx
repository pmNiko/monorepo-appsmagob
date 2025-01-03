import { Typography } from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
import { GenericItemType, ItemTableWithFilterProps } from './types';
//Import Material React Table Translations
import { MRT_Localization_ES } from 'material-react-table/locales/es';

export const ItemTableWithFilter = <T extends GenericItemType>({
    columns,
    items,
    grouping,
    extraInvisibleColumn = grouping,
    isLoading,
    heigth,
    msgFallback,
    rowKey,
}: ItemTableWithFilterProps<T>) => {

    return (
        <MaterialReactTable
            localization={MRT_Localization_ES}
            autoResetAll
            autoResetExpanded
            columns={columns}
            data={items ?? []}
            renderEmptyRowsFallback={() => <Typography m="auto">{msgFallback}</Typography>}
            enableGlobalFilterModes
            positionGlobalFilter="left"
            muiSearchTextFieldProps={{
              placeholder: 'Buscar',
              sx: { minWidth: '300px' },
              variant: 'outlined',
            }}
            initialState={{
                columnVisibility: { [grouping]: false, [extraInvisibleColumn]: false },
                grouping: [grouping.toString()],
                density: 'compact',
                expanded: true,
                showGlobalFilter: true,
            }}
            getRowId={row => row[rowKey]!.toString()}
            state={{showProgressBars: isLoading }}
            enableRowSelection //!! Este debe estar habilitdo para que aparezca el titulo de agrupamiento en la tabla
            enableGrouping
            enableStickyHeader
            enableStickyFooter
            enableTableFooter
            enableBottomToolbar
            enableSorting
            positionExpandColumn="first"
            enableToolbarInternalActions={false}            
            enablePagination={false}
            enableColumnActions={false}
            enableRowDragging={false}
            enableColumnDragging={false}
            layoutMode="grid"
            muiTablePaperProps={{
                sx: {
                    paddingX: 0
                }
            }}
            muiTableContainerProps={{
                sx: {
                    maxHeight: heigth,
                    minHeight: heigth,
                    '--header-mrt_row_expand-size': '0',
                    '--col-mrt_row_expand-size': '0',
                    '& tr:nth-of-type(even)': {
                        backgroundColor: '#f5f5f5'
                    }
                }
            }}
            muiToolbarAlertBannerChipProps={{ color: 'primary' }}
            muiTableBodyCellProps={{ sx: {marginLeft: '-10px',}}}
            muiExpandAllButtonProps={{ sx:{ marginLeft: '1px', }}}
            muiToolbarAlertBannerProps={{
                sx: {
                  height: 0,
                  visibility: 'hidden'
                }
            }}
            muiTopToolbarProps={{
              sx: {
                margin: '0.5em',
              }
            }}
            // muiExpandAllButtonProps={{
            //   sx: {
            //       visibility: 'hidden'
            //   }
            // }}
            muiExpandButtonProps={{ size: 'small'}}
            muiSelectAllCheckboxProps={{
              sx: {                  
                  visibility: 'hidden',
              }
            }}
            muiSelectCheckboxProps={{
              sx: {
                  visibility: 'hidden'
              }
            }}
            muiTableHeadCellProps={{ sx: { marginLeft: '-10px', } }}
            muiTableHeadProps={{
                sx: {
                    '& th:not(:first-of-type)': {
                        paddingLeft: '0px',
                    },
                    '--header-mrt_row_expand-size': '0',
                    '--col-mrt_row_expand-size': '0',
                    '--header-mrt_row_select-size': '0',
                    '--col-mrt_row_select-size': '0'
                }
            }}
            muiTableBodyProps={{
                sx: {
                    paddingLeft: '0.5em',
                    '& td': {
                        paddingX: '0px'
                    },
                    '--header-mrt_row_expand-size': '0',
                    '--col-mrt_row_expand-size': '0',
                    '--header-mrt_row_select-size': '0',
                    '--col-mrt_row_select-size': '0'
                }
            }}
            muiTableBodyRowProps={({ row }) => ({
                onClick: () => {
                    row.getIsGrouped() ? row.toggleExpanded() : row.toggleSelected()
                },

                sx: {
                    ...(row.getIsGrouped()
                        ? {                              
                              cursor: 'pointer',
                              '& td:not(:nth-of-type(1)):not(:nth-of-type(3))': {
                                  display: 'none',
                              }
                          }
                        : {
                              cursor: 'pointer',
                              '& td:first-of-type': {
                                  '& span': {
                                      display: 'none'
                                  }
                              }
                          })
                }
            })}
            muiTableHeadCellFilterTextFieldProps={{
              sx: {
                width: '90%',
                marginTop: 1,
                marginBottom: 2,
                paddingRight: 2
              }
            }}
        />
    )
}
