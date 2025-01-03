import { lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuthStore } from "@shared/infra";
import { PublicRoute } from "@shared/ui";
import { Paths } from "./paths";

const AutoritiesPage = lazy(() => import("../Sections/Autorities/pages"));
const SalariesPage = lazy(() => import("../Sections/Salaries/pages"));
const FileTrackingPage = lazy(() => import("../Sections/FileTracking/pages"));

export const AppRouter = () => {
  const location = useLocation();
  const cleanTargetPath = useAuthStore((state) => state.cleanTargetPath);

  useEffect(() => {
    cleanTargetPath();
  }, [location]);

  return (
    <Routes>
      <Route
        path={Paths.AUTHORITIES}
        element={
          <PublicRoute>
            <AutoritiesPage />
          </PublicRoute>
        }
      />
      <Route
        path={Paths.SALARIES}
        element={
          <PublicRoute>
            <SalariesPage />
          </PublicRoute>
        }
      />
      <Route
        path={Paths.FILE_TRACKING}
        element={
          <PublicRoute>
            <FileTrackingPage />
          </PublicRoute>
        }
      />

      <Route path="/*" element={<Navigate to={Paths.AUTHORITIES} />} />
    </Routes>
  );
};
