import { Authority } from "../../interfaces";
import { AuthorityChildren } from "./AuthorityChildren";

/**
 * Componente recursivo para listar las autoridades
 * Este será invocado nuevamente por el componente hijo
 * siempre que exista un nuevo children en el nodo anidado.
 */
export const AuthorityRoot = ({
  authorities,
}: {
  authorities?: Authority[];
}) => {
  if (!authorities) return null;

  return (
    <>
      {authorities.map((authority: Authority) => (
        <AuthorityChildren key={authority.idsector} {...authority} />
      ))}
    </>
  );
};
