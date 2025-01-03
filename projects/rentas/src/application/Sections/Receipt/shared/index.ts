export const Validacion = {
  CuitCuil: /^[0-9]{11}$/,
  Nomenclatura: /^(([0-9]{2}-[a-zA-Z0-9]{2}-[0-9]{2,3}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4})|([a-zA-Z0-9]{14,15}))$/,
  LicenciaComercial: /^[0-9]*$/,
  Patente: /^(([A-Za-z]{1}[0-9]{3}[A-Za-z]{3})|([A-Za-z]{2}[0-9]{3}[A-Za-z]{2})|([0-9]{3}[A-Za-z]{3})|([A-Za-z]{3}[0-9]{3}))$/,
  NumeroRecibo: /^[0-9]*$/,
  ClaveFiscal: /^\w{8}$/,
  Email: /([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])/,
  FormatoLibre: /^$/,
};

export interface TributoProps {
  value: string;
  description: string;
  pattern: RegExp;
  placeholder: string;
  example: string;
  type: string;
  visibilityDatoABuscar: "hidden" | "visible";
  visibilityAnualSemestral: "hidden" | "visible";
}

/**
 * -------- Tributos ---------
 * - Tributos:
 *   * Nomenclatura
 *   * LicenciaComercial
 *   * Patente
 *   * NumeroRecibo
 *   * RentasVarias
 *   * ClaveFiscal
 */
export const Tributos = {
  Nomenclatura: {
    value: "01",
    label: "Nomenclatura",
    description: "Nomenclatura",
    pattern: Validacion.Nomenclatura,
    placeholder: "Nomenclatura",
    example: `<b>Formato de nomenclatura:</b>
                  <ul>
                      <li>15-21-72-1234-0001</li>
                      <li>15217212340001</li>
                      <li>15-21-072-1234-0001</li>
                      <li>152107212340001</li>
                  </ul>`,
    type: "text",
    visibilityDatoABuscar: "visible",
    visibilityAnualSemestral: "visible",
  },
  LicenciaComercial: {
    value: "02",
    label: "Licencia Comercial",
    description: "Licencia Comercial",
    pattern: Validacion.LicenciaComercial,
    placeholder: "Licencia comercial",
    example: "Ejemplo de Licencia: 1234",
    type: "number",
    visibilityDatoABuscar: "visible",
    visibilityAnualSemestral: "visible",
  },
  Patente: {
    value: "03",
    label: "Patente",
    description: "Patente",
    pattern: Validacion.Patente,
    placeholder: "Patente del vehículo",
    example:
      "Ejemplo de patente automóvil: ABC123 ó AB123CD, Moto: 123ABC ó A123BCD.",
    type: "text",
    visibilityDatoABuscar: "visible",
    visibilityAnualSemestral: "visible",
  },
  NumeroRecibo: {
    value: "AA",
    label: "Número de recibo",
    description: "Número de recibo",
    pattern: Validacion.NumeroRecibo,
    placeholder: "Número de recibo",
    example:
      "El número de recibo se encuentra en la parte superior derecha del mismo.",
    type: "number",
    visibilityDatoABuscar: "visible",
    visibilityAnualSemestral: "visible",
  },
  RentasVarias: {
    value: "13",
    label: "Rentas Varias",
    description: "Rentas Varias",
    pattern: Validacion.FormatoLibre,
    example: "Cadena vacia.",
    type: "text",
    visibilityDatoABuscar: "hidden",
    visibilityAnualSemestral: "hidden",
  },
  ClaveFiscal: {
    value: "BB",
    label: "Tributos Contribuyente",
    description: "Clave Fiscal",
    pattern: Validacion.ClaveFiscal,
    placeholder: "*********",
    example: "Ingrese su clave fiscal para acceder a sus tributos.",
    type: "password",
    visibilityDatoABuscar: "visible",
    visibilityAnualSemestral: "visible",
  },
  Email: {
    value: "CE",
    label: "Tributos por Email",
    description: "Clave Fiscal",
    pattern: Validacion.ClaveFiscal,
    placeholder: "*********",
    example: "Ingrese su clave fiscal para acceder a sus tributos.",
    type: "password",
    visibilityDatoABuscar: "visible",
    visibilityAnualSemestral: "visible",
  },
};

/**
 * ----- getTaxByValue -------
 * - Helper encargado de retornar un tributo en base a un value
 * @example **BB** retorna el tributo ClaveFiscal
 */
export const getTaxByValue = (value?: string) =>
  Object.values(Tributos).filter((t) => t.value === value)[0] as TributoProps;

export const Target = {
  CuitCuil: {
    value: "cuitcuil",
    label: "CUIT/CUIL",
    placeholder: "CUIT / CUIL",
    pattern: Validacion.CuitCuil,
    type: "number",
    example: "Ingrese su CUIT / CUIL sin guiones.",
  },
  Email: {
    value: "CE",
    label: "Email",
    placeholder: "ejemplo@mail.com",
    example: 'Ingrese su email de contribuyente "ejemplo@mail.com"',
    pattern: Validacion.Email,
    type: "email",
  },
};

export const getTargetByValue = (value: string) =>
  value === "CE" ? Target.Email : Target.CuitCuil;
