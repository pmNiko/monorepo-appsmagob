import { useEffect, useState } from "react";
import { useQueryState } from "usequerymunisma";
import { FN_SGD } from "#application/FN_SGD";
import { TenderByIDResponse, TenderDetailsEnum } from "../interfaces";

export const useTenderGetByID = (idlicitacion: string) => {
  const [details, setDetails] = useState({} as TenderDetailsEnum);
  const { isFetching, data: tenders, isReady, containsData } = useQueryState<
    TenderByIDResponse
  >(FN_SGD.Licitacion_Get_By_ID, {
    singleObject: true,
    dependsOn: idlicitacion,
    searchParams: { idlicitacion },
  });

  useEffect(() => {
    if (containsData && !!tenders) {
      const {
        idlicitacion,
        ano,
        idtipolicitacion,
        aperturahora,
        documentacion,
        ...details
      } = tenders;
      setDetails(details);
    }
  }, [isReady]);

  return {
    isLoading: isFetching,
    details,
    docs: tenders?.documentacion,
  };
};
