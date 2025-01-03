import { Paths } from "#application/Router";
import { useRedirectPreviousPage, useAuthStore } from "@shared/infra";
import { useState } from "react";
import { useQueryState } from "usequerymunisma";
import { TributosResponse } from "../interfaces";
import { Tributos } from "../shared";
import { useAdhesionTaxStore } from "../store";
import { FN_SGD } from "#application/FN_SGD";

interface AdhesionRequestResponse {
  datos: "true" | "false";
}

interface AdhesionRequestParams {
  email: string;
  tributos: string;
}

/**
 * ------- useHandlerAdhesionReceipts  --------
 * - Custom hook para la busqueda enlazada de tributos.
 *   * manejo del pedido de adhesión de tributos
 *   * Parametros de busqueda: **tributos(csv)**
 *
 * -------------------------------------------------------
 *
 * - returns
 *    * **cuitcuil:**        cuitcuiil del contribuyente
 *    * **onSubmit:**        envio de pedido de adhesión
 *    * **goBack:**          fn de redirección al buscador
 *    * **toggleModal:**     fn cambio de estado del modal
 *    * **closeModal:**      fn cierre del modal
 *    * **notifyMessage:**   mensaje del notificador
 *    * **success:**         responde si la petición fue exitosa
 *    * **isLoading:**       estado de la petición
 *    * **disabledButton:**  responde si se debe deshabilitar el boton
 */
export const useHandlerAdhesionReceipts = () => {
  const { goBack } = useRedirectPreviousPage(
    Paths.BUSQUEDA_DE_RECIBOS_PARA_ADHERIR
  );
  const isLogged = useAuthStore((state) => state.isLogged);
  const userSession = useAuthStore((state) => state.user);
  const [toggleModal, setToggleModal] = useState(false);
  const cuitcuil = useAdhesionTaxStore((state) => state.cuitcuil);
  const setCuitcuil = useAdhesionTaxStore((state) => state.setCuitcuil);
  const searchParams = useAdhesionTaxStore((state) => state.searchParams);
  const setTaxes = useAdhesionTaxStore((state) => state.setTaxesTable);
  const taxesTable = useAdhesionTaxStore((state) => state.taxesTable);

  const selectionExists = useAdhesionTaxStore((state) => state.selectionExists);
  const resetStore = useAdhesionTaxStore((state) => state.resetStore);
  const selectedItems = useAdhesionTaxStore((state) => state.selectedItems);
  const setSelectedItems = useAdhesionTaxStore((state) => state.setSelection);

  const [emails, setEmails] = useState<string[] | null>();

  const finder = useQueryState<TributosResponse[]>(FN_SGD.Adhesion_Listar, {
    dependsOn: isLogged || searchParams,
    searchParams: {
      tribu: isLogged ? Tributos.OficinaVirtual.value : searchParams.tribu,
      n_serie: isLogged ? userSession?.n_cont : searchParams.n_cont,
    },
    runAfter: {
      execute: () => {
        if (finder.containsData) {
          const emailsDraft = [
            ...new Set(finder.data?.map((item) => item.email)),
          ].filter((email) => email !== "");

          setEmails(emailsDraft);
          isLogged && setCuitcuil(userSession?.cuitcuil!);
          setTaxes(finder.data!);
        }
      },
    },
  });

  const handleAdhesionRequest = useQueryState<
    AdhesionRequestResponse,
    AdhesionRequestParams
  >(FN_SGD.Adhesion_Solicitud, {
    singleObject: true,
    runAfter: {
      execute: () => {
        setToggleModal(true);
      },
    },
  });

  //?? Arma el formato csv de tributos para el pedido de adhesión
  const onSubmit = ({ email }: { email: string; repeatEmail: string }) => {
    const tributos = taxesTable
      .filter((item) => selectedItems.includes(item.n_serie.toString()))
      .map((item) => `${item.tribu}-${item.n_serie}`)
      .join(",");

    handleAdhesionRequest.search({ email, tributos });
  };

  const closeModal = () => {
    setToggleModal(false);
    resetStore();
    goBack();
  };

  return {
    cuitcuil,
    onSubmit,
    toggleModal,
    closeModal,
    notifyMessage: handleAdhesionRequest.notify.message,
    isLoading: handleAdhesionRequest.isLoading,
    success: handleAdhesionRequest.containsData,
    disabledButton: !selectionExists || handleAdhesionRequest.isFetching,
    taxesTable,
    emails,
    searching: finder.isFetching,
    notify: finder.notify,
    selectionExists,
    setSelectedItems,
    goBack,
  };
};
