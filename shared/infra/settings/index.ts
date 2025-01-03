export const Environments = {
  Basename: process.env.BASENAME,
  GaTrackingID: process.env.GA_TRACKING_ID,
  IsProduction: process.env.REACT_APP_IS_PRODUCTION || false,
  Domain: process.env.REACT_APP_DOMAIN! ?? "http://dev.smandes.gov.ar",
  ApiMacroClick: process.env.REACT_APP_API_MACROCLICK!,
};
