import { CircularProgress } from "@mui/material";

interface Props {
  isLoading: boolean;
  fallback?: JSX.Element;
  children: JSX.Element;
}

export const LoaderAsync = ({ isLoading, fallback, children }: Props) => {
  if (isLoading && !fallback) return <CircularProgress />;

  if (isLoading && fallback) return <>{fallback}</>;

  return <>{children}</>;
};
