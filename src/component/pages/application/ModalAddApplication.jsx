import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import { setError, setMessage, setSuccess } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { InputSelect, InputText } from "../../helpers/FormInputs";
import { closeModal, numberWithCommas } from "../../helpers/functions-general";
import { queryData } from "../../helpers/queryData";
import ButtonSpinner from "../../partials/spinners/ButtonSpinner";
import useQueryData from "../../custom-hooks/useQueryData";

const ModalAddApplication = () => {
  const { dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();
  const [show, setShow] = React.useState("show");

  const mutation = useMutation({
    mutationFn: (values) => queryData("/v1/members", "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["members-application"] });

      // show success box
      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly added`));
      }

      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });
  const handleClose = () => {
    closeModal(setShow, dispatch);
  };

  // use if not loadmore button undertime
  const { isLoading, data: subscribeCapitalActive } = useQueryData(
    `/v1/subscribe-capital`,
    "get", // method
    "subscribe-capital-active" // key
  );

  const currentSC = subscribeCapitalActive?.data.filter(
    (item) => item.subscribe_capital_is_active === 1
  );
  const initVal = {
    members_pre_membership_date: "",
    members_first_name: "",
    members_last_name: "",
    members_middle_name: " ",
    members_gender: "",
    members_email: "",
    members_birth_date: "",
  };

  const yupSchema = Yup.object({
    members_pre_membership_date: Yup.string().required("Required"),
    members_first_name: Yup.string().required("Required"),
    members_last_name: Yup.string().required("Required"),
    members_gender: Yup.string().required("Required"),
    members_email: Yup.string().required("Required"),
    members_birth_date: Yup.string().required("Required"),
  });

  return (
    <>
      <div
        className={`bg-opacity-50 fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark z-50 animate-fadeIn ${show}`}
      >
        <div className="p-1 w-[350px] rounded-b-2xl animate-slideUp ">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">Add Account</h3>
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
                // console.log(values );
                // mutate data
                mutation.mutate(values);
              }}
            >
              {(props) => {
                return (
                  <Form className="pt-5">
                    <div className="relative mb-6">
                      <InputText
                        label="Pre Membership Date"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        name="members_pre_membership_date"
                        disabled={mutation.isLoading}
                      />
                    </div>

                    <div className="relative mb-5">
                      <InputText
                        label="Last Name"
                        type="text"
                        name="members_last_name"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="First Name"
                        type="text"
                        name="members_first_name"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Middle Name"
                        type="text"
                        name="members_middle_name"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Email"
                        type="text"
                        name="members_email"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputSelect
                        label="Gender"
                        type="text"
                        name="members_gender"
                        disabled={mutation.isLoading}
                      >
                        <option value="">--</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                      </InputSelect>
                    </div>
                    <div className="relative mb-6 mt-5">
                      <InputText
                        label="Birth Date"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        name="members_birth_date"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="flex items-center gap-1 pt-3">
                      <button
                        type="submit"
                        disabled={mutation.isLoading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {mutation.isLoading ? <ButtonSpinner /> : " Add"}
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

export default ModalAddApplication;
