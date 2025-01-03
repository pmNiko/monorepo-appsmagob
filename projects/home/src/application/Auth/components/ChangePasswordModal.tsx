import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  CardActions,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { CustomModal, CustomPopUp, ToggleVisibilityPassword } from "@shared/ui";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  isActive: boolean;
  cancel: () => void;
}

export const ChangePassword = ({ isActive, cancel }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <CustomModal isOpen={isActive} close={cancel}>
      <>
        <Box
          textAlign="center"
          sx={{
            position: "fixed",
            top: 2,
            right: 0,
          }}
        >
          <Button color="primary" onClick={cancel}>
            <CloseIcon />
          </Button>
        </Box>
        <Typography
          variant="subtitle1"
          fontWeight="bolder"
          textAlign="center"
          mt={2}
          mb={3}
        >
          Cambiar contraseña
        </Typography>
        <Formik
          initialValues={{
            password: "",
            newPassword: "",
            repeatPassword: "",
          }}
          validationSchema={Yup.object({
            password: Yup.string()
              .required("Debe ingresar una contraseña actual")
              .matches(/^\w{8}$/, {
                message: "Formato de contraseña no válido",
              }),
            newPassword: Yup.string()
              .required("Debe ingresar una contraseña válida")
              .matches(/^\w{8}$/, {
                message: "Formato de contraseña no válido",
              }),
            repeatPassword: Yup.string()
              .required("Campo requerido.")
              .oneOf([Yup.ref("newPassword")], "Las contraseñas no coinciden"),
          })}
          onSubmit={(data) => {
            console.log(data);
            cancel();
          }}
        >
          {({ handleChange, handleBlur, values }) => (
            <Form>
              <Grid
                container
                flexDirection="column"
                justifyContent="space-between"
              >
                <Grid item xs={12}>
                  <TextField
                    value={values.password}
                    fullWidth
                    id="password"
                    name="password"
                    label="Contraseña actual"
                    placeholder="********"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onPaste={(e) => e.preventDefault()}
                    autoComplete="off"
                    InputProps={{
                      endAdornment: (
                        <CustomPopUp help="Ingrese una contraseña de 6 caracteres" />
                      ),
                      startAdornment: (
                        <ToggleVisibilityPassword
                          showPassword={showPassword}
                          toggleShowPasswords={() =>
                            setShowPassword(!showPassword)
                          }
                        />
                      ),
                    }}
                  />
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    style={{ color: "red" }}
                  >
                    <ErrorMessage name="password" />
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    sx={{ mt: 3 }}
                    value={values.newPassword}
                    fullWidth
                    id="newPassword"
                    name="newPassword"
                    label="Nueva Contraseña"
                    placeholder="********"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onPaste={(e) => e.preventDefault()}
                    autoComplete="off"
                    InputProps={{
                      endAdornment: (
                        <CustomPopUp help="Ingrese una contraseña de 6 caracteres" />
                      ),
                      startAdornment: (
                        <ToggleVisibilityPassword
                          showPassword={showPassword}
                          toggleShowPasswords={() =>
                            setShowPassword(!showPassword)
                          }
                        />
                      ),
                    }}
                  />
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    style={{ color: "red" }}
                  >
                    <ErrorMessage name="newPassword" />
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    sx={{ mt: 3 }}
                    fullWidth
                    value={values.repeatPassword}
                    id="repeatPassword"
                    name="repeatPassword"
                    label="Repetir Contraseña"
                    placeholder="********"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onPaste={(e) => e.preventDefault()}
                    autoComplete="off"
                    InputProps={{
                      endAdornment: (
                        <CustomPopUp help="Ingrese una contraseña de 6 caracteres" />
                      ),
                      startAdornment: (
                        <ToggleVisibilityPassword
                          showPassword={showPassword}
                          toggleShowPasswords={() =>
                            setShowPassword(!showPassword)
                          }
                        />
                      ),
                    }}
                  />
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    style={{ color: "red" }}
                  >
                    <ErrorMessage name="repeatPassword" />
                  </Typography>
                </Grid>
              </Grid>

              <CardActions
                sx={{ display: "flex", justifyContent: "center", mt: 2 }}
              >
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    backgroundColor: "primary.A100",
                    textTransform: "capitalize",
                  }}
                  type="submit"
                >
                  Actualizar
                </Button>
              </CardActions>
            </Form>
          )}
        </Formik>
      </>
    </CustomModal>
  );
};
