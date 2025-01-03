import { Box, styled } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { Fragment } from "react";
import { RowBody } from "./RowBody";
import { RowHeader } from "./RowHeader";
import { RowSummary } from "./RowSummary";
import { Salaries } from "../../interfaces";

const Item = styled(Box)(() => ({
  backgroundColor: "#fff",
}));

export const SalaryTable = ({ groups }: Salaries) => {
  if (!groups) return null;

  return (
    <TableContainer component={Item}>
      <Table aria-label="spanning table">
        {groups.map((group: any, indice: number) => {
          const summary = group.at(group.length - 1).info;

          return (
            <Fragment key={summary.title + indice}>
              <RowHeader title={summary.title} />

              <TableBody>
                {group.map(
                  (row: any, i: number) =>
                    !row.info && <RowBody key={row.idsecretaria + i} {...row} />
                )}

                <RowSummary {...summary} />
              </TableBody>
            </Fragment>
          );
        })}
      </Table>
    </TableContainer>
  );
};
