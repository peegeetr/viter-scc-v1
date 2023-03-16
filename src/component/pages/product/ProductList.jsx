import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TbFileDownload } from "react-icons/tb";
import { useInView } from "react-intersection-observer";
import { setIsAdd, setIsRestore } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { formatDate } from "../../helpers/functions-general";
import { queryDataInfinite } from "../../helpers/queryDataInfinite";
import Loadmore from "../../partials/Loadmore";
import ModalDeleteRestore from "../../partials/modals/ModalDeleteRestore";
import NoData from "../../partials/NoData";
import SearchBar from "../../partials/SearchBar";
import ServerError from "../../partials/ServerError";
import FetchingSpinner from "../../partials/spinners/FetchingSpinner";
import TableSpinner from "../../partials/spinners/TableSpinner";
const ProductList = ({ setItemEdit }) => {
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
    queryKey: ["file", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/file/search/${search.current.value}`, // search endpoint
        `/v1/file/page/${pageParam}`, // list endpoint
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
    setId(item.file_upload_aid);
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
        {isFetching && !isFetchingNextPage && <FetchingSpinner />}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="min-w-[15rem] w-[15rem]">File Name</th>
              <th className="min-w-[15rem]">Link</th>
              <th className="min-w-[10rem] w-[10rem]">Date</th>

              {store.credentials.data.role_is_admin === 1 ||
                (store.credentials.data.role_is_developer === 1 && (
                  <th className="max-w-[5rem]">Actions</th>
                ))}
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
                    <td>{item.file_upload_name}</td>
                    <td className=" break-all">
                      <a
                        href={item.file_upload_link}
                        className="underline text-primary"
                      >
                        {item.file_upload_link}
                      </a>
                    </td>

                    <td>{formatDate(item.file_upload_date)}</td>

                    {store.credentials.data.role_is_admin === 1 ||
                      (store.credentials.data.role_is_developer === 1 && (
                        <td>
                          {" "}
                          <div className="flex items-center gap-1">
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
                      ))}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>

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
          mysqlApiDelete={`/v1/file/${id}`}
          msg={"Are you sure you want to delete this file"}
          item={`${dataItem.file_upload_name}`}
          arrKey="file"
        />
      )}
    </>
  );
};

export default ProductList;
