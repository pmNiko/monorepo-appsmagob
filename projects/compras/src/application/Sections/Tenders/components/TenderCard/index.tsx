import { Box } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { TendersContext } from "../../context";
import { useContext } from "react";
import { TenderDetail } from "./TenderDetail";
import { TenderDocs } from "./TenderDocs";
import { TenderLink } from "./TenderLink";
import { TenderSelects } from "./TenderSelects";
import { LoaderAsync } from "@shared/ui";

export const TenderCard = () => {
  const { isLoading } = useContext(TendersContext);

  return (
    <Box p={4}>
      <TenderSelects />

      <Grid xs={12} sm={12} md={12} mt={3}>
        <TenderLink />

        <LoaderAsync isLoading={isLoading}>
          <TenderDetail />
        </LoaderAsync>

        <LoaderAsync isLoading={isLoading}>
          <TenderDocs />
        </LoaderAsync>
      </Grid>
    </Box>
  );
};
