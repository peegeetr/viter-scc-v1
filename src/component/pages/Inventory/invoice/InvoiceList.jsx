import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaEnvelope } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { useInView } from "react-intersection-observer";
import { setIsAdd, setIsConfirm } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import Loadmore from "../../../partials/Loadmore";
import NoData from "../../../partials/NoData";
import SearchBar from "../../../partials/SearchBar";
import ServerError from "../../../partials/ServerError";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import ModalViewProductInvoice from "./ModalViewProductInvoice";
import ModalConfirm from "../../../partials/modals/ModalConfirm";

const InvoiceList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
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
    queryKey: ["orders", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/orders/invoice/search/${search.current.value}`, // search endpoint
        `/v1/orders/invoice/page/${pageParam}`, // list endpoint
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

  const handleViewInvoice = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleSentInvoice = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.orders_aid);
    setData(item);
    setDel(true);
  };
  // console.log(result);
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

      <div className="text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[10rem]">Name</th>
              <th className="min-w-[5rem] text-center">Products Count</th>

              <th className="max-w-[5rem] ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(status === "loading" || result?.pages[0].data.length === 0) && (
              <tr className="text-center relative">
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
                    <td>{`${item.members_last_name}, ${item.members_first_name}`}</td>
                    <td className="text-center">{item.countProduct}</td>

                    <td className="text-right pr-4">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          className="btn-action-table tooltip-action-table"
                          data-tooltip="Sent Invoice"
                          onClick={() => handleSentInvoice(item)}
                        >
                          <FaEnvelope />
                        </button>
                        <button
                          type="button"
                          className="btn-action-table tooltip-action-table"
                          data-tooltip="View"
                          onClick={() => handleViewInvoice(item)}
                        >
                          <SlArrowRight />
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

      {store.isAdd && <ModalViewProductInvoice item={itemEdit} />}
      {store.isConfirm && (
        <ModalConfirm
          id={id}
          isDel={isDel}
          mysqlApiReset={`/v1/user-others/reset`}
          msg={"Are you sure you want to sent invoice"}
          item={`${dataItem.members_email}`}
          arrKey="otherUsers"
        />
      )}
    </>
  );
};

export default InvoiceList;
