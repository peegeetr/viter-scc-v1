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
  devNavUrl,
  getDateTimeNow,
  removeComma,
} from "../../../../helpers/functions-general";
import { queryData } from "../../../../helpers/queryData";
import ButtonSpinner from "../../../../partials/spinners/ButtonSpinner";
import { getRemaningQuantity } from "../../products/functions-product";
import SccLogo from "../../../../svg/SccLogo";
import ModalSuccess from "../../../../partials/modals/ModalSuccess";
import ModalError from "../../../../partials/modals/ModalError";

const AddOrderPage = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [categoryId, setCategoryId] = React.useState("0");
  const [productId, setProductId] = React.useState("");
  const [priceId, setPriceId] = React.useState("");

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (values) => queryData(`/v1/orders`, "post", values),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      // show success box
      if (data.success) {
        window.location.replace(`${devNavUrl}/order-page/success`);
      }
      // show error box
      if (!data.success) {
        dispatch(setError(true));
        dispatch(setMessage(data.error));
      }
    },
  });

  // use if not loadmore button undertime
  const { data: stocksGroupProd } = useQueryData(
    `/v1/stocks/group-by-prod`, // endpoint
    "get", // method
    "stocksGroupProd" // key
  );
  // use if not loadmore button undertime
  const { data: orderGroupProd } = useQueryData(
    `/v1/orders/group-by-prod`, // endpoint
    "get", // method
    "orderGroupProd" // key
  );
  // use if not loadmore button undertime
  const { data: memberApproved, isLoading: memberApprovedLoading } =
    useQueryData(
      `/v1/members/approved`, // endpoint
      "get", // method
      "memberApproved" // key
    );

  // use if not loadmore button undertime
  const { data: categoryData, isLoading: categoryLoading } = useQueryData(
    `/v1/category`, // endpoint
    "get", // method
    "categoryData" // key
  );

  // use if not loadmore button undertime
  const { data: SupProd, isLoading } = useQueryData(
    `/v1/suppliers-product/read-category-id/${categoryId}`, // filter endpoint
    "get", // method
    "SupProd", // key
    {},
    categoryId
  );

  // get employee id
  const handleSupplierProduct = async (e, props) => {
    let categoryId = e.target.value;
    setCategoryId(categoryId);
  };
  // get employee id
  const handleProduct = async (e, props) => {
    setProductId(e.target.value);
    setPriceId(e.target.options[e.target.selectedIndex].id);
  };
  const initVal = {
    orders_member_id: "",
    orders_product_id: "",
    orders_product_quantity: "",
    suppliers_products_aid: "",
    orders_is_paid: 0,
    orders_product_amount: "",
    orders_date: getDateTimeNow(),
    category_id: "",
  };

  const yupSchema = Yup.object({
    orders_member_id: Yup.string().required("Required"),
    orders_product_id: Yup.string().required("Required"),
    orders_product_quantity: Yup.string().required("Required"),
    category_id: Yup.string().required("Required"),
    orders_date: Yup.string().required("Required"),
  });
  return (
    <>
      <div
        className="flex justify-center items-center"
        style={{ transform: "translateY(clamp(5rem,5vw,15rem))" }}
      >
        <div className="w-96 p-6">
          <div className="flex justify-center">
            <SccLogo />
          </div>
          <p className="mt-8 mb-5 text-lg font-bold">Order</p>
          <Formik
            initialValues={initVal}
            validationSchema={yupSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              if (
                Number(values.orders_product_quantity) >
                  getRemaningQuantity(
                    values,
                    stocksGroupProd,
                    orderGroupProd
                  ) ||
                getRemaningQuantity(values, stocksGroupProd, orderGroupProd) ===
                  0
              ) {
                dispatch(setError(true));
                dispatch(setMessage("Invalid Quantity"));
                return;
              }

              const orders_product_quantity = removeComma(
                `${values.orders_product_quantity}`
              );

              mutation.mutate({
                ...values,
                orders_product_quantity,
              });
            }}
          >
            {(props) => {
              props.values.orders_product_amount =
                Number(removeComma(props.values.orders_product_quantity)) *
                priceId;
              props.values.suppliers_products_aid = productId;
              return (
                <Form>
                  <div className="relative mb-6 mt-5">
                    <InputText
                      label="Date"
                      type="datetime-local"
                      name="orders_date"
                      disabled={mutation.isLoading}
                    />
                  </div>
                  <div className="relative my-5">
                    <InputSelect
                      name="orders_member_id"
                      label="Member"
                      disabled={mutation.isLoading || memberApprovedLoading}
                    >
                      <option value="" hidden>
                        {memberApprovedLoading ? "Loading..." : "--"}
                      </option>
                      {memberApproved?.data.map((cItem, key) => {
                        return (
                          <option key={key} value={cItem.members_aid}>
                            {`${cItem.members_last_name}, ${cItem.members_first_name} `}
                          </option>
                        );
                      })}
                    </InputSelect>
                  </div>
                  <div className="relative my-5">
                    <InputSelect
                      name="category_id"
                      label="Category"
                      onChange={handleSupplierProduct}
                      disabled={categoryLoading || mutation.isLoading}
                    >
                      <option value="" hidden>
                        {categoryLoading ? "Loading..." : "--"}
                      </option>
                      {categoryData?.data.map((cItem, key) => {
                        return (
                          <option key={key} value={cItem.product_category_aid}>
                            {`${cItem.product_category_name} `}
                          </option>
                        );
                      })}
                    </InputSelect>
                  </div>
                  <div className="relative my-5">
                    <InputSelect
                      name="orders_product_id"
                      label="Supplier Product"
                      onChange={handleProduct}
                      disabled={isLoading || mutation.isLoading}
                    >
                      <option value="" hidden>
                        {isLoading ? "Loading..." : "--"}
                      </option>{" "}
                      {SupProd?.data.length === 0 ? (
                        <option value="">NO DATA</option>
                      ) : (
                        SupProd?.data.map((pItem, key) => {
                          return (
                            pItem.suppliers_products_scc_price !== "" && (
                              <option
                                key={key}
                                value={pItem.suppliers_products_aid}
                                id={pItem.suppliers_products_scc_price}
                              >
                                {`${
                                  pItem.suppliers_products_name
                                }  (${getRemaningQuantity(
                                  pItem,
                                  stocksGroupProd,
                                  orderGroupProd
                                )})`}
                              </option>
                            )
                          );
                        })
                      )}
                    </InputSelect>
                  </div>
                  <div className="relative my-5">
                    <InputText
                      label="Quantity"
                      type="text"
                      name="orders_product_quantity"
                      num="num"
                      disabled={mutation.isLoading}
                    />
                  </div>

                  <div className="pl-3 text-primary">
                    <p className="">
                      Total Amount:
                      <span className="text-black ml-2">
                        {props.values.orders_product_quantity === "" ||
                        Number(props.values.orders_product_quantity) === 0
                          ? 0
                          : props.values.orders_product_amount}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1 pt-5">
                    <button
                      type="submit"
                      disabled={mutation.isLoading || !props.dirty}
                      className="btn-modal-submit relative"
                    >
                      Add
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
      {store.success && <ModalSuccess />}
      {store.error && <ModalError />}
    </>
  );
};

export default AddOrderPage;
