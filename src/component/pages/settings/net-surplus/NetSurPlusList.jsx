import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { useInView } from "react-intersection-observer";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite.jsx";
import Loadmore from "../../../partials/Loadmore.jsx";
import NoData from "../../../partials/NoData.jsx";
import SearchBar from "../../../partials/SearchBar.jsx";
import ServerError from "../../../partials/ServerError.jsx";
import ModalDeleteRestore from "../../../partials/modals/ModalDeleteRestore.jsx";
import TableSpinner from "../../../partials/spinners/TableSpinner.jsx";
import {
  numberWithCommas,
  pesoSign,
} from "../../../helpers/functions-general.jsx";
import { getComputedNetAllocation } from "./functions-net-surplus.jsx";

const NetSurPlusList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const [onSearch, setOnSearch] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const search = React.useRef(null);
  let counter = 1;
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
    queryKey: ["net-surplus", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/net-surplus/search/${search.current.value}`, // search endpoint
        `/v1/net-surplus/page/${pageParam}`, // list endpoint
        store.isSearch // search boolean
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

  const handleView = (item) => {
    dispatch(setIsConfirm(true));
    setItemEdit(item);
  };

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.net_surplus_aid);
    setData(item);
    setDel(true);
  };
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

      <div className="relative text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[8rem] ">Net Surplus Id</th>
              <th className="text-right pr-4 min-w-[10rem]">Total Income</th>
              <th className="text-right pr-4 min-w-[10rem]">
                Less: Operating Expenses
              </th>
              <th className="text-right pr-4 min-w-[10rem]">
                Before Distribution
              </th>
              <th className="text-right pr-4 min-w-[10rem]">
                Allocation of Net Surplus
              </th>
              <th className="text-right pr-4 min-w-[10rem]">
                Net Surplus for Distribution
              </th>

              <th className="max-w-[5rem] text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(status === "loading" || result?.pages[0].data.length === 0) && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  {status === "loading" && <TableSpinner />}
                  <NoData />
                </td>
              </tr>
            )}
            {error && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}

            {result?.pages.map((page, key) => (
              <React.Fragment key={key}>
                {page.data.map((item, key) => (
                  <tr key={key}>
                    <td> {counter++}.</td>
                    <td>{item.net_surplus_id}</td>
                    <td className="text-right pr-4 ">
                      {pesoSign}
                      {numberWithCommas(
                        Number(item.net_surplus_total_income).toFixed(2)
                      )}
                    </td>
                    <td className="text-right pr-4 ">
                      {pesoSign}
                      {numberWithCommas(
                        Number(item.net_surplus_operating_expenses).toFixed(2)
                      )}
                    </td>
                    <td className="text-right pr-4">
                      {pesoSign}
                      {numberWithCommas(
                        Number(item.net_surplus_before_amount).toFixed(2)
                      )}
                    </td>
                    <td className="text-right pr-4">
                      {pesoSign}
                      {numberWithCommas(
                        Number(item.net_surplus_distribution_amount).toFixed(2)
                      )}
                    </td>
                    <td className="text-right pr-4">
                      {pesoSign}
                      {numberWithCommas(
                        Number(getComputedNetAllocation(item)).toFixed(2)
                      )}
                    </td>

                    <td>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="btn-action-table tooltip-action-table"
                          data-tooltip="View"
                          onClick={() => handleView(item)}
                        >
                          <SlArrowRight className="inline" />
                        </button>
                        <button
                          type="button"
                          className="btn-action-table tooltip-action-table"
                          data-tooltip="Edit"
                          onClick={() => handleEdit(item)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          type="button"
                          className="btn-action-table tooltip-action-table"
                          data-tooltip="Delete"
                          onClick={() => handleDelete(item)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
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

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/net-surplus/${id}`}
          msg={"Are you sure you want to delete "}
          item={`${dataItem.net_surplus_id}`}
          arrKey="net-surplus"
        />
      )}
    </>
  );
};

export default NetSurPlusList;
