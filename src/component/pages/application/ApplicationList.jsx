import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaArchive, FaEdit, FaHistory, FaTrash } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { setIsConfirm, setIsRestore } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { queryDataInfinite } from "../../helpers/queryDataInfinite";
import Loadmore from "../../partials/Loadmore";
import ModalApprovedCancel from "../../partials/modals/ModalApprovedCancel";
import ModalDeleteRestore from "../../partials/modals/ModalDeleteRestore";
import NoData from "../../partials/NoData";
import SearchBar from "../../partials/SearchBar";
import ServerError from "../../partials/ServerError";
import FetchingSpinner from "../../partials/spinners/FetchingSpinner";
import TableSpinner from "../../partials/spinners/TableSpinner";
import StatusActive from "../../partials/status/StatusActive";

const ApplicationList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  let counter = 1;
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
    queryKey: ["members", onSearch, store.isSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/members/search/${search.current.value}`, // search endpoint
        `/v1/members/page/${pageParam}`, // list endpoint
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

 
  const handleApproved = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.members_aid);
    setData(item);
    setDel(true);
  };

  const handleCancel = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.members_aid);
    setData(item);
    setDel(null);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.members_aid);
    setData(item);
    setDel(null);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.members_aid);
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
              <th className="w-[15rem]">Name</th>
              <th className="w-[15rem]">Account no.</th> 
              <th>Status</th>
              <th className="max-w-[5rem]">Actions</th>
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
                  <tr key={key} >
                    <td> {counter++}.</td>
                    <td>
                      {`${item.members_last_name}, ${item.members_first_name}`}
                    </td>
                    <td>{item.members_id}</td> 
                    <td> 
                        <StatusActive /> 
                    </td>
                    <td>
                      <div className="flex items-center gap-1"> 
                      {item.members_is_active === 1 ?
                          <>
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="Approve"
                              onClick={() => handleApproved(item)}
                            >
                              <FaEdit />
                            </button>
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="Cancel"
                              onClick={() => handleCancel(item)}
                            >
                              <FaArchive />
                            </button>
                          </> :
                          <>
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="Restore"
                              onClick={() => handleRestore(item)}
                            >
                              <FaHistory />
                            </button>
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="Delete"
                              onClick={() => handleDelete(item)}
                            >
                              <FaTrash />
                            </button>
                          </> }
                      </div>
                    </td>
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
 
      {store.isConfirm && (
        <ModalApprovedCancel
          id={id}
          isDel={isDel}
          mysqlApiApproved={`/v1/members/status/${id}`}
          mysqlApiCancel={`/v1/members/status/${id}`}
          msg={ isDel
            ?"Are you sure you want to approved "
            :"Are you sure you want to cancel "}
          item={`${dataItem.members_last_name}, ${dataItem.members_first_name}`} 
          isApproved={isDel?"approved":"cancel"}
          arrKey="members"
        />
      )}

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/members/${id}`}
          mysqlApiRestore={`/v1/members/status/${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete this members"
              : "Are you sure you want to restore this members"
          }
          item={`${dataItem.members_last_name}, ${dataItem.members_first_name}`} 
          isApproved="cancel"
          arrKey="members"
        />
      )}
    </>
  );
};

export default ApplicationList;
