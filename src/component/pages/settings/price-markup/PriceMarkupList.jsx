import React from "react";
import { FaArchive, FaEdit, FaHistory, FaTrash } from "react-icons/fa";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import useQueryData from "../../../custom-hooks/useQueryData.jsx";
import NoData from "../../../partials/NoData.jsx";
import ServerError from "../../../partials/ServerError.jsx";
import ModalConfirm from "../../../partials/modals/ModalConfirm.jsx";
import ModalDeleteRestore from "../../../partials/modals/ModalDeleteRestore.jsx";
import TableSpinner from "../../../partials/spinners/TableSpinner.jsx";
import StatusActive from "../../../partials/status/StatusActive.jsx";
import StatusInactive from "../../../partials/status/StatusInactive.jsx";
import { formatDate } from "../../../helpers/functions-general.jsx";

const PriceMarkupList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);

  let counter = 0;

  // use if not loadmore button undertime
  const {
    isLoading,
    isFetching,
    error,
    data: priceMarkup,
  } = useQueryData(
    `/v1/price-markup`, // endpoint
    "get", // method
    "price-markup" // key
  );

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    setId(item.price_markup_aid);
    setData(item);
    setDel(null);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    setId(item.price_markup_aid);
    setData(item);
    setDel(null);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.price_markup_aid);
    setData(item);
    setDel(true);
  };
  return (
    <>
      <div className="relative text-center overflow-x-auto z-0">
        {isFetching && !isLoading && <TableSpinner />}
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th className="min-w-[10rem]">Member Percent</th>
              <th className="min-w-[10rem]">Retail Percent</th>
              <th className="min-w-[10rem]">Whole Sale Percent</th>
              <th className="min-w-[10rem]">Date Created</th>
              <th className="max-w-[5rem]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(isLoading || priceMarkup?.data.length === 0) && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  {isLoading && <TableSpinner />}
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
            {priceMarkup?.data.map((item, key) => {
              counter++;
              return (
                <tr key={key}>
                  <td>{counter}.</td>
                  <td>
                    {item.price_markup_is_active === 1 ? (
                      <StatusActive />
                    ) : (
                      <StatusInactive />
                    )}
                  </td>
                  <td>{item.price_markup_member}%</td>
                  <td>{item.price_markup_retail}%</td>
                  <td>{item.price_markup_whole_sale}%</td>
                  <td>{formatDate(item.price_markup_created_at)}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      {item.price_markup_is_active === 1 ? (
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
              );
            })}
          </tbody>
        </table>
      </div>

      {store.isConfirm && (
        <ModalConfirm
          id={id}
          isDel={isDel}
          mysqlApiArchive={`/v1/price-markup/active/${id}`}
          msg={"Are you sure you want to archive this role"}
          item={`${dataItem.price_markup_retail}%, ${dataItem.price_markup_member}%, ${dataItem.price_markup_whole_sale}%`}
          arrKey="price-markup"
        />
      )}

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/price-markup/${id}`}
          mysqlApiRestore={`/v1/price-markup/active/${id}`}
          msg={
            isDel
              ? "Are you sure you want to delete this role"
              : "Are you sure you want to restore this role"
          }
          item={`${dataItem.price_markup_retail}%, ${dataItem.price_markup_member}%, ${dataItem.price_markup_whole_sale}%`}
          arrKey="price-markup"
        />
      )}
    </>
  );
};

export default PriceMarkupList;
