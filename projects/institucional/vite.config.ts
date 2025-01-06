import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { BASENAME } from "./src/settings";

export default defineConfig(({ mode }) => {
  const rootDir = path.resolve(__dirname, "../../"); // Ajustar según tu estructura
  const env = loadEnv(mode, rootDir, ""); // Cargar .env desde el root

  return {
    base: BASENAME,
    plugins: [react()],
    envPrefix: "REACT_APP_",

    optimizeDeps: {
      include: ["@mui/material/Tooltip"],
    },

    resolve: {
      alias: {
        "#application": path.resolve(__dirname, "./src/application"),
      },
    },

    server: {
      host: true,
    },

    build: {
      outDir: "dist",
      emptyOutDir: true,
    },

    define: {
      "process.env.GA_TRACKING_ID": JSON.stringify(env.GA_TRACKING_ID),
      "process.env.REACT_APP_DOMAIN": JSON.stringify(env.REACT_APP_DOMAIN),
      "process.env.REACT_APP_IS_PRODUCTION": JSON.stringify(
        env.REACT_APP_IS_PRODUCTION
      ),
      "process.env.REACT_APP_API_MACROCLICK": JSON.stringify(
        env.REACT_APP_API_MACROCLICK
      ),
    },
  };
});
