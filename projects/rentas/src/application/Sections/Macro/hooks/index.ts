import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useMessageToast } from "toast-munisma";
import { Environments, useRequestAPI, getHttpIP } from "@shared/infra";

import { Paths } from "#application/Router";

const uri = Environments.Domain + "/api/macro/payMacroForEmail";

export const useMacroClick = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    doRequest,
    isLoading,
    dataExists,
    result,
    stateRequest,
  } = useRequestAPI();
  useMessageToast({
    stateRequest,
    loadingShow: true,
    loadingMessage: "Generando pago...",
  });

  const handlePay = async (md5: string) => {
    const ipClient = await getHttpIP();

    doRequest(
      async () =>
        await axios.post(
          uri,
          { md5, ipClient },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
    );
  };

  useEffect(() => {
    const id = searchParams.get("id");
    const token = searchParams.get("token");

    const md5 = id || token;

    md5 ? handlePay(md5) : navigate(Paths.BUSQUEDA_DE_RECIBOS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { dataExists, isLoading, result, stateRequest };
};
