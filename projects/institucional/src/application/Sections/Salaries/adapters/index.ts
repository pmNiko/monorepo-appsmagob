import { SalaryGroup, SalaryResponse } from "../interfaces";

type GroupedItems = Record<string, SalaryGroup[]>;

export const salariesAdapter = (
  data: SalaryResponse[],
  groupping: keyof SalaryResponse = 'secretaria'
) => {
  const groupBy = (
    draftItems: SalaryResponse[],
    condition: (item: SalaryResponse) => any
  ) =>
    draftItems.reduce(
      (accumulator: GroupedItems, currentItem: SalaryResponse) => {
        const key = condition(currentItem);

        // Inicializa un nuevo array si la clave aún no existe en el acumulador
        accumulator[key] ||= [];

        // Agrega el elemento actual al grupo correspondiente
        accumulator[key].push(currentItem);

        return accumulator;
      },
      {}
    );

  const groupedItems = groupBy(data, (item) => item[groupping]);
  const groups = Object.values(groupedItems);
  const quantityGroups = Object.values(groupedItems).length;
  const titles = Object.keys(groupedItems);

  groups.map((group, indice) => {
    const totalEmp = group.reduce(
      (sum, item) => sum + item.cantidadempleados!,
      0
    );
    const totalRem = group.reduce(
      (sum, item) => sum + item.tot_remunerativo!,
      0
    );
    const totalFam = group.reduce((sum, item) => sum + item.tot_familiar!, 0);
    const totalExc = group.reduce((sum, item) => sum + item.tot_exento!, 0);
    const totalRet = group.reduce((sum, item) => sum + item.retencion_ley!, 0);
    const total = group.reduce((sum, item) => sum + item.neto!, 0);

    const info = {
      info: {
        title: titles[indice],
        totalEmp,
        totalRem,
        totalFam,
        totalExc,
        totalRet,
        total,
      },
    };

    group.push(info);
  });

  return { groups, quantityGroups, titles };
};


interface Props {
  valuecmb: string;
  labelcmb: string;
}


export const selectAdapter = (data: Props[]) => {
  return Object.values(data).map((item) => ({
    label: item["labelcmb"],
    value: item["valuecmb"],
  }));
};