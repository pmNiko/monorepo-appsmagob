export const Validacion = {
  CuitCuil: /^[0-9]{11}$/,
  Nomenclatura: /^(([0-9]{2}-[a-zA-Z0-9]{2}-[0-9]{2,3}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4})|([a-zA-Z0-9]{14,15}))$/,
  LicenciaComercial: /^[0-9]*$/,
  Patente: /^(([A-Za-z]{1}[0-9]{3}[A-Za-z]{3})|([A-Za-z]{2}[0-9]{3}[A-Za-z]{2})|([0-9]{3}[A-Za-z]{3})|([A-Za-z]{3}[0-9]{3}))$/,
  ClaveFiscal: /^\w{8}$/,
  FormatoLibre: /^$/,
  Email: /([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])/,
};

export interface Tributo {
  value: string;
  description: string;
  pattern: RegExp;
  placeholder: string;
  example: string;
  type: string;
}

export const Tributos = {
  Nomenclatura: {
    value: "01",
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
  },
  LicenciaComercial: {
    value: "02",
    description: "Licencia Comercial",
    pattern: Validacion.LicenciaComercial,
    placeholder: "Licencia comercial",
    example: "Ejemplo de Licencia: 1234",
    type: "number",
  },
  Patente: {
    value: "03",
    description: "Patente",
    pattern: Validacion.Patente,
    placeholder: "Patente del vehículo",
    example:
      "Ejemplo de patente automóvil: ABC123 ó AB123CD, Moto: 123ABC ó A123BCD.",
    type: "text",
  },
  ClaveFiscal: {
    value: "BB",
    description: "Clave Fiscal",
    pattern: Validacion.ClaveFiscal,
    placeholder: "*********",
    example: "Ingrese su clave fiscal para acceder a sus tributos.",
    type: "password",
  },
  OficinaVirtual: {
    value: "OV",
    label: "Oficina Virtual",
    description: "Clave Fiscal",
    pattern: Validacion.ClaveFiscal,
    placeholder: "*********",
    example: "Ingrese su clave fiscal para acceder a sus tributos.",
    type: "password",
  },
};

export const getTaxByValue = (value: string) =>
  Object.values(Tributos).filter((t) => t.value === value)[0] as Tributo;
