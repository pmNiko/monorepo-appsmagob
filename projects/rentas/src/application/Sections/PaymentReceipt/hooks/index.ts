import { useReducer } from "react";
import { useQueryState } from "usequerymunisma";
import { adapterYearsPaymentReceipt, adaterPaymentReceipts } from "../adapter";
import {
  AdapterPaymentReceipts,
  PaymentReceipYearsByTax,
  PaymentReceipt,
  PaymentReceiptTaxesByNCont,
} from "../interfaces";
import {
  initialPaymentReceiptReducerState,
  paymentReceiptReducer,
} from "../reducers";
import { useAuthStore } from "@shared/infra";
import { FN_SGD } from "#application/FN_SGD";

/**
 * ------- useHanlderPaymentReceipt  --------
 * - Custom hook para el manejo de datos del listado de **comprobantes de pago**
 * - Realiza una busqueda enlazada doble:
 *    * * * * * * * * * * * *
 *    * Selector de periodos
 *        * Enlazado al tributo seleccionado
 *        * Parametros de busqueda: **tribu__n_serie**
 *    * Listado de comprobantes de pago
 *        * Enlazado al periodo seleccionado
 *        * Parametros de busqueda: **n_cont** - **ano** - **tribu__n_serie**
 *
 * -------------------------------------------------------
 *
 * - returns
 *    * * * * * * * * * * * *
 *    * **cuitcuil:**       dato del contribuyente
 *    * **taxes:**          tributos para el selector
 *    * **setTaxSelect:**   seter -> selector de tributo
 *    * **tax:**            tributo seleccionado
 *
 *    * **setPeriodSelect:**        seter -> selector de periodo
 *    * **periods:**                listado de periodos
 *    * **disabledPeriodSelect:**   deshabilita el selector de periodo mientras carga
 *    * **period:**                 periodo seleccionado
 *
 *    * **isLoading:**          cargando comprobantes de pago
 *    * **paymentReceipts:**    comprobantes de pago
 *    * **notify:**             estado del request
 *
 *    * **setSelection:**       cargando comprobantes de pago
 *    * **selectionExists:**    comprobantes de pago
 *    * **selectedItems:**      estado del request
 *    * **resetSelection:**     reset de items seleccionados
 */
export const useFinderPaymentReceipt = () => {
  const [{ tax, year, selectedItems, selectionExists }, dispatch] = useReducer(
    paymentReceiptReducer,
    initialPaymentReceiptReducerState
  );

  const userSession = useAuthStore((state) => state.user);
  const taxSelector = useQueryState<
    PaymentReceiptTaxesByNCont[],
    any,
    AdapterPaymentReceipts[]
  >(FN_SGD.ComprobanteDePago_Selector_Tributos, {
    auto: true,
    searchParams: { n_cont: userSession?.n_cont },
    useAdapter: true,
    adapter: adaterPaymentReceipts,
  });

  const periodSelector = useQueryState<PaymentReceipYearsByTax[]>(
    FN_SGD.ComprobanteDePago_Selector_Periodos,
    {
      dependsOn: tax,
      searchParams: { tribu__n_serie: tax },
      useAdapter: true,
      adapter: adapterYearsPaymentReceipt,
    }
  );

  const finder = useQueryState<PaymentReceipt[]>(
    FN_SGD.ComprobanteDePago_Listar,
    {
      dependsOn: year,
      searchParams: {
        n_cont: userSession!.n_cont,
        ano: parseInt(year),
        tribu__n_serie: tax,
      },
    }
  );

  const setTaxSelect = (tax: string) =>
    dispatch({ type: "setTax", payload: tax });
  const setPeriodSelect = (year: string) =>
    dispatch({ type: "setYear", payload: year });
  const setSelection = (items: Array<string>) =>
    dispatch({ type: "setSelection", payload: items });
  const resetSelection = () => dispatch({ type: "resetSelection" });

  return {
    cuitcuil: userSession?.cuitcuil,
    taxes: taxSelector.adaptedResults,
    setTaxSelect,
    tax,

    setPeriodSelect,
    periods: periodSelector.adaptedResults,
    disabledPeriodSelect: periodSelector.isLoading,
    period: year,

    isLoading: finder.isLoading,
    paymentReceipts: finder.data || [],
    notify: finder.notify,

    setSelection,
    selectionExists,
    selectedItems,
    resetSelection,
  };
};
