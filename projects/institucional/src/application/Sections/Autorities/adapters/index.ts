import { Authority, AuthorityResponse } from "../interfaces";

/**
 * - El adapter es el encargado de armar la estructura de arbol de componentes.
 */
export const authoritiesAdapter = (data: AuthorityResponse[]) => {
  let map: { [key: string]: number } = {};
  let node: Authority;
  let roots: Authority[] = [];

  const list: Authority[] = data;

  data[0].idsectorpadre = 0;

  for (let i = 0; i < list.length; i++) {
    map[list[i].idsector] = i;
    list[i].children = [];
  }

  for (let i = 0; i < list.length; i++) {
    node = list[i];
    if (node.idsectorpadre !== 0) {
      const key = map[node.idsectorpadre];
      list[key].children?.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
};
