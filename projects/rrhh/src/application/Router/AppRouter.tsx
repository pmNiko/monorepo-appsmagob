import { lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuthStore } from "@shared/infra";
import { Paths } from "./paths";

const SalaryReceiptFindPage = lazy(() =>
  import("../Sections/SalaryReceipt/pages/SalaryReceiptFind")
);
const EmailSentSuccessfullyPage = lazy(() =>
  import("../Sections/SalaryReceipt/pages/EmailSentSuccessfully")
);
const SalaryReceiptDownloadPage = lazy(() =>
  import("../Sections/SalaryReceipt/pages/SalaryReceiptDownload")
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
        path={Paths.SOLICITUD_RECIBO_HABERES}
        element={<SalaryReceiptFindPage />}
      />
      <Route path={Paths.ENVIO_OK} element={<EmailSentSuccessfullyPage />} />
      <Route
        path={Paths.DESCARGA_RECIBO}
        element={<SalaryReceiptDownloadPage />}
      />

      <Route
        path="/*"
        element={<Navigate to={Paths.SOLICITUD_RECIBO_HABERES} />}
      />
    </Routes>
  );
};
