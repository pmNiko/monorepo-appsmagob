import { LoginState } from "./interfaces";
import { Sign } from "../Sign";
import { ForgotPassword } from "../ForgotPassword";

export const initialState: LoginState = {
  renderComponent: Sign,
  successAction: () => {},
};

export type LoginActions = { type: "goSignIn" } | { type: "goForgotPassword" };
// | { type: "goChangePassword" }
// | { type: "goChangeEmail" };

export const loginReducer = (
  loginState: LoginState,
  action: LoginActions
): LoginState => {
  switch (action.type) {
    case "goSignIn":
      return {
        ...loginState,
        renderComponent: Sign,
      };
    case "goForgotPassword":
      return {
        ...loginState,
        renderComponent: ForgotPassword,
      };
    // case "goChangePassword":
    //   return {
    //     ...loginState,
    //     renderComponent: "changePassword",
    //   };
    // case "goChangeEmail":
    //   return {
    //     ...loginState,
    //     renderComponent: "changeEmail",
    //   };

    default:
      return loginState;
  }
};
