import {
  InfoModalResponse,
  LoadingToast,
  Modal,
  MunismaCard,
} from "@shared/ui";
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
import { AdhesionTaxTable } from "../components";
import { useHandlerAdhesionReceipts } from "../hooks";

const AdhesionReceiptListPage = () => {
  const handlerAdhesion = useHandlerAdhesionReceipts();

  return (
    <MunismaCard sm={11} md={10} lg={6} mb={4}>
      <Grid
        container
        sx={{
          backgroundColor: "#2ea3f2",
          borderRadius: "15px 15px 0px 0px",
          color: "white",
          height: "60px",
        }}
      >
        <Grid item xs={12} md={6}>
          {handlerAdhesion.cuitcuil && (
            <Typography fontSize={14} px={3} py={2}>
              Adhesión al recibo por email por CUIT: {handlerAdhesion.cuitcuil}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Box px={2} textAlign="center">
        <Typography variant="subtitle2" mt={6} mb={2}>
          Consignar dirección de email para recibir las tasas
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
          onSubmit={handlerAdhesion.onSubmit}
        >
          {({ handleChange, handleBlur, values }) => (
            <Form>
              <Grid container justifyContent="space-between">
                <Grid item xs={12} md={5}>
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

                <Grid item xs={12} md={5}>
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

              <Box mt={3}>
                <AdhesionTaxTable
                  isLoading={handlerAdhesion.searching}
                  taxesTable={handlerAdhesion.taxesTable}
                  selectionExists={handlerAdhesion.selectionExists}
                  setSelection={handlerAdhesion.setSelectedItems}
                />
              </Box>

              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  my: 5,
                  mx: 0,
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handlerAdhesion.goBack}
                >
                  Volver
                </Button>

                <Button
                  variant="contained"
                  size="medium"
                  type="submit"
                  disabled={handlerAdhesion.disabledButton}
                >
                  Adherir
                </Button>
              </CardActions>
            </Form>
          )}
        </Formik>
      </Box>

      {/* Notificaciones de busqueda al usuario */}
      <LoadingToast
        loading={handlerAdhesion.searching}
        msg="Buscando tributos del contribuyente..."
      />
      <InfoModalResponse notify={handlerAdhesion.notify}>
        <>
          <Typography variant="subtitle2">
            No se registran tributos con los parámetros ingresados{" "}
          </Typography>
        </>
      </InfoModalResponse>

      {/* ------------- Notificaciones al usuario -------------- */}
      <LoadingToast
        loading={handlerAdhesion.isLoading}
        msg="Enviando solicitud..."
      />
      <Modal
        toggleModal={handlerAdhesion.toggleModal}
        icon={true}
        success={handlerAdhesion.success}
        close="Ir al inicio"
        closeAction={handlerAdhesion.closeModal}
      >
        {handlerAdhesion.success ? (
          <Typography variant="body1">
            Se envió un mensaje de confirmación a la dirección ingresada, por
            favor revise su casilla de correo para acceder al link de descarga
            online. Si no lo encuentra en su bandeja de entrada, por favor
            revise <b>"No deseado", "Spam" o "Promociones".</b> El mensaje tiene
            una validez de 24 horas.
          </Typography>
        ) : (
          <Typography>{handlerAdhesion.notifyMessage}</Typography>
        )}
      </Modal>
    </MunismaCard>
  );
};

export default AdhesionReceiptListPage;
