import { Environments, SessionUser, useAuthStore } from "@shared/infra";
import { useNavigate } from "react-router-dom";
import { Login } from "../../../components";

export const OpenSession = () => {
  const navigate = useNavigate();
  const loginUser = useAuthStore((state) => state.loginUser);
  const targetPath = useAuthStore((state) => state.targetPath);

  const openSession = async (session: SessionUser) => {
    localStorage.clear();
    await loginUser(session);

    if (targetPath) {
      targetPath.isNavigate
        ? navigate(targetPath.path)
        : (window.location.href = targetPath.path ?? Environments.Domain);
    }
  };

  return <Login onSubmit={openSession} />;
};
