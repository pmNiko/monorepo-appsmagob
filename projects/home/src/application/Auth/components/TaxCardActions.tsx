import { useAuthStore, Environments, sleep } from "@shared/infra";
import { MacroPaymentLinkForm } from "@shared/ui";
import { Box, Button, Grid } from "@mui/material";
import { useMacroClick } from "../hooks/useMacroClick";
import { ParamsForMacroClick } from "../interface";

interface Props {
  disabled: boolean;
  params: ParamsForMacroClick;
  isTax?: boolean;
  tribu?: string;
  n_serie?: number;
  anualdisponible: boolean;
  semestraldisponible: boolean;
}

// 1: todas las cuotas - 'X': Semestral - 'Y': Anual
type TCuot = "1" | "X" | "Y";

const receiptsList = Environments.Domain + "/rentas/recibos";

export const TaxCardActions = ({
  disabled,
  isTax = false,
  tribu,
  n_serie,
  params,
  semestraldisponible,
  anualdisponible,
}: Props) => {
  const user = useAuthStore((state) => state.user);
  const setSearchParams = useAuthStore((state) => state.setSearchParams);
  const handleMacroClick = useMacroClick({ params });

  if (disabled) return;

  const handleClickDetail = async (value: TCuot) => {
    if (isTax) {
      setSearchParams({ tribu, n_serie, t_cuot: value });
      await sleep(300);
    } else {
      setSearchParams({ tribu: "OV", n_serie: user?.n_cont, t_cuot: value });
      await sleep(300);
    }
    window.location.href = receiptsList;
  };

  return (
    <Grid container py={1}>
      <Grid item xs={12} display="flex" gap={2}>
        <Button
          size="small"
          sx={{
            backgroundColor: "primary.A100",
            textTransform: "capitalize",
            height: "2em",
            lineHeight: "2em",
          }}
          variant="contained"
          onClick={() => handleClickDetail("1")}
        >
          recibos
        </Button>
        <Button
          disabled={handleMacroClick.isLoading}
          size="small"
          sx={{
            backgroundColor: "primary.A100",
            textTransform: "capitalize",
            height: "2em",
            lineHeight: "2em",
          }}
          variant="contained"
          onClick={handleMacroClick.paymentLink}
        >
          Pagar
        </Button>

        <Box display={!semestraldisponible && !anualdisponible ? "none" : ""}>
          {" "}
          |{" "}
        </Box>

        <Button
          size="small"
          sx={{
            backgroundColor: "primary.A100",
            textTransform: "capitalize",
            height: "2em",
            lineHeight: "2em",
            display: semestraldisponible ? "" : "none",
          }}
          variant="contained"
          onClick={() => handleClickDetail("X")}
        >
          Semestral
        </Button>

        <Button
          size="small"
          sx={{
            backgroundColor: "primary.A100",
            textTransform: "capitalize",
            height: "2em",
            lineHeight: "2em",
            display: anualdisponible ? "" : "none",
          }}
          variant="contained"
          onClick={() => handleClickDetail("Y")}
        >
          Anual
        </Button>
      </Grid>

      {handleMacroClick.dataForm["ok"] === "true" && (
        <MacroPaymentLinkForm
          dataFormMacro={handleMacroClick.dataForm}
          reset={() => {}}
        />
      )}
    </Grid>
  );
};
