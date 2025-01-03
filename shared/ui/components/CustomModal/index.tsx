import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  borderRadius: "15px",
  bgcolor: "background.paper",
  outline: "transparent",
  boxShadow: 24,
  p: 3,
};

interface Props {
  isOpen: boolean;
  close: () => void;
  children: JSX.Element;
  [key: string]: any;
}

export const CustomModal = ({ isOpen, close, children, ...rest }: Props) => (
  <Modal
    open={isOpen}
    onClose={close}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={{ ...style, ...rest }}>{children}</Box>
  </Modal>
);
