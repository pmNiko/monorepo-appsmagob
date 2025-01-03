import { useEffect, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { Box, Button, Typography } from "@mui/material";
import { type NotifyState } from "usequerymunisma";
import { CustomModal } from "../CustomModal";

interface InfoModalProps {
  notify: NotifyState;
  children?: JSX.Element;
  onClick?: () => void;
}

const msgError =
  "Servicio momentáneamente no disponible, por favor intente más tarde.";

/**
 * --------- InfoModalResponse ----------
 * - Este Modal está preparado para informar al contribuyente
 *   - Información de respuesta cuando no se ha encontrado resultados.
 *   - Información de respuesta con mensaje de error cuando haya una respuesta inesperada.
 *
 * - El componente espera un objeto de tipo NotifyResponse
 *   - Mediante este hará la apertura del modal
 *   - Además sabrá definir el tipo de icono a usar en la cabecera
 *
 * - Como prop opcional espera un JSX.Element
 * - De no existir este último rendereará el msg de respuesta como default
 *
 */
export const InfoModalResponse = ({
  notify,
  children,
  onClick = () => {},
}: InfoModalProps) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    setOpenModal(false);
    onClick();
  };

  useEffect(() => {
    notify.exists && setOpenModal(true);
  }, [notify.exists]);

  return (
    <CustomModal
      isOpen={openModal} close={() => setOpenModal(false)}
    >
      <Box display="flex" flexDirection="column" alignItems="center" textAlign="center" justifyContent="space-evenly" gap={3} >
        <Box>

        {notify.info ? (
          <InfoIcon color="primary" sx={{ fontSize: 30 }} />
        ) : (
          <ReportProblemIcon color="error" sx={{ fontSize: 30 }} />
        )}
        </Box>

        <Box>
        {notify.error ? (
          <Typography>{notify.message || msgError}</Typography>
        ) : children ? (
          children
        ) : (
          <Typography>{notify.message}</Typography>
        )}
        </Box>

        <Button
          variant="contained"
          sx={{ height: 25, fontSize: 11 }}
          onClick={handleClick}
        >
          Aceptar
        </Button>
      </Box>
    </CustomModal>
  );
};
