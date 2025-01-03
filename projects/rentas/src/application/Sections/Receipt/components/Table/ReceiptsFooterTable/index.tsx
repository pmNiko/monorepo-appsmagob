import { useEffect } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useDownload } from "usedownloadmunisma";
import {
  MacroPaymentLinkForm,
  MyProgressBar,
  SimpleModal,
  SplitButton,
} from "@shared/ui";
import { useMacroClick } from "../../../hooks";
import { amountFormat } from "@shared/infra";
import { RecibosListarResp } from "#application/Sections/Receipt/interfaces";

interface Props {
  selectionExists: boolean;
  amountPay: string;
  receiptsSelected: RecibosListarResp[];
  selectedItems: string[];
  quantitySelected: number;

  resetSelection: () => void;
  goBack: () => void;
}

export const ReceiptsFooterTable = ({
  selectionExists,
  amountPay,
  receiptsSelected,
  quantitySelected,
  selectedItems,
  resetSelection,
  goBack,
}: Props) => {
  const handleDownload = useDownload();

  const handleMacroClick = useMacroClick(receiptsSelected);

  const downloadOptionsSplitButton = [
    {
      title: "Descargar",
      description: "Agrupado",
      action: () => {
        handleDownload.receiptPDF();
        resetSelection();
      },
    },
    {
      title: "Descargar",
      description: "Individuales",
      action: () => {
        handleDownload.receiptZIP();
        resetSelection();
      },
    },
  ];

  useEffect(() => {
    handleDownload.select({ receipts: selectedItems });
  }, [selectedItems]);

  return (
    <Box
      sx={{
        marginX: {
          lg: "5em",
          md: "3em",
          sm: "2em",
          xs: "1em",
        },
      }}
    >
      <Box height={40} display="flex" my={1}>
        <Box
          width={"55%"}
          height={"100%"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: {
              lg: "end",
              md: "end",
              sm: "start",
              xs: "start",
            },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: {
                lg: "0.9em",
                md: "0.9em",
                sm: "0.9em",
                xs: "0.8em",
              },
            }}
          >
            Total a pagar: &nbsp;
          </Typography>
          <Typography
            fontSize={{
              lg: "0.9em",
              md: "0.9em",
              sm: "0.9em",
              xs: "0.8em",
            }}
            style={{ fontWeight: `${selectionExists ? "bold" : "lighter"}` }}
          >
            {amountFormat(amountPay)}
          </Typography>
        </Box>
        <Box
          width={"45%"}
          height={"100%"}
          pl={{
            lg: "6em",
            md: "6em",
            sm: "0em",
            xs: "0em",
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: {
              lg: "start",
              md: "start",
              sm: "end",
              xs: "end",
            },
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: {
                lg: "0.9em",
                md: "0.9em",
                sm: "0.9em",
                xs: "0.8em",
              },
            }}
          >
            Recibos totales: &nbsp;
          </Typography>
          <Typography
            fontSize={{
              lg: "0.9em",
              md: "0.9em",
              sm: "0.9em",
              xs: "0.8em",
            }}
            style={{ fontWeight: `${selectionExists ? "bold" : ""}` }}
          >
            {quantitySelected}
          </Typography>
        </Box>
      </Box>

      <Box height={40} display="flex">
        <Box
          height={"100%"}
          sx={{
            width: {
              lg: "90%",
              md: "90%",
              sm: "90%",
              xs: "70%",
            },
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
          }}
          pl={1}
        >
          <Button
            onClick={goBack}
            variant="contained"
            color="secondary"
            size="small"
          >
            Volver
          </Button>
        </Box>
        <Box
          height={"100%"}
          mr={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <SplitButton
            disabled={!selectionExists}
            options={downloadOptionsSplitButton}
          />
        </Box>
        <Box
          height={"100%"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Button
            variant="contained"
            size="small"
            type="submit"
            onClick={handleMacroClick.paymentLink}
            disabled={!selectionExists}
          >
            Pagar
          </Button>
        </Box>
      </Box>

      <Grid item sm={12} textAlign="center">
        <Typography mt={3} mb={6} mx={4} fontSize={14}>
          <b>Nota:</b> Los pagos realizados fuera de la Municipalidad tienen una
          demora mínima de 24hs hábiles en ser acreditados.
        </Typography>
      </Grid>

      <SimpleModal open={handleDownload.isFetching}>
        <Stack>
          <Typography variant="caption" mb={1}>
            Descargando Recibo
          </Typography>
          <MyProgressBar progress={handleDownload.progress} />
        </Stack>
      </SimpleModal>

      <>
        {handleMacroClick.dataForm["ok"] === "true" && (
          <MacroPaymentLinkForm
            dataFormMacro={handleMacroClick.dataForm}
            reset={resetSelection}
          />
        )}
      </>
    </Box>
  );
};
