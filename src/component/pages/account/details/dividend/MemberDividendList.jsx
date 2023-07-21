import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { useInView } from "react-intersection-observer";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import {
  formatDate,
  getUrlParam,
  numberWithCommas,
  pesoSign,
} from "../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import Loadmore from "../../../../partials/Loadmore";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import StatusActive from "../../../../partials/status/StatusActive";
import StatusInactive from "../../../../partials/status/StatusInactive";
import StatusPending from "../../../../partials/status/StatusPending";

const MemberDividendList = ({ memberName, isLoading, menu }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const [onSearch, setOnSearch] = React.useState(false);
  const [filter, setFilter] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [page, setPage] = React.useState(1);
  let counter = 1;
  const search = React.useRef(null);
  const memberid = getUrlParam().get("memberid");
  const { ref, inView } = useInView();
  // use if with loadmore button and search bar
  let empid =
    menu === "members" ? memberid : store.credentials.data.members_aid;

  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    // queryKey: ["my-order", onSearch, store.isSearch],
    queryKey: ["my-order", onSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/my-order/filter/by-member-id/${empid}`, // filter endpoint // filter
        `/v1/my-order/page/by-member-id/${pageParam}/${empid}`, // list endpoint
        filter, // search boolean
        "post",
        { value }
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    // refetchOnWindowFocus: false,
    networkMode: "always",
    cacheTime: 200,
  });

  React.useEffect(() => {
    if (inView) {
      setPage((prev) => prev + 1);
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      {isLoading ? (
        <TableSpinner />
      ) : memberName?.data.length > 0 ? (
        <>
          {menu === "members" && (
            <p className="m-0 text-primary">
              <span className="pr-4 font-bold">Member Name :</span>
              {isLoading === "loading"
                ? "Loading..."
                : `${memberName?.data[0].members_last_name}, ${memberName?.data[0].members_first_name}`}
            </p>
          )}
          <div>
            <div className="grid grid-cols-2">
              <div className="mt-3 grid grid-cols-3 gap-1 items-center ">
                <p className="mb-0 bg-gray-100 p-2">
                  Total Average Shares Months
                </p>
                <p className="mb-0 bg-gray-100 pl-2 py-2 pr-4 text-right">0</p>
                <p className="mb-0 bg-gray-100 pl-2 py-2 pr-4 text-right">0</p>
              </div>
              <div></div>
            </div>
          </div>
        </>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default MemberDividendList;
