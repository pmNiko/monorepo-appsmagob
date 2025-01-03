import { Environments } from "../../settings";

export const disableButton = (validCaptcha: boolean, onlyProduction = true) => {
  if (onlyProduction && !Environments.IsProduction) return false;

  return !validCaptcha;
};
