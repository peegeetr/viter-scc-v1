import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { setIsAdd } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import { numberWithCommas, pesoSign } from "../../../helpers/functions-general";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import Loadmore from "../../../partials/Loadmore";
import NoData from "../../../partials/NoData";
import SearchBar from "../../../partials/SearchBar";
import ServerError from "../../../partials/ServerError";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import StatusQuantity from "../../../partials/status/StatusQuantity";
import ModalUpdateProducts from "./ModalUpdateProducts";
import { getPendingOrders, getRemaningQuantity } from "./functions-product";

const ProductsList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
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
    queryKey: ["all-product", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/suppliers-product/search`, // search endpoint
        `/v1/product/page/${pageParam}`, // list endpoint
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

  // use if not loadmore button undertime
  const { data: pendingAllOrder, isLoading } = useQueryData(
    `/v1/orders/all-pending`, // endpoint
    "get", // method
    "pendingAllOrder" // key
  );

  const handleEdit = (item) => {
    // check if have pending
    // can't edit if have pending
    if (getPendingOrders(pendingAllOrder, item, dispatch)) {
      return;
    }
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  // use if not loadmore button undertime
  const { data: stocksGroupProd } = useQueryData(
    `/v1/stocks/group-by-prod`, // endpoint
    "get", // method
    "stocksGroupProd" // key
  );
  // use if not loadmore button undertime
  const { data: orderGroupProd } = useQueryData(
    `/v1/orders/group-by-prod`, // endpoint
    "get", // method
    "orderGroupProd" // key
  );
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
              <th className="min-w-[6rem]">Product #</th>
              <th className="min-w-[6rem]">Category</th>
              <th className="min-w-[6rem]">Supplier</th>
              <th className="min-w-[8rem]">Product</th>
              <th className="min-w-[8rem] text-right">Supplier Price</th>
              <th className="min-w-[8rem] text-right">SCC Price</th>
              <th className="min-w-[8rem] text-right">Market Price</th>
              <th className="min-w-[8rem] text-center">Remaning Qty</th>
              {(store.credentials.data.role_is_admin === 1 ||
                store.credentials.data.role_is_developer === 1 ||
                store.credentials.data.role_is_manager === 1) && (
                <th className="max-w-[5rem] text-right">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {(isLoading ||
              status === "loading" ||
              result?.pages[0].data.length === 0) && (
              <tr className="text-center relative">
                <td colSpan="100%" className="p-10">
                  {(isLoading || status === "loading") && <TableSpinner />}
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
                    <td className="uppercase">
                      {item.suppliers_products_number}
                    </td>
                    <td>{item.product_category_name}</td>
                    <td>{item.suppliers_company_name}</td>
                    <td>{item.suppliers_products_name}</td>
                    <td className="text-right">
                      {pesoSign}{" "}
                      {numberWithCommas(
                        Number(item.suppliers_products_price).toFixed(2)
                      )}
                    </td>
                    <td className="text-right">
                      {pesoSign}{" "}
                      {numberWithCommas(
                        Number(item.suppliers_products_scc_price).toFixed(2)
                      )}
                    </td>
                    <td className="text-right">
                      {pesoSign}
                      {numberWithCommas(
                        Number(item.suppliers_products_market_price).toFixed(2)
                      )}
                    </td>
                    <td className="text-center">
                      <StatusQuantity
                        text={getRemaningQuantity(
                          item,
                          stocksGroupProd,
                          orderGroupProd
                        )}
                      />
                    </td>
                    {(store.credentials.data.role_is_admin === 1 ||
                      store.credentials.data.role_is_developer === 1 ||
                      store.credentials.data.role_is_manager === 1) && (
                      <td className=" text-right">
                        <div className="gap-1">
                          <button
                            type="button"
                            className="btn-action-table tooltip-action-table"
                            data-tooltip="Edit"
                            onClick={() => handleEdit(item)}
                          >
                            <FaEdit />
                          </button>
                        </div>
                      </td>
                    )}
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

      {store.isAdd && <ModalUpdateProducts item={itemEdit} />}
    </>
  );
};

export default ProductsList;
