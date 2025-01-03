import { HOC, useAuthStore } from "@shared/infra";
import { Suspense, useEffect } from "react";
import { SkeletonPage } from "../components";

export const PublicRoute = ({ children }: HOC) => {
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Suspense fallback={<SkeletonPage />}>{children}</Suspense>;
};
