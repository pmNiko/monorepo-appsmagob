import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { MunismaCard } from "@shared/ui";

/** Informa al contribuyente que el recibo de haberes ha sido enviado al email solicitado.  */
const EmailSentSuccessfullyPage = () => {
  const navigate = useNavigate();

  return (
    <MunismaCard
      title="Recibo de haberes electrónico"
      showImage
      mt={8}
      mb={5}
      minHeight="73vh"
    >
      <Box px={6} mb={3}>
        <Typography variant="body1" textAlign="center">
          Gracias por utilizar el servicio eléctronico para su recibo de
          haberes, por favor revise su casilla de correo para acceder al link de
          descarga online. Si no lo encuentra en su bandeja de entrada, por
          favor revise <b>"No deseado", "Spam" o "Promociones".</b>
        </Typography>
      </Box>

      <Box textAlign="center" mb={17}>
        <Button variant="contained" size="small" onClick={() => navigate("/")}>
          Ir al inicio
        </Button>
      </Box>
    </MunismaCard>
  );
};

export default EmailSentSuccessfullyPage;
