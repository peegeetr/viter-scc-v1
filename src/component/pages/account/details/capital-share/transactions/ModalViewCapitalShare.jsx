import React from "react";
import { FaEdit, FaTimesCircle, FaTrash } from "react-icons/fa";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../store/StoreContext";
import ModalDeleteRestoreCapital from "../../../../../partials/modals/ModalDeleteRetoreCapital";
import {
  formatDate,
  getTime,
  numberWithCommas,
  pesoSign,
} from "../../../../../helpers/functions-general";

const ModalViewCapitalShare = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isDel, setDel] = React.useState(false);

  const handleClose = () => {
    dispatch(setIsConfirm(false));
  };

  const handleDelete = () => {
    dispatch(setIsRestore(true));
    setDel(true);
  };

  return (
    <>
      <div
        className={` fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark z-50 bg-opacity-50 animate-fadeIn `}
      >
        <div className="p-1 w-[350px] rounded-b-2xl animate-slideUp ">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <p className="mb-0 text-white text-sm ">
              View Details {item.month} {item.year}
            </p>
            <button
              type="button"
              className="text-gray-200 text-base"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>
          <div className="bg-white p-4 rounded-b-2xl">
            <div className="grid grid-cols-2 items-center">
              <p>Date : </p>
              <p>{formatDate(item.capital_share_date)}</p>
              <p>Time : </p>
              <p>{getTime(item.capital_share_date)}</p>
              <p>Paid Capital : </p>
              <p>
                {pesoSign}{" "}
                {numberWithCommas(
                  Number(item.capital_share_paid_up).toFixed(2)
                )}
              </p>
              <p>Official Receipt : </p>
              <p>{item.capital_share_or}</p>
            </div>
            {(store.credentials.data.role_is_developer === 1 ||
              store.credentials.data.role_is_admin === 1) && (
              <div className="flex justify-end items-center gap-1 pt-3">
                <button
                  type="button"
                  className="btn-action-table tooltip-action-table"
                  data-tooltip="Delete"
                  onClick={() => handleDelete(item)}
                >
                  <FaTrash />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {store.isRestore && (
        <ModalDeleteRestoreCapital
          id={item.capital_share_aid}
          isDel={isDel}
          mysqlApiDelete={`/v1/capital-share/${item.capital_share_aid}`}
          msg={"Are you sure you want to delete "}
          item={`${formatDate(item.capital_share_date)} ${getTime(
            item.capital_share_date
          )}`}
          dataItem={item}
          arrKey="capital-share"
        />
      )}
    </>
  );
};

export default ModalViewCapitalShare;