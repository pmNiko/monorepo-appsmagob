import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useDownload } from "usedownloadmunisma";
import { Captcha, MunismaCard, MyProgressBar, SimpleModal } from "@shared/ui";
import { Environments, disableButton } from "@shared/infra";
import { Paths } from "#application/Router";

/** Página de descarga de recibo de haberes. */
const SalaryReceiptDownload = () => {
  const navigate = useNavigate();
  const { file } = useParams();
  const [validCaptcha, setValidCaptcha] = useState(false);
  const handleDownload = useDownload();

  const downloadPDF = () => {
    handleDownload.salaryReceipt();
    setValidCaptcha(false);
  };

  useEffect(() => handleDownload.setId(`${file!}.pdf`), []);

  return (
    <MunismaCard
      title="Recibo de haberes electrónico"
      lg={3}
      minHeight="75vh"
      showImage
      mt={8}
      mb={5}
    >
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        gap={4}
        mt={-4}
      >
        <Captcha setValidCaptcha={setValidCaptcha} />

        <Box>
          <Button
            sx={{ px: 3 }}
            variant="contained"
            size="small"
            disabled={disableButton(validCaptcha)}
            onClick={downloadPDF}
            fullWidth
          >
            Descargar recibo de haberes
          </Button>
        </Box>
        <Box display="flex" gap={5.5}>
          <Button
            variant="contained"
            size="small"
            sx={{ width: "10em", fontSize: "0.72em" }}
            fullWidth
            onClick={() => (window.location.href = Environments.Domain)}
          >
            Ir <br /> al inicio
          </Button>

          <Button
            variant="contained"
            size="small"
            sx={{ width: "10em", fontSize: "0.72em" }}
            fullWidth
            onClick={() => navigate(Paths.SOLICITUD_RECIBO_HABERES)}
          >
            Solicitar <br /> otro recibo
          </Button>
        </Box>
      </Box>

      <SimpleModal open={handleDownload.isFetching}>
        <Stack>
          <Typography variant="caption" mb={1}>
            Descargando Recibo
          </Typography>
          <MyProgressBar progress={handleDownload.progress} />
        </Stack>
      </SimpleModal>
    </MunismaCard>
  );
};

export default SalaryReceiptDownload;
