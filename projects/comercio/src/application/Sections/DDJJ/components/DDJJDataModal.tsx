import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { getLabel } from "@shared/infra";
import { useDDJJStore } from "../store";

export const DDJJDataModal = () => {
  const employeeOptions = useDDJJStore((state) => state.selectorEmployees);
  const surfaceOptions = useDDJJStore((state) => state.selectorSurface);
  const toDeclare = useDDJJStore((state) => state.toDeclare);
  const year = useDDJJStore((state) => state.year);

  const quantityEmployees = getLabel(
    employeeOptions,
    toDeclare.idcantempleados
  );
  const surface = getLabel(surfaceOptions, toDeclare.idsuperficie);

  return (
    <Stack spacing={4} textAlign="center">
      <Typography
        variant="subtitle2"
        sx={{ backgroundColor: "white", color: "black", fontWeight: "bold" }}
      >
        Confirma los datos declarados <br /> {year}
      </Typography>

      <Stack direction="column" spacing={2}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  CUIT/CUIL
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Comercio
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" align="center">
                  {toDeclare.cuitcuil}
                </TableCell>
                <TableCell align="center">{toDeclare.nomco}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

      <Stack direction="column" spacing={2}>
        <TableContainer component={Paper} sx={{ mr: 0 }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Facturación
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Empleados
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "bold" }}>
                  Superficie
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  ${toDeclare.maxfactproyect}
                </TableCell>
                <TableCell align="center">{quantityEmployees}</TableCell>
                <TableCell align="center">{surface}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>

      {toDeclare.esproveedorinternet && (
        <Stack direction="column" spacing={2}>
          <TableContainer component={Paper} sx={{ mr: 0 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontWeight: "bold" }}>
                    Cantidad abonados internet
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{toDeclare.cntabonados}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      )}
    </Stack>
  );
};
