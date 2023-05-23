import { Form, Formik } from "formik";
import React from "react";
import { AiFillCamera } from "react-icons/ai";
import { FaEdit, FaPlusCircle, FaTrash, FaUserCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setIsAdd,
  setIsBeneficiaries,
  setIsConfirm,
  setIsEditProfile,
  setIsRestore,
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { InputFileUpload } from "../../../../helpers/FormInputs";
import {
  devBaseImgUrl,
  formatDate,
  getUrlParam,
} from "../../../../helpers/functions-general";
import ModalDeleteRestore from "../../../../partials/modals/ModalDeleteRestore";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import ModalAddBeneficiaries from "./ModalAddBeneficiaries";
import ModalUpdateAdditionalInfo from "./ModalUpdateAdditionalInfo";
import ModalUpdateBasicInfo from "./ModalUpdateBasicInfo";
import ModalUpdateJobInfo from "./ModalUpdateJobInfo";
import ModalUpdatePermanentAddress from "./ModalUpdatePermanentAddress";
import ModalUpdatePresentAddress from "./ModalUpdatePresentAddress";
import ModalUpdateSpouseInfo from "./ModalUpdateSpouseInfo";

const ProfileList = ({ members, isLoading, error }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [id, setId] = React.useState(null);
  const [isDel, setDel] = React.useState(false);
  const [dataItem, setData] = React.useState(null);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [itemBeneficiaries, setItemBeneficiaries] = React.useState(null);
  const [isopen, setIsOpen] = React.useState(false);
  const memberid = getUrlParam().get("memberid");

  let memId = memberid === null ? store.credentials.data.members_aid : memberid;

  let counter = 0;

  // use if not loadmore button undertime
  const { data: beneficiaries } = useQueryData(
    `/v1/beneficiaries/${memId}`,
    "get", // method
    "beneficiaries" // key
  );
  // console.log("beneficiaries", beneficiaries);

  const handleEdit = (item) => {
    setIsOpen(false);
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };
  const handleEditAdditionalInfo = (item) => {
    setIsOpen(true);
    dispatch(setIsAdd(true));
    setItemEdit(item);
  };
  const handleEditPresentAddress = (item) => {
    setIsOpen(false);
    dispatch(setIsConfirm(true));
    setItemEdit(item);
  };
  const handleEditPermanentAddress = (item) => {
    setIsOpen(true);
    dispatch(setIsConfirm(true));
    setItemEdit(item);
  };
  const handleEditJobInfo = (item) => {
    setIsOpen(false);
    dispatch(setIsEditProfile(true));
    setItemEdit(item);
  };
  const handleEditSpouseInfo = (item) => {
    setIsOpen(true);
    dispatch(setIsEditProfile(true));
    setItemEdit(item);
  };

  const handleAddBeneficiaries = () => {
    dispatch(setIsBeneficiaries(true));
    setItemBeneficiaries(null);
  };

  const handleEditBeneficiaries = (itemB) => {
    dispatch(setIsBeneficiaries(true));
    setItemBeneficiaries(itemB);
  };
  const handleDelete = (itemB) => {
    dispatch(setIsRestore(true));
    setId(itemB.beneficiaries_aid);
    setData(itemB);
    setDel(true);
  };

  const initVal = {};

  const yupSchema = Yup.object({});

  return (
    <>
      <div className="text-center overflow-x-auto z-0">
        {members?.data.map((item, key) => {
          return (
            <div key={key} className="relative w-full max-w-[750px]">
              <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center mt-5">
                <h4>Basic Information</h4>
                {memberid === null ? (
                  ""
                ) : (
                  <button
                    type="button"
                    className="tooltip-action-table"
                    data-tooltip="Edit"
                    onClick={() => handleEdit(item)}
                  >
                    <FaEdit />
                  </button>
                )}
              </div>
              <div className="text-left grid sm:grid-cols-[1fr_15rem] pl-2">
                <div className="text-left grid grid-cols-2 md:grid-cols-[1fr_2fr] mb-2 xs:pl-5 pl-2">
                  <p className="font-semibold">First Name :</p>
                  <p className="">{item.members_first_name}</p>
                  <p className="font-semibold">Middle Name :</p>
                  <p className="">{item.members_middle_name}</p>
                  <p className="font-semibold">Last Name :</p>
                  <p className="">{item.members_last_name}</p>
                  <p className="font-semibold">Gender :</p>
                  <p className=" capitalize">{item.members_gender}</p>
                  <p className="font-semibold mb-0">Birth Date :</p>
                  <p className=" mb-0">
                    {item.members_birth_date === ""
                      ? ""
                      : formatDate(item.members_birth_date)}
                  </p>
                </div>
                <div className="hidden sm:block m-auto justify-center">
                  {item.members_picture ? (
                    <img
                      // src="https://hris.frontlinebusiness.com.ph/img/abrigo.jpg"
                      src={devBaseImgUrl + "/" + item.members_picture}
                      alt="employee photo"
                      className="rounded-full h-20 w-20 object-cover object-center"
                    />
                  ) : (
                    <span className="text-[5rem] text-gray-400">
                      <FaUserCircle />
                    </span>
                  )}
                </div>
              </div>
              <div className="bg-gray-200 p-2 my-5 flex justify-between items-center">
                <h4>Additional info</h4>
                {store.credentials.data.role_is_member === 0 &&
                  memberid !== null && (
                    <button
                      type="button"
                      className="tooltip-action-table"
                      data-tooltip="Edit"
                      onClick={() => handleEditAdditionalInfo(item)}
                    >
                      <FaEdit />
                    </button>
                  )}
              </div>
              <div className="text-left grid  grid-cols-2 md:grid-cols-[1fr_2fr] mb-2 xs:pl-5 pl-2">
                <p className="font-semibold">Birth Place :</p>
                <p className=" capitalize">{item.members_birth_place}</p>
                <p className="font-semibold">Marital Status :</p>
                <p className="">{item.members_civil_status}</p>
                <p className="font-semibold">Educational Attainment :</p>
                <p className="">{item.members_education_attainment}</p>
                <p className="font-semibold">Contact Number :</p>
                <p className="">{item.members_contact_no}</p>
                <p className="font-semibold">Personal Email :</p>
                <p className="">{item.members_email}</p>
              </div>{" "}
              <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center">
                <h4>Permanent Address </h4>
                {store.credentials.data.role_is_member === 0 &&
                  memberid !== null && (
                    <button
                      type="button"
                      className="tooltip-action-table"
                      data-tooltip="Edit"
                      onClick={() => handleEditPermanentAddress(item)}
                    >
                      <FaEdit />
                    </button>
                  )}
              </div>
              <div className="text-left grid  grid-cols-2 md:grid-cols-[1fr_2fr] mb-5 xs:pl-5 pl-2">
                <p className="font-semibold">
                  Street, Brgy, House No. Village :
                </p>
                <p className="">{item.members_permanent_address}</p>
                <p className="font-semibold">Zip code :</p>
                <p className="">{item.members_permanent_zip_code}</p>
                <p className="font-semibold">Mobile no. :</p>
                <p className="">{item.members_permanent_mobile_no}</p>
              </div>
              <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center">
                <h4>Present Address </h4>

                {store.credentials.data.role_is_member === 0 &&
                  memberid !== null && (
                    <button
                      type="button"
                      className="tooltip-action-table"
                      data-tooltip="Edit"
                      onClick={() => handleEditPresentAddress(item)}
                    >
                      <FaEdit />
                    </button>
                  )}
              </div>
              <div className="text-left grid  grid-cols-2 md:grid-cols-[1fr_2fr] mb-5 xs:pl-5 pl-2">
                <p className="font-semibold">
                  Street, Brgy, House No. Village :
                </p>
                <p className="">{item.members_present_address}</p>
                <p className="font-semibold">Zip code :</p>
                <p className="">{item.members_present_zip_code}</p>
                <p className="font-semibold">Mobile no. :</p>
                <p className="">{item.members_present_mobile_no}</p>
              </div>
              <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center">
                <h4>Spouse Information</h4>

                {store.credentials.data.role_is_member === 0 &&
                  memberid !== null && (
                    <button
                      type="button"
                      className="tooltip-action-table"
                      data-tooltip="Edit"
                      onClick={() => handleEditSpouseInfo(item)}
                    >
                      <FaEdit />
                    </button>
                  )}
              </div>
              <div className="text-left grid  grid-cols-2 md:grid-cols-[1fr_2fr] mb-5 xs:pl-5 pl-2">
                <p className="font-semibold">Occupation :</p>
                <p className="">{item.members_spouse_occupation}</p>
                <p className="font-semibold">Income :</p>
                <p className="">{item.members_spouse_income}</p>
                <p className="font-semibold">Net income :</p>
                <p className="">{item.members_spouse_net_income}</p>
                <p className="font-semibold">Properties owned :</p>
                <p className="">{item.members_properties_owned}</p>
              </div>
              <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center">
                <h4>Job Information</h4>
                {store.credentials.data.role_is_member === 0 &&
                  memberid !== null && (
                    <button
                      type="button"
                      className="tooltip-action-table"
                      data-tooltip="Edit"
                      onClick={() => handleEditJobInfo(item)}
                    >
                      <FaEdit />
                    </button>
                  )}
              </div>
              <div className="text-left grid  grid-cols-2 md:grid-cols-[1fr_2fr] mb-2 xs:pl-5 pl-2">
                <p className="font-semibold">Position :</p>
                <p className="">{item.members_position}</p>
                <p className="font-semibold">Income gross :</p>
                <p className="">{item.members_position}</p>
                <p className="font-semibold">Income net :</p>
                <p className="">{item.members_position}</p>

                <p className="font-semibold">Other Source of income :</p>
                <p className="">{item.members_other_source_income}</p>
                <p className="font-semibold">Income gross :</p>
                <p className="">{item.members_other_income}</p>
                <p className="font-semibold">Income net :</p>
                <p className="">{item.members_spouse_occupation}</p>
              </div>
              <div className="bg-gray-200 p-2 flex justify-between items-center">
                <h4>Beneficiaries</h4>

                {store.credentials.data.role_is_member === 0 &&
                  memberid !== null && (
                    <button
                      type="button"
                      className=" btn-primary !py-[3px] "
                      onClick={handleAddBeneficiaries}
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
                      <th>Name</th>
                      <th>Relation ship</th>
                      {store.credentials.data.role_is_member === 0 && (
                        <th className="max-w-[5rem]">Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {(isLoading || beneficiaries?.data.length === 0) && (
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
                    {beneficiaries?.data.map((itemB, key) => {
                      counter++;
                      return (
                        <tr key={key}>
                          <td>{counter++}.</td>
                          <td>{itemB.beneficiaries_name}</td>
                          <td>{itemB.beneficiaries_relationship}</td>

                          {store.credentials.data.role_is_member === 0 && (
                            <td>
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  className="btn-action-table tooltip-action-table"
                                  data-tooltip="Edit"
                                  onClick={() => handleEditBeneficiaries(itemB)}
                                >
                                  <FaEdit />
                                </button>
                                <button
                                  type="button"
                                  className="btn-action-table tooltip-action-table"
                                  data-tooltip="Delete"
                                  onClick={() => handleDelete(itemB)}
                                >
                                  <FaTrash />
                                </button>
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
          );
        })}
        {(isLoading || members?.data.length === 0) && (
          <div className="relative w-full min-h-[616px] grid place-items-center">
            {isLoading && <TableSpinner />}
            <NoData />
          </div>
        )}
        {error && (
          <div className="relative w-full min-h-[616px] grid place-items-center">
            <ServerError />
          </div>
        )}
      </div>

      {store.isAdd && !isopen && <ModalUpdateBasicInfo item={itemEdit} />}
      {store.isConfirm && !isopen && (
        <ModalUpdatePresentAddress item={itemEdit} />
      )}
      {store.isEditProfile && !isopen && <ModalUpdateJobInfo item={itemEdit} />}
      {store.isAdd && isopen && <ModalUpdateAdditionalInfo item={itemEdit} />}
      {store.isConfirm && isopen && (
        <ModalUpdatePermanentAddress item={itemEdit} />
      )}
      {store.isEditProfile && isopen && (
        <ModalUpdateSpouseInfo item={itemEdit} />
      )}
      {store.isBeneficiaries && (
        <ModalAddBeneficiaries item={itemBeneficiaries} memberid={memberid} />
      )}

      {store.isRestore && (
        <ModalDeleteRestore
          id={id}
          isDel={isDel}
          mysqlApiDelete={`/v1/beneficiaries/${id}`}
          msg={"Are you sure you want to delete "}
          item={`${dataItem.beneficiaries_name}`}
          arrKey="beneficiaries"
        />
      )}
    </>
  );
};

export default ProfileList;
