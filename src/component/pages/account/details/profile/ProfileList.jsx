import { Form, Formik } from "formik";
import React from "react";
import { AiFillCamera } from "react-icons/ai";
import { FaEdit, FaUserCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setIsAdd,
  setIsConfirm,
  setIsRestore,
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { InputFileUpload } from "../../../../helpers/FormInputs";
import { formatDate, getUrlParam } from "../../../../helpers/functions-general";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import ModalUpdateAdditionalInfo from "./ModalUpdateAdditionalInfo";
import ModalUpdateBasicInfo from "./ModalUpdateBasicInfo";
import ModalUpdateJobInfo from "./ModalUpdateJobInfo";
import ModalUpdatePermanentAddress from "./ModalUpdatePermanentAddress";
import ModalUpdatePresentAddress from "./ModalUpdatePresentAddress";
import ModalUpdateSpouseInfo from "./ModalUpdateSpouseInfo";

const ProfileList = ({ members, isLoading, error }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [itemEdit, setItemEdit] = React.useState(null);
  const [isopen, setIsOpen] = React.useState(false);
  const memberid = getUrlParam().get("memberid");

  // use if not loadmore button undertime
  const { data: beneficiaries } = useQueryData(
    `/v1/beneficiaries/${memberid}`,
    "get", // method
    "beneficiaries" // key
  );
  console.log("members", members);
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
    dispatch(setIsRestore(true));
    setItemEdit(item);
  };
  const handleEditSpouseInfo = (item) => {
    setIsOpen(true);
    dispatch(setIsRestore(true));
    setItemEdit(item);
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
              <div className="text-left grid sm:grid-cols-[15rem_1fr] mb-2 pl-2">
                <div className="hidden sm:block mx-auto">
                  {item.members_photo ? (
                    <img
                      src="https://hris.frontlinebusiness.com.ph/img/abrigo.jpg"
                      alt="members photo"
                      className="rounded-full h-20 w-20 object-cover object-center"
                    />
                  ) : (
                    <span className="text-[5rem] text-gray-400">
                      <FaUserCircle />
                    </span>
                  )}
                  <Formik
                    initialValues={initVal}
                    validationSchema={yupSchema}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                      fetchData(
                        setLoading,
                        `/v1/job-titles/${itemEdit.job_title_aid}`,
                        values, // form data values
                        null, // result set data
                        "Succesfully updated.", // success msg
                        "", // additional error msg if needed
                        dispatch, // context api action
                        store, // context api state
                        true, // boolean to show success modal
                        false, // boolean to show load more functionality button
                        null, // navigate default value
                        "put"
                      );
                      dispatch(setStartIndex(0));
                    }}
                  >
                    {(props) => {
                      return (
                        <Form>
                          <button
                            type="button"
                            className="tooltip-action-table bottom-8 left-12"
                            data-tooltip="Upload image"
                          >
                            <AiFillCamera className="rounded-full h-8 w-8 p-2 fill-white bg-sky-500" />
                            <InputFileUpload
                              name="photo"
                              type="file"
                              className="rounded-full h-8 w-8 absolute top-0 right-0 bottom-0 left-0 opacity-0 cursor-pointer"
                            />
                          </button>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>

                <div className="text-left grid grid-cols-2 md:grid-cols-[1fr_2fr] pl-2">
                  <p className="font-semibold">First Name :</p>
                  <p className="">{item.members_first_name}</p>
                  <p className="font-semibold">Middle Name :</p>
                  <p className="">{item.members_middle_name}</p>
                  <p className="font-semibold">Last Name :</p>
                  <p className="">{item.members_last_name}</p>
                  <p className="font-semibold">Gender :</p>
                  <p className=" capitalize">{item.members_gender}</p>
                  <p className="font-semibold">Birth Date :</p>
                  <p className="">
                    {item.members_birth_date === ""
                      ? ""
                      : formatDate(item.members_birth_date)}
                  </p>
                </div>
              </div>
              <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center">
                <h4>Additional info</h4>
                <button
                  type="button"
                  className="tooltip-action-table"
                  data-tooltip="Edit"
                  onClick={() => handleEditAdditionalInfo(item)}
                >
                  <FaEdit />
                </button>
              </div>
              <div className="text-left grid  grid-cols-2 md:grid-cols-[1fr_2fr] mb-2 xs:pl-5 pl-2">
                <p className="font-semibold">Birth Place :</p>
                <p className=" capitalize">{item.members_birth_place}</p>
                <p className="font-semibold">Marital Status :</p>
                <p className="">{item.members_civil_status}</p>
                <p className="font-semibold">Educational Attainment :</p>
                <p className="">{item.members_education_attainment}</p>
              </div>{" "}
              <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center">
                <h4>Permanent Address </h4>
                <button
                  type="button"
                  className="tooltip-action-table"
                  data-tooltip="Edit"
                  onClick={() => handleEditPermanentAddress(item)}
                >
                  <FaEdit />
                </button>
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

                <button
                  type="button"
                  className="tooltip-action-table"
                  data-tooltip="Edit"
                  onClick={() => handleEditPresentAddress(item)}
                >
                  <FaEdit />
                </button>
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

                <button
                  type="button"
                  className="tooltip-action-table"
                  data-tooltip="Edit"
                  onClick={() => handleEditSpouseInfo(item)}
                >
                  <FaEdit />
                </button>
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
                <button
                  type="button"
                  className="tooltip-action-table"
                  data-tooltip="Edit"
                  onClick={() => handleEditJobInfo(item)}
                >
                  <FaEdit />
                </button>
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
              {/* <div className="bg-gray-200 p-2 mb-5 flex justify-between items-center">
                <h4>Beneficiaries</h4> 
                   
              </div>

              {beneficiaries?.data.map((item, key) => {
          return (
              <div className="text-left grid  grid-cols-2 md:grid-cols-[1fr_1fr] mb-2 xs:pl-5 pl-2"
              key={key} > 
                   <div className="flex items-center">
                    <p>{counter++}.</p>
                    <button
                    type="button"
                    className="tooltip-action-table"
                    data-tooltip="Edit"
                  >
                    <FaEdit />
                  </button> 
              <p className="font-semibold m-0">Name : <span className="font-light">{item.beneficiaries_name}</span></p></div>
              <p className="font-semibold m-0">Relation : <span className="font-light">{item.beneficiaries_relationship}</span></p>  
              </div>
          );
        })} */}
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

      {store.isAdd && <ModalUpdateBasicInfo item={itemEdit} />}
      {store.isConfirm && <ModalUpdatePresentAddress item={itemEdit} />}
      {store.isRestore && <ModalUpdateJobInfo item={itemEdit} />}
      {store.isAdd && isopen && <ModalUpdateAdditionalInfo item={itemEdit} />}
      {store.isConfirm && isopen && (
        <ModalUpdatePermanentAddress item={itemEdit} />
      )}
      {store.isRestore && isopen && <ModalUpdateSpouseInfo item={itemEdit} />}
    </>
  );
};

export default ProfileList;
