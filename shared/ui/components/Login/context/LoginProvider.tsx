import { useReducer } from "react";
import { SignInResponse } from "../interfaces";
import { LoginContext } from "./LoginContext";
import { initialState, loginReducer } from "./LoginReducer";

interface Props {
  children: JSX.Element | JSX.Element[];
  successAction: (data: SignInResponse) => void;
}

export const LoginProvider = ({ children, successAction }: Props) => {
  const [state, dispatch] = useReducer(loginReducer, initialState);

  /** Funciones para enmascarar los dispatchers  */
  const goSignIn = () => dispatch({ type: "goSignIn" });
  const goForgotPassword = () => dispatch({ type: "goForgotPassword" });

  return (
    <LoginContext.Provider
      value={{
        ...state,
        successAction,
        goSignIn,
        goForgotPassword,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
