import { useState } from "react";
import axios from "axios";
import { useMessageToast } from "toast-munisma";
import { Environments, getHttpIP } from "@shared/infra";
import { DataFormMacro } from "@shared/ui";
import { RecibosListarResp } from "../../interfaces";

const uri = Environments.Domain + "/api/macro/redirectMacro";

const buildMacroPayload = (receipt: RecibosListarResp[]) => {
  const recibos = receipt.map((item) => item.n_recibo).join(",");
  const productos = receipt
    .map((ele) => `${ele.t_cuotdescr} ${ele.periodo}`)
    .join(",");

  const montoProductos = receipt.map((ele) => ele.importe).join(",");

  return {
    recibos,
    productos,
    montoProductos,
  };
};

export const useMacroClick = (receipt: RecibosListarResp[]) => {
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
    const payload = buildMacroPayload(receipt);
    setToastState({ status: "loading", message: "" });

    const ipClient = await getHttpIP();

    try {
      const { data } = await axios.post(
        uri,
        { ...payload, ipClient },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setDataForm({ ...data });
    } catch (error) {
      setToastState({
        status: "error",
        message: "Servicio no disponible intente más tarde.",
      });
    }
  };

  return {
    paymentLink,
    dataForm,
  };
};
