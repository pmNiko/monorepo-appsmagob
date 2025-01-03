import { useContext } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { TenderDetailProps } from "../../interfaces";
import { TendersContext } from "../../context";
import { useTenderDetailsAdapter } from "../../adapter";

/**
 * - Componente para mostrar los detalles de la licitación
 */
export const TenderDetail = () => {
  const { details } = useContext(TendersContext);
  const detailsFormat = useTenderDetailsAdapter(details);

  return (
    <Box sx={{ width: "100%" }}>
      <TableContainer component={Box}>
        <Table aria-label="simple table">
          <TableBody>
            {detailsFormat.map((detail: TenderDetailProps, i) => {
              return (
                <TableRow
                  key={detail.title + `${i}`}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontWeight: "bold",
                      border: "0px",
                      width: "7rem",
                      verticalAlign: 0,
                    }}
                  >
                    {detail.title}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ border: "0px", verticalAlign: 0 }}
                  >
                    {detail.description}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
