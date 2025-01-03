import { Environments } from "@shared/infra";
import { MunismaCard } from "@shared/ui";
import { Box, Button } from "@mui/material";

const Error404Page = () => {
  return (
    <MunismaCard
      md={8}
      lg={5}
      title="Página no encontrada"
      justifyTarget="space-evenly"
      showImage
      minHeight="60vh"
      mt={3}
      mb={3}
    >
      <Box textAlign="center">
        <Button
          variant="contained"
          size="small"
          onClick={() =>
            (window.location.href = Environments.Domain + "/inicio/")
          }
        >
          Ir al inicio
        </Button>
      </Box>
    </MunismaCard>
  );
};

export default Error404Page;
