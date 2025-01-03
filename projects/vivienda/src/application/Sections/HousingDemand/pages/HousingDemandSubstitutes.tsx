import { Box } from "@mui/material";
import { useQueryState } from "usequerymunisma";
import { MunismaCard } from "@shared/ui";
import { FN_SGD } from "#application/FN_SGD";
import { HousingDemandSubstitutesTable } from "../components";
import { SuplentesSorteoDHResponse } from "../interfaces";

const HousingDemandSubstitutes = () => {
  const { isFetching, data } = useQueryState<SuplentesSorteoDHResponse[]>(
    FN_SGD.IVH_Suplentes_Sorteo_Demanda_Habitacional,
    {
      auto: true
    }
  );

  return (
    <MunismaCard md={8} lg={6} mt={5} mb={4} title="Listado de Suplentes">
      <Box px={3}>
        <HousingDemandSubstitutesTable
          isLoading={isFetching}
          substituttes={data || []}
        />
      </Box>
    </MunismaCard>
  );
};

export default HousingDemandSubstitutes;
