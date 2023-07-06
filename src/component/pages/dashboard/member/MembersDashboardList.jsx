import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaBullhorn } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { StoreContext } from "../../../../store/StoreContext";
import { formatDate } from "../../../helpers/functions-general";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import Loadmore from "../../../partials/Loadmore";
import SearchBar from "../../../partials/SearchBar";
import ServerError from "../../../partials/ServerError";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import { queryDataInfiniteSearch } from "../../../helpers/queryDataInfiniteSearch";
const MemberDashboardList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [onSearch, setOnSearch] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const search = React.useRef(null);
  const { ref, inView } = useInView();
  // use if with loadmore button and search bar
  const {
    data: result,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["announcement", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfiniteSearch(
        `/v1/announcement/member/search`, // search endpoint
        `/v1/announcement/member/page/${pageParam}`, // list endpoint
        store.isSearch, // search boolean
        "post",
        { search: search.current.value }
      ),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total) {
        return lastPage.page + lastPage.count;
      }
      return;
    },
    refetchOnWindowFocus: false,
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
      <SearchBar
        search={search}
        dispatch={dispatch}
        store={store}
        result={result?.pages}
        isFetching={isFetching}
        setOnSearch={setOnSearch}
        onSearch={onSearch}
      />
      <div className="rounded-md mb-8 order-1 md:order-0 border px-2">
        <div className="pb-3">
          {result?.pages.map((page, key) => (
            <React.Fragment key={key}>
              {page.data.map((item, key) => (
                <div
                  key={key}
                  className="mb-3 border-b border-solid border-gray-100 p-2 rounded-md relative"
                >
                  <div className="grid  grid-cols-[50px_1fr] md:grid-cols-[70px_1fr] gap-2 items-center">
                    <div className="justify-self-center basis-20 ">
                      <span className="text-3xl">
                        <FaBullhorn />
                      </span>
                    </div>

                    <div className="w-full py-1 md:flex block items-center justify-between">
                      <div>
                        <small className="text-xs ">
                          Date: {formatDate(item.announcement_date)}
                        </small>
                        <p className="text-sm font-semibold m-0">
                          {item.announcement_name}
                        </p>
                        <p className="text-xs max-w-[650px] w-full m-0">
                          {item.announcement_name}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}

          {(status === "loading" || result?.pages[0].data.length === 0) && (
            <div className="relative mt-8">
              {status === "loading" && <TableSpinner />}
              <span className="text-6xl text-gray-400">
                <FaBullhorn className="m-auto" />
              </span>
              <p className="text-center mt-2">No announcement yet.</p>
            </div>
          )}
          {error && <ServerError iconSize={"6xl"} textSize={"xl"} />}
          <div className="text-center">
            <Loadmore
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              hasNextPage={hasNextPage}
              result={result?.pages[0]}
              setPage={setPage}
              page={page}
              refView={ref}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MemberDashboardList;
