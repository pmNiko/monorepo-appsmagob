import { useRef, useState } from "react";
import { FormikProps } from "formik";
import { useQueryState } from "usequerymunisma";
import { formIsFilled } from "@shared/infra";
import {
  ForgotPasswordForm,
  ForgotPasswordProps,
  ForgotResponse,
} from "../interfaces";
import { FN_SGD_AUTH } from "../FN_SGD_AUTH";

/**
 * useForgotPasswordTools
 * - Herraminetas para el manejo de estado de
 *   la solicitud de recuperación de clave fiscal.
 * - Este maneja el los eventos de cierre de modal y validación del captcha.
 */
export const useForgotPasswordTools = ({ goSignIn }: ForgotPasswordProps) => {
  const formRef = useRef<FormikProps<ForgotPasswordForm>>(null);
  const [toggleModal, setToggleModal] = useState(false);
  const [validCaptcha, setValidCaptcha] = useState(false);

  const handlerForgotPasswd = useQueryState<ForgotResponse, ForgotPasswordForm>(
    FN_SGD_AUTH.Recuperar_Clave,
    {
      singleObject: true,
      runAfter: {
        execute: () => {
          handlerForgotPasswd.containsData && setToggleModal(true);
        },
      },
    }
  );

  /** Si el formulario esta completo envia la consulta */
  const onSubmit = (data: ForgotPasswordForm) => {
    if (!formIsFilled(data)) return;
    handlerForgotPasswd.search({ ...data });
  };

  /** Acción de cierre y redireccionamiento */
  const closeAndRedirectLogin = () => {
    setToggleModal(false);
    goSignIn();
  };

  /** Acción para reinicializar el formulario */
  const retry = () => {
    formRef.current?.resetForm();
    setToggleModal(false);
  };

  return {
    formRef,
    validCaptcha,
    toggleModal,

    exito: handlerForgotPasswd.data?.exito,
    mensaje: handlerForgotPasswd.data?.mensaje,
    params: handlerForgotPasswd.params,
    fetching: handlerForgotPasswd.isFetching,
    isLoading: handlerForgotPasswd.isLoading,

    onSubmit,
    setValidCaptcha,
    closeAndRedirectLogin,
    retry,
  };
};
