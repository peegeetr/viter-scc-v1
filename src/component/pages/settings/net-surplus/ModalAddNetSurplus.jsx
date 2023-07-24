import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import * as Yup from "yup";
import { StoreContext } from "../../../../store/StoreContext";
import { queryData } from "../../../helpers/queryData";
import {
  setError,
  setIsAdd,
  setMessage,
  setSuccess,
} from "../../../../store/StoreAction";
import { getDateNow, yearNow } from "../../../helpers/functions-general";
import { InputText } from "../../../helpers/FormInputs";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import { computeNetSurplus } from "./functions-net-surplus";
const ModalAddNetSurplus = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item ? `/v1/net-surplus/${item.net_surplus_aid}` : `/v1/net-surplus`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["net-surplus"] });
      // show success box
      if (data.success) {
        dispatch(setIsAdd(false));
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
    dispatch(setIsAdd(false));
  };

  const initVal = {
    net_surplus_year: item ? item.net_surplus_year : yearNow(),
    net_surplus_year_old: item ? item.net_surplus_year : yearNow(),
    net_surplus_before_amount: item ? item.net_surplus_before_amount : "",
    net_surplus_distribution_amount: item
      ? item.net_surplus_distribution_amount
      : "",
    net_surplus_operating_expenses: item
      ? item.net_surplus_operating_expenses
      : "",
    net_surplus_total_income: item ? item.net_surplus_total_income : "",
    net_surplus_general_reserve: item ? item.net_surplus_general_reserve : "",
    net_surplus_general_reserve_rate: item
      ? item.net_surplus_general_reserve_rate
      : "",
    net_surplus_educ_training: item ? item.net_surplus_educ_training : "",
    net_surplus_educ_training_rate: item
      ? item.net_surplus_educ_training_rate
      : "",
    net_surplus_community_dev: item ? item.net_surplus_community_dev : "",
    net_surplus_community_dev_rate: item
      ? item.net_surplus_community_dev_rate
      : "",
    net_surplus_optional_fund: item ? item.net_surplus_optional_fund : "",
    net_surplus_optional_fund_rate: item
      ? item.net_surplus_optional_fund_rate
      : "",
    net_surplus_dividend: item ? item.net_surplus_dividend : "",
    net_surplus_dividend_rate: item ? item.net_surplus_dividend_rate : "",
    net_surplus_patronage_refund: item ? item.net_surplus_patronage_refund : "",
    net_surplus_patronage_rate: item ? item.net_surplus_patronage_rate : "",
  };

  const yupSchema = Yup.object({
    net_surplus_year: Yup.string().required("Required"),
    net_surplus_total_income: Yup.string().required("Required"),
    net_surplus_operating_expenses: Yup.string().required("Required"),
    net_surplus_general_reserve_rate: Yup.string().required("Required"),
    net_surplus_educ_training_rate: Yup.string().required("Required"),
    net_surplus_community_dev_rate: Yup.string().required("Required"),
    net_surplus_optional_fund_rate: Yup.string().required("Required"),
    net_surplus_dividend_rate: Yup.string().required("Required"),
    net_surplus_patronage_rate: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} Net Surplus
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
                // console.log(values, computeNetSurplus(values));
                mutation.mutate(computeNetSurplus(values));
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="relative my-5">
                      <InputText
                        label="Year"
                        type="text"
                        name="net_surplus_year"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative my-5">
                      <InputText
                        label="Total Income"
                        type="text"
                        num="num"
                        name="net_surplus_total_income"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative my-5">
                      <InputText
                        label="Less: Operating Expenses"
                        type="text"
                        num="num"
                        name="net_surplus_operating_expenses"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative my-5">
                      <InputText
                        label="General Reserve Fund Rate %"
                        type="text"
                        num="num"
                        name="net_surplus_general_reserve_rate"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative my-5">
                      <InputText
                        label="Educ & Training Fund Rate %"
                        type="text"
                        num="num"
                        name="net_surplus_educ_training_rate"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative my-5">
                      <InputText
                        label="Community Development Fund Rate %"
                        type="text"
                        num="num"
                        name="net_surplus_community_dev_rate"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative my-5">
                      <InputText
                        label="Optional Fund Rate %"
                        type="text"
                        num="num"
                        name="net_surplus_optional_fund_rate"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative my-5">
                      <InputText
                        label="Dividend Rate %"
                        type="text"
                        num="num"
                        name="net_surplus_dividend_rate"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative my-5">
                      <InputText
                        label="Patronage Refund Rate %"
                        type="text"
                        num="num"
                        name="net_surplus_patronage_rate"
                        disabled={mutation.isLoading}
                      />
                    </div>

                    <div className="flex items-center gap-1 pt-5">
                      <button
                        type="submit"
                        disabled={mutation.isLoading}
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

export default ModalAddNetSurplus;
