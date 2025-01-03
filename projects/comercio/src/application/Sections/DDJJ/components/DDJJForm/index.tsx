import { FN_SGD } from "#application/FN_SGD";
import {
  CustomIcon,
  CustomModal,
  CustomPopUp,
  LoaderAsync,
  MyCheckbox,
  MySelect,
  MyTextInput,
} from "@shared/ui";
import { Box, Button, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useQueryState } from "usequerymunisma";
import { DDJJResponse } from "../../interfaces";
import { useDDJJStore } from "../../store";
import { useDDJJFormTools } from "./hooks";
import { getValidationSchema } from "./validations";

const initialTextButton = "Reenviar acuse de recibo";
const resendButtonClicked = "Acuse de recibo reenviado.";

/** Formulario de carga o edición para una declaración jurada */
export const DDJJForm = (ddjj: DDJJResponse) => {
  const year = useDDJJStore((state) => state.year);
  const isEditing = useDDJJStore((state) => state.isEditing);
  const selectorEmployees = useDDJJStore((state) => state.selectorEmployees);
  const selectorSurface = useDDJJStore((state) => state.selectorSurface);
  const toggleEditing = useDDJJStore((state) => state.toggleEditing);
  const setToDeclare = useDDJJStore((state) => state.setToDeclare);
  const handlerForm = useDDJJFormTools(ddjj, year, toggleEditing, setToDeclare);

  const [textButton, setTextButton] = useState(initialTextButton);
  const [isOpenModal, setToggleModal] = useState(false);
  const handlerAcuseDeRecibo = useQueryState<{ resultado: boolean }>(
    FN_SGD.DDJJ_Reenviar_Acuse_Recibo,
    {
      singleObject: true,
      searchParams: { iddecjurada: ddjj.iddecjurada },
      runAfter: {
        execute() {
          if (handlerAcuseDeRecibo.containsData && !isOpenModal) {
            setTextButton(resendButtonClicked);
            setToggleModal(true);
          }
        },
      },
    }
  );

  return (
    <Stack spacing={3}>
      <Formik
        initialValues={handlerForm.initialValues}
        enableReinitialize
        validationSchema={getValidationSchema(
          handlerForm.initialValues.maxfactproyect
        )}
        onSubmit={({ terms, ...values }) => handlerForm.onSubmit(values)}
      >
        {() => {
          return (
            <Form>
              <Stack spacing={1} p={2} mb={3} border={1}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mt: -3.3,
                    backgroundColor: "white",
                    width: "20em",
                    pl: 2,
                  }}
                >
                  Facturación anualizada
                </Typography>
                <Typography
                  variant="caption"
                  fontSize={"0.7rem"}
                  sx={{ pl: 2, pt: 1 }}
                >
                  - Debe ingresar el monto facturado entre el 1 de enero de{" "}
                  {year - 1} y el 31 de diciembre de {year - 1} . <br />- En
                  caso de haber iniciado actividades en el {year - 1} anualizar
                  siguiendo la siguiente formula ((facturado total año{" "}
                  {year - 1} / cantidad de meses activo) * 12) <br /> - En caso
                  de haber iniciado activades en el {year} realizar un estimado
                  de la facturación anual presunta.
                </Typography>

                <Box display="flex" alignItems="center">
                  <Box py={1} pl={2} display="flex" flexDirection="column">
                    <MyTextInput
                      label="Monto"
                      name="maxfactproyect"
                      variant="standard"
                      sx={{ width: "14em", pb: 1 }}
                      InputProps={{
                        endAdornment: (
                          <CustomPopUp
                            help={"Ingrese su monto sin decimales."}
                          />
                        ),
                      }}
                    />
                  </Box>
                </Box>
              </Stack>

              <Stack spacing={1} p={2} my={3} border={1}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mt: -3.3,
                    backgroundColor: "white",
                    width: "20em",
                    pl: 2,
                  }}
                >
                  Datos EnSaTur
                </Typography>
                <Stack
                  spacing={1}
                  p={1}
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <MySelect
                    label="Empleados"
                    name="idcantempleados"
                    options={selectorEmployees}
                  />
                  <MySelect
                    label="Superficie mts.2"
                    name="idsuperficie"
                    options={selectorSurface}
                  />
                </Stack>
              </Stack>
              {ddjj.esproveedorinternet && (
                <Stack spacing={1} p={2} mb={3} border={1}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      mt: -3.3,
                      backgroundColor: "white",
                      width: "20em",
                      pl: 2,
                    }}
                  >
                    Cantidad abonados internet
                  </Typography>

                  <Box display="flex" alignItems="center">
                    <Box py={1} pl={2} display="flex" flexDirection="column">
                      <MyTextInput
                        label="Abonados"
                        name="cantidadabonados"
                        variant="standard"
                        sx={{ width: "14em", pb: 1 }}
                        InputProps={{
                          endAdornment: (
                            <CustomPopUp
                              help={
                                "Ingrese la cantidad de abonados de internet."
                              }
                            />
                          ),
                        }}
                      />
                    </Box>
                  </Box>
                </Stack>
              )}

              <Stack spacing={1} p={2} border={1}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    mt: -3.3,
                    backgroundColor: "white",
                    width: "8em",
                    pl: 2,
                  }}
                >
                  Confirmación
                </Typography>
                <MyCheckbox
                  muiTypography-root
                  muiTypography-body1
                  MuiFormControlLabel-label
                  css-ahj2mt-muiTypography-root={"0.8rem"}
                  label=" Afirmo que los datos consignados en este formulario son correctos y
                  completos y que esta declaración se ha confeccionado sin omitir ni falsear
                  dato alguno que deba contener, siendo fiel expresión de la verdad."
                  name="terms"
                  isEditing={isEditing}
                />
              </Stack>

              <Box
                my={3}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Button
                  variant="contained"
                  color={`${handlerForm.submitBtnOk ? "primary" : "inherit"}`}
                  size="small"
                  type="submit"
                >
                  {handlerForm.submitBtnOk
                    ? handlerForm.submitBtnText
                    : handlerForm.warningBtnText}
                </Button>
              </Box>
              {ddjj.iddecjurada > 0 && (
                <Box
                  mt={3}
                  mb={1}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Button
                    variant="text"
                    size="small"
                    onClick={handlerAcuseDeRecibo.send}
                    disabled={handlerAcuseDeRecibo.isReady}
                  >
                    <LoaderAsync isLoading={handlerAcuseDeRecibo.isFetching}>
                      <Typography variant="caption">{textButton}</Typography>
                    </LoaderAsync>
                  </Button>
                </Box>
              )}
            </Form>
          );
        }}
      </Formik>

      {/* Modal de Acuse de Recibo  */}
      <CustomModal
        isOpen={isOpenModal}
        close={() => setToggleModal(false)}
        {...{ width: "24.5rem" }}
      >
        <Stack direction="column" spacing={3} alignItems="center">
          <Box>
            <CustomIcon iconName="mail" />
          </Box>
          {handlerAcuseDeRecibo.data?.resultado ? (
            <>
              <Typography variant="subtitle2" fontWeight="bold">
                Su petición se encuentra en proceso
              </Typography>
              <Typography variant="body2">
                Se reenviará un acuse de recibo a su mail.
              </Typography>
              <Typography variant="caption">
                No olvide revisar la carpeta Spam de su casilla de correo.
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="subtitle2" fontWeight="bold" fontSize={12}>
                El mensaje no pudo ser enviado{" "}
              </Typography>
              <Typography variant="body2">
                Intenete nuevamente más tarde{" "}
              </Typography>
            </>
          )}
          <Button
            variant="contained"
            size="small"
            onClick={() => setToggleModal(false)}
          >
            Aceptar
          </Button>
        </Stack>
      </CustomModal>
    </Stack>
  );
};
