import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { basicTheme } from "./basicTheme";
import { HOC } from "@shared/infra";

export const AppTheme = ({ children }: HOC) => {
  return (
    <ThemeProvider theme={basicTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
