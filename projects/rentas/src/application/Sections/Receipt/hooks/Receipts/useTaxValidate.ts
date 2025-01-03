import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryState } from "usequerymunisma";
import { Paths } from "#application/Router";
import { ValidateByMD5Response, ValidateSearchParams } from "../../interfaces";
import { Target, Tributos } from "../../shared";
import { useReceiptStore } from "../../store";
import { FN_SGD } from "#application/FN_SGD";

interface SubmitForm {
  tribu: string;
  target: string;
  datoabuscar: string;
}

const initialState = {
  matches: Tributos.Nomenclatura.pattern,
  description: Tributos.Nomenclatura.description,
};

export const useTaxValidate = () => {
  const navigate = useNavigate();
  const [datoABuscar, setDatoABuscar] = useState(initialState);
  const [targetForm, setTargetForm] = useState(Target.CuitCuil);
  const [validCaptcha, setValidCaptcha] = useState(false);
  const setSearchParams = useReceiptStore((state) => state.setSearchParams);
  const setTarget = useReceiptStore((state) => state.setTarget);
  const validator = useQueryState<ValidateByMD5Response, ValidateSearchParams>(
    FN_SGD.Validar_Tributo,
    {
      mode: 'develop',
      singleObject: true,
      runAfter: {
        execute() {
          if (validator.containsData) {
            setSearchParams({
              tribu: validator.data?.tribu,
              n_serie: validator.data?.n_serie,
              t_cuot: '1'
            });
            setTarget(validator.params.cuitcuil);
            navigate(Paths.LISTADO_DE_RECIBOS);
          }
        },
      },
    }
  );

  const onsubmit = ({ target, tribu, datoabuscar }: SubmitForm) => {
    validator.search({
      cuitcuil: target,
      tribu,
      datoabuscar,
    });
  };

  return {
    onsubmit,
    isLoading: validator.isLoading,
    notify: validator.notify,
    datoABuscar,
    targetForm,
    setTargetForm,
    validCaptcha,
    setValidCaptcha,
    setDatoABuscar,
  };
};
