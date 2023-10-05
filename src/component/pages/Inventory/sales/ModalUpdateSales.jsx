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
} from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { InputSelect, InputText } from "../../../helpers/FormInputs";
import {
  otherDiscountId,
  pesoSign,
  wholeSaleDiscountId,
} from "../../../helpers/functions-general";
import { queryData } from "../../../helpers/queryData";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import {
  getInventorySalesDiscount,
  getInventorySalesOrderSrpPrice,
  getInventorySalesWholesales,
  getSalesChange,
  getValidationSales,
  showWholeSaleInSales,
} from "./functions-sales";

const ModalUpdateSales = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(`/v1/sales/${item.sales_aid}`, "put", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      // show success box

      if (data.success) {
        dispatch(setSuccess(true));
        dispatch(setMessage(`Successfuly paid`));
        dispatch(setIsConfirm(false));
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
    sales_or: item.sales_or,
    sales_receive_amount: item.sales_receive_amount,
    sales_member_change: "",
    sales_order_id: item.sales_order_id,
    sales_discount: "",
    orders_is_discounted: "",
  };

  const yupSchema = Yup.object({
    sales_or: Yup.string().required("Required"),
    sales_receive_amount: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">Recieve Payment</h3>
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
                // for validation
                const validation = getValidationSales(values, item, dispatch);
                // new list
                const list = validation.list;
                // for validation if invalid amount
                if (validation.invalidAmount === true || list.length === 0) {
                  return;
                }

                mutation.mutate({
                  ...values,
                  sales_receive_amount: list[0].sales_receive_amount,
                  sales_discount: list[0].sales_discount,
                  sales_member_change: list[0].sales_member_change,
                  orders_product_srp: list[0].orders_product_srp,
                  orders_product_amount: list[0].orders_product_amount,
                });
              }}
            >
              {(props) => {
                return (
                  <Form>
                    <div className="pl-3 text-primary">
                      <p className="mb-0 text-lg">
                        Name:
                        <span className="text-black ml-2">
                          {`${item.members_last_name}, ${item.members_first_name}`}
                        </span>
                      </p>
                      <p className="mb-0 text-lg">
                        Product:
                        <span className="text-black ml-2 capitalize">
                          {item.suppliers_products_name} ({pesoSign}
                          {Number(
                            getInventorySalesOrderSrpPrice(props.values, item)
                          ).toFixed(2)}
                          )
                        </span>
                      </p>

                      <p className="mb-0 text-lg">
                        Discount Amount:
                        <span className="text-black ml-2">
                          {pesoSign}{" "}
                          {getInventorySalesDiscount(props.values).toFixed(2)}
                        </span>
                      </p>

                      <p className="mb-0 text-lg">
                        Total Amount:
                        <span className="text-black ml-2">
                          {pesoSign}{" "}
                          {Number(
                            getInventorySalesWholesales(
                              props.values,
                              item
                            ).toFixed(2) -
                              getInventorySalesDiscount(props.values).toFixed(2)
                          ).toFixed(2)}
                        </span>
                      </p>
                      <p className="text-lg">
                        Change:
                        <span className="text-black ml-2">
                          {pesoSign}{" "}
                          {Number(
                            getSalesChange(
                              getInventorySalesWholesales(props.values, item),
                              getInventorySalesDiscount(props.values),
                              props.values.sales_receive_amount
                            )
                          ).toFixed(2)}
                        </span>
                      </p>
                    </div>

                    <div className="relative mt-6 mb-5">
                      <InputText
                        label="Receive Amount"
                        type="text"
                        name="sales_receive_amount"
                        num="num"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputSelect
                        label="Discount Category"
                        type="text"
                        name="orders_is_discounted"
                        disabled={mutation.isLoading}
                      >
                        <option value="">No Discount</option>
                        {showWholeSaleInSales(item) && (
                          <option value={wholeSaleDiscountId}>
                            Whole Sales
                          </option>
                        )}
                        <option value={otherDiscountId}>Other Option</option>
                      </InputSelect>
                    </div>

                    {props.values.orders_is_discounted === otherDiscountId && (
                      <div className="relative my-5">
                        <InputText
                          label="Discount"
                          type="text"
                          num="num"
                          name="sales_discount"
                          disabled={mutation.isLoading}
                        />
                      </div>
                    )}
                    <div className="relative mb-4 ">
                      <InputText
                        label="Sales invoice number"
                        type="text"
                        name="sales_or"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="flex items-center gap-1 pt-5">
                      <button
                        type="submit"
                        disabled={mutation.isLoading || !props.dirty}
                        className="btn-modal-submit relative"
                      >
                        {mutation.isLoading ? <ButtonSpinner /> : "Confirm"}
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

export default ModalUpdateSales;
