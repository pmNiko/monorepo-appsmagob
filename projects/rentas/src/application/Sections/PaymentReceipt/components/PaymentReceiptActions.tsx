import { useEffect, useState } from "react";
import { useDownload } from "usedownloadmunisma";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useRedirectPreviousPage } from "@shared/infra";
import { MyProgressBar, SimpleModal, SplitButton } from "@shared/ui";

interface Props {
  selectedItems: Array<string>;
  resetSelection: () => void;
}

export const PaymentReceiptActions = ({
  selectedItems,
  resetSelection,
}: Props) => {
  const { goBack } = useRedirectPreviousPage();
  const [disabled, setDisabled] = useState(false);
  const handleDownload = useDownload();

  const downloadOptionsSplitButton = [
    {
      title: "Descargar",
      description: "Agrupado",
      action: () => {
        handleDownload.paymentReceiptPDF();
        resetSelection();
      },
    },
    {
      title: "Descargar",
      description: "Individuales",
      action: () => {
        handleDownload.paymentReceiptZIP();
        resetSelection();
      },
    },
  ];

  useEffect(() => {
    setDisabled(selectedItems.length <= 0);
    handleDownload.select({ receipts: selectedItems });
  }, [selectedItems]);

  return (
    <Box
      mt={2}
      px={{
        lg: "4.5em",
        md: "3em",
        sm: "2em",
        xs: "1.5em",
      }}
    >
      <Box height={40} display="flex" justifyContent="space-between">
        <Button
          onClick={goBack}
          variant="contained"
          color="secondary"
          size="small"
        >
          Volver
        </Button>
        <SplitButton disabled={disabled} options={downloadOptionsSplitButton} />
      </Box>

      <SimpleModal open={handleDownload.isFetching}>
        <Stack>
          <Typography variant="caption" mb={1}>
            Descargando Comprobantes
          </Typography>
          <MyProgressBar progress={handleDownload.progress} />
        </Stack>
      </SimpleModal>
    </Box>
  );
};
