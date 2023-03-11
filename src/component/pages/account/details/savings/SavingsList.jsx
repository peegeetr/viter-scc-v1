import React from "react";
import { FaArchive, FaEdit, FaHistory, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { StoreContext } from "../../../../../store/StoreContext";
import { devNavUrl, UrlSystem } from "../../../../helpers/functions-general";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import StatusActive from "../../../../partials/status/StatusActive";

const SavingsList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  return (
    <>
       <div className="relative text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="w-[15rem]">Date</th>
              <th className="w-[15rem]">Amount</th>
              <th className="w-[15rem]">Savings Balance</th> 
              <th>Total Amount</th>
              <th className="max-w-[5rem]">Actions</th>
            </tr>
          </thead>
          <tbody>  
              {/* {(status === "loading" || result?.pages[0].data.length === 0) && (
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
              )} */}
  <tr className="text-center ">
                  <td colSpan="100%" className="p-10">
                    {status === "loading" && <TableSpinner />}
                    <NoData />
                  </td>
                </tr>
                <tr className="text-center ">
                  <td colSpan="100%" className="p-10">
                    <ServerError />
                  </td>
                </tr>
                  <tr  >
                    <td> </td>
                    <td> 
                    </td>
                    <td></td> 
                    <td> 
                        <StatusActive /> 
                    </td>
                    <td>
                      <div className="flex items-center gap-1">  
                          <>
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="Edit" 
                            >
                              <FaEdit />
                            </button>
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="Archive"
                            //   onClick={() => handleArchive(item)}
                            >
                              <FaArchive />
                            </button>
                          </>  
                          <>
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="Restore"
                            //   onClick={() => handleRestore(item)}
                            >
                              <FaHistory />
                            </button>
                            <button
                              type="button"
                              className="btn-action-table tooltip-action-table"
                              data-tooltip="Delete"
                            //   onClick={() => handleDelete(item)}
                            >
                              <FaTrash />
                            </button>
                          </> 
                      </div>
                    </td>
                  </tr>  
 
          </tbody>
        </table>
                      </div>
    </>
  );
};

export default SavingsList;
