import { Paths } from "#application/Router";
import { useAuthStore, capitalizeWords } from "@shared/infra";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  description?: string;
  isLogged: boolean;
}

export const PrincipalItemCard: React.FC<Props> = ({
  description,
  isLogged,
}) => {
  const navigate = useNavigate();
  const openModal = useAuthStore((state) => state.openModal);

  const handleClick = () => {
    isLogged ? navigate(Paths.DASHBOARD) : openModal();
  };

  return (
    <Card
      sx={{
        height: "100%",
        minHeight: 250,
        borderRadius: 2,
        boxShadow: "5px 10px 20px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="700">
          {isLogged ? "Contribuyente" : "Oficina Virtual"}
        </Typography>

        <Box mt={2}>
          <Typography variant="subtitle2" mb={2} px={4} color="GrayText">
            {isLogged
              ? capitalizeWords(description!)
              : "Ingresar con Clave Fiscal"}
          </Typography>
          <Box textAlign="center" my={3}>
            {isLogged ? (
              <PersonIcon sx={{ fontSize: 60, color: "#4b4b4b" }} />
            ) : (
              <HttpsOutlinedIcon sx={{ fontSize: 60, color: "#4b4b4b" }} />
            )}
          </Box>
        </Box>
        <Button
          onClick={handleClick}
          variant="contained"
          size="small"
          type="submit"
          sx={{
            backgroundColor: "primary.A100",
            width: "12em",
            height: "2em",
          }}
        >
          <Typography
            fontWeight="bold"
            variant="button"
            textTransform="capitalize"
          >
            {isLogged ? "Resumen" : "Ingresar"}
          </Typography>
        </Button>
      </CardContent>
    </Card>
  );
};
