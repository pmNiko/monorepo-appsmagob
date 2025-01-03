import { Grid } from "@mui/material";
import { useQueryState } from "usequerymunisma";
import { useAuthStore } from "@shared/infra";
import { LoaderAsync } from "@shared/ui";
import { FN_SGD } from "#application/FN_SGD";
import { SkeletonCards } from "../components/SkeletonCards";
import { PersonalData, TaxDetails } from "../screens";
import {
  DetallesContribuyenteResp,
  DetallesContribuyenteTributosResp,
} from "../interface";

const Dashboard = () => {
  const user = useAuthStore((state) => state.user);
  const personalData = useQueryState<DetallesContribuyenteResp>(
    FN_SGD.Detalles_Contribuyente,
    {
      auto: true,
      singleObject: true,
      searchParams: {
        n_cont: user?.n_cont,
      },
    }
  );
  const taxDetails = useQueryState<DetallesContribuyenteTributosResp[]>(
    FN_SGD.Detalles_Contribuyente_Tributos,
    {
      auto: true,
      searchParams: {
        n_cont: user?.n_cont,
      },
    }
  );

  return (
    <Grid container maxWidth={600} minWidth={350} minHeight={"70vh"}>
      <LoaderAsync
        isLoading={personalData.isLoading}
        fallback={<SkeletonCards {...{ bgcolor: "#63bffd2b" }} />}
      >
        <PersonalData tax={personalData.data} />
      </LoaderAsync>

      <LoaderAsync
        isLoading={taxDetails.isLoading}
        fallback={<SkeletonCards numberCards={5} numberRows={3} />}
      >
        <TaxDetails taxList={taxDetails.data!} />
      </LoaderAsync>
    </Grid>
  );
};

export default Dashboard;
