import { Environments } from "@shared/infra";
import { ItemSection } from "@shared/ui/layouts/components/Menu/interfaces";

const groupBySector = (
  items: ItemSection[]
): { sector: string; items: ItemSection[] }[] => {
  const groups: { [key: string]: ItemSection[] } = {}; // Objeto que agrupa los items completos por sector

  // Agrupamos los items por sector
  items.forEach((item) => {
    const { sector } = item;

    if (!groups[sector]) {
      groups[sector] = [];
    }

    groups[sector].push(item); // Agregar el item completo al grupo correspondiente
  });

  // Convertir el objeto a un array de grupos y ordenar los items dentro de cada grupo
  return Object.keys(groups)
    .map((sector) => ({
      sector: sector.charAt(0).toUpperCase() + sector.slice(1),
      items: groups[sector].sort((a, b) => a.posicion - b.posicion), // Ordenamos los items por "posicion"
    }))
    .sort((a, b) => {
      // Ordenamos los sectores por la "posicion" del primer item de cada sector
      const firstPosA = a.items[0]?.posicion || 0; // Obtenemos la posicion del primer item del sector A
      const firstPosB = b.items[0]?.posicion || 0; // Obtenemos la posicion del primer item del sector B
      return firstPosA - firstPosB; // Ordenamos por la posicion de los primeros items
    });
};

const EXCLUDE_OPTIONS_BY_IDMENU = {
  home: 1,
};

const EXCLUDE_OPTIONS = Object.values(EXCLUDE_OPTIONS_BY_IDMENU);

export const itemsAdapter = (items: ItemSection[]) => {
  const itemsFilter = items.filter(
    (item) => !EXCLUDE_OPTIONS.includes(item.idmenu)
  );
  const itemsOrder = itemsFilter.sort((a, b) => a.posicion - b.posicion);
  const itemsExtends = itemsOrder.map((item) => {
    return {
      ...item,
      goTo: () => {
        if (item.externo) window.open(item.ruta, "_blank", "noreferrer");
        else
          window.location.href = `${Environments.Domain}/${item.sector}/${item.ruta}`;
      },
    };
  });

  const headerCards = itemsExtends
    .filter((item) => item.destacado > 0)
    .sort((a, b) => a.destacado - b.destacado);

  const gridCards = groupBySector(itemsExtends);

  return {
    headerCards,
    gridCards,
  };
};
