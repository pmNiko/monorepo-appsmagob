import { useState } from "react";
import { useQueryState } from "usequerymunisma";
import { FN_SGD } from "#application/FN_SGD";
import { SalaryPeriodResponse, SalaryResponse } from "../interfaces";
import { salariesAdapter, selectAdapter } from "../adapters";

export const useSalaries = () => {
  const [period, setPeriod] = useState("");
  const handlerPeriods = useQueryState<SalaryPeriodResponse[]>(
    FN_SGD.institucional_Selector_Periodo_Sueldos,
    {
      auto: true,
      useAdapter: true,
      adapter: selectAdapter,
    }
  );

  const handlerSalaries = useQueryState<SalaryResponse[]>(
    FN_SGD.institucional_Sueldos_Por_Periodo,
    {
      dependsOn: period,
      searchParams: { liquidacion: period },
      useAdapter: true,
      adapter: salariesAdapter,
    }
  );

  return {
    options: handlerPeriods.adaptedResults,
    selector: setPeriod,
    selected: period,
    isLoading: handlerPeriods.isLoading || handlerSalaries.isLoading,
    salaries: handlerSalaries.adaptedResults,
  };
};
