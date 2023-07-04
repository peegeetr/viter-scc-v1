import { useQuery } from "@tanstack/react-query";
import { queryData } from "../helpers/queryData";

// Queries hook
const useQueryData = (
  endpoint,
  method,
  key = "",
  fd = {},
  id = null,
  item = null
) => {
  return useQuery({
    queryKey: [key, id, item],
    queryFn: () => queryData(endpoint, method, fd),
    retry: false,
    refetchOnWindowFocus: true,
    networkMode: "always",
    cacheTime: 1000,
  });
};

export default useQueryData;
