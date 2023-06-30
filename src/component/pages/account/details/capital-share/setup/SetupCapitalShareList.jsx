import React from "react";
import {
  FaArchive,
  FaEdit,
  FaHistory,
  FaPlusCircle,
  FaTrash,
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import {
  setIsAdd,
  setIsConfirm,
  setIsEditProfile,
  setIsRestore,
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
import ModalDeleteRestore from "../../../../../partials/modals/ModalDeleteRestore";
import TableSpinner from "../../../../../partials/spinners/TableSpinner";
import ModalAddAmortization from "./ModalAddAmortization";
import ModalEditSetupCapitalShare from "./ModalEditSetupCapitalShare";
import StatusActive from "../../../../../partials/status/StatusActive";
import StatusInactive from "../../../../../partials/status/StatusInactive";
import ModalConfirm from "../../../../../partials/modals/ModalConfirm";

const SetupCapitalShareList = ({
  members,
  isLoading,
  error,
  subscribeCapital,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const memberid = getUrlParam().get("memberid");
  let counter = 1;
  // use if with loadmore button and search bar
  let empid = memberid === null ? store.credentials.data.members_aid : memberid;

  // use if not loadmore button undertime
  const {
    error: errorAmortization,
    isLoading: loadingAmortization,
    data: amortization,
  } = useQueryData(
    `/v1/capital-amortization/${empid}`,
    "get", // method
    "capital-amortization-by-id" // key
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
      <div className="text-center overflow-x-auto z-0 w-full max-w-[750px]">
        {members?.data.map((aItem, key) => {
          return (
            <div
              key={key}
              className="bg-gray-200 p-2 my-5 flex justify-between items-center"
            >
              <h4>
                Subscribe Capital :{pesoSign}
                {subscribeCapital?.count === 0
                  ? "0.00"
                  : ` ${numberWithCommas(
                      Number(
                        subscribeCapital?.data[0].subscribe_capital_amount
                      ).toFixed(2)
                    )} `}
              </h4>
              {store.credentials.data.role_is_member === 0 &&
                memberid !== null && (
                  <button
                    type="button"
                    className="tooltip-action-table"
                    data-tooltip="Edit"
                    onClick={() =>
                      handleCapitalDetailsEdit(
                        subscribeCapital?.count === 0
                          ? aItem
                          : subscribeCapital?.data[0]
                      )
                    }
                  >
                    <FaEdit />
                  </button>
                )}
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
                className=" btn-primary !py-[3px] "
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
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
                {store.credentials.data.role_is_member === 0 && (
                  <th className="max-w-[5rem]">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {(loadingAmortization || amortization?.data.length === 0) && (
                <tr className="text-center ">
                  <td colSpan="100%" className="p-10">
                    {loadingAmortization && <TableSpinner />}
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
              {amortization?.data.map((aItem, key) => {
                return (
                  <tr key={key}>
                    <td>{counter++}.</td>
                    <td>{formatDate(aItem.capital_amortization_date)}</td>
                    <td>
                      {pesoSign}
                      {numberWithCommas(
                        Number(aItem.capital_amortization_amount).toFixed(2)
                      )}
                    </td>
                    <td>
                      {aItem.capital_amortization_is_active === 1 ? (
                        <StatusActive />
                      ) : (
                        <StatusInactive />
                      )}
                    </td>

                    {store.credentials.data.role_is_member === 0 && (
                      <td>
                        <div className="flex items-center gap-1">
                          {aItem.capital_amortization_is_active === 1 && (
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
                              </button>{" "}
                            </>
                          )}
                          {aItem.capital_amortization_is_active === 0 &&
                            store.credentials.data.role_is_developer === 1 && (
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
            </tbody>
          </table>
        </div>
      </div>

      {store.isEditProfile && <ModalEditSetupCapitalShare item={itemEdit} />}
      {store.isAdd && (
        <ModalAddAmortization
          item={itemEdit}
          subscribeCapital={subscribeCapital?.data[0].subscribe_capital_amount}
        />
      )}
      {store.isConfirm && (
        <ModalConfirm
          id={id}
          isDel={isDel}
          mysqlApiArchive={`/v1/capital-amortization/active/${id}`}
          msg={"Are you sure you want to archive "}
          item={`${formatDate(dataItem.capital_amortization_date)}`}
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
          arrKey="capital-amortization-by-id"
        />
      )}
    </>
  );
};

export default SetupCapitalShareList;
