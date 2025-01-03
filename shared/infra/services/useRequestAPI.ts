import { useState } from "react";
import { AxiosResponse } from "axios";

type Request = () => Promise<AxiosResponse<any, any>>;

/** Custom Type que maneja el estado de la petición
 * y el mensaje de respuesta. */
export type StateRequest = {
  status: "initial" | "loading" | "success" | "info" | "error";
  message: string | null;
};

const defaultTextError =
  "Servicio momentáneamente no disponible, por favor intente más tarde.";

export const useRequestAPI = () => {
  const [result, setResult] = useState([] as any);
  const [stateRequest, setStateRequest] = useState<StateRequest>({
    status: "initial",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [dataExists, setDataExists] = useState(false);

  const doRequest = async (lambda: Request) => {
    try {
      setIsLoading(true);

      setStateRequest({ status: "loading", message: "" });

      const {
        data: { info, error, message, ...rest },
      } = await lambda();

      setIsLoading(false);

      if (error) return setStateRequest({ status: "error", message: error });

      if (info) return setStateRequest({ status: "info", message: info });

      setStateRequest({ status: "success", message: message || "" });

      setResult({ ...rest });
      setDataExists(true);
    } catch (err) {
      const error: any = err;
      console.error(error.response?.status);
      setIsLoading(false);
      if (error.response?.status) {
        setStateRequest({
          status: "error",
          message: error.response.data,
        });
      } else {
        setStateRequest({
          status: "error",
          message: defaultTextError,
        });
      }
    }
  };

  return {
    result,
    stateRequest,
    isLoading,
    dataExists,
    doRequest,
    setStateRequest,
  };
};
