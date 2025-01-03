import {
  HeaderDashBoardCard,
  TaxCardActions,
} from "#application/Auth/components";
import { amountFormat } from "@shared/infra";
import { Box, Stack, Typography } from "@mui/material";
import { DashboardCard } from "../components";
import { DetallesContribuyenteResp } from "../interface";
import { NoticeSection } from "./NoticeSection";

interface Props {
  tax: DetallesContribuyenteResp | null;
}

export const PersonalData = ({ tax }: Props) => {
  if (tax === null) return;

  const title = `${tax?.cuitcuil} - ${tax?.denominacion?.toUpperCase() || ""}`;

  return (
    <DashboardCard title="CNT" {...{ bgcolor: "#63bffd2b", mb: 4 }}>
      <Stack spacing={1} mt={1}>
        <HeaderDashBoardCard title={title} />
        <Box>
          <Typography variant="subtitle2" fontWeight="bold">
            Domicilio Electrónico
          </Typography>
          <Typography variant="body2" ml={2}>
            {tax.email || "No especifica"}
          </Typography>
        </Box>

        <Box>
          <Typography variant="subtitle2" fontWeight="bold">
            Deuda Total a la fecha
          </Typography>
          <Typography variant="body2" ml={2} fontSize={16}>
            {amountFormat(tax.montototaldeuda)}
          </Typography>
        </Box>
      </Stack>

      <TaxCardActions
        disabled={!tax.recibos}
        params={{
          recibos: tax.recibos!,
          productos: tax.productos!,
          montoProductos: tax.montoproductos!,
        }}
        semestraldisponible={tax.semestraldisponible}
        anualdisponible={tax.anualdisponible}
      />

      <NoticeSection
        deudaEnLegales={tax.deudaenlegales}
        deudaUvi={tax.deudauvi}
        deudaMultas={tax.deudamultas}
      />
    </DashboardCard>
  );
};
