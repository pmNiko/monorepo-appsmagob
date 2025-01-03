import { Box } from "@mui/material";
import { useQueryState } from "usequerymunisma";
import { LoaderAsync, MunismaCard } from "@shared/ui";
import { AuthorityResponse } from "../interfaces";
import { authoritiesAdapter } from "../adapters";
import { AuthorityRoot } from "../components";
import { FN_SGD } from "#application/FN_SGD";

const AuthoritiesPage = () => {
  const handlerAutorities = useQueryState<AuthorityResponse[]>(
    FN_SGD.institucional_Listar_Autoridades,
    {
      auto: true,
      useAdapter: true,
      adapter: authoritiesAdapter,
    }
  );

  return (
    <MunismaCard
      sm={11}
      md={8}
      lg={6}
      mt={5}
      mb={4}
      title="Autoridades Municipalidad San Martín de los Andes"
    >
      <Box px={4} pb={4}>
        <LoaderAsync isLoading={handlerAutorities.isLoading}>
          <AuthorityRoot authorities={handlerAutorities.adaptedResults} />
        </LoaderAsync>
      </Box>
    </MunismaCard>
  );
};

export default AuthoritiesPage;
