import { CardContainer } from "./CardContainer";
import { LoginProvider } from "./context";
import { SignInResponse } from "./interfaces";
import { RootComponentContext } from "./RootComponentContext";

interface LoginProps {
  onSubmit: (data: SignInResponse) => void;
}

/**
 * - Login
 * - Este se encarga de validar los datos ingresados por formulario
 *   y persistir el retorno en el localstorage si el inicio de sessión es exitoso.
 * - localStorage:
 *   - client:
 *     - cuitcuil
 *     - n_cont
 *     - e_mail
 *     - denominacion
 *     - documento
 *     - ...rest
 *   - token: token-string
 * - Finalmente ejecuta la acción onSubmit
 */
export const Login = ({ onSubmit }: LoginProps) => {
  return (
    <CardContainer>
      <LoginProvider successAction={onSubmit}>
        <RootComponentContext />
      </LoginProvider>
    </CardContainer>
  );
};
