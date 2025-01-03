import { lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuthStore } from "@shared/infra";

import { Paths } from "./paths";

const Error404Page = lazy(() => import("../Sections/Errores/Error404Page"));

export const AppRouter = () => {
  const location = useLocation();
  const cleanTargetPath = useAuthStore((state) => state.cleanTargetPath);

  useEffect(() => {
    cleanTargetPath();
  }, [location]);

  return (
    <Routes>
      <Route path={Paths.ERROR_404} element={<Error404Page />} />

      <Route path="/*" element={<Navigate to={Paths.ERROR_404} />} />
    </Routes>
  );
};
