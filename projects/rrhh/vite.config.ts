import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: env.BASENAME,
    plugins: [react()],
    envPrefix: "REACT_APP_",

    optimizeDeps: {
      include: ["@mui/material/Tooltip"],
    },

    resolve: {
      alias: {
        "#application": path.resolve(__dirname, "./src/application"),
        "#infraestructure": path.resolve(__dirname, "./src/infraestructure"),
        "#ui": path.resolve(__dirname, "./src/ui"),
      },
    },

    server: {
      host: true,
    },

    build: {
      outDir: "dist-" + mode,
      emptyOutDir: true
    },

    define: {
      "process.env.BASENAME": JSON.stringify(env.BASENAME),
      "process.env.GA_TRACKING_ID": JSON.stringify(env.GA_TRACKING_ID),
      "process.env.REACT_APP_DOMAIN": JSON.stringify(env.REACT_APP_DOMAIN),
      "process.env.REACT_APP_RECAPTCHA_API_KEY": JSON.stringify(
        env.REACT_APP_RECAPTCHA_API_KEY
      ),
      "process.env.REACT_APP_IS_PRODUCTION": JSON.stringify(
        env.REACT_APP_IS_PRODUCTION
      ),
      "process.env.REACT_APP_API_MACROCLICK": JSON.stringify(
        env.REACT_APP_API_MACROCLICK
      ),
      "process.env.REACT_APP_API_COMMONS": JSON.stringify(
        env.REACT_APP_API_COMMONS
      ),
    },
  };
});
