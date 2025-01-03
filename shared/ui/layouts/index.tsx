import { Box, Grid, Toolbar } from "@mui/material";
import { NotifyToast } from "toast-munisma";
import { Footer, ModalSession, NavBar } from "./components";

export const BasicLayout = ({ children }: { children: JSX.Element }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "rgb(230, 227, 227)",
      }}
    >
      <NavBar />
      <NotifyToast />
      <Toolbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Grid
          container
          mt={{
            xs: 10,
            sm: 7,
          }}
          display="flex"
          flexGrow={1}
          alignItems="center"
          justifyContent="center"
          minHeight={"75vh"}
        >
          {children}
        </Grid>
      </Box>
      <Footer />
      <ModalSession />
    </Box>
  );
};
