import * as yup from "yup";

// Regex para email
const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Regex para CUIT
const regexCuit = /^\d{2}-\d{8}-\d{1}$|^\d{11}$/;

export const matchEmail = (input: string) => regexEmail.test(input);

/* Vlidación de los formularios con Yup */
export const signValidations = yup.object().shape({
  cuitcuil: yup
    .string()
    .required("Campo requerido!.")
    .test("is-valid", "Debe ingresar CUIT/CUIL válido", (value) => {
      if (!value) return false;
      return regexCuit.test(value);
      // return regexEmail.test(value) || regexCuit.test(value);
    }),
  clavefiscal: yup
    .string()
    .matches(/^\w{8}$/, "Ingrese los 8 digitos de su clave fiscal.")
    .required("Debe ingresar la clave fiscal de 8 digitos."),
});
