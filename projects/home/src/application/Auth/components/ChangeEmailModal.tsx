import { CustomModal } from "@shared/ui";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  CardActions,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";

interface Props {
  isActive: boolean;
  cancel: () => void;
}

export const ChangeEmail = ({ isActive, cancel }: Props) => (
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
        Cambiar Email
      </Typography>
      <Formik
        initialValues={{
          email: "",
          newEmail: "",
          repeatEmail: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Campo requerido")
            .email("Ingrese su email actual"),
          newEmail: Yup.string()
            .required("Campo requerido")
            .email("Ingrese un email válido"),
          repeatEmail: Yup.string()
            .required("Campo requerido")
            .email("Ingrese un email válido")
            .oneOf([Yup.ref("newEmail")], "Los email no coinciden"),
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
                  sx={{ my: 1 }}
                  value={values.email}
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  placeholder="ejemplo@mail.com"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onPaste={(e) => e.preventDefault()}
                  autoComplete="false"
                />

                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  style={{ color: "red" }}
                >
                  <ErrorMessage name="email" />
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  sx={{ my: 1 }}
                  fullWidth
                  value={values.newEmail}
                  id="newEmail"
                  name="newEmail"
                  label="Nuevo Email"
                  placeholder="ejemplo@mail.com"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onPaste={(e) => e.preventDefault()}
                  autoComplete="none"
                />

                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  style={{ color: "red" }}
                >
                  <ErrorMessage name="newEmail" />
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  sx={{ my: 1 }}
                  fullWidth
                  value={values.repeatEmail}
                  id="repeatEmail"
                  name="repeatEmail"
                  label="Repetir Email"
                  placeholder="ejemplo@mail.com"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onPaste={(e) => e.preventDefault()}
                  autoComplete="none"
                />
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  style={{ color: "red" }}
                >
                  <ErrorMessage name="repeatEmail" />
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
