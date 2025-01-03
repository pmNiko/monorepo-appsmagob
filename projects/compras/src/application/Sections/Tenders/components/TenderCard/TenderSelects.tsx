import Grid from "@mui/material/Grid/Grid";
import { TenderSelectTitle } from "./TenderSelectTitle";
import { TenderSelectYear } from "./TenderSelectYear";

/**
 * - Componente para el renderizado de los selectores de licitaciones
 */
export const TenderSelects = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12} md={2}>
        <TenderSelectYear />
      </Grid>
      <Grid item xs={12} sm={12} md={10}>
        <TenderSelectTitle />
      </Grid>
    </Grid>
  );
};
