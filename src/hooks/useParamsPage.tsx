import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const useParamsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setPage = useCallback(
    (page: string | number) => {
      searchParams.set("page", String(page));
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  return { searchParams, setPage, setSearchParams };
};

export default useParamsPage;
