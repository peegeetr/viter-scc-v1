import { queryData } from "./queryData";

export const queryDataInfiniteSearch = (
  urlSearch,
  urlList,
  isSearch,
  method = "get",
  fd = {}
) => {
  return queryData(isSearch ? urlSearch : urlList, method, fd);
};
