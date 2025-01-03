import { Box, Stack, Typography } from "@mui/material";

/** Componente para dar aviso al contribuyente que no posee datos para mostrar. */
export const DDJJDoesNotExists = ({ year }: { year: number }) => {
  return (
    <Box display="flex" justifyContent="center" my={4}>
      <Box border={1} width="90%" mt={1} mb={3}>
        <Stack direction="column">
          <Typography
            variant="subtitle2"
            sx={{
              mt: -2,
              ml: 1,
              backgroundColor: "white",
              width: "9em",
              px: 2,
              fontSize: "0.9rem",
              fontWeight: "bold",
            }}
          >
            Información
          </Typography>
          <Box width="90%" m={2}>
            <Typography textAlign="center" fontSize={12}>
              La Declaración Jurada de Comercio esta dirigida a contribuyentes
              que poseen Licencias Comerciales. <br /> No se registra Licencia
              Comercial activa en el año {year - 1} asociada con su CUIT y su
              Clave Fiscal. <br /> De ser incorrecto por favor comuniquese con
              la Dirección de Rentas de la Municipalidad de San Martín de los
              Andes <br /> al número <b> 0800-345-1975</b> <br />
              Si usted posee una Licencia comercial pero el sistema no le
              permite realizar una declaración, <br /> por favor presione{" "}
              <b>CTRL - F5</b>
              &nbsp; o en su celular <b>recargue la página.</b>
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
