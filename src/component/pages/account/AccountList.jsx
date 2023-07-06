import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FaArchive, FaHistory, FaListUl, FaTrash } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { setIsConfirm, setIsRestore } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { getUserType } from "../../helpers/functions-general";
import { queryDataInfinite } from "../../helpers/queryDataInfinite";
import Loadmore from "../../partials/Loadmore";
import NoData from "../../partials/NoData";
import SearchBar from "../../partials/SearchBar";
import ServerError from "../../partials/ServerError";
import ModalConfirm from "../../partials/modals/ModalConfirm";
import ModalDeleteRestore from "../../partials/modals/ModalDeleteRestore";
import TableSpinner from "../../partials/spinners/TableSpinner";
import StatusActive from "../../partials/status/StatusActive";
import StatusInactive from "../../partials/status/StatusInactive";
import { queryDataInfiniteSearch } from "../../helpers/queryDataInfiniteSearch";

const AccountList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const urlLink = getUserType(store);
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
      await queryDataInfiniteSearch(
        `/v1/members/search/approved`, // search endpoint
        `/v1/member/page/${pageParam}/approved`, // list endpoint
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

  const handleArchive = (item) => {
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
  console.log(result);

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
              <th>Status</th>
              <th className="min-w-[12rem]">Name</th>
              <th className="min-w-[10rem]">Account no.</th>
              <th className="min-w-[15rem]">Email.</th>
              <th className="min-w-[10rem]">Contact no.</th>
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
                  <tr key={key}>
                    <td> {counter++}.</td>
                    <td>
                      {item.members_is_active === 1 ? (
                        <StatusActive />
                      ) : (
                        <StatusInactive />
                      )}
                    </td>
                    <td>
                      {`${item.members_last_name}, ${item.members_first_name}`}
                    </td>
                    <td>{item.members_id}</td>
                    <td>{item.members_email}</td>
                    <td>{item.members_contact_no}</td>

                    <td>
                      <div className="flex items-center gap-1">
                        <Link
                          to={`${urlLink}/members/details?memberid=${item.members_aid}`}
                          className="btn-action-table tooltip-action-table"
                          data-tooltip="Details"
                        >
                          <FaListUl />
                        </Link>
                        {item.members_is_active === 1 ? (
                          <>
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="Archive"
                              onClick={() => handleArchive(item)}
                            >
                              <FaArchive />
                            </button>
                          </>
                        ) : (
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
                          </>
                        )}
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
        <ModalConfirm
          id={id}
          isDel={isDel}
          mysqlApiArchive={`/v1/members/status/${id}`}
          msg={"Are you sure you want to archive this members"}
          item={`${dataItem.members_email}`}
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
          item={`${dataItem.members_email}`}
          arrKey="members"
        />
      )}
    </>
  );
};

export default AccountList;
