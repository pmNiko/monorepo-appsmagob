import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { disableButton } from "@shared/infra";
import { Captcha, MunismaCard, MyProgressBar, SimpleModal } from "@shared/ui";
import { useDownloadReceipt } from "../hooks";

/**
 * - Pagina de descarga de recibos por link desde el email.
 * @path /descargar-recibo - queryString token | id
 */
const DownloadReceiptByLinkPage = () => {
  const [validCaptcha, setValidCaptcha] = useState(false);
  const handleDownload = useDownloadReceipt();

  return (
    <MunismaCard
      minHeight={"60vh"}
      title="Descarga de recibos"
      lg={3}
      showImage
    >
      <Box display="flex" alignItems="center" flexDirection="column" gap={5}>
        <CheckCircleOutlineIcon color="success" fontSize="large" />
        <Typography>Descarga de recibos por E-mail.</Typography>

        <Captcha setValidCaptcha={setValidCaptcha} />

        <Button
          variant="contained"
          size="small"
          disabled={disableButton(validCaptcha)}
          onClick={handleDownload.onclick}
        >
          Descargar Recibos
        </Button>
      </Box>
      <SimpleModal open={handleDownload.isLoading}>
        <Stack>
          <Typography variant="caption" mb={1}>
            Descargando Recibos
          </Typography>
          <MyProgressBar progress={handleDownload.progress} />
        </Stack>
      </SimpleModal>
      <Box mb={5}></Box>
    </MunismaCard>
  );
};

export default DownloadReceiptByLinkPage;
