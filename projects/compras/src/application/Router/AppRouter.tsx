import { lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuthStore } from "@shared/infra";
import { PublicRoute } from "@shared/ui";
import { Paths } from "./paths";

const TendersPage = lazy(() => import("../Sections/Tenders/pages"));

export const AppRouter = () => {
  const location = useLocation();
  const cleanTargetPath = useAuthStore((state) => state.cleanTargetPath);

  useEffect(() => {
    cleanTargetPath();
  }, [location]);

  return (
    <Routes>
      <Route
        path={Paths.LICITACIONES}
        element={
          <PublicRoute>
            <TendersPage />
          </PublicRoute>
        }
      />

      <Route path="/*" element={<Navigate to={Paths.LICITACIONES} />} />
    </Routes>
  );
};
