import { useEffect, useState } from "react";
import { sleep } from "../../utils";

export const useMockGetHttp = <T>({
  fakeData,
  hasError = false,
}: {
  fakeData: T;
  hasError?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<null | T>();

  useEffect(() => {
    if (hasError) {
      throw new Error("should not be called");
    }

    (async () => {
      await sleep(500);
      setData(fakeData);
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isLoading,
    data,
  };
};
