import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Typography } from "@mui/material";
import { Environments, useAuthStore } from "@shared/infra";
import { CustomModal } from "../../../components";
import { CloseSession } from "./CloseSession";
import { OpenSession } from "./OpenSession";

export const ModalSession = () => {
  const isLogged = useAuthStore((state) => state.isLogged);
  const closeModal = useAuthStore((state) => state.closeModal);
  const modalIsOpen = useAuthStore((state) => state.modalIsOpen);
  const isBlockModal = useAuthStore((state) => state.isBlockModal);

  const goBack = async () => {
    await localStorage.clear();
    window.location.href = Environments.Domain;
  };

  return (
    <CustomModal
      isOpen={modalIsOpen}
      close={() => !isBlockModal && closeModal()}
    >
      <>
        <Box
          display={isBlockModal ? "none" : "block"}
          textAlign="center"
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
          }}
        >
          <Button color="primary" onClick={closeModal}>
            <CloseIcon />
          </Button>
        </Box>

        {isLogged ? <CloseSession /> : <OpenSession />}

        <Box
          display={!isBlockModal || isLogged ? "none" : "block"}
          textAlign="center"
        >
          <Button color="primary" onClick={goBack}>
            <Typography
              fontSize="1em"
              variant="button"
              textTransform="lowercase"
            >
              Ir al inicio
            </Typography>
          </Button>
        </Box>
      </>
    </CustomModal>
  );
};
