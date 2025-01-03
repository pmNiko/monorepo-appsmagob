import { useQueryState } from "usequerymunisma";
import { SignForm, SignInResponse } from "../interfaces";
import { FN_SGD_AUTH } from "../FN_SGD_AUTH";

/**
 * useSign
 * - Custom Hook para el inicio de sesion con cuitcuil - clavefiscal
 * - Recibe una función como parametro que ejecutará una vez que complete
 *   la solicitud de inicio de sesión.
 * - TODO: actualmente el token se recupera de una solicitud en paralelo,
 *   esto deberia pasar a la API-REST.
 */
export const useSign = (successAction: (data: SignInResponse) => void) => {
  const handlerSignIn = useQueryState<SignInResponse>(
    FN_SGD_AUTH.Iniciar_Sesion,
    {
      singleObject: true,
      runAfter: {
        execute: async () => {
          if (handlerSignIn.containsData) {
            const data = handlerSignIn.data!;
            successAction(data!);
          }
        },
      },
    }
  );

  //?? Corrobora con que regex hace match el input identificador
  const onsubmit = ({ clavefiscal, cuitcuil }: SignForm) => {
    handlerSignIn.search({ cuitcuil, clavefiscal });
    // matchEmail(cuitcuil)
    //   ? handlerSignIn.search({ clavefiscal, cuitcuil, type: 'CE' })
    //   : handlerSignIn.search({ clavefiscal, cuitcuil, type: 'BB'})
  };

  return {
    onsubmit,
    fetching: handlerSignIn.isFetching,
    notify: handlerSignIn.notify,
  };
};
