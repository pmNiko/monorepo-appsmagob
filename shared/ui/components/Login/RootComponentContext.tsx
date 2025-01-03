import { useContext } from "react";
import { LoginContext } from "./context/LoginContext";

/**
 * - RootComponentContext
 *  - Root Container para los componentes de Login
 *  - El context retorna el componente seleccionado en base a la
 *    acción ejecutada.
 *  - Por defecto el componente principal es Sign
 */
export const RootComponentContext = () => {
  const { renderComponent: Component } = useContext(LoginContext);

  return <Component />;
};
