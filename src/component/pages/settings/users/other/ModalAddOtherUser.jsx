import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import { InputSelect, InputText } from "../../../../helpers/FormInputs";
import { queryData } from "../../../../helpers/queryData";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";

const ModalAddOtherUser = ({ item, role, members }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item ? `/v1/user-others/${item.user_other_aid}` : `/v1/user-others`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["otherUsers"] });
      // show success box
      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(
          setMessage(
            `Successfuly ${
              item
                ? "updated."
                : "added, please check your email for verification."
            }`
          )
        );
      }
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });
  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const initVal = {
    user_other_name: item ? item.user_other_name : "",
    user_other_email: item ? item.user_other_email : "",
    user_other_role_id:  item ? item.user_other_role_id : "",

    user_other_name_old: item ? item.user_other_name : "",
    user_other_email_old: item ? item.user_other_email : "",
  };

  const yupSchema = Yup.object({
    user_other_name: Yup.string().required("Required"),
    user_other_email: Yup.string().required("Required").email("Invalid email"),
    user_other_role_id: Yup.string().required("Required").email("Invalid email"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} user
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
                console.log(values);
                mutation.mutate(values);
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="relative my-5">
                    <InputSelect
                      name="user_other_member_id"
                      label="Name"
                      disabled={mutation.isLoading}
                      onFocus={(e) =>
                        e.target.parentElement.classList.add("focused")
                      }
                    >
                      <option value="">--</option> 
                      {members.map((mItem, key) => {
                        return (
                          <option key={key} value={mItem.members_aid}>
                            {`${mItem.members_last_name},
                              ${mItem.members_first_name}`}
                          </option>
                        );
                      })}
                    </InputSelect> 
                    </div>
                    <div className="relative mb-5 mt-5">
                      <InputText
                        label="Email"
                        type="text"
                        name="user_other_email"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative my-5">
                    <InputSelect
                      name="user_other_role_id"
                      label="Role"
                      disabled={mutation.isLoading}
                      onFocus={(e) =>
                        e.target.parentElement.classList.add("focused")
                      }
                    >
                      <option value="">--</option> 
                      {role.map((rItem, key) => {
                        return (
                          rItem.role_is_developer === 0 &&
                          <option key={key} value={rItem.role_aid}>
                             {rItem.role_name} 
                          </option> 
                        );
                      })}
                    </InputSelect> 
                    </div>

                    <div className="flex items-center gap-1 pt-5">
                      <button
                        type="submit"
                        disabled={mutation.isLoading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {mutation.isLoading && <ButtonSpinner />}
                        {item ? "Save" : "Add"}
                      </button>
                      <button
                        type="reset"
                        className="btn-modal-cancel cursor-pointer"
                        onClick={handleClose}
                        disabled={mutation.isLoading}
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
