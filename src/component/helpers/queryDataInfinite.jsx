import { queryData } from "./queryData";

export const queryDataInfinite = (
  urlSearch,
  urlList,
  isSearch,
  method = "get",
  fd = {}
) => {
  return queryData(isSearch ? urlSearch : urlList, method, fd);
};
