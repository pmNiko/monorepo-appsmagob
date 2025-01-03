import { FN_SGD } from "#application/FN_SGD";
import { amountFormat } from "@shared/infra";
import { LoaderAsync, MunismaCard, SkeletonPage } from "@shared/ui";
import { Box, CardContent, Grid, Typography } from "@mui/material";
import { useQueryState } from "usequerymunisma";
import { PointsResponse } from "../interfaces";

export const TariffPoints = () => {
  const getPoints = useQueryState<PointsResponse[]>(
    FN_SGD.Tarifaria_Valores_Puntos,
    {
      auto: true,
    }
  );

  return (
    <MunismaCard
      minHeight={"60vh"}
      md={7}
      lg={5}
      title="Valores Puntos"
      justifyTarget="space-between"
    >
      <LoaderAsync isLoading={getPoints.isLoading} fallback={<SkeletonPage />}>
        <Grid container spacing={4} mt={0}>
          {getPoints.data?.map((point, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CardContent>
                <Typography
                  textAlign="center"
                  variant="h5"
                  fontWeight="bold"
                  component="div"
                  mb={1.5}
                >
                  {amountFormat(point.valor)}
                </Typography>
                <Typography
                  textAlign="center"
                  variant="body2"
                  color="text.secondary"
                >
                  {point.punto}
                </Typography>
              </CardContent>
            </Grid>
          ))}
        </Grid>
      </LoaderAsync>

      <Box m="auto" my={4}></Box>
    </MunismaCard>
  );
};
