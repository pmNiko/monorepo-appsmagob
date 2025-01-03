import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { Box, Button, CircularProgress, Grid, Typography } from "@mui/material";
import { useQueryState } from "usequerymunisma";
import { disableButton, formatterOptions, sleep } from "@shared/infra";
import {
  Captcha,
  CustomPopUp,
  InfoModalResponse,
  LoadingToast,
  MunismaCard,
  MyTextInput,
  Selector,
} from "@shared/ui";
import { Paths } from "#application/Router";
import { FN_SGD } from "#application/FN_SGD";
import { SalaryReceiptPeriodsResponse, SendEmailResponse } from "../interfaces";

const initialStateForm = {
  dni: "",
  legajo: "",
  directorio: "",
};
const SalaryReceiptFindPage = () => {
  const navigate = useNavigate();
  const [validCaptcha, setValidCaptcha] = useState(false);

  const handlerPeriods = useQueryState<SalaryReceiptPeriodsResponse[]>(
    FN_SGD.RRHH_Selector_Liquidacion_Haberes,
    { auto: true, useAdapter: true, adapter: formatterOptions }
  );

  const finder = useQueryState<SendEmailResponse>(
    FN_SGD.RRHH_Envio_Email_Haberes,
    {
      singleObject: true,
      showResponse: true,
      runAfter: {
        execute() {
          finder.containsData && navigate(Paths.ENVIO_OK);
        },
      },
    }
  );

  return (
    <MunismaCard
      title="Recibo de haberes electrónico"
      showImage
      lg={3}
      mt={8}
      mb={5}
    >
      <Formik
        initialValues={initialStateForm}
        onSubmit={async ({ legajo, directorio }, { setValues }) => {
          finder.search({
            legajo: parseInt(legajo),
            directorio,
          });
          await sleep(500);
          setValues((prevState) => ({ ...prevState, dni: "", legajo: "" }));
        }}
        validationSchema={yup.object().shape({
          dni: yup
            .string()
            .min(7, "Minimo de 7 digitos.")
            .max(8, "Máximo de 8 digitos.")
            .required("Debe ingresar el documento con el formato válido."),
          legajo: yup
            .string()
            .min(3, "Minimo 3 digitos!")
            .max(5, "Máximo 5 digitos!")
            .required("Debe ingresar el legajo con el formato válido."),
          directorio: yup.string().required("Debe seleccionar un periodo."),
        })}
      >
        {({ values, setValues }) => (
          <Form noValidate>
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              gap={1}
              px={6}
            >
              <MyTextInput
                label="Documento"
                name="dni"
                placeholder="xxxxxxxx"
                type="number"
                variant="standard"
                value={values.dni}
                InputProps={{
                  endAdornment: (
                    <CustomPopUp
                      help={
                        "Ingrese su número de documento con el formato: xxxxxxxx"
                      }
                    />
                  ),
                }}
              />

              <MyTextInput
                label="Legajo"
                name="legajo"
                placeholder="xxxx"
                type="number"
                variant="standard"
                value={values.legajo}
                InputProps={{
                  endAdornment: (
                    <CustomPopUp
                      help={"Ingrese su número de legajo con el formato: xxxx"}
                    />
                  ),
                }}
              />

              <Selector
                label="Período"
                options={handlerPeriods.adaptedResults}
                defaultValue
                disabled={handlerPeriods.isLoading}
                setSelected={(e) =>
                  setValues((prev) => ({ ...prev, directorio: e }))
                }
                selected={values.directorio}
              />

              <Grid
                display="flex"
                alignItems="center"
                flexDirection="column"
                mt={3}
              >
                <Captcha setValidCaptcha={setValidCaptcha} />

                <Box display="flex" justifyContent="center">
                  <Button
                    sx={{ mt: 3, mb: 10 }}
                    variant="contained"
                    size="small"
                    type="submit"
                    disabled={finder.isFetching || disableButton(validCaptcha)}
                  >
                    {finder.isFetching ? (
                      <CircularProgress size={30} sx={{ color: "white" }} />
                    ) : (
                      "Enviar solicitud"
                    )}
                  </Button>
                </Box>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>

      <LoadingToast loading={finder.isFetching} msg="Enviando solicitud!" />
      <InfoModalResponse notify={finder.notify}>
        <>
          <Typography variant="subtitle2">
            No se registran datos con los parámetros ingresados{" "}
          </Typography>
        </>
      </InfoModalResponse>
    </MunismaCard>
  );
};

export default SalaryReceiptFindPage;
