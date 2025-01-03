import { lazy, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuthStore } from "@shared/infra";

import { Paths } from "./paths";
import { PrivateRoute, PublicRoute, RestrictedRoute } from "@shared/ui";
import { TariffPoints } from "#application/Sections/Tariff/pages/TariffPoints";

//? ------------------ Recibos de Pago  ---------------- */
const ReceiptFinderPage = lazy(() =>
  import("#application/Sections/Receipt/pages/ReceiptFinderPage")
);
const ReceiptsListPage = lazy(() =>
  import("#application/Sections/Receipt/pages/ReceiptsListPage")
);

//? --------------- Comprobantes de Pago  --------------- */
const PaymentReceiptListPage = lazy(() =>
  import("#application/Sections/PaymentReceipt/pages/PaymentReceiptListPage")
);

//? --------------- Adhesion de Tributos  --------------- */
const AdhesionReceiptFinderPage = lazy(() =>
  import("#application/Sections/Adhesion/pages/AdhesionReceiptFinderPage")
);
const AdhesionReceiptListPage = lazy(() =>
  import("#application/Sections/Adhesion/pages/AdhesionReceiptListPage")
);
const AdhesionConfirmPagePage = lazy(() =>
  import("#application/Sections/Adhesion/pages/AdhesionReceiptConfirmPage")
);

//? --------------- Link de Pago por Email  --------------- */
const MacroPayByLink = lazy(() =>
  import("#application/Sections/Macro/pages/MacroPayByLink")
);

//? --------------- Descarga de Recibos  --------------- */
const DownloadReceiptByLinkPage = lazy(() =>
  import(
    "#application/Sections/DownloadReceipt/pages/DownloadReceiptByLinkPage"
  )
);

export const AppRouter = () => {
  const location = useLocation();
  const cleanTargetPath = useAuthStore((state) => state.cleanTargetPath);

  useEffect(() => {
    cleanTargetPath();
  }, [location]);

  return (
    <Routes>
      {/* ------------------ Recibos de Pago  ---------------- */}
      <Route
        path={Paths.BUSQUEDA_DE_RECIBOS}
        element={
          <RestrictedRoute defaultPath={Paths.LISTADO_DE_RECIBOS}>
            <ReceiptFinderPage />
          </RestrictedRoute>
        }
      />
      <Route
        path={Paths.LISTADO_DE_RECIBOS}
        element={
          <PublicRoute>
            <ReceiptsListPage />
          </PublicRoute>
        }
      />
      <Route
        path={Paths.LISTADO_DE_RECIBOS_POR_QR}
        element={
          <PublicRoute>
            <ReceiptsListPage />
          </PublicRoute>
        }
      />

      {/* --------------- Comprobantes de Pago  --------------- */}
      <Route
        path={Paths.LISTADO_COMPROBANTES_DE_PAGO}
        element={
          <PrivateRoute>
            <PaymentReceiptListPage />
          </PrivateRoute>
        }
      />

      {/* --------------- Adhesion de Tributos  --------------- */}
      <Route
        path={Paths.BUSQUEDA_DE_RECIBOS_PARA_ADHERIR}
        element={
          <RestrictedRoute defaultPath={Paths.LISTADO_RECIBOS_PARA_ADHERIR}>
            <AdhesionReceiptFinderPage />
          </RestrictedRoute>
        }
      />
      <Route
        path={Paths.LISTADO_RECIBOS_PARA_ADHERIR}
        element={
          <PublicRoute>
            <AdhesionReceiptListPage />
          </PublicRoute>
        }
      />
      <Route
        path={Paths.CONFIRMACION_ADHESION_POR_EMAIL}
        element={
          <PublicRoute>
            <AdhesionConfirmPagePage />
          </PublicRoute>
        }
      />

      {/* --------------- Link de Pago por Email  --------------- */}
      <Route
        path={Paths.LINK_DE_PAGO}
        element={
          <PublicRoute>
            <MacroPayByLink />
          </PublicRoute>
        }
      />

      {/* --------------- Descarga de Recibos  --------------- */}
      <Route
        path={Paths.DESCARGA_DE_RECIBO}
        element={
          <PublicRoute>
            <DownloadReceiptByLinkPage />
          </PublicRoute>
        }
      />

      {/* --------------- Tarifaria  --------------- */}
      <Route
        path={Paths.TARIFARIA}
        element={
          <PublicRoute>
            <TariffPoints />
          </PublicRoute>
        }
      />

      <Route path="/*" element={<Navigate to={Paths.BUSQUEDA_DE_RECIBOS} />} />
    </Routes>
  );
};
