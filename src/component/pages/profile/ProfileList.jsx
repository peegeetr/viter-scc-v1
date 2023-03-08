import React from "react";
import { FaArchive, FaEdit, FaHistory, FaTrash } from "react-icons/fa"; 
import { StoreContext } from "../../../store/StoreContext";
import NoData from "../../partials/NoData";
import ServerError from "../../partials/ServerError";
import StatusActive from "../../partials/status/StatusActive";

const ProfileList = ({ setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [dataItem, setData] = React.useState(null);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const search = React.useRef(null);
  const perPage = 10;
  const start = store.startIndex + 1;
  let counter = 0;
 
  const handleEdit = (item) => {
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };

  const handleArchive = (item) => {
    dispatch(setIsConfirm(true));
    // setId(item.user_other_aid);
    // setData(item);
    setDel(null);
  };

  const handleRestore = (item) => {
    dispatch(setIsRestore(true));
    // setId(item.user_other_aid);
    // setData(item);
    setDel(null);
  };

  const handleDelete = (item) => {
    dispatch(setIsRestore(true));
    // setId(item.user_other_aid);
    // setData(item);
    setDel(true);
  };

  return (
    <>
      {/* <SearchBar
        search={search}
        handleSearch={handleSearch}
        handleChange={handleChange}
        loading={loading}
        result={result}
        store={store}
        url={`/v1/user-others/search/`}
      /> */}
      <div className="relative text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th className="w-[15rem]">Name</th>
              <th className="w-[25rem]">Account number</th>
              <th className="w-[10rem]">Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody> 
                  <tr >
                    <td> 1.</td>
                    <td>
                      {/* {item.user_other_lname}, {item.user_other_fname} */}
                      Lumabas, Cyrene M
                    </td>
                    <td>20200108</td>
                    <td>developer</td>
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
                      </div>
                    </td>
                  </tr> 
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr> 
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  {/* {loading && <TableSpinner />} */}
                  <NoData />
                </td>
              </tr> 
          </tbody>
        </table>
{/* 
        {!store.isSearch && (
          <Loadmore
            handleLoad={handleLoad}
            loading={loading}
            result={result}
            totalResult={totalResult}
          />
        )} */}
      </div>
 
    </>
  );
};

export default ProfileList;
