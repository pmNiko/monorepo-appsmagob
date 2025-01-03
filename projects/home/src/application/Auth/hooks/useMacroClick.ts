import { useEffect, useState } from "react";
import axios from "axios";
import { DataFormMacro } from "@shared/ui";
import { ParamsForMacroClick } from "../interface";
import { Environments, getHttpIP } from "@shared/infra";
import { useMessageToast } from "toast-munisma";

interface ParamsProps {
  params: ParamsForMacroClick;
}

const uri = Environments.Domain + "/api/macro/redirectMacro";

const messageError = "Error al generar el link de pago.";

/**
 * Servicio para solitar el link de pago al webservices
 */
export const useMacroClick = ({ params }: ParamsProps) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataForm, setDataForm] = useState<DataFormMacro>({
    ok: "false",
    Hash: "",
    Comercio: "",
    TransaccionComercioId: "",
    CallbackSuccess: "",
    CallbackCancel: "",
    SucursalComercio: "",
    Monto: "",
  });

  const { setToastState } = useMessageToast({
    loadingShow: true,
    loadingMessage: "Generando pago...",
    infoShow: true,
  });

  const paymentLink = async () => {
    setToastState({ status: "loading", message: "" });

    const ipClient = await getHttpIP();

    try {
      const { data } = await axios.post(
        uri,
        { ...params, ipClient },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // throw new Error("Error generado ");

      setDataForm({ ...data });
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  return {
    paymentLink,
    dataForm,
    isLoading,
    isError,
    messageError,
  };
};
