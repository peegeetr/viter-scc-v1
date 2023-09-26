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
} from "../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../store/StoreContext";
import { InputText } from "../../../../../helpers/FormInputs";
import {
  getDateNow,
  getUrlParam,
  numberWithCommas,
  pesoSign,
} from "../../../../../helpers/functions-general";
import { queryData } from "../../../../../helpers/queryData";
import ButtonSpinner from "../../../../../partials/spinners/ButtonSpinner";
import {
  getHistoryTotalPrice,
  getHistoryValuePrice,
} from "./functions-product-history";

const ModalAddSuppliersProductsHistory = ({ percent }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const supplierProductId = getUrlParam().get("supplierProductId");
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) => queryData(`/v1/product-history`, "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["product-history"] });
      // show success box
      if (data.success) {
        dispatch(setIsAdd(false));
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly added. `));
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
    product_history_product_id: supplierProductId,
    product_history_date: getDateNow(),
    product_history_price: "",
  };

  const yupSchema = Yup.object({
    product_history_date: Yup.string().required("Required"),
    product_history_price: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">Add Product Price</h3>
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
                const valuePrice = getHistoryValuePrice(values, percent);
                // const product_history_price = removeComma(
                //   `${values.product_history_price}`
                // );
                // const product_history_scc_price = removeComma(
                //   `${values.product_history_scc_price}`
                // );
                mutation.mutate({
                  ...values,
                  valuePrice,
                });
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="relative my-5">
                      <InputText
                        label="Date"
                        type="date"
                        name="product_history_date"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative my-5">
                      <InputText
                        label="Product Supplier Price"
                        type="text"
                        num="num"
                        name="product_history_price"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <p className="ml-3 text-primary">
                      Member Price :
                      <span className="text-black">
                        {pesoSign}
                        {numberWithCommas(
                          Number(
                            getHistoryTotalPrice(props.values, percent)
                              .memberPrice
                          ).toFixed(2)
                        )}{" "}
                        {props.values.product_history_price === ""
                          ? ""
                          : `(+ ${percent.member}%)`}
                      </span>
                    </p>
                    <p className="ml-3 text-primary">
                      Retail Price :
                      <span className="text-black">
                        {pesoSign}
                        {numberWithCommas(
                          Number(
                            getHistoryTotalPrice(props.values, percent)
                              .retailPrice
                          ).toFixed(2)
                        )}{" "}
                        {props.values.product_history_price === ""
                          ? ""
                          : `(+ ${percent.retail}%)`}
                      </span>
                    </p>

                    <div className="flex items-center gap-1 pt-5">
                      <button
                        type="submit"
                        disabled={mutation.isLoading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {mutation.isLoading && <ButtonSpinner />} Add
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

export default ModalAddSuppliersProductsHistory;
