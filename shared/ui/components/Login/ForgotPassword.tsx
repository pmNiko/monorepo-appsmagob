import { Box, Button, Stack, Typography } from "@mui/material";
import { disableButton } from "@shared/infra";
import { Form, Formik } from "formik";
import { useContext } from "react";
import {
  Captcha,
  CustomPopUp,
  LoadingToast,
  Modal,
  MyTextInput,
} from "../../components";
import { LoginContext } from "./context";
import { useForgotPasswordTools } from "./hooks";
import { forgotPasswordValidations } from "./validations";

/**
 * ForgotPassword
 * - Componente encargado del manejo de la recuperación de clave fiscal.
 */
export const ForgotPassword = () => {
  const { goSignIn } = useContext(LoginContext);
  const forgotPasswordTools = useForgotPasswordTools({ goSignIn });

  return (
    <Box textAlign="center">
      <Typography
        variant="subtitle2"
        textAlign="center"
        fontWeight="bold"
        textTransform="capitalize"
        fontSize="0.98em"
        mb={2}
      >
        Recuperar Clave Fiscal
      </Typography>

      <Formik
        innerRef={forgotPasswordTools.formRef}
        initialValues={{ cuitcuil: "", email: "" }}
        validationSchema={forgotPasswordValidations}
        onSubmit={forgotPasswordTools.onSubmit}
      >
        {() => {
          return (
            <Form noValidate>
              <Stack spacing={2} px={2} alignItems="center">
                <MyTextInput
                  label="CUIT / CUIL"
                  name="cuitcuil"
                  placeholder="xxxxxxxxxxx"
                  type="text"
                  variant="standard"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <CustomPopUp
                        help={"Ingrese su CUIT / CUIL sin guiones."}
                      />
                    ),
                  }}
                />

                <MyTextInput
                  label="Email"
                  name="email"
                  placeholder="ejemplo@mail.com"
                  type="text"
                  variant="standard"
                  fullWidth
                  InputProps={{
                    endAdornment: <CustomPopUp help={"Ingrese su email."} />,
                  }}
                />

                <Captcha
                  setValidCaptcha={forgotPasswordTools.setValidCaptcha}
                />

                <Button
                  variant="contained"
                  size="small"
                  type="submit"
                  sx={{ backgroundColor: "primary.A100" }}
                  fullWidth
                  disabled={
                    forgotPasswordTools.isLoading ||
                    disableButton(forgotPasswordTools.validCaptcha)
                  }
                >
                  <Typography
                    fontWeight="bold"
                    fontSize="0.98em"
                    textTransform="capitalize"
                  >
                    Enviar Email
                  </Typography>
                </Button>
              </Stack>
            </Form>
          );
        }}
      </Formik>
      <Box textAlign="center" mt={2}>
        <Button variant="text" size="small" onClick={goSignIn}>
          <Typography
            fontSize="0.98em"
            color="primary.main"
            textTransform="capitalize"
          >
            Cancelar
          </Typography>
        </Button>
      </Box>

      <LoadingToast
        loading={forgotPasswordTools.fetching}
        msg="Validando sus datos..."
      />
      <Modal
        accept={forgotPasswordTools.exito ? undefined : "Cancelar"}
        actionAccept={forgotPasswordTools.closeAndRedirectLogin}
        close={forgotPasswordTools.exito ? "Iniciar sesión" : "Reintentar"}
        closeAction={
          forgotPasswordTools.exito
            ? forgotPasswordTools.closeAndRedirectLogin
            : forgotPasswordTools.retry
        }
        toggleModal={forgotPasswordTools.toggleModal}
      >
        <Typography>{forgotPasswordTools.mensaje}</Typography>
      </Modal>
    </Box>
  );
};
