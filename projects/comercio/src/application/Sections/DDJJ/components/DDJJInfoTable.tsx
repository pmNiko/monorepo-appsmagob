import {
  Box,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAuthStore, useRedirectPreviousPage } from "@shared/infra";

/** Tabla de información del contribuyente  */
export const DDJJInfoTable = () => {
  const userSession = useAuthStore((state) => state.user);
  const { goBack } = useRedirectPreviousPage();

  return (
    <Box display="flex" justifyContent="center">
      <Box width={"90%"} border={1}>
        <Typography
          variant="subtitle2"
          sx={{
            mt: -2,
            ml: 1,
            backgroundColor: "white",
            width: "14em",
            fontWeight: "bold",
            px: 2,
          }}
        >
          Datos del contribuyente
        </Typography>
        <TableContainer>
          <Table
            sx={{ minWidth: 800, pr: 2 }}
            stickyHeader
            aria-labelledby="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "15em", fontWeight: "bold" }}>
                  {" "}
                  CUIT/CUIL
                </TableCell>
                <TableCell style={{ width: "15em", fontWeight: "bold" }}>
                  {" "}
                  Denominación
                </TableCell>
                <TableCell style={{ width: "10em", fontWeight: "bold" }}>
                  Tipo de persona
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ width: "15em" }}>
                  {userSession?.cuitcuil}
                </TableCell>
                <TableCell style={{ width: "15em" }}>
                  {userSession?.denominacion}
                </TableCell>
                <TableCell style={{ width: "10em" }}>
                  {userSession?.tipopersona}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table
            sx={{ minWidth: 800, pr: 2 }}
            stickyHeader
            aria-labelledby="sticky table"
          >
            <TableHead>
              <TableRow>
                <TableCell style={{ width: "15em", fontWeight: "bold" }}>
                  Fecha de nacimiento
                </TableCell>
                <TableCell style={{ width: "16.5em", fontWeight: "bold" }}>
                  E-Mail
                </TableCell>
                <TableCell style={{ width: "11em", fontWeight: "bold" }}>
                  Teléfono
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={{ width: "16.5em" }}>
                  {userSession?.fechanacimiento ?? "No resgistrado"}
                </TableCell>
                <TableCell style={{ width: "15em" }}>
                  {userSession?.e_mail ?? "No resgistrado"}
                </TableCell>
                <TableCell style={{ width: "11em" }}>
                  {userSession?.telefono ?? "No resgistrado"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Stack
          border={0}
          mt={1}
          display="flex"
          justifyContent="end"
          alignItems="end"
        >
          <Button
            variant="contained"
            size="small"
            sx={{
              mb: -1,
              mr: -2,
              boxShadow: 10,
            }}
            onClick={goBack}
          >
            volver
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
