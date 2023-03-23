import { Form, Formik } from "formik";
import React from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import {
  setCreatePassSuccess,
  setError,
  setMessage,
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { InputText } from "../../../helpers/FormInputs";
import {
  devNavUrl,
  getUrlParam,
  UrlSystem,
} from "../../../helpers/functions-general";
import PageNotFound from "../../../partials/PageNotFound";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import ContentSpinner from "../../../partials/spinners/ContentSpinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useQueryData from "../../../custom-hooks/useQueryData";
import { queryData } from "../../../helpers/queryData";
import SccLogo from "../../../svg/SccLogo";

const CreateSystemPassword = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [newPasswordShown, setNewPasswordShown] = React.useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = React.useState(false);
  const navigate = useNavigate();
  const paramKey = getUrlParam().get("key");

  // use if not loadmore button undertime
  const { isLoading, data: key } = useQueryData(
    `/v1/user-systems/key/${paramKey}`, // endpoint
    "get", // method
    "key" // key
  );
  const toggleNewPassword = () => {
    setNewPasswordShown(!newPasswordShown);
  };

  const toggleConfirmPassword = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`/v1/user-systems/password`, "put", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["systemUser"] });
      // show success box
      if (data.success) {
        window.location.replace(
          `${devNavUrl}/create-password-success?redirect=/${UrlSystem}/login`
        );
      }
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });
  const initVal = {
    new_password: "",
    confirm_password: "",
    key: paramKey,
  };

  const yupSchema = Yup.object({
    new_password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters.")
      .matches(/[a-z]/, "At least one lowercase letter.")
      .matches(/[A-Z]/, "At least one uppercase letter.")
      .matches("(?=.*[@$!%*#?&])", "Atleast 1 special character.")
      .matches("(?=.*[0-9])", "Atleast 1 number."),
    confirm_password: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("new_password"), null], "Passwords does not match."),
  });

  React.useEffect(() => {
    dispatch(setCreatePassSuccess(true));
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="relative h-screen">
          <ContentSpinner />
        </div>
      ) : key?.data.length === 0 || paramKey === null || paramKey === "" ? (
        <div className="relative h-screen">
          <PageNotFound />
        </div>
      ) : (
        <div
          className="relative"
          style={{ transform: "translateY(clamp(5rem,5vw,15rem))" }}
        >
          <div className="flex justify-center items-center ">
            <div className="w-96 p-6">
              <div className="flex justify-center">
                <SccLogo />
              </div>

              <p className="mt-8 mb-5 text-lg font-bold">
                DEVOPS CREATE PASSWORD
              </p>
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
                      <div className="relative mb-7">
                        <InputText
                          label="New password"
                          type={newPasswordShown ? "text" : "password"}
                          name="new_password"
                          disabled={mutation.isLoading}
                        />
                        {props.values.new_password && (
                          <span
                            className="text-base absolute bottom-1/2 right-2 translate-y-1/2 cursor-pointer"
                            onClick={toggleNewPassword}
                          >
                            {newPasswordShown ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        )}
                      </div>
                      <div className="relative mb-5">
                        <InputText
                          label="Confirm password"
                          type={confirmPasswordShown ? "text" : "password"}
                          name="confirm_password"
                          disabled={
                            mutation.isLoading ||
                            props.values.new_password === ""
                          }
                        />
                        {props.values.confirm_password && (
                          <span
                            className="text-base absolute bottom-1/2 right-2 translate-y-1/2 cursor-pointer
                    "
                            onClick={toggleConfirmPassword}
                          >
                            {confirmPasswordShown ? <FaEyeSlash /> : <FaEye />}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 pt-3">
                        <button
                          type="submit"
                          disabled={
                            mutation.isLoading ||
                            props.values.new_password === "" ||
                            props.values.confirm_password === ""
                          }
                          className="btn-modal-submit relative"
                        >
                          {mutation.isLoading ? <ButtonSpinner /> : "Save"}
                        </button>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
              <h3 className="mt-5">Password must contain:</h3>
              <ul className="list-disc ml-5">
                <li className="text-xs italic">At least 8 characters</li>
                <li className="text-xs italic">
                  At least one lowercase letter
                </li>
                <li className="text-xs italic">
                  At least one uppercase letter
                </li>
                <li className="text-xs italic">
                  At least one special character
                </li>
                <li className="text-xs italic">At least one number</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateSystemPassword;
