import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryState } from "usequerymunisma";
import { Paths } from "#application/Router";
import {
  ValidateAdhesionParams,
  TaxValue,
  ValidateResponse,
} from "../interfaces";
import { Tributos } from "../shared";
import { useAdhesionTaxStore } from "../store";
import { FN_SGD } from "#application/FN_SGD";

const initialValues = {
  tribu: Tributos.Nomenclatura.value as TaxValue,
  cuitcuil: "",
  datoabuscar: "",
};

const formValues = {
  TRIBU: "tribu",
  CUITCUIL: "cuitcuil",
  DATOABUSCAR: "datoabuscar",
};

/**
 * ------- useHandlerAdhesionReceipt  --------
 * - Custom hook para la busqueda enlazada de tributos.
 *   * Se verifican los datos ingresados
 *   * Si se validan correctamente se procede a la busqueda de tributos para adhesión
 *   * Parametros de busqueda: **cuitcuil** - **tribu** - **datoabuscar**
 *   * Si la busqueda de tributos encuentra resultados carga los tributos al store y redirecciona a la tabla
 *
 * -------------------------------------------------------
 *
 * - returns
 *    * **validCaptcha:**              state de validación
 *    * **isValidation:**              la validacion está en curso
 *    * **validatorNotice:**           notificación del primer request
 *    * **isLoading:**                 proceso de petición de recibos
 *    * **finderNotice:**              notificación del segundo request
 *    * **onSubmit:**                  función para ejecutar la busqueda
 *    * **setValidCaptcha:**           seter del state del captcha
 *    * **validacionDatoABuscar:**     seter del state de valicación
 *    * **setValidacionDatoABuscar:**  seter del state de validación de busqueda
 */
export const useValidateAdhesionReceipt = () => {
  const navigate = useNavigate();
  const [validCaptcha, setValidCaptcha] = useState(false);
  const setSearchParams = useAdhesionTaxStore((state) => state.setSearchParams);
  const setCuitcuil = useAdhesionTaxStore((state) => state.setCuitcuil);
  const [datoABuscar, setDatoABuscar] = useState({
    matches: Tributos.Nomenclatura.pattern,
    description: Tributos.Nomenclatura.description,
  });

  const validator = useQueryState<ValidateResponse, ValidateAdhesionParams>(
    FN_SGD.Validar_Tributo,
    {
      singleObject: true,
      runAfter: {
        execute: () => {
          if (validator.containsData) {
            const { tribu, cuitcuil } = validator.params;
            setSearchParams({ n_cont: validator.data?.n_serie!, tribu });
            setCuitcuil(cuitcuil);
            navigate(Paths.LISTADO_RECIBOS_PARA_ADHERIR);
          }
        },
      },
    }
  );

  return {
    initialValues,

    formValues,
    validCaptcha,
    setValidCaptcha,

    onSubmit: validator.search,
    isLoading: validator.isFetching,
    notify: validator.notify,

    datoABuscar,
    setDatoABuscar,
  };
};
