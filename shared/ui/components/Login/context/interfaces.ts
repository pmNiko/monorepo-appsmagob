import { SignInResponse } from "../interfaces";

export interface LoginState {
  renderComponent: () => JSX.Element;
  successAction: (data: SignInResponse) => void;
}

export interface LoginStateContext extends LoginState {
  goSignIn: () => void;
  goForgotPassword: () => void;
  // goChangePassword: () => void;
  // goChangeEmail: () => void;
}
