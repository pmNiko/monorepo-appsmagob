import { useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useQueryState } from "usequerymunisma";
import { disableButton, useRedirectPreviousPage } from "@shared/infra";
import {
  Captcha,
  CustomPopUp,
  InfoModalResponse,
  LoadingToast,
  MunismaCard,
} from "@shared/ui";
import { FileTrackingParams, FileTrackingResponse } from "../interfaces";
import { FileTrackingTable } from "../components";
import { FN_SGD } from "#application/FN_SGD";

const FileTrackingPage = () => {
  const [validCaptcha, setValidCaptcha] = useState(false);
  const { goBack } = useRedirectPreviousPage();
  const handlerTracking = useQueryState<
    FileTrackingResponse[],
    FileTrackingParams
  >(FN_SGD.institucional_Expediente_Movimientos);

  return (
    <MunismaCard lg={6} mt={5} mb={4} title="Movimiento de expedientes">
      <Box textAlign="center" mt={2}>
        <Formik
          initialValues={{ expediente: "" }}
          validationSchema={Yup.object({
            expediente: Yup.string()
              .required("Campo requerido")
              .matches(/^\d{5}-\d+\/\d{4}$/, {
                message: "Formato de expediente no válido.",
              }),
          })}
          onSubmit={({ expediente }) => handlerTracking.search({ expediente })}
        >
          {({ handleChange }) => (
            <Form>
              <Box
                display="flex"
                justifyContent="center"
                flexWrap="wrap"
                gap={2}
                mx={2}
              >
                <Box>
                  <TextField
                    sx={{ minWidth: 270, maxWidth: 270, ml: 2, mt: 2, mb: 1 }}
                    id="expediente"
                    name="expediente"
                    label="Expediente"
                    variant="standard"
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <Box mr={-2}>
                          <CustomPopUp help="Ingrese el identificador de su expediente ejemplo: 00000-111/2023" />
                        </Box>
                      ),
                    }}
                    placeholder="00000-111/2023"
                    type="text"
                  />
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    mb={2}
                    style={{ color: "red" }}
                  >
                    <ErrorMessage name="expediente" />
                  </Typography>
                </Box>

                <Box mb={1}>
                  <Captcha setValidCaptcha={setValidCaptcha} />
                </Box>
              </Box>
              <Button
                variant="contained"
                type="submit"
                size="small"
                fullWidth
                sx={{ minWidth: 270, maxWidth: 270 }}
                disabled={
                  handlerTracking.isLoading || disableButton(validCaptcha)
                }
              >
                Buscar
              </Button>
            </Form>
          )}
        </Formik>
      </Box>

      <FileTrackingTable
        tracking={handlerTracking.data || []}
        isLoading={handlerTracking.isFetching}
      />

      <Box width={300} mx="auto" mb={2} textAlign="center">
        <Button variant="contained" size="small" onClick={goBack}>
          Ir al inicio
        </Button>
      </Box>

      <LoadingToast
        loading={handlerTracking.isFetching}
        msg="Buscando movimientos..."
      />

      <InfoModalResponse notify={handlerTracking.notify}>
        <Typography variant="body2">
          No se encontraron movimientos para el expediente solicitado con número{" "}
          <strong>{handlerTracking.params.expediente}</strong>
        </Typography>
      </InfoModalResponse>
    </MunismaCard>
  );
};

export default FileTrackingPage;
