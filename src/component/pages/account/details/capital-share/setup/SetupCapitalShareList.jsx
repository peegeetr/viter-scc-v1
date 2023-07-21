import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import {
  FaArchive,
  FaEdit,
  FaEraser,
  FaHistory,
  FaPlusCircle,
  FaTrash,
} from "react-icons/fa";
import {
  setError,
  setIsAdd,
  setIsConfirm,
  setIsEditProfile,
  setIsReset,
  setIsRestore,
  setMessage,
} from "../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../store/StoreContext";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import {
  formatDate,
  getUrlParam,
  numberWithCommas,
  pesoSign,
} from "../../../../../helpers/functions-general";
import NoData from "../../../../../partials/NoData";
import ServerError from "../../../../../partials/ServerError";
import ModalConfirm from "../../../../../partials/modals/ModalConfirm";
import ModalDeleteRestore from "../../../../../partials/modals/ModalDeleteRestore";
import TableSpinner from "../../../../../partials/spinners/TableSpinner";
import StatusActive from "../../../../../partials/status/StatusActive";
import StatusInactive from "../../../../../partials/status/StatusInactive";
import { getTotalAmortization } from "../functions-capital-share";
import ModalAddAmortization from "./modals/ModalAddAmortization";
import ModalEditSetupCapitalShare from "./modals/ModalEditSetupCapitalShare";
import ModalReset from "./modals/ModalReset";
import { useInView } from "react-intersection-observer";
import Loadmore from "../../../../../partials/Loadmore";
import { queryDataInfinite } from "../../../../../helpers/queryDataInfinite";

const SetupCapitalShareList = ({
  members,
  isLoading,
  loadingMSC,
  error,
  subscribeCapital,
  menu,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const memberid = getUrlParam().get("memberid");
  const [onSearch, setOnSearch] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const search = React.useRef(null);
  let counter = 1;
  let countHistory = 0;
  // use if with loadmore button and search bar
  let empid =
    menu === "members" ? memberid : store.credentials.data.members_aid;

  const { ref, inView } = useInView();
  const {
    data: result,
    error: errorAmortization,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    // queryKey: ["patronage", onSearch, store.isSearch],
    queryKey: ["patronage", onSearch],
    queryFn: async ({ pageParam = 1 }) =>
      await queryDataInfinite(
        `/v1/capital-amortization/page/${pageParam}/${empid}`, // filter endpoint // filter
        `/v1/capital-amortization/page/${pageParam}/${empid}`, // list endpoint
        onSearch // search boolean
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
  const { data: paidUp } = useQueryData(
    `/v1/capital-share/${empid}`,
    "get", // method
    "paidUp" // key
  );

  const handleAdd = () => {
    dispatch(setIsAdd(true));
    setItemEdit(null);
  };

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleCapitalDetailsEdit = (item) => {
    dispatch(setIsEditProfile(true));
    setItemEdit(item);
  };

  const handleCapitalReset = (item) => {
    if (paidUp?.data.length > 0) {
      dispatch(setError(true));
      dispatch(setMessage("You already have Paid Capital"));
      return;
    }
    dispatch(setIsReset(true));
    setData(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.capital_amortization_aid);
    setData(item);
    setDel(null);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.capital_amortization_aid);
    setData(item);
    setDel(null);
  };
  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.capital_amortization_aid);
    setData(item);
    setDel(true);
  };

  return (
    <>
      {isLoading ? (
        <TableSpinner />
      ) : members?.data.length > 0 ? (
        <>
          {memberid !== null && (
            <p className="text-primary mb-0">
              <span className="pr-4 font-bold">Member Name :</span>
              {isLoading
                ? "Loading..."
                : error
                ? "N/A"
                : `${members?.data[0].members_last_name}, ${members?.data[0].members_first_name}`}
            </p>
          )}
          <div className="text-center overflow-x-auto z-0">
            {members?.data.map((aItem, key) => {
              return (
                <div
                  key={key}
                  className="bg-gray-200 p-2 my-5 flex justify-between items-center "
                >
                  <h4>
                    Subscribe Capital :{pesoSign}
                    {status === "loading" || loadingMSC
                      ? "Loading..."
                      : subscribeCapital?.count > 0
                      ? ` ${numberWithCommas(
                          Number(
                            subscribeCapital?.data[0].subscribe_capital_amount
                          ).toFixed(2)
                        )} `
                      : "0.00"}
                  </h4>
                  <div className="flex items-center">
                    {store.credentials.data.role_is_member === 0 &&
                      memberid !== null && (
                        <button
                          type="button"
                          className="tooltip-action-table"
                          data-tooltip="Edit"
                          onClick={() => handleCapitalDetailsEdit(aItem)}
                        >
                          <FaEdit />
                        </button>
                      )}
                    {paidUp?.data.length === 0 &&
                      subscribeCapital?.count > 0 &&
                      store.credentials.data.role_is_member === 0 &&
                      memberid !== null && (
                        <button
                          type="button"
                          className="tooltip-action-table ml-2"
                          data-tooltip="Reset"
                          onClick={() =>
                            handleCapitalReset(subscribeCapital?.data[0])
                          }
                        >
                          <FaEraser />
                        </button>
                      )}
                  </div>
                </div>
              );
            })}
            <div className="bg-gray-200 p-2 flex justify-between items-center">
              <h4>Amortization</h4>

              {store.credentials.data.role_is_member === 0 &&
                memberid !== null &&
                subscribeCapital?.count > 0 && (
                  <button
                    type="button"
                    className=" btn-primary !py-[3px] print:hidden "
                    onClick={handleAdd}
                  >
                    <FaPlusCircle />
                    <span>Add</span>
                  </button>
                )}
            </div>
            <div className="relative text-center overflow-x-auto z-0">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th className="min-w-[8rem] w-[8rem]">Date</th>
                    <th className="min-w-[10rem] w-[8rem] text-right pr-4">
                      Amortization
                    </th>
                    <th className="min-w-[10rem] w-[8rem] text-right pr-4">
                      Dividend
                    </th>
                    <th className="min-w-[10rem] w-[8rem] text-right pr-4">
                      Patronage
                    </th>
                    <th className="min-w-[10rem] w-[8rem] text-right pr-4">
                      Total Amount
                    </th>
                    <th className="min-w-[15rem]">Remarks</th>
                    <th className="w-[5rem] text-center">Status</th>
                    {store.credentials.data.role_is_member === 0 &&
                      memberid !== null && (
                        <th className="max-w-[5rem]">Actions</th>
                      )}
                  </tr>
                </thead>
                <tbody>
                  {(status === "loading" ||
                    result?.pages[0].data.length === 0) && (
                    <tr className="text-center ">
                      <td colSpan="100%" className="p-10">
                        {status === "loading" && <TableSpinner />}
                        <NoData />
                      </td>
                    </tr>
                  )}
                  {errorAmortization && (
                    <tr className="text-center ">
                      <td colSpan="100%" className="p-10">
                        <ServerError />
                      </td>
                    </tr>
                  )}
                  {result?.pages.map((page, key) => (
                    <React.Fragment key={key}>
                      {page.data.map((aItem, key) => {
                        countHistory += 1;
                        return (
                          <tr key={key}>
                            <td>{counter++}.</td>
                            <td>
                              {formatDate(aItem.capital_amortization_date)}
                            </td>
                            <td className=" text-right pr-4">
                              {pesoSign}
                              {numberWithCommas(
                                Number(
                                  aItem.capital_amortization_amount
                                ).toFixed(2)
                              )}
                            </td>
                            <td className=" text-right pr-4">
                              {pesoSign}
                              {numberWithCommas(
                                Number(
                                  aItem.capital_amortization_amount_dividend
                                ).toFixed(2)
                              )}
                            </td>
                            <td className=" text-right pr-4">
                              {pesoSign}
                              {numberWithCommas(
                                Number(
                                  aItem.capital_amortization_amount_patronage
                                ).toFixed(2)
                              )}
                            </td>
                            <td className=" text-right pr-4">
                              {pesoSign}
                              {numberWithCommas(
                                Number(getTotalAmortization(aItem)).toFixed(2)
                              )}
                            </td>
                            <td>{aItem.capital_amortization_remarks}</td>
                            <td className=" text-center">
                              {aItem.capital_amortization_is_active === 1 ? (
                                <StatusActive />
                              ) : (
                                <StatusInactive />
                              )}
                            </td>

                            {store.credentials.data.role_is_member === 0 &&
                              memberid !== null && (
                                <td>
                                  <div className="flex items-center gap-1">
                                    {aItem.capital_amortization_is_active ===
                                      1 && (
                                      <>
                                        <button
                                          type="button"
                                          className="btn-action-table tooltip-action-table"
                                          data-tooltip="Edit"
                                          onClick={() => handleEdit(aItem)}
                                        >
                                          <FaEdit />
                                        </button>
                                        <button
                                          type="button"
                                          className="btn-action-table tooltip-action-table"
                                          data-tooltip="Archive"
                                          onClick={() => handleArchive(aItem)}
                                        >
                                          <FaArchive />
                                        </button>
                                      </>
                                    )}
                                    {(store.credentials.data
                                      .role_is_developer === 1 ||
                                      countHistory === 1) &&
                                      aItem.capital_amortization_is_active ===
                                        0 && (
                                        <>
                                          <button
                                            type="button"
                                            className="btn-action-table tooltip-action-table"
                                            data-tooltip="Restore"
                                            onClick={() => handleRestore(aItem)}
                                          >
                                            <FaHistory />
                                          </button>
                                          <button
                                            type="button"
                                            className="btn-action-table tooltip-action-table"
                                            data-tooltip="Delete"
                                            onClick={() => handleDelete(aItem)}
                                          >
                                            <FaTrash />
                                          </button>
                                        </>
                                      )}
                                  </div>
                                </td>
                              )}
                          </tr>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
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
      ) : (
        <NoData />
      )}
      {store.isEditProfile && <ModalEditSetupCapitalShare item={itemEdit} />}
      {store.isAdd && (
        <ModalAddAmortization
          item={itemEdit}
          subscribeCapital={subscribeCapital?.data[0].subscribe_capital_amount}
        />
      )}
      {store.isReset && <ModalReset dataItem={dataItem} />}
      {store.isConfirm && (
        <ModalConfirm
          id={id}
          isDel={isDel}
          mysqlApiArchive={`/v1/capital-amortization/active/${id}`}
          msg={"Are you sure you want to archive "}
          item={`${formatDate(dataItem.capital_amortization_date)}`}
          dataItem={dataItem}
          arrKey="capital-amortization-by-id"
        />
      )}

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/capital-amortization/${id}`}
          mysqlApiRestore={`/v1/capital-amortization/active/${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete "
              : "Are you sure you want to restore "
          }
          item={`${formatDate(dataItem.capital_amortization_date)}`}
          dataItem={dataItem}
          arrKey="capital-amortization-by-id"
        />
      )}
    </>
  );
};

export default SetupCapitalShareList;
