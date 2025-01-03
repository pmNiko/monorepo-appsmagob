import { Box, Button, Typography } from "@mui/material";
import { CustomModal } from "../../../components";

interface Props {
  isOpen: boolean;
  close: () => void;
}

export const ModalInfo = ({ isOpen, close }: Props) => {
  return (
    <CustomModal isOpen={isOpen} close={close}>
      <Box display="flex" flexDirection="column" gap={3}>
        <Typography variant="subtitle1" fontWeight="bold" textAlign="center">
          Descargo de responsabilidad
        </Typography>

        <Typography variant="body2">
          La información proporcionada en este sitio web sobre los datos
          generales del contribuyente y su situación fiscal refleja toda la
          deuda acumulada en relación con los tributos asociados.
          <br />
          Esta información es de carácter meramente informativo y no debe ser
          interpretada como una certificación oficial de deuda.
          <br />
          El usuario es responsable de verificar la exactitud y actualidad de
          los datos consultando directamente con las autoridades fiscales
          competentes.
          <br />
          El sitio web no se hace responsable por errores u omisiones en la
          información publicada ni por las decisiones que se tomen con base en
          la misma. Para obtener un estado actualizado y oficial de su deuda
          tributaria, le recomendamos dirigirse a la Municipalidad de San Martín
          de los Andes, Dirección de Rentas.
        </Typography>

        <Button
          variant="contained"
          size="small"
          sx={{ backgroundColor: "primary.A100" }}
          onClick={close}
        >
          Aceptar
        </Button>
      </Box>
    </CustomModal>
  );
};
