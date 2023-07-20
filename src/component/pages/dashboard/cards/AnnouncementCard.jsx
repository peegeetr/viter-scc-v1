import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { BsFillPinAngleFill } from "react-icons/bs";
import {
  FaArchive,
  FaBullhorn,
  FaEdit,
  FaHistory,
  FaPlusCircle,
  FaTrash,
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { formatDate } from "../../../helpers/functions-general";
import { queryDataInfinite } from "../../../helpers/queryDataInfinite";
import Loadmore from "../../../partials/Loadmore";
import SearchBar from "../../../partials/SearchBar";
import ServerError from "../../../partials/ServerError";
import ModalConfirm from "../../../partials/modals/ModalConfirm";
import ModalDeleteRestore from "../../../partials/modals/ModalDeleteRestore";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import StatusActive from "../../../partials/status/StatusActive";
import StatusInactive from "../../../partials/status/StatusInactive";
import ModalAddAnnouncement from "../ModalAddAnnouncement";
const AnnouncementCard = () => {
  const [itemEdit, setItemEdit] = React.useState(null);
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
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
      await queryDataInfinite(
        `/v1/announcement/search`, // search endpoint
        `/v1/announcement/page/${pageParam}`, // list endpoint
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

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.announcement_aid);
    setData(item);
    setDel(null);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.announcement_aid);
    setData(item);
    setDel(null);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.announcement_aid);
    setData(item);
    setDel(true);
  };

  return (
    <>
      <div className="flex flex-col ">
        <div className="rounded-lg order-1 md:order-0 border !pt-2 p-4">
          <div className="flex items-center justify-between mb-2 ">
            <p className="flex items-center m-2 font-bold text-primary">
              <BsFillPinAngleFill className="animate-bounce mr-2 " />
              Announcement
            </p>
            {(store.credentials.data.role_is_developer === 1 ||
              store.credentials.data.role_is_admin === 1) && (
              <div className="flex items-center m-2 print:hidden">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleAdd}
                >
                  <FaPlusCircle />
                  <span>Add</span>
                </button>
              </div>
            )}
          </div>
          <div className="m-2">
            <SearchBar
              search={search}
              dispatch={dispatch}
              store={store}
              result={result?.pages}
              isFetching={isFetching}
              setOnSearch={setOnSearch}
              onSearch={onSearch}
            />
          </div>
          <div className="pb-3 px-4">
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
                          {(store.credentials.data.role_is_admin === 1 ||
                            store.credentials.data.role_is_developer === 1) && (
                            <p className="text-xs max-w-[650px] py-2 w-full m-0">
                              {item.announcement_is_active === 1 ? (
                                <StatusActive />
                              ) : (
                                <StatusInactive />
                              )}
                            </p>
                          )}
                        </div>
                        {(store.credentials.data.role_is_admin === 1 ||
                          store.credentials.data.role_is_developer === 1) && (
                          <div className="flex items-center gap-1">
                            {item.announcement_is_active === 1 && (
                              <>
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
                                  data-tooltip="Archive"
                                  onClick={() => handleArchive(item)}
                                >
                                  <FaArchive />
                                </button>{" "}
                              </>
                            )}
                            {item.announcement_is_active === 0 && (
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
                        )}
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
      </div>

      {store.isAdd && <ModalAddAnnouncement item={itemEdit} />}
      {store.isConfirm && (
        <ModalConfirm
          id={id}
          isDel={isDel}
          mysqlApiArchive={`/v1/announcement/active/${id}`}
          msg={"Are you sure you want to archive this announcement"}
          item={`${dataItem.announcement_name}`}
          arrKey="announcement"
        />
      )}

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/announcement/${id}`}
          mysqlApiRestore={`/v1/announcement/active/${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete this announcement"
              : "Are you sure you want to restore this announcement"
          }
          item={`${dataItem.announcement_name}`}
          arrKey="announcement"
        />
      )}
    </>
  );
};

export default AnnouncementCard;
