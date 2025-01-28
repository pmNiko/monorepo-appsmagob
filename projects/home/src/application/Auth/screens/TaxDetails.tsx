import { Stack } from "@mui/material";

import { amountFormat, capitalizeWords } from "@shared/infra";
import {
  DashboardCard,
  HeaderDashBoardCard,
  RowDashboardCard,
  TaxCardActions,
} from "../components";
import { DetallesContribuyenteTributosResp } from "../interface";
import { NoticeSection } from "./NoticeSection";

interface Props {
  taxList: DetallesContribuyenteTributosResp[] | null;
}

export const TaxDetails = ({ taxList }: Props) => {
  if (taxList === null) return <></>;

  return (
    <>
      {taxList?.map((tax, i) => (
        <DashboardCard key={tax.tribu + i} title={tax.tribuabrev}>
          <Stack spacing={1} mt={1}>
            <HeaderDashBoardCard title={tax.titulo} />

            <RowDashboardCard
              label="Email:"
              value={tax.email || "No especifica"}
            />

            <RowDashboardCard
              label="Relación:"
              value={capitalizeWords(tax.relaciontributo || "sin especificar")}
            />

            <RowDashboardCard
              label="Deuda:"
              value={amountFormat(tax.montototaldeuda || "")}
            />
          </Stack>

          <TaxCardActions
            isTax
            tribu={tax.tribu}
            n_serie={tax.n_serie}
            params={{
              recibos: tax.recibos!,
              productos: tax.productos!,
              montoProductos: tax.montoproductos!,
            }}
            mensualesDisponibles={!!tax.recibos}
            semestraldisponible={tax.semestraldisponible}
            anualdisponible={tax.anualdisponible}
          />

          <NoticeSection
            deudaEnLegales={tax.deudaenlegales}
            deudaUvi={tax.deudauvi}
            deudaMultas={tax.deudamultas}
          />
        </DashboardCard>
      ))}
    </>
  );
};
