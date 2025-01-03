import { useEffect, useState } from "react";
import { ErrorMessage, Form, Formik, useFormikContext } from "formik";
import * as Yup from "yup";
import { Box, Stack, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import { disableButton, useRedirectAfterLogin } from "@shared/infra";
import {
  Captcha,
  CustomPopUp,
  InfoModalResponse,
  LoadingToast,
  MunismaCard,
  ToggleVisibilityPassword,
} from "@shared/ui";
import { Tributo, Tributos, Validacion, getTaxByValue } from "../shared";
import { useValidateAdhesionReceipt } from "../hooks";
import { Paths } from "#application/Router";

const AdhesionReceiptFinderPage = () => {
  useRedirectAfterLogin({ path: Paths.LISTADO_RECIBOS_PARA_ADHERIR });
  const handleValidate = useValidateAdhesionReceipt();

  return (
    <MunismaCard
      title="Domicilio Electrónico"
      lg={4}
      minHeight="70vh"
      mt={6}
      mb={4}
    >
      <Box textAlign="center" mb={2} mx="auto" width={"60%"}>
        <Typography variant="body2">
          Seleccione los tributos para los que desea establecer el domicilio
          electrónico <b>obligatorio</b>
        </Typography>
      </Box>
      <Box textAlign="center">
        <Formik
          initialValues={handleValidate.initialValues}
          validationSchema={Yup.object({
            cuitcuil: Yup.string()
              .required("Campo requerido")
              .matches(Validacion.CuitCuil, {
                message: "Formato de CUIT/CUIL no válido.",
              }),
            datoabuscar: Yup.string().matches(
              handleValidate.datoABuscar.matches,
              {
                message: `Formato de ${handleValidate.datoABuscar.description} no válido.`,
              }
            ),
          })}
          onSubmit={handleValidate.onSubmit}
        >
          {({ setFieldValue, handleChange, values }) => (
            <Form>
              <FormControl sx={{ gap: 1 }}>
                <RadioGroup
                  sx={{ ml: 5 }}
                  aria-labelledby="tribu-radio-button"
                  id={handleValidate.formValues.TRIBU}
                  name={handleValidate.formValues.TRIBU}
                  value={values.tribu}
                  onChange={(event) => {
                    setFieldValue(
                      handleValidate.formValues.TRIBU,
                      event.currentTarget.value
                    );
                  }}
                >
                  <FormControlLabel
                    value={Tributos.Nomenclatura.value}
                    control={<Radio />}
                    label={Tributos.Nomenclatura.description}
                  />
                  <FormControlLabel
                    value={Tributos.LicenciaComercial.value}
                    control={<Radio />}
                    label={Tributos.LicenciaComercial.description}
                  />
                  <FormControlLabel
                    value={Tributos.Patente.value}
                    control={<Radio />}
                    label={Tributos.Patente.description}
                  />

                  <FormControlLabel
                    value={Tributos.ClaveFiscal.value}
                    control={<Radio />}
                    label={Tributos.ClaveFiscal.description}
                  />
                </RadioGroup>

                <TextField
                  disabled={handleValidate.isLoading}
                  sx={{ mx: "auto", width: "80%" }}
                  id={handleValidate.formValues.CUITCUIL}
                  name={handleValidate.formValues.CUITCUIL}
                  label="CUIT/CUIL"
                  variant="standard"
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <CustomPopUp
                        help={"Ingrese su CUIT / CUIL sin guiones."}
                      />
                    ),
                  }}
                  placeholder="CUIT / CUIL"
                  type="number"
                />
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  style={{ color: "red" }}
                >
                  <ErrorMessage name={handleValidate.formValues.CUITCUIL} />
                </Typography>

                <DynamicFinderForm
                  initialValues={handleValidate.initialValues}
                  formValues={handleValidate.formValues}
                  setValidacionDatoABuscar={(matches, description) =>
                    handleValidate.setDatoABuscar({
                      matches,
                      description,
                    })
                  }
                />

                <Captcha setValidCaptcha={handleValidate.setValidCaptcha} />

                <Box mt={3} mb={4} width={"80%"} mx="auto">
                  <Button
                    disabled={
                      handleValidate.isLoading ||
                      disableButton(handleValidate.validCaptcha)
                    }
                    type="submit"
                    variant="contained"
                    size="small"
                    fullWidth
                  >
                    adherir
                  </Button>
                </Box>
              </FormControl>
            </Form>
          )}
        </Formik>
        <Box mt={2}></Box>
      </Box>

      {/* ------------- Notificaciones al usuario -------------- */}
      <LoadingToast
        loading={handleValidate.isLoading}
        msg="Validando datos ingresados..."
      />
      <InfoModalResponse notify={handleValidate.notify}>
        <Stack spacing={2} textAlign="center">
          <Typography variant="subtitle2" fontWeight="bold">
            Resultado de la busqueda
          </Typography>
          <Typography variant="subtitle2">
            No se registran datos con los parámetros ingresados.
          </Typography>
        </Stack>
      </InfoModalResponse>
    </MunismaCard>
  );
};

const DynamicFinderForm = ({
  initialValues,
  formValues,
  setValidacionDatoABuscar,
}: {
  initialValues: any;
  formValues: any;
  setValidacionDatoABuscar: (matches: RegExp, description: string) => void;
}) => {
  const [tax, setTax] = useState<Tributo>({} as Tributo);
  const { handleChange, values } = useFormikContext<typeof initialValues>();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const selectedTax = getTaxByValue(values.tribu);
    setTax(selectedTax);
    setValidacionDatoABuscar(selectedTax.pattern, selectedTax.description);
  }, [values.tribu]);

  return (
    <>
      <Box width={"80%"} mb={4} sx={{ mx: "auto" }}>
        <TextField
          name={formValues.DATOABUSCAR}
          onChange={handleChange}
          id={formValues.DATOABUSCAR}
          variant="standard"
          InputProps={{
            endAdornment: <CustomPopUp help={tax.example || ""} />,
            startAdornment: tax.value === Tributos.ClaveFiscal.value && (
              <ToggleVisibilityPassword
                showPassword={showPassword}
                toggleShowPasswords={() => setShowPassword(!showPassword)}
              />
            ),
          }}
          type={
            tax.type === "password"
              ? showPassword
                ? "text"
                : "password"
              : tax.type
          }
          label={tax.description}
          placeholder={tax.placeholder}
        />
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          style={{ color: "red" }}
        >
          <ErrorMessage name={formValues.DATOABUSCAR} />
        </Typography>
      </Box>
    </>
  );
};

export default AdhesionReceiptFinderPage;
