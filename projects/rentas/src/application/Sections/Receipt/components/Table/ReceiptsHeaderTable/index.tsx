import {
  RecibosListarResp,
  Taxes,
} from "#application/Sections/Receipt/interfaces";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { Box, Divider, Grid, Typography } from "@mui/material";
import moment from "moment";

interface Props {
  tax: TaxType;
  target: string | number;
  receipt: RecibosListarResp;
  hasLegalReceipts: boolean;
  children: JSX.Element;
}

type TaxType = typeof Taxes[keyof typeof Taxes];
type TaxesType = Record<TaxType, string | null>;

// Define el titulo del header de la tabla
const titleHeader = (
  tax: TaxType,
  target: string | number,
  receipt: RecibosListarResp
) => {
  //?? Se define un obj basado en el enum de tributos con value null
  const taxesObj = Object.fromEntries(
    Object.values(Taxes).map((key) => [key, null])
  );

  const titleObj: Record<TaxType, string | null> = {
    ...(taxesObj as TaxesType),
    BB: `CUIT: ${target}`,
    CE: `EMAIL: ${target}`,
    OV: `CUIT: ${target}`,
  };

  const titleDraft =
    receipt?.tribuabrev && `${receipt?.tribuabrev} - ${receipt?.titulo}`;
  // Si el value obtenido es null se retorna "tribuabrev - titulo"
  return titleObj[tax] ?? titleDraft;
};

export const ReceiptsHeaderTable = ({
  tax,
  target,
  receipt,
  hasLegalReceipts,
  children,
}: Props) => (
  <>
    <Grid
      container
      sx={{
        backgroundColor: "#2ea3f2",
        borderRadius: "15px 15px 0px 0px",
        color: "white",
        height: "60px",
      }}
    >
      <Typography fontSize={14} px={3} py={2} width="auto">
        Pago de recibos por {titleHeader(tax, target, receipt)}
      </Typography>

      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        flexDirection="row"
        justifyContent="end"
        py={1}
        px={3}
      >
        {hasLegalReceipts && (
          <>
            <PriorityHighIcon color="error" />
            <Typography color="red">Deuda en legales</Typography>
          </>
        )}
      </Grid>
    </Grid>
    <Box m={2} display="flex" justifyContent="space-between">
      <Box height={45} width={180}>
        {children ? <>{children}</> : <></>}
      </Box>
      <Box height={45} py={2}>
        <Typography fontSize={12} fontStyle="italic">
          Actualizado al {moment(new Date()).format("DD/MM/YYYY")}
        </Typography>
      </Box>
    </Box>
    <Divider sx={{ my: 2 }} />
  </>
);
