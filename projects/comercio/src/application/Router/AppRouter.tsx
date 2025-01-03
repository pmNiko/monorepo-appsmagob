import { lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useAuthStore } from "@shared/infra";
import { PrivateRoute, PublicRoute } from "@shared/ui";
import { Paths } from "./paths";

const DDJJListPage = lazy(() => import("../Sections/DDJJ/pages/DDJJListPage"));
const ProcedureCheckingPage = lazy(() =>
  import("../Sections/CommercialLicense/pages")
);

export const AppRouter = () => {
  const location = useLocation();
  const cleanTargetPath = useAuthStore((state) => state.cleanTargetPath);

  useEffect(() => {
    cleanTargetPath();
  }, [location]);

  return (
    <Routes>
      <Route
        path={Paths.DDJJ}
        element={
          <PrivateRoute>
            <DDJJListPage />
          </PrivateRoute>
        }
      />

      <Route
        path={Paths.LICENCIA}
        element={
          <PublicRoute>
            <ProcedureCheckingPage />
          </PublicRoute>
        }
      />
    </Routes>
  );
};
