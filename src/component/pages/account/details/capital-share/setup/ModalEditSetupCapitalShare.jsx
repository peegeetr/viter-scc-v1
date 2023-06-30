import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import {
  setError,
  setIsAdd,
  setIsEditProfile,
  setMessage,
  setSuccess,
} from "../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../store/StoreContext";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import { InputSelect, InputText } from "../../../../../helpers/FormInputs";
import {
  getDateNow,
  getUrlParam,
  numberWithCommas,
  removeComma,
} from "../../../../../helpers/functions-general";
import { queryData } from "../../../../../helpers/queryData";
import ButtonSpinner from "../../../../../partials/spinners/ButtonSpinner";

const ModalEditSetupCapitalShare = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const memberid = getUrlParam().get("memberid");

  const queryClient = useQueryClient();
  const [show, setShow] = React.useState("show");

  // use if not loadmore button undertime
  const { data: capitalShare } = useQueryData(
    `/v1/capital-share`, // endpoint
    "get", // method
    "payslip" // key
  );

  // use if not loadmore button undertime
  const { isLoading, data: subscribeCapitalActive } = useQueryData(
    `/v1/subscribe-capital`,
    "get", // method
    "subscribe-capital-active" // key
  );
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        `/v1/capital-share/update-capital-details/${item.members_aid}`,
        "put",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["membersSubscribeCapital"] });
      dispatch(setIsEditProfile(false));

      // show success box
      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly ${item ? "updated." : "added."}`));
      }

      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });
  const handleClose = () => {
    dispatch(setIsEditProfile(false));
  };

  const initVal = {
    members_subscribe_capital_id: item.members_subscribe_capital_id,
    members_initial_payment: "",
    members_member_fee: item.members_member_fee,
    capital_share_or: "",
  };

  const yupSchema = Yup.object({
    members_subscribe_capital_id: Yup.string().required("Required"),
    members_initial_payment:
      item.members_subscribe_capital_id === "" &&
      Yup.string().required("Required"),
    members_member_fee:
      item.members_subscribe_capital_id === "" &&
      Yup.string().required("Required"),
    capital_share_or:
      item.members_subscribe_capital_id === "" &&
      Yup.string().required("Required"),
  });

  return (
    <>
      <div
        className={` fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark z-50 bg-opacity-50 animate-fadeIn ${show}`}
      >
        <div className="p-1 w-[350px] rounded-b-2xl animate-slideUp ">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} Details Capital Share
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
                // console.log(values);
                const members_initial_payment = removeComma(
                  `${values.members_initial_payment}`
                );
                const members_member_fee = removeComma(
                  `${values.members_member_fee}`
                );
                // mutate data
                mutation.mutate({
                  ...values,
                  members_initial_payment,
                  members_member_fee,
                });
              }}
            >
              {(props) => {
                return (
                  <Form className="">
                    <div className="relative my-5 ">
                      <InputSelect
                        name="members_subscribe_capital_id"
                        label="Subscribe Capital"
                        disabled={mutation.isLoading || isLoading}
                      >
                        <option value="" hidden>
                          {isLoading ? "Loading..." : "--"}
                        </option>
                        {subscribeCapitalActive?.data.map((scItem, key) => {
                          return (
                            <option
                              key={key}
                              value={scItem.subscribe_capital_aid}
                            >
                              &#8369;
                              {` ${numberWithCommas(
                                Number(scItem.subscribe_capital_amount).toFixed(
                                  2
                                )
                              )} ${
                                scItem.subscribe_capital_is_active === 1
                                  ? "(Active)"
                                  : ""
                              }`}
                            </option>
                          );
                        })}
                      </InputSelect>
                    </div>
                    {item.members_subscribe_capital_id === "" && (
                      <>
                        <div className="relative mb-5">
                          <InputText
                            label="Initial Payment"
                            type="text"
                            num="num"
                            name="members_initial_payment"
                            disabled={mutation.isLoading}
                          />
                        </div>
                        <div className="relative mb-5">
                          <InputText
                            label="Membership fee"
                            type="text"
                            num="num"
                            name="members_member_fee"
                            disabled={mutation.isLoading}
                          />
                        </div>
                        <div className="relative mb-5">
                          <InputText
                            label="Official Receipt"
                            type="text"
                            name="capital_share_or"
                            disabled={mutation.isLoading}
                          />
                        </div>
                      </>
                    )}

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

export default ModalEditSetupCapitalShare;
