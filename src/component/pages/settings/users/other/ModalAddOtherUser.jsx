import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setIsAdd,
  setIsSearch,
  setStartIndex,
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import fetchApi from "../../../../helpers/fetchApi";
import { fetchData } from "../../../../helpers/fetchData";
import { InputSelect, InputText } from "../../../../helpers/FormInputs";
import {
  closeModal,
  consoleLog,
  devApiUrl,
} from "../../../../helpers/functions-general";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";

const ModalAddOtherUser = ({ itemEdit, role }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [isSearch, setIsSearch] = React.useState(false);
  const [addsearch, setaddSearch] = React.useState("");
  const search = React.useRef(null);
  const [show, setShow] = React.useState("show");

  const handleClose = () => {
    closeModal(setShow, dispatch);
  };

  const handleSearchChange = async (e) => {
    if (e.target.value.trim() === "") {
      setaddSearch("");
      setIsSearch(false);
      return;
    }
    // setLoading(true);
    setIsSearch(true);
    setaddSearch(e.target.value);
    const data = await fetchApi(
      devApiUrl + "/v1/departments/search/",
      { search: e.target.value },
      dispatch
    );
    if (typeof data === "undefined") {
      return;
    }
    if (!data.status) {
      setData([]);
      setIsSearch(false);
      return;
    }
    if (data.status) {
      setData(data.data);
    }
  };

  const initVal = {
    user_other_aid: itemEdit ? itemEdit.user_other_aid : "",
    user_other_emp_id: itemEdit ? itemEdit.user_other_emp_id : "",
    user_other_role_id: itemEdit ? itemEdit.user_other_role_id : "",
    user_other_emp_id_old: itemEdit ? itemEdit.user_other_emp_id : "",
  };

  const yupSchema = Yup.object({
    user_other_emp_id: Yup.string().required("Required"),
    user_other_role_id: Yup.string().required("Required"),
  });

  return (
    <>
      <div
        className={`modal fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark z-50 animate-fadeIn ${show}`}
      >
        <div className="p-1 w-[350px] rounded-b-2xl animate-slideUp ">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {itemEdit ? "Update" : "Add"} user
            </h3>
            <button
              type="button"
              className="text-gray-200 text-base"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>
          <div className="bg-white p-4 rounded-b-2xl">
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                fetchData(
                  setLoading,
                  itemEdit
                    ? `/v1/user-others/${itemEdit.user_other_aid}`
                    : "/v1/user-others",
                  values, // form data values
                  null, // result set data
                  itemEdit ? "Succesfully updated." : "Succesfully added.", // success msg
                  "", // additional error msg if needed
                  dispatch, // context api action
                  store, // context api state
                  true, // boolean to show success modal
                  false, // boolean to show load more functionality button
                  null, // navigate default value
                  itemEdit ? "put" : "post"
                );
                dispatch(setStartIndex(0));
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="relative mb-6">
                      <div className="relative mb-6 mt-5">
                        {itemEdit ? (
                          <p className="font-bold">
                            {itemEdit.employee_lname}, {itemEdit.employee_fname}
                          </p>
                        ) : (
                          <InputSelect
                            label="Select employee"
                            name="user_other_emp_id"
                            disabled={loading}
                          >
                            <>
                              <optgroup label="Select employee">
                                <option value="" hidden></option>
                                {/* {employee.length > 0 ? (
                                  employee.map((item, key) => {
                                    return (
                                      <option
                                        key={key}
                                        value={item.employee_aid}
                                      >
                                        {item.employee_lname},{" "}
                                        {item.employee_fname}
                                      </option>
                                    );
                                  })
                                ) : (
                                  <option value="">No Data</option>
                                )} */}
                              </optgroup>
                            </>
                          </InputSelect>
                        )}
                      </div>
                    </div>
                    <div className="relative mb-5">
                      <InputSelect
                        label="Role"
                        name="useother_role_id"
                        disabled={loading}
                      >
                        <>
                          <optgroup label="Select role">
                            {role.length > 0 ? (
                              role.map((item, key) => {
                                return (
                                  <option key={key} value={item.role_aid}>
                                    {item.role_name}
                                  </option>
                                );
                              })
                            ) : (
                              <option value="">No Data</option>
                            )}
                          </optgroup>
                        </>
                      </InputSelect>
                    </div>

                    <div className="flex items-center gap-1 pt-5">
                      <button
                        type="submit"
                        disabled={loading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {loading ? (
                          <ButtonSpinner />
                        ) : itemEdit ? (
                          "Save"
                        ) : (
                          "Add"
                        )}
                      </button>
                      <button
                        type="reset"
                        className="btn-modal-cancel cursor-pointer"
                        onClick={handleClose}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAddOtherUser;
