import { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryState } from "usequerymunisma";
import { InfoModalResponse } from "@shared/ui";
import { FN_SGD } from "#application/FN_SGD";
import { TendersContext, initialState, tendersReducer } from "../context";
import { useTenderGetYearAdapter } from "../adapter";
import {
  TenderByIDResponse,
  TenderDetailsEnum,
  TenderFileProps,
  TenderSelectsResponse,
  TenderTitlesForSelect,
  TendersDataSelectsProps,
} from "../interfaces";

interface Props {
  children: JSX.Element | JSX.Element[];
  idQueryString?: string | null;
}

/**
 * - Provider para el manejo de licitaciones
 */
export const TenderProvider = ({ children, idQueryString }: Props) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(tendersReducer, initialState);

  const tenderSelects = useQueryState<TenderSelectsResponse[]>(
    FN_SGD.Licitacion_Selector,
    { auto: true }
  );

  const tenderFinder = useQueryState<TenderByIDResponse>(
    FN_SGD.Licitacion_Get_By_ID,

    {
      singleObject: true,
      dependsOn: state.tenderID,
      searchParams: { idlicitacion: state.tenderID },
    }
  );

  const yearFromTender = useTenderGetYearAdapter(
    tenderSelects.data || [],
    state.tenderByQS
  );

  /** Procesa los titulos de las liciataciones */
  const handlerTitles = (tendersParam: TendersDataSelectsProps[]) => {
    const availableTitles = tendersParam.find(
      (tender) => tender.ano === parseInt(state.year)
    )?.licitaciones;

    return {
      exists: !!availableTitles,
      all: availableTitles,
      firstTenderId: `${availableTitles?.at(0)?.idlicitacion}`,
    };
  };

  /** Funciones para enmascarar los dispatchers  */
  const setYears = (value: Array<number>) =>
    dispatch({ type: "setYears", payload: value });
  const setTitles = (value: Array<TenderTitlesForSelect>) =>
    dispatch({ type: "setTitles", payload: value });
  const setDetails = (value: TenderDetailsEnum) =>
    dispatch({ type: "setDetails", payload: value });
  const setDocs = (value: Array<TenderFileProps>) =>
    dispatch({ type: "setDocs", payload: value });
  const setTenderByQS = (value: string) =>
    dispatch({ type: "setTenderByQS", payload: value });
  const setYear = (value: string) =>
    dispatch({ type: "setYear", payload: value });
  const setTenderID = (value: string) =>
    dispatch({ type: "setTenderID", payload: value });
  const ctxReset = () => dispatch({ type: "reset" });

  /** Carga de periodo anual. */
  useEffect(() => {
    if (tenderSelects.containsData && !!tenderSelects.data) {
      setYears(
        tenderSelects.data.map((tender: TendersDataSelectsProps) => tender.ano)
      );
      idQueryString
        ? setTenderByQS(idQueryString)
        : setYear(tenderSelects.data.at(0)?.ano + "");
    }
  }, [tenderSelects.isReady]);

  /** Carga de una licitación por Query String => <id> */
  useEffect(() => {
    setYear(yearFromTender + "");
    setTenderID(state.tenderByQS);
  }, [state.tenderByQS]);

  /** Carga de titulos segun el año seleccionado. */
  useEffect(() => {
    if (tenderSelects.containsData) {
      const titles = handlerTitles(tenderSelects.data || []);

      if (titles.exists) {
        setTitles(titles.all!);
        !state.tenderByQS && setTenderID(titles.firstTenderId);
      }
    }
  }, [state.year, tenderSelects.isFetching]);

  /** Carga de detalles y documentación según el titulo seleccionado. */
  useEffect(() => {
    if (tenderFinder.containsData && !!tenderFinder.data) {
      const {
        idlicitacion,
        ano,
        idtipolicitacion,
        aperturahora,
        documentacion,
        ...details
      } = tenderFinder.data;
      setDetails(details);
      setDocs(tenderFinder.data.documentacion);
    }
  }, [tenderFinder.isReady]);

  return (
    <TendersContext.Provider
      value={{
        ...state,
        isLoading: tenderFinder.isFetching,
        selectsAreReady: tenderSelects.isReady,
        disabled: !!state.tenderByQS || tenderFinder.isFetching,
        renderLink: !!state.tenderByQS,

        setTenderByQS,
        setYear,
        setTenderID,
        ctxReset,
      }}
    >
      <>
        {/* <LoadingToast msg='Buscando licitación...' loading={tenderFinder.fetching} /> */}
        {children}
        <InfoModalResponse
          notify={tenderFinder.notify}
          onClick={() => navigate("/")}
        />
      </>
    </TendersContext.Provider>
  );
};
