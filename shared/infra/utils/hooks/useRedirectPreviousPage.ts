import { useAuthStore } from "../..//auth";
import { Environments } from "../..//settings";
import { useNavigate } from "react-router-dom";

const dashboardPath = "/inicio/ov";

export const useRedirectPreviousPage = (
  sessionlessRedirect?: string,
  extraAction?: () => void
) => {
  const navigate = useNavigate();
  const isLogged = useAuthStore((state) => state.isLogged);
  const clearAllExceptAuthStore = useAuthStore(
    (state) => state.clearAllExceptAuthStore
  );

  const goBack = async () => {
    clearAllExceptAuthStore();

    extraAction && extraAction();

    if (isLogged) {
      window.location.href = Environments.Domain + dashboardPath;
    } else {
      sessionlessRedirect
        ? navigate(sessionlessRedirect)
        : (window.location.href = Environments.Domain);
    }
  };

  return {
    goBack,
  };
};
