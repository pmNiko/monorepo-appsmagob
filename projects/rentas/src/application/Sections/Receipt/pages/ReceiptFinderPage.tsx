import { Paths } from "#application/Router";
import { disableButton, useRedirectAfterLogin } from "@shared/infra";
import {
  Captcha,
  CustomPopUp,
  InfoModalResponse,
  LoadingToast,
  MunismaCard,
  ToggleVisibilityPassword,
} from "@shared/ui";
import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { ErrorMessage, Form, Formik, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { MacroModal } from "../components";
import { useCallbackMacroResponse } from "../hooks";
import { useTaxValidate } from "../hooks/Receipts";
import {
  TributoProps,
  Tributos,
  getTargetByValue,
  getTaxByValue,
} from "../shared";

const initialValues = {
  tribu: Tributos.ClaveFiscal.value,
  target: "",
  datoabuscar: "",
};

const FORM_VALUES = {
  TRIBU: "tribu",
  TARGET: "target",
  DATO_A_BUSCAR: "datoabuscar",
};

const ReceiptFinderPage = () => {
  const [openSelect, setOpenSelect] = useState(false);
  useRedirectAfterLogin({ path: Paths.LISTADO_DE_RECIBOS });
  const callbackMacroClick = useCallbackMacroResponse();
  const validator = useTaxValidate();

  useEffect(() => {
    setTimeout(() => {
      setOpenSelect(true);
    }, 800);
  }, []);

  return (
    <MunismaCard
      title="Pago online"
      lg={3}
      minHeight={"60vh"}
      justifyTarget="space-evenly"
    >
      <Box textAlign="center" mt={-4}>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            target: Yup.string()
              .required("Campo requerido")
              .matches(validator.targetForm.pattern, {
                message: `Formato de ${validator.targetForm.label} no válido.`,
              }),
            datoabuscar: Yup.string().matches(validator.datoABuscar.matches, {
              message: `Formato de ${validator.datoABuscar.description} no válido.`,
            }),
          })}
          onSubmit={validator.onsubmit}
        >
          {({ handleChange, values, resetForm }) => (
            <Form>
              <FormControl sx={{ gap: 4 }}>
                <FormControl fullWidth>
                  <Select
                    disabled={validator.isLoading}
                    sx={{ mx: 4, mt: 5 }}
                    id={FORM_VALUES.TRIBU}
                    name={FORM_VALUES.TRIBU}
                    value={values.tribu}
                    open={openSelect}
                    onClick={() => setOpenSelect(!openSelect)}
                    onChange={(e) => {
                      resetForm({
                        values: {
                          ...initialValues,
                          tribu: e.target.value,
                        },
                      });
                      validator.setTargetForm(getTargetByValue(e.target.value));
                      setOpenSelect(false);
                    }}
                  >
                    {Object.values(Tributos).map((tax, i) => (
                      <MenuItem key={i} value={tax.value}>
                        {tax.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <TextField
                  disabled={validator.isLoading}
                  sx={{ width: "80%", m: "auto" }}
                  id={FORM_VALUES.TARGET}
                  name={FORM_VALUES.TARGET}
                  variant="standard"
                  value={values.target}
                  label={validator.targetForm.label}
                  placeholder={validator.targetForm.placeholder}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <CustomPopUp help={validator.targetForm.example} />
                    ),
                  }}
                  type={validator.targetForm.type}
                />
                <Typography
                  variant="caption"
                  display="block"
                  gutterBottom
                  style={{ color: "red" }}
                >
                  <ErrorMessage name={FORM_VALUES.TARGET} />
                </Typography>

                <DynamicInputsForm
                  setValidacionDatoABuscar={(matches, description) =>
                    validator.setDatoABuscar({ matches, description })
                  }
                />

                <Captcha setValidCaptcha={validator.setValidCaptcha} />

                <Box mt={1} mb={4} sx={{ width: "80%", m: "auto" }}>
                  <Button
                    disabled={
                      validator.isLoading ||
                      disableButton(validator.validCaptcha)
                    }
                    type="submit"
                    variant="contained"
                    size="small"
                    fullWidth
                  >
                    {validator.isLoading ? (
                      <CircularProgress size={30} sx={{ color: "white" }} />
                    ) : (
                      "Pagar"
                    )}
                  </Button>
                </Box>
              </FormControl>
            </Form>
          )}
        </Formik>
        <Box mb={6}></Box>
      </Box>

      {/* ------------- Notificaciones al usuario -------------- */}
      <LoadingToast
        loading={validator.isLoading}
        msg="Validando datos ingresados..."
      />
      <InfoModalResponse notify={validator.notify}>
        <Stack spacing={2} textAlign="center">
          <Typography variant="subtitle2" fontWeight="bold">
            Resultado de la busqueda
          </Typography>
          <Typography variant="subtitle2">
            Los datos ingresados son incorrectos o no corresponden a un
            contribuyente.
          </Typography>
        </Stack>
      </InfoModalResponse>

      <MacroModal callbackMacroClick={callbackMacroClick} />
    </MunismaCard>
  );
};

interface DynamicInputsFormProps {
  setValidacionDatoABuscar: (matches: RegExp, description: string) => void;
}

/**
 * ---------------- DynamicInputsForm ----------------
 * - Mediante el context de Formik accedemos a los values del formulario
 * - Con estas values accederemos al valor del tributo seleccionado por el contribuyente
 * - En este punto se recupera el objeto del tributo seleccionado dinámicamente
 * - Alterando asi las props de **pattern** y **description** de los inputs del formulario
 * --------
 * --------
 * - Cada tributo sabe cuando invisibilizar parte del formulario
 */
const DynamicInputsForm = ({
  setValidacionDatoABuscar,
}: DynamicInputsFormProps) => {
  const { handleChange, values, setValues } = useFormikContext<
    typeof initialValues
  >();
  const [tax, setTax] = useState<TributoProps>({} as TributoProps);
  const [showPassword, setShowPassword] = useState(false);

  const containPassword = (value: string) => {
    return (
      value === Tributos.ClaveFiscal.value || value === Tributos.Email.value
    );
  };

  // ** Actualiza el state tax, asi como la regex y descripción correspondiente
  useEffect(() => {
    const selectedTax = getTaxByValue(values.tribu);
    setTax(selectedTax);
    setValidacionDatoABuscar(selectedTax.pattern, selectedTax.description);
    setValues((prev) => ({ ...prev, datoabuscar: "" }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.tribu]);

  return (
    <Box
      mb={2}
      width={"80%"}
      sx={{ mx: "auto" }}
      style={{ visibility: tax.visibilityDatoABuscar }}
    >
      <TextField
        autoComplete=""
        id={FORM_VALUES.DATO_A_BUSCAR}
        name={FORM_VALUES.DATO_A_BUSCAR}
        value={values.datoabuscar}
        onChange={handleChange}
        variant="standard"
        InputProps={{
          endAdornment: <CustomPopUp help={tax.example || ""} />,
          startAdornment: containPassword(tax.value) && (
            <ToggleVisibilityPassword
              showPassword={showPassword}
              toggleShowPasswords={() => setShowPassword(!showPassword)}
            />
          ),
        }}
        type={
          containPassword(tax.value)
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
        <ErrorMessage name={FORM_VALUES.DATO_A_BUSCAR} />
      </Typography>
    </Box>
  );
};

export default ReceiptFinderPage;
