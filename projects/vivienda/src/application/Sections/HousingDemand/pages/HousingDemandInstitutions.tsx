import { useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useQueryState } from "usequerymunisma";
import { Environments, disableButton } from "@shared/infra";
import {
  Captcha,
  CustomPopUp,
  InfoModalResponse,
  LoadingToast,
  MunismaCard,
} from "@shared/ui";
import { FN_SGD } from "#application/FN_SGD";
import {
  RegistroDHParams,
  RegistroInstitucionesDHResponse,
} from "../interfaces";
import { HousingDemandInstitutionsTable } from "../components/HousingDemandInstitutionsTable";

enum BusquedaPor {
  DNI = "dni",
  NOMBRE = "nombre",
}

const initValues = {
  busquedaPor: BusquedaPor.DNI,
  datoABuscar: "",
};

const dniInputStructure = {
  type: "number",
  help: `Ingrese su DNI, sin puntos ni espacios. Ejemplo: 11222333`,
  placeholder: "DNI del inscripto",
  validation: /^[0-9]{7,8}$/,
  value: BusquedaPor.DNI,
};
const nombreInputStructure = {
  type: "text",
  help: `Ingrese su nombre. \n Ejemplo: Juan Caarlos`,
  placeholder: "Ingrese su nombre",
  validation: /^[a-zA-Z]{3,}$/,
  value: BusquedaPor.NOMBRE,
};

const HousingDemandInstitutions = () => {
  const [validCaptcha, setValidCaptcha] = useState(false);
  const [inputStructure, setInputStructure] = useState(dniInputStructure);
  const handlerRegister = useQueryState<
    RegistroInstitucionesDHResponse[],
    RegistroDHParams
  >(FN_SGD.IVH_Registro_Instituciones_Demanda_Habitacional, {});

  return (
    <MunismaCard
      md={8}
      lg={5}
      mt={5}
      mb={4}
      title="Registro Sorteo Instituciones"
    >
      <Box textAlign="center" mt={2}>
        <Formik
          initialValues={initValues}
          validationSchema={Yup.object({
            datoABuscar: Yup.string()
              .required("Campo requerido")
              .matches(inputStructure.validation, {
                message: "Formato de busqueda no válido.",
              }),
          })}
          onSubmit={({ datoABuscar }) => {
            handlerRegister.search({ dni: datoABuscar });
          }}
        >
          {({ handleChange, handleReset }) => (
            <Form>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                flexWrap="wrap"
                mx={1}
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <Box>
                    <Select
                      sx={{ minWidth: 110, maxWidth: 110, height: 30, mt: 2.3 }}
                      id="busquedaPor"
                      name="busquedaPor"
                      variant="standard"
                      onChange={(ev: SelectChangeEvent) => {
                        handleChange(ev);
                        handleReset();
                        ev.target.value === BusquedaPor.DNI
                          ? setInputStructure(dniInputStructure)
                          : setInputStructure(nombreInputStructure);
                      }}
                      value={inputStructure.value}
                      size="small"
                      disabled
                    >
                      <MenuItem value={BusquedaPor.DNI}>DNI</MenuItem>
                      <MenuItem value={BusquedaPor.NOMBRE}>Nombre</MenuItem>
                    </Select>
                  </Box>

                  <Box>
                    <TextField
                      disabled={handlerRegister.isFetching}
                      sx={{ ml: 2, maxWidth: 200 }}
                      id="datoABuscar"
                      name="datoABuscar"
                      label={inputStructure.value.toLocaleUpperCase()}
                      variant="standard"
                      onChange={handleChange}
                      type={inputStructure.type}
                      InputProps={{
                        endAdornment: (
                          <Box mr={-2}>
                            <CustomPopUp help={inputStructure.help} />
                          </Box>
                        ),
                      }}
                      placeholder={inputStructure.placeholder}
                    />
                    <Typography
                      variant="caption"
                      display="block"
                      gutterBottom
                      mb={1}
                      style={{ color: "red" }}
                    >
                      <ErrorMessage name="datoABuscar" />
                    </Typography>
                  </Box>
                </Box>

                <Box mb={1} mx="auto">
                  <Captcha setValidCaptcha={setValidCaptcha} />
                </Box>
              </Box>

              <Button
                variant="contained"
                type="submit"
                size="small"
                fullWidth
                sx={{ minWidth: 270, maxWidth: 270, mb: 2 }}
                disabled={
                  handlerRegister.isLoading || disableButton(validCaptcha)
                }
              >
                Buscar
              </Button>
            </Form>
          )}
        </Formik>
      </Box>

      <HousingDemandInstitutionsTable
        inscriptos={handlerRegister.data || []}
        isLoading={handlerRegister.isFetching}
      />

      <Box width={300} mx="auto" mt={2} mb={4} textAlign="center">
        <Button
          variant="contained"
          size="small"
          onClick={() => (window.location.href = Environments.Domain)}
        >
          Volver al inicio
        </Button>
      </Box>

      <LoadingToast
        loading={handlerRegister.isFetching}
        msg="Buscando incriptos..."
      />

      <InfoModalResponse notify={handlerRegister.notify}>
        <Typography>
          No se encontraron inscriptos con el {inputStructure.value}:
          <strong> {handlerRegister.params.dni} </strong>
        </Typography>
      </InfoModalResponse>
    </MunismaCard>
  );
};

export default HousingDemandInstitutions;
