import { useState } from "react";
import {
  DDJJResponse,
  DDJJToDeclareFormProps,
  ValuesOnSubmit,
} from "../../../interfaces";
import { deepEqual } from "../helpers";

/** Custom hook para manejo del estado del formulario de DDJJ */
export const useDDJJFormTools = (
  ddjj: DDJJResponse,
  year: number,
  editing: () => void,
  toDeclare: (toDeclare: DDJJResponse) => void
) => {
  const [submitBtnOk, setSubmitBtnOk] = useState(true);
  const initialValues: DDJJToDeclareFormProps = {
    maxfactproyect: ddjj.maxfactproyect,
    idcantempleados: ddjj.idcantempleados,
    idsuperficie: ddjj.idsuperficie,
    cantidadabonados: ddjj.cntabonados || 0,
    terms: false,
  };

  const submitBtnText = `Grabar Declaración Jurada ${year} de la lic: ${ddjj.nrlic} - ${ddjj.nomco}`;
  const warningBtnText = `No se realizo ninguna modificación en la declaración...`;

  const onSubmit = (values: ValuesOnSubmit) => {
    if (deepEqual(initialValues, values, "terms")) {
      editing();
      setSubmitBtnOk(false);
      setTimeout(() => editing());
      setTimeout(() => setSubmitBtnOk(true), 3000);
    } else {
      const {
        maxfactproyect,
        idcantempleados,
        idsuperficie,
        cntabonados,
        ...restParamsDDJJ
      } = ddjj;

      const declare: DDJJResponse = {
        maxfactproyect: values.maxfactproyect,
        idcantempleados: values.idcantempleados,
        idsuperficie: values.idsuperficie,
        cntabonados: values.cantidadabonados,
        ...restParamsDDJJ,
      };
      toDeclare(declare);
    }
  };

  return {
    initialValues,
    submitBtnOk,
    submitBtnText,
    warningBtnText,

    onSubmit,
  };
};
