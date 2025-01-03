import { useContext, useState } from "react";
import { Form, Formik } from "formik";
import { Box, Button, Stack, Typography } from "@mui/material";
import { disableButton } from "@shared/infra";
import {
  Captcha,
  CustomPopUp,
  InfoModalResponse,
  LoadingToast,
  MyTextInput,
  ToggleVisibilityPassword,
} from "../../components";
import { LoginContext } from "./context/LoginContext";
import { useSign } from "./hooks/useSign";
import { SignForm } from "./interfaces";
import { signValidations } from "./validations";

const initialStateForm: SignForm = { cuitcuil: "", clavefiscal: "" };

export const Sign = () => {
  const { goForgotPassword, successAction } = useContext(LoginContext);
  const { onsubmit, fetching, notify } = useSign(successAction);
  const [validCaptcha, setValidCaptcha] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box>
      <Typography
        variant="subtitle2"
        textAlign="center"
        fontWeight="bold"
        textTransform="capitalize"
        fontSize="0.98em"
        mb={2}
      >
        iniciar sesión
      </Typography>
      <Formik
        initialValues={initialStateForm}
        validationSchema={signValidations}
        onSubmit={onsubmit}
      >
        {() => (
          <Form noValidate>
            <Stack spacing={2} px={2} alignItems="center">
              <MyTextInput
                label="CUIT/CUIL"
                name="cuitcuil"
                placeholder="CUIT / CUIL"
                type="text"
                variant="standard"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <CustomPopUp
                      help={"Ingrese su CUIT/CUIL sin guiones o su email."}
                    />
                  ),
                }}
              />

              <MyTextInput
                label="Clave Fiscal"
                name="clavefiscal"
                placeholder="xxxxxxxx"
                type={showPassword ? "text" : "password"}
                variant="standard"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <ToggleVisibilityPassword
                      showPassword={showPassword}
                      toggleShowPasswords={() => setShowPassword(!showPassword)}
                    />
                  ),
                  endAdornment: <CustomPopUp help={"Ingrese su PIN."} />,
                }}
              />

              <Captcha setValidCaptcha={setValidCaptcha} />

              <Button
                variant="contained"
                size="small"
                type="submit"
                fullWidth
                disabled={disableButton(validCaptcha)}
                sx={{ backgroundColor: "primary.A100" }}
              >
                <Typography
                  fontWeight="bold"
                  fontSize="0.98em"
                  textTransform="capitalize"
                >
                  Ingresar
                </Typography>
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
      <Box textAlign="center" mt={3}>
        <Button variant="text" size="small" onClick={goForgotPassword}>
          <Typography
            fontSize="0.98em"
            color="primary.main"
            textTransform="capitalize"
          >
            Olvide mi clave fiscal
          </Typography>
        </Button>
      </Box>

      <LoadingToast loading={fetching} msg="Validando sus datos..." />
      <InfoModalResponse notify={notify}>
        <Typography>
          CUIT/CUIL/Email o Clave Fiscal invalidos, por favor vuelva a intentar.
          Si olvido su clave fiscal use el boton de recuperación por email.
        </Typography>
      </InfoModalResponse>
    </Box>
  );
};
