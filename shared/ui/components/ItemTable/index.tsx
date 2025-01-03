import { useEffect, useState } from "react";
import {
  MRT_RowSelectionState,
  MaterialReactTable,
} from "material-react-table";
import { Typography } from "@mui/material";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { GenericItemType, ItemTableProps } from "./types";

/**
 *
 * @implements
 *  * data: items de la tabla
 *  * setSelection: función que recibe el array de keys seleccionadas
 *  * selectionExists: bandera que indica la existencia de seleccón
 */
export const ItemTable = <T extends GenericItemType>({
  columns,
  grouping,
  extraInvisibleColumn = grouping,
  isLoading,
  heigth,
  msgFallback,
  rowKey,
  data,
  setSelection,
  selectionExists,
}: ItemTableProps<T>) => {
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  useEffect(() => {
    const rows = Object.keys(rowSelection);

    const filteredRows = rows.filter(
      (rowKey) => !rowKey.startsWith(grouping.toString())
    );
    setSelection(filteredRows);
  }, [rowSelection]);

  useEffect(() => {
    !selectionExists && setRowSelection({});
  }, [selectionExists]);

  return (
    <MaterialReactTable
      localization={MRT_Localization_ES}
      autoResetAll
      autoResetExpanded
      columns={columns}
      data={data ?? []}
      renderEmptyRowsFallback={() => (
        <Typography m="auto">{msgFallback}</Typography>
      )}
      initialState={{
        columnVisibility: { [grouping]: false, [extraInvisibleColumn]: false },
        grouping: [grouping.toString()],
        density: "compact",
        expanded: true,
      }}
      getRowId={(row) => row[rowKey]!.toString()}
      onRowSelectionChange={setRowSelection}
      state={{ rowSelection, showProgressBars: isLoading }}
      enableRowSelection
      enableGrouping
      enableStickyHeader
      enableStickyFooter
      enableTableFooter
      enableBottomToolbar
      positionExpandColumn="first"
      enablePagination={false}
      enableColumnActions={false}
      enableTopToolbar={false}
      enableRowDragging={false}
      enableColumnDragging={false}
      enableSorting={false}
      layoutMode="grid"
      muiTablePaperProps={{
        sx: {
          paddingX: 2,
        },
      }}
      muiTableContainerProps={{
        sx: {
          maxHeight: heigth,
          minHeight: heigth,
          "--header-mrt_row_expand-size": "0",
          "--col-mrt_row_expand-size": "0",
          "& tr:nth-of-type(even)": {
            backgroundColor: "#f5f5f5",
          },
        },
      }}
      muiToolbarAlertBannerChipProps={{ color: "primary" }}
      muiTableBodyCellProps={{ size: "small" }}
      muiExpandAllButtonProps={{ size: "small" }}
      muiExpandButtonProps={{ size: "small" }}
      muiSelectAllCheckboxProps={{ size: "small" }}
      muiSelectCheckboxProps={{ size: "small" }}
      muiTableHeadCellProps={{ sx: { paddingRight: "1px" } }}
      muiTableHeadProps={{
        sx: {
          "& th:not(:first-of-type)": {
            paddingLeft: "0px",
          },
          "--header-mrt_row_expand-size": "0",
          "--col-mrt_row_expand-size": "0",
          "--header-mrt_row_select-size": "0",
          "--col-mrt_row_select-size": "0",
        },
      }}
      muiTableBodyProps={{
        sx: {
          paddingLeft: "0.5em",
          "& td": {
            paddingX: "1px",
          },
          "--header-mrt_row_expand-size": "0",
          "--col-mrt_row_expand-size": "0",
          "--header-mrt_row_select-size": "0",
          "--col-mrt_row_select-size": "0",
        },
      }}
      muiTableBodyRowProps={({ row }) => ({
        onClick: () => {
          row.getIsGrouped() ? row.toggleExpanded() : row.toggleSelected();
        },

        sx: {
          ...(row.getIsGrouped()
            ? {
                cursor: "pointer",
                "& td:not(:nth-of-type(1)):not(:nth-of-type(3))": {
                  display: "none",
                },
              }
            : {
                cursor: "pointer",
                "& td:first-of-type": {
                  "& span": {
                    display: "none",
                  },
                },
              }),
        },
      })}
    />
  );
};
