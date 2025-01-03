import { Box, Button, Typography } from "@mui/material";
import { Environments } from "@shared/infra";
import { LoaderAsync, LoadingToast, MunismaCard } from "@shared/ui";
import { AdhesionConfirmResponse } from "../interfaces";
import { useHanlderAdhesionReceiptConfirm } from "../hooks";

const AdhesionConfirmPagePage = () => {
  const handlerConfirm = useHanlderAdhesionReceiptConfirm();

  return (
    <MunismaCard
      lg={5}
      minHeight={"65vh"}
      showImage
      justifyTarget="space-between"
      title={handlerConfirm.title}
    >
      <Box textAlign="center">
        <LoaderAsync isLoading={handlerConfirm.isLoading}>
          {handlerConfirm.notifyExists ? (
            <Typography px={4}>{handlerConfirm.notifyMessage}</Typography>
          ) : (
            <AdhesionNotify
              isTaxPayer={handlerConfirm.isTaxPayer}
              email={handlerConfirm.email}
              adhesions={handlerConfirm.adhesions}
            />
          )}
        </LoaderAsync>
      </Box>

      <Box textAlign="center" mb={10}>
        <Button
          variant="contained"
          size="small"
          onClick={() => (window.location.href = Environments.Domain)}
        >
          Ir al inicio
        </Button>
      </Box>

      {/* ------------- Notificaciones al usuario -------------- */}
      <LoadingToast
        loading={handlerConfirm.isLoading}
        msg="Validando token..."
      />
    </MunismaCard>
  );
};

const AdhesionNotify = ({
  isTaxPayer,
  email,
  adhesions,
}: {
  isTaxPayer: boolean;
  email: string;
  adhesions: AdhesionConfirmResponse[];
}) => {
  return (
    <div style={{ width: "75%", margin: "auto" }}>
      <Typography my={3} variant="h5" fontWeight="bold">
        <i>No debe realizar ninguna otra acción</i>
      </Typography>

      {isTaxPayer ? (
        <>
          <Typography>
            Gracias por confirmar su dirección de correo electrónico como su
            dirección electrónica en la Municipalidad de San Martín de los
            Andes.
          </Typography>
        </>
      ) : (
        <>
          <Typography mt={2}>
            Se enviarán a la dirección de email
            <b>{email}</b> los recibos de los siguientes tributos:
          </Typography>
          <ul style={{ paddingLeft: "2.5em" }}>
            {adhesions.map((ele, i) => (
              <li
                key={ele.n_serie + i}
                style={{ textAlign: "left", fontSize: "0.9em" }}
              >
                {ele.tributo}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default AdhesionConfirmPagePage;
