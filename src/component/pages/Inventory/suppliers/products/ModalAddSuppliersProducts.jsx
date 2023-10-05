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
  numberWithCommas,
  pesoSign,
} from "../../../../helpers/functions-general";
import { queryData } from "../../../../helpers/queryData";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import { getTotalPrice, getValuePrice } from "./functions-supplier-product";

const ModalAddSuppliersProducts = ({ item, percent }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isPercent, setPercent] = React.useState("");
  const supplierId = getUrlParam().get("supplierId");
  // console.log(item);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) =>
      queryData(
        item
          ? `/v1/suppliers-product/${item.suppliers_products_aid}`
          : `/v1/suppliers-product`,
        item ? "put" : "post",
        values
      ),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["suppliers-product"] });
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
  const { isLoading, data: categoryId } = useQueryData(
    `/v1/category`, // endpoint
    "get", // method
    "categoryId" // key
  );

  const handlePercent = async (e, props) => {
    // get employee id
    setPercent(e.target.value);
  };
  const initVal = {
    suppliers_products_suppliers_id: supplierId,
    suppliers_products_name: item ? item.suppliers_products_name : "",
    suppliers_products_price: item ? item.suppliers_products_price : "",
    suppliers_products_is_other_percent: "0",

    suppliers_products_category_id: item
      ? item.suppliers_products_category_id
      : "",

    suppliers_products_member_percent: item
      ? item.suppliers_products_member_percent
      : "",
    suppliers_products_retail_percent: item
      ? item.suppliers_products_retail_percent
      : "",
    suppliers_products_ws_member_percent: item
      ? item.suppliers_products_ws_member_percent
      : "",
    suppliers_products_ws_retail_percent: item
      ? item.suppliers_products_ws_retail_percent
      : "",

    suppliers_products_name_old: item ? item.suppliers_products_name : "",
  };

  const yupSchema = Yup.object({
    suppliers_products_name: Yup.string().required("Required"),
    suppliers_products_price: !item && Yup.string().required("Required"),
    suppliers_products_category_id: Yup.string().required("Required"),
    suppliers_products_member_percent:
      !item && isPercent === "1" && Yup.string().required("Required"),
    suppliers_products_retail_percent:
      !item && isPercent === "1" && Yup.string().required("Required"),
    suppliers_products_ws_member_percent:
      !item && isPercent === "1" && Yup.string().required("Required"),
    suppliers_products_ws_retail_percent:
      !item && isPercent === "1" && Yup.string().required("Required"),
  });

  return (
    <>
      <div className="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center bg-dark bg-opacity-50 z-50">
        <div className="p-1 w-[350px] rounded-b-2xl">
          <div className="flex justify-between items-center bg-primary p-3 rounded-t-2xl">
            <h3 className="text-white text-sm">
              {item ? "Update" : "Add"} Products
            </h3>
            <button
              type="button"
              className="text-gray-200 text-base"
              onClick={handleClose}
            >
              <FaTimesCircle />
            </button>
          </div>
          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              // console.log(values);
              // get supplier, member and retail price
              const valuePrice = getValuePrice(values, percent);

              mutation.mutate({
                ...values,
                valuePrice,
              });
            }}
          >
            {(props) => {
              return (
                <Form>
                  <div
                    className={`${
                      props.values.suppliers_products_is_other_percent === "1"
                        ? "overflow-auto h-[34rem] "
                        : " "
                    }bg-white p-4 rounded-b-2xl`}
                  >
                    <div className="relative my-5">
                      <InputText
                        label="Product Name"
                        type="text"
                        name="suppliers_products_name"
                        disabled={mutation.isLoading}
                      />
                    </div>
                    <div className="relative my-5">
                      <InputSelect
                        name="suppliers_products_category_id"
                        label="Product Category"
                        disabled={mutation.isLoading}
                      >
                        <option value="" hidden>
                          {isLoading ? "Loading..." : "--"}
                        </option>
                        {categoryId?.data.map((cItem, key) => {
                          return (
                            <option
                              key={key}
                              value={cItem.product_category_aid}
                            >
                              {`${cItem.product_category_name}`}
                            </option>
                          );
                        })}
                      </InputSelect>
                    </div>
                    {item ? (
                      <>
                        <p className="ml-3 text-primary">
                          Supplier Price :
                          <span className="text-black">
                            {pesoSign}
                            {numberWithCommas(
                              Number(item.suppliers_products_price).toFixed(2)
                            )}
                          </span>
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="relative my-5">
                          <InputText
                            label="Supplier Price"
                            type="text"
                            num="num"
                            name="suppliers_products_price"
                            disabled={mutation.isLoading}
                          />
                        </div>
                        <div className="relative my-5">
                          <InputSelect
                            label="Percentage"
                            onChange={handlePercent}
                            name="suppliers_products_is_other_percent"
                            disabled={mutation.isLoading}
                          >
                            <option value="0">Default percent</option>
                            <option value="1">Other</option>
                          </InputSelect>
                        </div>
                      </>
                    )}

                    {props.values.suppliers_products_is_other_percent ===
                      "1" && (
                      <>
                        <div className="relative my-5">
                          <InputText
                            label="Member %"
                            type="text"
                            number="number"
                            name="suppliers_products_member_percent"
                            disabled={mutation.isLoading}
                          />
                        </div>
                        <div className="relative my-5">
                          <InputText
                            label="Retail %"
                            type="text"
                            number="number"
                            name="suppliers_products_retail_percent"
                            disabled={mutation.isLoading}
                          />
                        </div>
                        <div className="relative my-5">
                          <InputText
                            label="Whole Sale Member %"
                            type="text"
                            number="number"
                            name="suppliers_products_ws_member_percent"
                            disabled={mutation.isLoading}
                          />
                        </div>
                        <div className="relative my-5">
                          <InputText
                            label="Whole Sale Retail %"
                            type="text"
                            number="number"
                            name="suppliers_products_ws_retail_percent"
                            disabled={mutation.isLoading}
                          />
                        </div>
                      </>
                    )}
                    <p className="ml-3 text-primary">
                      Member Price :
                      <span className="text-black">
                        {pesoSign}
                        {numberWithCommas(
                          Number(
                            getTotalPrice(props.values, percent)
                              .memberPriceTotal
                          ).toFixed(2)
                        )}{" "}
                        {props.values.suppliers_products_price === ""
                          ? ""
                          : `(+ ${
                              props.values
                                .suppliers_products_is_other_percent === "1"
                                ? props.values.suppliers_products_member_percent
                                : percent.member
                            }%)`}
                      </span>
                    </p>
                    <p className="ml-3 text-primary">
                      Retail Price :
                      <span className="text-black">
                        {pesoSign}
                        {numberWithCommas(
                          Number(
                            getTotalPrice(props.values, percent)
                              .retailPriceTotal
                          ).toFixed(2)
                        )}{" "}
                        {props.values.suppliers_products_price === ""
                          ? ""
                          : `(+ ${
                              props.values
                                .suppliers_products_is_other_percent === "1"
                                ? props.values.suppliers_products_retail_percent
                                : percent.retail
                            }%)`}
                      </span>
                    </p>
                    <p className="ml-3 text-primary">
                      Whole Sale Retail Price :
                      <span className="text-black">
                        {pesoSign}
                        {numberWithCommas(
                          Number(
                            getTotalPrice(props.values, percent)
                              .retailWsPriceTotal
                          ).toFixed(2)
                        )}{" "}
                        {props.values.suppliers_products_price === ""
                          ? ""
                          : `(+ ${
                              props.values
                                .suppliers_products_is_other_percent === "1"
                                ? props.values
                                    .suppliers_products_ws_retail_percent
                                : percent.retailWs
                            }%)`}
                      </span>
                    </p>
                    <p className="ml-3 text-primary">
                      Whole Sale Member Price :
                      <span className="text-black">
                        {pesoSign}
                        {numberWithCommas(
                          Number(
                            getTotalPrice(props.values, percent)
                              .memberWsPriceTotal
                          ).toFixed(2)
                        )}{" "}
                        {props.values.suppliers_products_price === ""
                          ? ""
                          : `(+ ${
                              props.values
                                .suppliers_products_is_other_percent === "1"
                                ? props.values
                                    .suppliers_products_ws_member_percent
                                : percent.memberWs
                            }%)`}
                      </span>
                    </p>

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
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ModalAddSuppliersProducts;
