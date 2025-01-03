import { HOC, useAuthStore } from "@shared/infra";
import { Suspense, useEffect, useState } from "react";
import { SkeletonPage } from "../components";

/** PrivateRoute
 * - Chequea sesión en la carga del componente
 * - Si válida renderea la página solicitada
 * - De lo contrario renderea un skeleton y abre el login
 */
export const PrivateRoute = ({ children }: HOC) => {
  const [isChecking, setIsChecking] = useState(true);
  const isLogged = useAuthStore((state) => state.isLogged);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const openBlockedModal = useAuthStore((state) => state.openBlockedModal);
  const closeBlockedModal = useAuthStore((state) => state.closeBlockedModal);

  const checkSession = () => {
    checkAuth()
      .then((successfull) => {
        if (successfull) {
          closeBlockedModal();
          setIsChecking(false);
        } else {
          openBlockedModal();
        }
      })
      .catch(openBlockedModal);
  };

  useEffect(() => {
    isLogged ? checkSession() : openBlockedModal();
  }, []);

  if (isLogged)
    return <Suspense fallback={<SkeletonPage />}>{children}</Suspense>;

  if (isChecking) return <SkeletonPage />;
};
