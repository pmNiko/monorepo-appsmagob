import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDownload } from "usedownloadmunisma";
import { useRedirectPreviousPage } from "@shared/infra";
import { Paths } from "#application/Router";

export const useDownloadReceipt = () => {
  const { goBack } = useRedirectPreviousPage(Paths.BUSQUEDA_DE_RECIBOS);
  const [queryParams] = useSearchParams();
  const handleDownload = useDownload();

  useEffect(() => {
    const tokenParam = queryParams.get("token");
    const idParam = queryParams.get("id");
    const zipParam = queryParams.get("zip");

    const link = tokenParam || idParam || zipParam;

    !link && goBack();

    handleDownload.setToken(tokenParam);
    handleDownload.setId(idParam);
    handleDownload.setZip(zipParam);
  }, []);

  return {
    onclick: handleDownload.receiptByLink,
    isLoading: handleDownload.isFetching,
    progress: handleDownload.progress,
  };
};
