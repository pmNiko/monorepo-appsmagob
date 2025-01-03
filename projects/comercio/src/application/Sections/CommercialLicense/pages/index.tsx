import { useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useQueryState } from "usequerymunisma";
import { Environments, disableButton } from "@shared/infra";
import {
  Captcha,
  CuitCuilMask,
  CustomIcon,
  CustomPopUp,
  InfoModalResponse,
  LoadingToast,
  MunismaCard,
} from "@shared/ui";
import { FN_SGD } from "#application/FN_SGD";
import { ProcedureCheckingTable } from "../components";
import {
  FinderFileParams,
  FinderTrackingParams,
  TramitePecasMovimiento,
  TramitePecasResponse,
} from "../interfaces";

/**
 * Consulta de tramite comercial
 */
const ProcedureCheckingPage = () => {
  const [validCaptcha, setValidCaptcha] = useState(false);
  const [cuitcuil, setCuitcuil] = useState("");
  const finderFile = useQueryState<TramitePecasResponse, FinderFileParams>(
    FN_SGD.Licencia_Tramite_Pecas_Buscar,
    { singleObject: true }
  );

  const finderTracking = useQueryState<
    TramitePecasMovimiento[],
    FinderTrackingParams
  >(FN_SGD.Licencia_Tramite_Pecas_Listar_Movimientos, {
    dependsOn: finderFile.data?.cod_proceso,
    searchParams: { CodigoProceso: finderFile.data?.cod_proceso! },
  });

  const isLoading = finderFile.isFetching || finderTracking.isFetching;

  return (
    <MunismaCard lg={6} mt={8} mb={5} title="Consulta de trámite">
      <Box textAlign="center" mt={2}>
        <Formik
          initialValues={{ NumeroTramite: "", CuitCuil: "" }}
          validationSchema={Yup.object({
            NumeroTramite: Yup.string()
              .required("Campo requerido")
              .matches(/^\d{4,}$/, {
                message: "Formato de expediente no válido.",
              }),
            CuitCuil: Yup.string()
              .required("Campo requerido")
              .matches(/^\d{2}-\d{8}-\d$/, {
                message: "Formato de CUIT/CUIL no válido.",
              }),
          })}
          onSubmit={async ({ NumeroTramite, CuitCuil }, { resetForm }) => {
            setCuitcuil(cuitcuil);
            finderFile.search({ NumeroTramite, CuitCuil });
            await new Promise((resolve) => setTimeout(resolve, 1500));
            resetForm();
          }}
        >
          {({ handleChange, values }) => (
            <Form>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                flexWrap="wrap"
                mx={1}
                gap={2}
              >
                <Box>
                  <TextField
                    value={values.NumeroTramite}
                    sx={{ minWidth: 200, maxWidth: 200, ml: 2, mt: 2, mb: 1 }}
                    id="NumeroTramite"
                    name="NumeroTramite"
                    label="Nº de Trámite"
                    variant="standard"
                    onChange={handleChange}
                    InputProps={{
                      endAdornment: (
                        <Box mr={-2}>
                          <CustomPopUp help="Ingrese su número de trámite, ejemplo: 00000" />
                        </Box>
                      ),
                    }}
                    placeholder="11111"
                    type="text"
                  />
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    mb={2}
                    style={{ color: "red" }}
                  >
                    <ErrorMessage name="NumeroTramite" />
                  </Typography>
                </Box>

                <Box>
                  <TextField
                    sx={{ minWidth: 200, maxWidth: 200, ml: 2, mt: 2, mb: 1 }}
                    id="CuitCuil"
                    name="CuitCuil"
                    label="CUIT/CUIL"
                    variant="standard"
                    onChange={handleChange}
                    placeholder="CUIT / CUIL"
                    type="tel"
                    InputProps={{
                      inputComponent: CuitCuilMask,
                      endAdornment: (
                        <Box mr={-2}>
                          <CustomPopUp help="Ingrese su CUIT / CUIL" />
                        </Box>
                      ),
                    }}
                  />
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    mb={2}
                    style={{ color: "red" }}
                  >
                    <ErrorMessage name="CuitCuil" />
                  </Typography>
                </Box>
              </Box>

              <Box my={1} display="flex" justifyContent="center">
                <Captcha setValidCaptcha={setValidCaptcha} />
              </Box>

              <Button
                variant="contained"
                type="submit"
                size="small"
                fullWidth
                sx={{ minWidth: 270, maxWidth: 270 }}
                disabled={isLoading || disableButton(validCaptcha)}
              >
                {isLoading ? (
                  <CircularProgress size={30} sx={{ color: "white" }} />
                ) : (
                  "Buscar"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>

      <ProcedureCheckingTable
        title={finderFile.data?.razon_social || ""}
        tracking={finderTracking.data}
        isLoading={finderTracking.isFetching}
      />

      <Box width={300} mx="auto" mb={2} textAlign="center">
        <Button
          variant="contained"
          size="small"
          onClick={() => (window.location.href = Environments.Domain)}
        >
          Volver al inicio
        </Button>
      </Box>

      {/* Toast de chequeo y busqueda */}
      <LoadingToast
        loading={finderFile.isFetching}
        msg="Chequeando los datos ingresados..."
      />
      <LoadingToast
        loading={finderTracking.isFetching}
        msg="Buscando movimientos..."
      />

      {/* Modal de notificación  */}
      <InfoModalResponse notify={finderFile.notify}>
        <Box>
          <Typography variant="subtitle2">
            No se encontraron registros para los datos ingresados
          </Typography>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ height: 30, width: 30, background: "white" }}>
                  <CustomIcon
                    iconName="credit_score"
                    iconFontSize={20}
                    iconColor="blue"
                  />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="caption">
                    {" "}
                    <strong>CUIT/CUIL:</strong> {finderFile.params.CuitCuil}
                  </Typography>
                  <Typography variant="caption">
                    {" "}
                    <strong>Trámite:</strong> {finderFile.params.NumeroTramite}
                  </Typography>
                </Box>
              </ListItemText>
            </ListItem>
          </List>
          <Typography variant="caption">
            Para mayor información acerquese al edificio municipal.
          </Typography>
        </Box>
      </InfoModalResponse>
    </MunismaCard>
  );
};

export default ProcedureCheckingPage;
