import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, Button, Typography } from "@mui/material";
import { Environments, capitalizeWords, useAuthStore } from "@shared/infra";

export const CloseSession = () => {
  const userSession = useAuthStore((state) => state.user);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const closeModal = useAuthStore((state) => state.closeModal);

  const closeSession = () => {
    logoutUser();
    window.location.href = Environments.Domain;
  };

  return (
    <>
      <Box
        textAlign="center"
        my={3}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Box color="primary.A200" m="auto">
          <AccountCircleIcon sx={{ fontSize: "2.5em" }} />
        </Box>

        <Box textAlign="center">
          <Typography variant="subtitle2" textAlign="center">
            {userSession?.cuitcuil}
          </Typography>
          <Typography variant="subtitle2" textAlign="center">
            {capitalizeWords(userSession?.denominacion || "")}
          </Typography>
          <Typography variant="subtitle2" textAlign="center">
            {userSession?.e_mail}
          </Typography>
        </Box>
        <Typography variant="subtitle2" fontWeight="bold">
          ¿Desea cerrar sesión?
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-around">
        <Button
          onClick={closeSession}
          size="small"
          variant="text"
          color="error"
        >
          <Typography
            fontSize="1em"
            variant="button"
            textTransform="capitalize"
          >
            Cerrar Sesión
          </Typography>
        </Button>
        <Button
          onClick={closeModal}
          size="small"
          variant="text"
          color="primary"
        >
          <Typography
            fontSize="1em"
            variant="button"
            fontWeight="bold"
            textTransform="capitalize"
          >
            Cancelar
          </Typography>
        </Button>
      </Box>
    </>
  );
};
