import { createContext } from "react";
import { TenderStateContext } from "./interfaces";

export const TendersContext = createContext({} as TenderStateContext);

export const { Provider } = TendersContext;
