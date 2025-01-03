import { Button, Grid, Typography } from "@mui/material";
import { useAuthStore, Environments, amountFormat, sleep } from "@shared/infra";
import { MacroPaymentLinkForm } from "@shared/ui";
import { useMacroClick } from "../hooks/useMacroClick";
import { ParamsForMacroClick } from "../interface";

interface Props {
  disabled: boolean;
  params: ParamsForMacroClick;
  amount: number;
  isTax?: boolean;
  tribu?: string;
  n_serie?: number;
}

export const TaxSummaryCard = ({
  disabled,
  amount,
  isTax = false,
  tribu,
  n_serie,
  params,
}: Props) => {
  const setSearchParams = useAuthStore((state) => state.setSearchParams);
  const handleMacroClick = useMacroClick({ params });

  if (disabled) return <></>;

  const handleClickDetail = async () => {
    if (isTax) {
      setSearchParams({
        n_serie,
        tribu,
        anualsemestral: false,
      });
      await sleep(500);
    }
    window.location.href = Environments.Domain + "/rentas/recibos";
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={8} pt={0.5}>
        <Typography variant="subtitle2" mb={{ xs: 2, sm: 0 }}>
          <b>{isTax ? "Deuda Tributo:" : "Deuda Total:"}</b> &nbsp;
          {amountFormat(amount)}
        </Typography>
      </Grid>

      <Grid item xs={12} sm={4} display="flex" gap={2}>
        <Button
          size="small"
          sx={{
            backgroundColor: "primary.A100",
            textTransform: "capitalize",
            height: "2em",
            lineHeight: "2em",
          }}
          variant="contained"
          onClick={handleClickDetail}
        >
          detalle
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
