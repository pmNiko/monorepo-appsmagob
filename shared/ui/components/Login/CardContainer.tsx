import { Box, Grid } from "@mui/material";

export const CardContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <Grid container display="flex" justifyContent="center">
      <Box
        width="100%"
        // maxWidth={"320px"}
        p={2}
      >
        {children}
      </Box>
    </Grid>
  );
};
