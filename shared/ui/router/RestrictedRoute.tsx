import { useAuthStore } from "@shared/infra";
import { Suspense, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { SkeletonPage } from "../components";

interface Props {
  children: JSX.Element;
  defaultPath: string;
}

export const RestrictedRoute = ({ children, defaultPath }: Props) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isRedirect, setIsRedirect] = useState<null | boolean>();
  const isLogged = useAuthStore((state) => state.isLogged);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const logoutUser = useAuthStore((state) => state.logoutUser);

  const checkSession = () => {
    checkAuth()
      .then((session) => {
        if (session) {
          setIsRedirect(true);
        } else {
          logoutUser();
          setIsRedirect(false);
        }
      })
      .catch(() => {
        logoutUser();
        setIsRedirect(false);
      })
      .finally(void setIsChecking(false));
  };

  const continueOk = () => {
    logoutUser();
    setIsChecking(false);
    setIsRedirect(false);
  };

  useEffect(() => {
    isLogged ? checkSession() : continueOk();
  }, []);

  if (isChecking) return <SkeletonPage />;

  return isRedirect ? (
    <Navigate to={defaultPath} />
  ) : (
    <Suspense fallback={<SkeletonPage />}>{children}</Suspense>
  );
};
