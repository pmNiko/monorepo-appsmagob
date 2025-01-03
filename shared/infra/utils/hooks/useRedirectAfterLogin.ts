import { useAuthStore } from "../../auth";
import { useEffect } from "react";

interface Props {
  isNavigate?: boolean;
  path: string;
}

export const useRedirectAfterLogin = ({ isNavigate = true, path }: Props) => {
  const isLogged = useAuthStore((state) => state.isLogged);
  const settargetPath = useAuthStore((state) => state.setTargetPath);
  const cleanTargetPath = useAuthStore((state) => state.cleanTargetPath);

  useEffect(() => {
    if (!isLogged) {
      settargetPath({ isNavigate, path });
    }

    return () => {
      cleanTargetPath();
    };
  }, []);

  return {};
};
