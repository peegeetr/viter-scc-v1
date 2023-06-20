import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { setError, setMessage } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { InputText } from "../../../helpers/FormInputs";
import { devNavUrl } from "../../../helpers/functions-general";
import { queryData } from "../../../helpers/queryData";
import ModalError from "../../../partials/modals/ModalError";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import SccLogo from "../../../svg/SccLogo";
import PageUnderMaintenance from "../../../partials/PageUnderMaintenance";
import useQueryData from "../../../custom-hooks/useQueryData";
import TableSpinner from "../../../partials/spinners/TableSpinner";

const CreateAccount = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`/v1/user-others/sign-up`, "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["UserOtherCreateAccount"] });
      // show success box
      if (data.success) {
        window.location.replace(`${devNavUrl}/create-verification`);
      }
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  // use if not loadmore button undertime
  const { isLoading, data: isOnSystemMode } = useQueryData(
    `/v1/system-maintenance/maintenance`, // endpoint
    "get", // method
    "isOnSystemMode" // key
  );

  const initVal = {
    members_email: "",
  };

  const yupSchema = Yup.object({
    members_email: Yup.string().required("Required"),
  });

  return (
    <>
      {isLoading ? (
        <TableSpinner />
      ) : isOnSystemMode?.count > 0 || isOnSystemMode?.data.length > 0 ? (
        <PageUnderMaintenance />
      ) : (
        <div
          className="flex justify-center items-center"
          style={{ transform: "translateY(clamp(5rem,10vw,22rem))" }}
        >
          <div className="w-96 p-6">
            <div className="flex justify-center">
              <SccLogo />
            </div>
            <p className="mt-8 mb-5 text-lg font-bold uppercase">
              create account
            </p>
            <Formik
              initialValues={initVal}
              validationSchema={yupSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                // console.log(values);
                mutation.mutate(values);
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="relative mb-4">
                      <InputText
                        label="Member Email"
                        type="text"
                        name="members_email"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="flex items-center gap-1 pt-3">
                      <button
                        type="submit"
                        disabled={mutation.isLoading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {mutation.isLoading ? <ButtonSpinner /> : "Create"}
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
            <p className="mt-5">
              Already have an account?{" "}
              <a href={`${devNavUrl}/login`} className="w-full text-primary">
                <u>Go back to Login</u>
              </a>
            </p>
          </div>
        </div>
      )}

      {store.error && <ModalError />}
    </>
  );
};

export default CreateAccount;
