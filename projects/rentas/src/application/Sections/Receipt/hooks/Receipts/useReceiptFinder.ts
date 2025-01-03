import { FN_SGD } from "#application/FN_SGD";
import { Paths } from "#application/Router";
import { useAuthStore, useRedirectPreviousPage } from "@shared/infra";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useQueryState } from "usequerymunisma";
import { RecibosListarParams, RecibosListarResp } from "../../interfaces";
import { getTaxByValue } from "../../shared";
import { useReceiptStore } from "../../store";

export const useReceiptFinder = () => {
  const [queryParams] = useSearchParams();
  const resetReceiptStore = useReceiptStore((state) => state.resetStore);
  const { goBack } = useRedirectPreviousPage(
    Paths.BUSQUEDA_DE_RECIBOS,
    resetReceiptStore
  );

  const authState = useAuthStore((state) => state);

  const target = useReceiptStore((state) => state.target);
  const setTarget = useReceiptStore((state) => state.setTarget);
  const searchParams = useReceiptStore((state) => state.searchParams);
  const setSearchParams = useReceiptStore((state) => state.setSearchParams);
  const setTCout = useReceiptStore((state) => state.setTCout);

  const setReceiptsTable = useReceiptStore((state) => state.setReceiptsTable);

  const receiptsTable = useReceiptStore((state) => state.receiptsTable);
  const hasLegalReceipts = useReceiptStore((state) => state.hasLegalReceipts);

  const setSelection = useReceiptStore((state) => state.setSelection);
  const receiptsSelected = useReceiptStore((state) => state.receiptsSelected);

  const selectionExists = useReceiptStore((state) => state.selectionExists);
  const quantitySelectedItems = useReceiptStore(
    (state) => state.quantitySelectedItems
  );
  const totalAmountPay = useReceiptStore((state) => state.totalAmountPay);

  const selectedItems = useReceiptStore((state) => state.selectedItems);
  const resetSelection = useReceiptStore((state) => state.resetSelection);

  const resetReceiptsLoaded = useReceiptStore(
    (state) => state.resetReceiptsTable
  );

  // Objeto de consulta para el listado de recibos
  const finder = useQueryState<RecibosListarResp[], RecibosListarParams>(
    FN_SGD.Recibos_Listar,
    {
      dependsOn: searchParams,
      searchParams,
      runAfter: {
        execute: () => {
          authState.setSearchParams(null);
          if (finder.containsData) {
            setReceiptsTable(finder.data!);
          } else if (!finder.containsData) {
            resetReceiptsLoaded();
          }
        },
      },
    }
  );

  // Función para determinar la visibilidad del selector Anual-Semestral
  const selectorIsVisibility = () => {
    const taxExists = getTaxByValue(searchParams?.tribu);

    if (taxExists) {
      return taxExists.visibilityAnualSemestral;
    }
    return searchParams.tribu === "OV";
  };

  /* Busqueda de recibos
   * - Si hay una sesión activa
   *   - 1.searchParams(localStorage)
   *   - 2.searchparams(n_cont, "OV")
   */
  const finderFromSearchParams = () => {
    if (authState.isLogged) {
      setTarget(authState.user?.cuitcuil ?? "");
      if (authState.searchParams) {
        setSearchParams(authState.searchParams);
      } else {
        setSearchParams({
          n_serie: authState.user!.n_cont!,
          tribu: "OV",
          t_cuot: "1",
        });
      }
    }
  };

  // Busqueda de recibos por MD5
  useEffect(() => {
    const md5 = queryParams.get("id");

    md5 && finder.search({ md5 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    finderFromSearchParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authState.isLogged]);

  return {
    target: target,
    params: searchParams,
    selectorIsVisibility,
    receiptsTable,
    hasLegalReceipts,
    setTCout,
    isLoading: finder.isLoading,
    notify: finder.notify,

    setSelection,
    receiptsSelected,
    selectedItems,
    resetSelection,

    selectionExists,
    totalAmountPay,
    quantitySelectedItems,
    goBack,
  };
};
