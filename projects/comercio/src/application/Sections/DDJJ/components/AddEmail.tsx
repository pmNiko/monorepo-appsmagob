import { useEffect, useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  CardActions,
  Grid,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useQueryState } from "usequerymunisma";
import { FN_SGD } from "#application/FN_SGD";

export const AddEmail = ({
  n_cont,
  goBack,
}: {
  n_cont: number;
  goBack: () => void;
}) => {
  const [progress, setProgress] = useState(0);
  const { search, isFetching, isReady } = useQueryState(
    FN_SGD.Adhesion_Solicitud,
    {
      singleObject: true,
    }
  );

  useEffect(() => {
    let timer: any;
    if (isFetching) {
      timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 800);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isFetching]);

  return (
    <Box textAlign="center">
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        Adhesion Email
      </Typography>
      <Typography variant="body2" mb={3}>
        Usted no posee un email asociado por favor complete el formulario
      </Typography>
      <Formik
        initialValues={{ email: "", repeatEmail: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .required("Campo requerido.")
            .email("Ingrese un email válido."),
          repeatEmail: Yup.string()
            .required("Campo requerido.")
            .email("Ingrese un email válido.")
            .oneOf([Yup.ref("email")], "Los email no coinciden"),
        })}
        onSubmit={({ email }) => {
          console.log(email);
          search({ email, tributos: `99-${n_cont}` });
        }}
      >
        {({ handleChange, handleBlur }) => (
          <Form>
            <Grid container display="flex" flexDirection="column">
              <Grid item>
                <TextField
                  sx={{ my: 1 }}
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  placeholder="ejemplo@mail.com"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onPaste={(e) => e.preventDefault()}
                  autoComplete="off"
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

              <Grid item>
                <TextField
                  sx={{ my: 1 }}
                  fullWidth
                  id="repeatEmail"
                  name="repeatEmail"
                  label="Repetir Email"
                  placeholder="ejemplo@mail.com"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onPaste={(e) => e.preventDefault()}
                  autoComplete="off"
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

            <Box
              sx={{
                width: "100%",
                visibility: `${isFetching ? "visible" : "hidden"}`,
              }}
            >
              <LinearProgress variant="determinate" value={progress} />
            </Box>

            {isReady && (
              <Typography variant="body1">
                Se envió un mensaje de confirmación a la dirección ingresada,
                por favor revise su casilla de correo para acceder al link de
                descarga online. Si no lo encuentra en su bandeja de entrada,
                por favor revise <b>"No deseado", "Spam" o "Promociones".</b> El
                mensaje tiene una validez de 24 horas.
              </Typography>
            )}

            <CardActions
              sx={{
                display: "flex",
                justifyContent: "space-between",
                my: 5,
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={goBack}
              >
                cerrar
              </Button>

              <Button
                variant="contained"
                size="small"
                type="submit"
                disabled={isFetching || isReady}
              >
                Adherir
              </Button>
            </CardActions>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
