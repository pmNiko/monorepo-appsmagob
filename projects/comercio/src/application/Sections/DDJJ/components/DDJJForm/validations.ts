import * as yup from "yup";

export const getValidationSchema = (minAmount: number) => {
  return yup.object({
    maxfactproyect: yup
      .string()
      .required("Debe ingresar el monto sin decimales.")
      .matches(
        /^[1-9]\d{0,17}$/,
        "La facturación debe ser un valor entero de hasta 18 digitos."
      )
      .test(
        "",
        `El monto debe ser mayor al declarado anteriormente $${minAmount}`,
        (val) => parseFloat(val!) > minAmount
      ),
    idcantempleados: yup.string().required("Requerido"),
    idsuperficie: yup.string().required("Requerido"),
    cantidadabonados: yup
      .string()
      .required("Debe ingresar un número válido.")
      .matches(
        /^[0-9]\d{0,17}$/,
        "La cantidad de abonados debe ser un valor entero de hasta 18 digitos."
      ),
    terms: yup.boolean().oneOf([true], "Este campo es requerido"),
  });
};
