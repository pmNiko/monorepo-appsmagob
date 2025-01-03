import { createContext } from "react";
import { LoginStateContext } from "./interfaces";

export const LoginContext = createContext({} as LoginStateContext);

export const { Provider } = LoginContext;
