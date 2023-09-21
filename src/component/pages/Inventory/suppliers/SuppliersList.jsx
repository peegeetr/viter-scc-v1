import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import {
  setIsAdd,
  setIsRestore,
  setIsSearch,
  setStartIndex,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { getUserType } from "../../../helpers/functions-general";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import Loadmore from "../../../partials/Loadmore";
import NoData from "../../../partials/NoData";
import SearchBar from "../../../partials/SearchBar";
import ServerError from "../../../partials/ServerError";
import ModalDeleteRestore from "../../../partials/modals/ModalDeleteRestore";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import StatusActive from "../../../partials/status/StatusActive";
import StatusInactive from "../../../partials/status/StatusInactive";

const suppliersList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const urlLink = getUserType(store);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const [onSearch, setOnSearch] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const search = React.useRef(null);
  let counter = 1;
  const { ref, inView } = useInView();
  const handleShow = () => {
    dispatch(setIsSearch(false));
    dispatch(setStartIndex(0));
  };
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
    queryKey: ["suppliers", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/suppliers/search`, // search endpoint
        `/v1/suppliers/page/${pageParam}`, // list endpoint
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

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.suppliers_aid);
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
              <th>Status</th>
              <th className="min-w-[10rem]">Company Name</th>
              <th className="min-w-[10rem]">Company Address</th>
              <th className="min-w-[10rem]">Contact Person</th>
              <th className="min-w-[10rem]">Contact Number</th>

              {(store.credentials.data.role_is_admin === 1 ||
                store.credentials.data.role_is_developer === 1 ||
                store.credentials.data.role_is_manager === 1) && (
                <th>Actions</th>
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
                    <td>
                      {item.suppliers_is_active === 1 ? (
                        <StatusActive />
                      ) : (
                        <StatusInactive />
                      )}
                    </td>
                    <td>{item.suppliers_company_name}</td>
                    <td>{item.suppliers_company_address}</td>
                    <td>{item.suppliers_contact_person}</td>
                    <td>{item.suppliers_contact_num}</td>

                    <td>
                      {store.credentials.data.role_is_admin === 1 ||
                      store.credentials.data.role_is_developer === 1 ||
                      store.credentials.data.role_is_manager === 1 ? (
                        <div className="flex items-center gap-1">
                          <Link
                            onClick={handleShow}
                            to={`${urlLink}/inventory/suppliers/products?supplierId=${item.suppliers_aid}`}
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
                          {(store.credentials.data.role_is_admin === 1 ||
                            store.credentials.data.role_is_developer === 1) && (
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="Delete"
                              onClick={() => handleDelete(item)}
                            >
                              <FaTrash />
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <Link
                            to={`${urlLink}/inventory/suppliers/products?supplierId=${item.suppliers_aid}`}
                            className="btn-action-table tooltip-action-table"
                            data-tooltip="View"
                          >
                            <SlArrowRight className="inline" />
                          </Link>
                        </div>
                      )}
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
          mysqlApiDelete={`/v1/suppliers/${id}`}
          msg={`Are you sure you want to delete this `}
          item={`${dataItem.suppliers_company_name}`}
          arrKey="suppliers"
        />
      )}
    </>
  );
};

export default suppliersList;
