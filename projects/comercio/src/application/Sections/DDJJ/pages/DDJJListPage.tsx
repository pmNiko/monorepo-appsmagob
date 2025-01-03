import {
  CustomIcon,
  CustomModal,
  InfoModalResponse,
  LoadingToast,
  MunismaCard,
} from "@shared/ui";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  AddEmail,
  DDJJDataModal,
  DDJJInfoTable,
  DDJJList,
  DDJJSelectYear,
} from "../components";
import { useHandlerTable } from "../hooks";

const DDJJTablePage = () => {
  const handlerTable = useHandlerTable();

  return (
    <MunismaCard
      sm={11.5}
      md={10}
      lg={8}
      mt={6}
      mb={4}
      title="Declaración Jurada de Comercio"
    >
      <DDJJInfoTable />

      <DDJJSelectYear isLoading={handlerTable.isFetching} />

      <DDJJList isLoading={handlerTable.isFetching} />

      {/* -----------  Modal - Request Insert  ------------- */}
      <CustomModal
        isOpen={handlerTable.modalToDeclareIsOpen}
        close={handlerTable.toggleModalToDeclare}
        {...{ width: "24.5rem" }}
      >
        <>
          <DDJJDataModal />
          <Box display="flex" justifyContent="end" mt={3} gap={3}>
            <Button
              variant="text"
              size="small"
              onClick={handlerTable.resetDeclare}
            >
              Modificar
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handlerTable.declareConfirm}
            >
              Confirmar
            </Button>
          </Box>
        </>
      </CustomModal>

      {/* Modal de finalización  */}
      <CustomModal
        isOpen={handlerTable.isOpenInsertModalResponse}
        close={handlerTable.closeInsertResponse}
        {...{ width: "24.5rem" }}
      >
        <Stack direction="column" spacing={3} alignItems="center">
          <Box>
            <CustomIcon iconName="fact_check" />
          </Box>
          <Typography variant="subtitle2" fontWeight="bold">
            Se grabo con éxito la Declaración Jurada{" "}
            {handlerTable.ddjjNumberCreated}
          </Typography>
          <Typography variant="body2">
            Se envio un acuse de recibo al email {handlerTable.email}
          </Typography>

          <Button
            variant="contained"
            size="small"
            onClick={handlerTable.closeInsertResponse}
          >
            Aceptar
          </Button>
        </Stack>
      </CustomModal>

      {/* -----------  Toast y Modal - Response Insert ------------- */}
      <LoadingToast
        loading={handlerTable.isLoading}
        msg="Enviando los datos de su declaración..."
      />
      <InfoModalResponse notify={handlerTable.notify}>
        <Typography>{handlerTable.message}</Typography>
      </InfoModalResponse>

      {/* -----------  Modal para carga de Email  ------------- */}
      <CustomModal
        isOpen={handlerTable.isOpenEmailModal}
        close={handlerTable.closeOpenEmailModal}
        {...{
          width: "23rem",
          m: "auto",
        }}
      >
        <AddEmail
          n_cont={handlerTable.n_cont}
          goBack={handlerTable.closeOpenEmailModal}
        />
      </CustomModal>
    </MunismaCard>
  );
};

export default DDJJTablePage;
