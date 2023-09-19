import React from "react";
import { FaArchive, FaEdit, FaHistory, FaTrash } from "react-icons/fa";
import { SlArrowRight } from "react-icons/sl";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../store/StoreAction.jsx";
import { StoreContext } from "../../../../store/StoreContext.jsx";
import {
  numberWithCommas,
  pesoSign,
  yearNow,
} from "../../../helpers/functions-general.jsx";
import Loadmore from "../../../partials/Loadmore.jsx";
import NoData from "../../../partials/NoData.jsx";
import ServerError from "../../../partials/ServerError.jsx";
import ModalDeleteRestore from "../../../partials/modals/ModalDeleteRestore.jsx";
import TableSpinner from "../../../partials/spinners/TableSpinner.jsx";
import useQueryData from "../../../custom-hooks/useQueryData.jsx";
import StatusActive from "../../../partials/status/StatusActive.jsx";
import StatusInactive from "../../../partials/status/StatusInactive.jsx";

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
    data: role,
  } = useQueryData(
    `/v1/roles`, // endpoint
    "get", // method
    "role" // key
  );

  const handleView = (item) => {
    dispatch(setIsConfirm(true));
    setItemEdit(item);
  };

  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    setId(item.net_surplus_aid);
    setData(item);
    setDel(true);
  };
  return (
    <>
      <div className="relative text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Status</th>
              <th className="min-w-[25rem]">Member %</th>
              <th className="min-w-[10rem]">Retail %</th>
              <th className="min-w-[25rem]">Whole Sale %</th>
              <th className="max-w-[5rem]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(isLoading || role?.data.length === 0) && (
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
            {role?.data.map((item, key) => {
              counter++;
              return (
                <tr key={key}>
                  <td>{counter}.</td>
                  <td>
                    {item.role_is_active === 1 ? (
                      <StatusActive />
                    ) : (
                      <StatusInactive />
                    )}
                  </td>
                  <td className="capitalize">{item.role_name}</td>
                  <td>{item.role_description}</td>
                  <td>{item.role_description}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      {item.role_is_active === 1 ? (
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

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/net-surplus/${id}`}
          msg={"Are you sure you want to delete "}
          item={`${dataItem.net_surplus_year}`}
          arrKey="net-surplus"
        />
      )}
    </>
  );
};

export default PriceMarkupList;
