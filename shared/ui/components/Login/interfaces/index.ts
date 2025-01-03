/** Interface para el formulario de inicio de sesión */
export interface SignForm {
  cuitcuil: string;
  clavefiscal: string;
}

/** Interface de respuesta para inicio de sesion */
export interface SignInResponse {
  n_cont: number;
  denominacion: string;
  cuitcuil: string;
  documento: string;
  tipopersona: string;
  fechanacimiento: string;
  e_mail: string;
  telefono: string;
}

// Interfaces para el formulario de recuperación de clave fiscal
export interface ForgotPasswordProps {
  goSignIn: () => void;
}

export interface ForgotPasswordForm {
  cuitcuil: string;
  email: string;
}

/** Interface de respuesta para la recuperación de clave fiscal */
export interface ForgotResponse {
  exito: boolean;
  mensaje: string;
}
