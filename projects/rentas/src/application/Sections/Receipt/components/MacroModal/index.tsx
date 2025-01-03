import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Paths } from "#application/Router";

interface Props {
  openModal: boolean;
  closeModal: () => void;
  dataModal?: {
    message: string;
    icon: string;
  };
}

export const MacroModal = ({
  callbackMacroClick,
}: {
  callbackMacroClick: Props;
}) => {
  const navigate = useNavigate();

  const closeModal = () => {
    callbackMacroClick.closeModal();
    navigate(Paths.BUSQUEDA_DE_RECIBOS);
  };

  return (
    <Dialog
      open={callbackMacroClick.openModal}
      onClose={closeModal}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogContent sx={{ display: "flex", flexDirection: "row" }}>
        {callbackMacroClick.dataModal?.icon === "check" ? (
          <CheckCircleOutlineIcon color="success" fontSize="large" />
        ) : (
          <WarningAmberIcon color="error" fontSize="large" />
        )}
        <DialogContentText ml={2} pt={1} sx={{ fontWeight: "bold" }}>
          {callbackMacroClick.dataModal?.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          size="medium"
          onClick={closeModal}
          autoFocus
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
