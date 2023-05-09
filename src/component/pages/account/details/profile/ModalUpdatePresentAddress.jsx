import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setError,
  setIsConfirm,
  setMessage,
  setSuccess,
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import { InputSelect, InputText } from "../../../../helpers/FormInputs";
import { queryData } from "../../../../helpers/queryData";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";

const ModalUpdatePresentAddress = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  let present = "present";
  const queryClient = useQueryClient();
  const [show, setShow] = React.useState("show");

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`/v1/members/${item.members_aid}/${present}`, "put", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["members"] });

      // show success box
      if (data.success) {
        dispatch(setIsConfirm(false));
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly updated`));
      }

      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });
  const handleClose = () => {
    dispatch(setIsConfirm(false));
  };

  const initVal = {
    members_present_address: item.members_present_address,
    members_present_zip_code: item.members_present_zip_code,
    members_present_mobile_no: item.members_present_mobile_no,
  };

  const yupSchema = Yup.object({
    members_present_address: Yup.string().required("Required"),
    members_present_mobile_no: Yup.string().required("Required"),
    members_present_zip_code: Yup.string().required("Required"),
  });

  return (
    <>
      <div
        className={`modal fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark z-50 animate-fadeIn ${show}`}
      >
        <div className="p-1 w-[350px] rounded-b-2xl animate-slideUp ">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">Update Present Address</h3>
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
                // mutate data
                mutation.mutate(values);
              }}
            >
              {(props) => {
                return (
                  <Form className="pt-5">
                    <div className="relative mb-5">
                      <InputText
                        label="Present Address"
                        type="text"
                        name="members_present_address"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Zip Code"
                        type="text"
                        name="members_present_zip_code"
                        disabled={mutation.isLoading}
                      />
                    </div>

                    <div className="relative mb-5">
                      <InputText
                        label="Mobile no."
                        type="text"
                        name="members_present_mobile_no"
                        disabled={mutation.isLoading}
                      />
                    </div>

                    <div className="flex items-center gap-1 pt-3">
                      <button
                        type="submit"
                        disabled={mutation.isLoading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {mutation.isLoading ? (
                          <ButtonSpinner />
                        ) : item ? (
                          "Save"
                        ) : (
                          "Add"
                        )}
                      </button>
                      <button
                        type="reset"
                        className="btn-modal-cancel"
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

export default ModalUpdatePresentAddress;
