import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const macroResponseTrue = {
  message: "Se efectuaron los pagos correctamente.",
  icon: "check",
};

const macroResponseFalse = {
  message: "No se realizo el pago.",
  icon: "error",
};

const initialState = {
  message: "",
  icon: "",
};

export const useCallbackMacroResponse = () => {
  const [searchParams] = useSearchParams();
  const [dataModal, setDataModal] = useState(initialState);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const macroResponse = searchParams.get("ok");

    if (macroResponse && macroResponse === "true") {
      setDataModal(macroResponseTrue);
      setOpenModal(true);
    } else if (macroResponse && macroResponse === "false") {
      setDataModal(macroResponseFalse);
      setOpenModal(true);
    }
  }, [searchParams]);

  return {
    dataModal,
    openModal,
    closeModal: () => setOpenModal(false),
  };
};
