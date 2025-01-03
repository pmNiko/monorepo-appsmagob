import { lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuthStore } from "@shared/infra";
import { PublicRoute } from "@shared/ui";
import { Paths } from "./paths";

const RegisterPage = lazy(() =>
  import("../Sections/HousingDemand/pages/HousingDemandRegister")
);
const RegisterInstitutionsPage = lazy(() =>
  import("../Sections/HousingDemand/pages/HousingDemandInstitutions")
);
const BeneficiariesPage = lazy(() =>
  import("../Sections/HousingDemand/pages/HousingDemandBeneficiaries")
);
const SubstitutesPage = lazy(() =>
  import("../Sections/HousingDemand/pages/HousingDemandSubstitutes")
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
        path={Paths.REGISTRO_DEMANDA_HABITACIONAL}
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />
      <Route
        path={Paths.REGISTRO_INSTITUCIONES_DEMANDA_HABITACIONAL}
        element={
          <PublicRoute>
            <RegisterInstitutionsPage />
          </PublicRoute>
        }
      />
      <Route
        path={Paths.SORTEO_DEMANDA_HABITACIONAL}
        element={
          <PublicRoute>
            <BeneficiariesPage />
          </PublicRoute>
        }
      />
      <Route
        path={Paths.SUPLENTES_SORTEO_DEMANDA_HABITACIONAL}
        element={
          <PublicRoute>
            <SubstitutesPage />
          </PublicRoute>
        }
      />

      <Route
        path="/*"
        element={<Navigate to={Paths.REGISTRO_DEMANDA_HABITACIONAL} />}
      />
    </Routes>
  );
};
