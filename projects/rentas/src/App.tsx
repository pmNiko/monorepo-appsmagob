import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Environments } from "@shared/infra";
import { BasicLayout, AppTheme } from "@shared/ui";
import { AppRouter } from "#application/Router";
import ReactGA from "react-ga";
import { ClickToComponent } from "click-to-react-component";
import { BASENAME } from "./settings";

function App() {
  useEffect(() => {
    if (import.meta.env.MODE === "development") {
      document.title = `🏁 Development`;
    } else if (import.meta.env.MODE === "staging") {
      document.title = `🚀 Staging`;
    } else if (Environments.IsProduction) {
      ReactGA.initialize(Environments.GaTrackingID!, {
        debug: false,
        titleCase: false,
        gaOptions: {
          name: "Rentas",
          userId: "appsmagob-R",
        },
      });
    }
  }, []);

  return (
    <BrowserRouter basename={BASENAME}>
      <ClickToComponent />
      <AppTheme>
        <BasicLayout>
          <AppRouter />
        </BasicLayout>
      </AppTheme>
    </BrowserRouter>
  );
}

export default App;
