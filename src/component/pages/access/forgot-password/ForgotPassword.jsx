import { Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  setError,
  setForgotPassSuccess,
  setMessage,
  setStartIndex,
  setSuccess,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { fetchData } from "../../../helpers/fetchData";
import { InputText } from "../../../helpers/FormInputs";
import ModalError from "../../../partials/modals/ModalError";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../helpers/queryData";
import { devNavUrl, UrlOtherUser } from "../../../helpers/functions-general";
import SccLogo from "../../../svg/SccLogo";

const ForgotPassword = () => {
  const { store, dispatch } = React.useContext(StoreContext);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) => queryData(`/v1/user-others/reset`, "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["systemUser"] });
      // show success box
      if (data.success) { 
        window.location.replace(
          `${devNavUrl}/forgot-password-verification?redirect=/login`
        );
      }
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(
          setMessage(
            data.error && "Invalid email. Please use a registered one."
          )
        );
      }
    },
  });
  const initVal = {
    email: "",
  };

  const yupSchema = Yup.object({
    email: Yup.string().required("Required"),
  });

  return (
    <>
      <div
        className="flex justify-center items-center"
        style={{ transform: "translateY(clamp(5rem,10vw,22rem))" }}
      >
        <div className="w-96 p-6">
          <div className="flex justify-center">
            <SccLogo />
          </div> 
          <p className="mt-8 mb-5 text-lg font-bold">FORGOT PASSWORD</p>
          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              // console.log(values, values.key);
              mutation.mutate(values);
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div className="relative mb-4">
                    <InputText
                      label="Email"
                      type="text"
                      name="email"
                      disabled={mutation.isLoading}
                    />
                  </div>
                  <div className="flex items-center gap-1 pt-3">
                    <button
                      type="submit"
                      disabled={mutation.isLoading || !props.dirty}
                      className="btn-modal-submit relative"
                    >
                      {mutation.isLoading ? <ButtonSpinner /> : "Submit"}
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
          <p className="mt-2">
            Go back to{" "}
            <Link
              to={`${devNavUrl}/${UrlOtherUser}/login`}
              className="w-full text-primary"
            >
              <u>Login</u>
            </Link>
          </p>
        </div>
      </div>

      {store.error && <ModalError />}
    </>
  );
};

export default ForgotPassword;
