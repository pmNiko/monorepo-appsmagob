type StringOrNumber = string | number;

export interface FormatterOptions {
  label: StringOrNumber;
  value: StringOrNumber;
}

/**
 * Se encarga de retornar un formato de label value
 * a partir de un array de obj de dos propsiedades
 */
export const formatterOptions = (items: any[]) => {
  const formattedOptions = Object.entries(items).map((ele) => {
    const item = Object.values(ele[1]);
    return [{ label: `${item[1]}`, value: item[0] }][0];
  });

  return formattedOptions as FormatterOptions[];
};

/**
 * Retorna el label acorde a un valor y un array de opciones de selector.
 */
export const getLabel = (
  options: FormatterOptions[],
  value: StringOrNumber
) => {
  return options.find((o) => `${o.value}` === `${value}`)?.label;
};
