import { useQuery } from "@tanstack/react-query";
import { queryData } from "../helpers/queryData";

// Queries hook
const useQueryData = (endpoint, method, key = "", fd = {}, id = null) => {
  return useQuery({
    queryKey: [key, id],
    queryFn: () => queryData(endpoint, method, fd),
    retry: false,
    refetchOnWindowFocus: false,
    always: true,
    networkMode: 'always',
  });
};

export default useQueryData;
