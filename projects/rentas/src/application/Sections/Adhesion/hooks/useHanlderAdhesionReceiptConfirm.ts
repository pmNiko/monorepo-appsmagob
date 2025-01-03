import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQueryState } from "usequerymunisma";
import { Paths } from "#application/Router";
import { AdhesionConfirmResponse } from "../interfaces";
import { FN_SGD } from "#application/FN_SGD";

const confirmacionContribuyenteQS = "cnt";
const tokenm = "tokenm";
const titles = {
  error: "Error en la confirmación del correo electrónico",
  success: "Usted ha completado la confirmación del correo electrónico",
};

/**
 * ------- useHanlderAdhesionConfirm  --------
 * - Custom hook para la confirmacion de adhesión
 *   * Se realiza la petición automaticamente con el token recibido por parametro
 *   * Si se validan correctamente se procede a la busqueda de tributos para adhesión
 *   * Parametros de busqueda: **md5**
 *   * Opcionalmente puede recibir **cnt** por parametro para confirmar un contribuyente
 *
 * -------------------------------------------------------
 *
 * - returns
 *    * **title:**         mensaje segun resultado de la petición
 *    * **isLoadin:**      carga de la petición
 *    * **notifyExist:**   notificación del request
 *    * **notifyMessag:**  mensage del notificador
 *    * **isTaxPaye:**     si se recibe ctn por searchParams(boolean)
 *    * **email:**         email del contribuyente adherido
 *    * **adhesions:**     listado de tributos adheridos
 */
export const useHanlderAdhesionReceiptConfirm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isTaxPayer = searchParams.get(confirmacionContribuyenteQS);
  const md5 = searchParams.get(tokenm);
  const handlerConfirm = useQueryState<AdhesionConfirmResponse[]>(
    FN_SGD.Adhesion_Confirmar,
    {
      dependsOn: md5,
      searchParams: { md5 },
    }
  );

  useEffect(() => {
    !md5 && navigate(Paths.BUSQUEDA_DE_RECIBOS_PARA_ADHERIR);
  }, []);

  return {
    title: !!handlerConfirm.notify.exists ? titles.error : titles.success,
    isLoading: handlerConfirm.isFetching,
    notifyExists: handlerConfirm.notify.exists,
    notifyMessage: handlerConfirm.notify.message,
    isTaxPayer: !!isTaxPayer,
    email: handlerConfirm.data?.at(0)?.email || "",
    adhesions: handlerConfirm.data || [],
  };
};
