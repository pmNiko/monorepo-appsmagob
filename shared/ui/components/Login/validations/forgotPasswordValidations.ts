import * as yup from "yup";

/* Vlidación de los formularios con Yup */
export const forgotPasswordValidations = yup.object().shape({
  cuitcuil: yup
    .string()
    .matches(/\d{11}/, "Ingrese los 11 números sin guines ni espacios.")
    .required("Debe ingresar el cuit/cuil con el formato válido."),
  email: yup
    .string()
    .email("La dirección ingresada no tiene un formato válido.")
    .required("Requerido"),
});
