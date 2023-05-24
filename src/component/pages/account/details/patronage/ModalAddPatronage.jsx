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
} from "../../../../../store/StoreAction";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { InputSelect, InputText } from "../../../../helpers/FormInputs";
import {
  getUrlParam,
  removeComma,
} from "../../../../helpers/functions-general";
import { queryData } from "../../../../helpers/queryData";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";

const ModalAddPatronage = ({ item }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const memberid = getUrlParam().get("memberid");
  const [price, setPrice] = React.useState(
    item ? item.patronage_product_amount : ""
  );

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item ? `/v1/orders/${item.patronage_aid}` : `/v1/orders`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["patronage"] });

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
  // use if not loadmore button undertime
  const { isFetching: loadingProduct, data: productPatronage } = useQueryData(
    `/v1/product`, // endpoint
    "get", // method
    "product-patronage" // key
  );

  const handleClose = () => {
    dispatch(setIsAdd(false));
  };

  const handlePrice = async (e, props) => {
    // get employee id
    setPrice(e.target.options[e.target.selectedIndex].id);
  };
  const initVal = {
    patronage_member_id: item ? item.patronage_member_id : memberid,
    patronage_product_id: item ? item.patronage_product_id : "",
    patronage_product_quantity: item ? item.patronage_product_quantity : "",
    patronage_product_amount: item ? item.patronage_product_amount : "",
    patronage_date: item ? item.patronage_date : "",
    patronage_or: item ? item.patronage_or : "",
  };

  const yupSchema = Yup.object({
    patronage_product_id: Yup.string().required("Required"),
    patronage_product_quantity: Yup.string().required("Required"),
    patronage_date: Yup.string().required("Required"),
    patronage_or: Yup.string().required("Required"),
  });
  return (
    <>
      <div
        className={`modal fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark z-50 animate-fadeIn`}
      >
        <div className="p-1 w-[350px] rounded-b-2xl animate-slideUp ">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} patronage
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

                // mutate data
                mutation.mutate(values);
              }}
            >
              {(props) => {
                props.values.patronage_product_amount =
                  price * removeComma(props.values.patronage_product_quantity);
                return (
                  <Form className="">
                    <div className="relative my-5">
                      <InputSelect
                        name="patronage_product_id"
                        label="Product"
                        onChange={handlePrice}
                        disabled={mutation.isLoading}
                      >
                        <option value="" hidden>
                          {loadingProduct ? "Loading..." : "--"}
                        </option>
                        {productPatronage?.data.map((sItem, key) => {
                          return (
                            <option
                              key={key}
                              value={sItem.product_aid}
                              id={sItem.suppliers_products_price}
                            >
                              {`${sItem.suppliers_products_name} `}
                            </option>
                          );
                        })}
                      </InputSelect>
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="Quantity"
                        type="text"
                        name="patronage_product_quantity"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-6 mt-5">
                      <InputText
                        label="Date"
                        type="text"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                        name="patronage_date"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative mb-5">
                      <InputText
                        label="OR"
                        type="text"
                        name="patronage_or"
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

export default ModalAddPatronage;
