import { FN_SGD } from "#application/FN_SGD";
import { Paths } from "#application/Router";
import { useRedirectAfterLogin } from "@shared/infra";
import { LoaderAsync } from "@shared/ui";
import {
  ItemsAdapter,
  ItemSection,
} from "@shared/ui/layouts/components/Menu/interfaces";
import { Grid } from "@mui/material";
import { useQueryState } from "usequerymunisma";
import { itemsAdapter } from "../adapter";
import { GridCards, HeaderCards, SkeletonPage } from "../components";
import { useEffect } from "react";

const HomePage = () => {
  useRedirectAfterLogin({ path: Paths.DASHBOARD });
  const { isLoading, adaptedResults } = useQueryState<
    ItemSection[],
    null,
    ItemsAdapter
  >(FN_SGD.Get_Options, {
    auto: true,
    useAdapter: true,
    adapter: itemsAdapter,
  });

  useEffect(() => {
    console.log(adaptedResults);
  }, []);

  return (
    <LoaderAsync isLoading={isLoading} fallback={<SkeletonPage />}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        mt={1}
        p={0}
      >
        <HeaderCards items={adaptedResults?.headerCards ?? []} />
        <GridCards items={adaptedResults?.gridCards ?? []} />
      </Grid>
    </LoaderAsync>
  );
};

export default HomePage;
