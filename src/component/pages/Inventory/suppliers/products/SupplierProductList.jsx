import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { setIsAdd, setIsRestore } from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import {
  getUrlParam,
  getUserType,
  numberWithCommas,
  pesoSign,
} from "../../../../helpers/functions-general";
import { queryDataInfinite } from "../../../../helpers/queryDataInfinite";
import Loadmore from "../../../../partials/Loadmore";
import NoData from "../../../../partials/NoData";
import SearchBar from "../../../../partials/SearchBar";
import ServerError from "../../../../partials/ServerError";
import ModalDeleteRestore from "../../../../partials/modals/ModalDeleteRestore";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import { getPendingOrders } from "../../products/functions-product";
import { Link } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";

const SupplierProductList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const urlLink = getUserType(store);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const [onSearch, setOnSearch] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const supplierId = getUrlParam().get("supplierId");
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
    queryKey: ["suppliers-product", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/suppliers-product/search-by-id/${supplierId}/${search.current.value}`, // search endpoint
        `/v1/suppliers-product/page/supplier-id/${pageParam}/${supplierId}`, // list endpoint
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

  // use if not loadmore button undertime
  const { data: pendingAllOrder } = useQueryData(
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

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.suppliers_products_aid);
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

      <div className="text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[15rem] w-[15rem]">Product Name</th>
              <th className="min-w-[10rem] w-[15rem] text-right pr-8">
                Supplier Price
              </th>
              <th className="min-w-[10rem] ">Product Category</th>

              {(store.credentials.data.role_is_admin === 1 ||
                store.credentials.data.role_is_developer === 1 ||
                store.credentials.data.role_is_manager === 1) && (
                <th className="max-w-[5rem]">Actions</th>
              )}
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
                    <td>{item.suppliers_products_name}</td>
                    <td className=" pr-8 text-right">
                      {pesoSign}{" "}
                      {numberWithCommas(
                        Number(item.suppliers_products_price).toFixed(2)
                      )}
                    </td>
                    <td>{item.product_category_name}</td>

                    {(store.credentials.data.role_is_admin === 1 ||
                      store.credentials.data.role_is_developer === 1 ||
                      store.credentials.data.role_is_manager === 1) && (
                      <td>
                        {" "}
                        <div className="flex items-center gap-1">
                          <Link
                            to={`${urlLink}/inventory/suppliers/products/history?supplierId=${item.suppliers_aid}&supplierProductId=${item.suppliers_products_aid}`}
                            className="btn-action-table tooltip-action-table"
                            data-tooltip="View"
                          >
                            <SlArrowRight className="inline" />
                          </Link>
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

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/suppliers-product/${id}`}
          msg={"Are you sure you want to delete "}
          item={`${dataItem.suppliers_products_name}`}
          arrKey="suppliers-product"
        />
      )}
    </>
  );
};

export default SupplierProductList;
