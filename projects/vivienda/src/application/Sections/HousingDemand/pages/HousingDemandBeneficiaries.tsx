import { Box, Typography } from "@mui/material";
import { useQueryState } from "usequerymunisma";
import { MunismaCard } from "@shared/ui";
import { FN_SGD } from "#application/FN_SGD";
import { HousingDemandBeneficiariesTable } from "../components";
import { SorteoDHResponse } from "../interfaces";

const HousingDemandBeneficiaries = () => {
  const { isFetching, data } = useQueryState<SorteoDHResponse[]>(
    FN_SGD.IVH_Beneficiarios_Sorteo_Demanda_Habitacional,
    { auto: true }
  );

  return (
    <MunismaCard lg={8} mt={5} mb={4} title="Resultado sorteo">
      <Typography variant="subtitle1" textAlign="center" mt={-1} mb={2}>
        Preadjudicados orza 14339/2023 y orza 14400/2023
      </Typography>
      <Box my={1} px={3}>
        <HousingDemandBeneficiariesTable
          ganadores={data || []}
          isLoading={isFetching}
        />
      </Box>
    </MunismaCard>
  );
};

export default HousingDemandBeneficiaries;
