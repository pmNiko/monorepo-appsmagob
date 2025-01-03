import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { Box, Button, Typography } from "@mui/material";
import { useRedirectPreviousPage } from "@shared/infra";
import { MacroPaymentLinkForm, MunismaCard } from "@shared/ui";
import { Paths } from "#application/Router";
import { useMacroClick } from "../hooks";

/**
 * - Página para el link de pago por email.
 * - El custom hook recibe el query sring
 *   - Realiza la validación
 *   - Redirige al boton de pago de Macro Click
 * @path /pago-macro-por-email - queryString token | id
 */
const MacroPayByLink = () => {
  const { goBack } = useRedirectPreviousPage(Paths.BUSQUEDA_DE_RECIBOS);
  const handleMacroClick = useMacroClick();

  return (
    <MunismaCard
      title="Link de pago"
      showImage
      minHeight={"60vh"}
      lg={3}
      mt={6}
    >
      <Box display="flex" alignItems="center" flexDirection="column" mb={5}>
        {handleMacroClick.stateRequest.status === "error" ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            mt={4}
          >
            <Box>
              <WarningAmberIcon color="error" fontSize="large" />
            </Box>
            <Typography px={8}>
              {handleMacroClick.stateRequest.message}
            </Typography>
            <Box mt={10}>
              <Button variant="contained" size="small" onClick={goBack}>
                Inicio
              </Button>
            </Box>
          </Box>
        ) : (
          <Box display="flex" gap={4} flexDirection="column">
            <Box textAlign="center">
              <CheckCircleOutlineIcon color="success" fontSize="large" />
            </Box>
            <Typography>Recuperando datos para generar su pago</Typography>
          </Box>
        )}
      </Box>
      <Box>
        {handleMacroClick.dataExists && (
          <MacroPaymentLinkForm
            dataFormMacro={handleMacroClick.result}
            reset={() => {}}
          />
        )}
      </Box>
    </MunismaCard>
  );
};

export default MacroPayByLink;
