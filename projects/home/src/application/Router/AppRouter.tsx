import { lazy, useEffect } from "react";
import { useAuthStore } from "@shared/infra";
import { PrivateRoute, PublicRoute } from "@shared/ui";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Paths } from "./paths";

const HomePage = lazy(() => import("../Home/pages"));
const Dashboard = lazy(() => import("../Auth/pages"));

export const AppRouter = () => {
  const location = useLocation();
  const cleanTargetPath = useAuthStore((state) => state.cleanTargetPath);

  useEffect(() => {
    cleanTargetPath();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Routes>
      <Route
        path={Paths.DASHBOARD}
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path={Paths.HOME}
        element={
          <PublicRoute>
            <HomePage />
          </PublicRoute>
        }
      />

      <Route path="/*" element={<Navigate to={Paths.HOME} />} />
    </Routes>
  );
};
