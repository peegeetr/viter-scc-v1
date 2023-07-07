import { queryData } from "./queryData";

export const queryDataInfiniteOld = (urlSearch, urlList, isSearch) => {
  return queryData(isSearch ? urlSearch : urlList, "get", {});
};
