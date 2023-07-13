import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
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
import {
  InputSelect,
  InputText,
  InputTextArea,
} from "../../../helpers/FormInputs";
import ButtonSpinner from "../../../partials/spinners/ButtonSpinner";
import useQueryData from "../../../custom-hooks/useQueryData";
import {
  getDateTimeNow,
  removeComma,
} from "../../../helpers/functions-general";

const ModalAddStocks = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [supplierProductId, setSupplierProductId] = React.useState([]);
  const [supplierProductHistoryId, setSupplierProductHistoryId] =
    React.useState("");
  const [loading, setSelLoading] = React.useState(false);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item ? `/v1/stocks/${item.stocks_aid}` : `/v1/stocks`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["stocks"] });
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
  // use if not loadmore button undertime
  const { isLoading: loadingSupplier, data: supplierData } = useQueryData(
    `/v1/suppliers`, // endpoint
    "get", // method
    "supplierData" // key
  );
  // get employee id
  const handleSupplierProduct = async (e, props) => {
    let supplierId = e.target.value;
    setSelLoading(true);
    const results = await queryData(
      `/v1/suppliers-product/read-supplier-id/${supplierId}`
    );
    if (results.data) {
      setSelLoading(false);
      setSupplierProductId(results.data);
    }
  };
  // get employee id
  const handleSupplierPrice = async (e, props) => {
    setSupplierProductHistoryId(e.target.options[e.target.selectedIndex].id);
  };

  const initVal = {
    supplier_id: item ? item.suppliers_aid : "",
    stocks_product_id: item ? item.stocks_product_id : "",
    stocks_suplier_price_history_id: item
      ? item.stocks_suplier_price_history_id
      : "",
    stocks_remarks: item ? item.stocks_remarks : "",
    stocks_quantity: item ? item.stocks_quantity : "",
    stocks_date: item ? item.stocks_date : getDateTimeNow(),
  };

  const yupSchema = Yup.object({
    supplier_id: Yup.string().required("Required"),
    stocks_product_id: Yup.string().required("Required"),
    stocks_quantity: Yup.string().required("Required"),
    stocks_date: Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} Stocks
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
                const stocks_quantity = removeComma(
                  `${values.stocks_quantity}`
                );
                mutation.mutate({
                  ...values,
                  stocks_quantity,
                });
              }}
            >
              {(props) => {
                props.values.stocks_suplier_price_history_id =
                  supplierProductHistoryId;
                return (
                  <Form>
                    <div className="relative my-5 ">
                      <InputText
                        label="Date"
                        type="text"
                        onFocus={(e) => (e.target.type = "datetime-local")}
                        onBlur={(e) => (e.target.type = "text")}
                        name="stocks_date"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative my-5">
                      <InputSelect
                        name="supplier_id"
                        label="Supplier"
                        onChange={handleSupplierProduct}
                        disabled={mutation.isLoading}
                      >
                        <option value="" hidden>
                          {loading ? "Loading..." : "--"}
                        </option>
                        {supplierData?.data.map((sItem, key) => {
                          return (
                            <option key={key} value={sItem.suppliers_aid}>
                              {`${sItem.suppliers_company_name} `}
                            </option>
                          );
                        })}
                      </InputSelect>
                    </div>
                    <div className="relative my-5">
                      <InputSelect
                        name="stocks_product_id"
                        label="Supplier Product"
                        onChange={handleSupplierPrice}
                        disabled={mutation.isLoading}
                      >
                        <option value="" hidden>
                          {loading ? "Loading..." : "--"}
                        </option>
                        {supplierProductId?.map((sItem, key) => {
                          return (
                            sItem.suppliers_products_price !== "" && (
                              <option
                                key={key}
                                value={sItem.suppliers_products_aid}
                                id={sItem.product_history_aid}
                              >
                                {`${sItem.suppliers_products_name} `}
                              </option>
                            )
                          );
                        })}
                      </InputSelect>
                    </div>
                    <div className="relative my-5">
                      <InputText
                        label="Quantity"
                        type="text"
                        num="num"
                        name="stocks_quantity"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative my-5">
                      <InputTextArea
                        label="Remarks"
                        type="text"
                        num="num"
                        name="stocks_remarks"
                        disabled={mutation.isLoading}
                      />
                    </div>

                    <div className="flex items-center gap-1 pt-5">
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

export default ModalAddStocks;
