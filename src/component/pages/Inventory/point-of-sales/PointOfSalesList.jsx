import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { StoreContext } from "../../../store/StoreContext";
import { queryData } from "../../helpers/queryData";
import { setError, setMessage } from "../../../store/StoreAction";
import useQueryData from "../../custom-hooks/useQueryData";
import { getDateTimeNow } from "../../helpers/functions-general";
import { InputSelect, InputText } from "../../helpers/FormInputs";
import { pesoSign, removeComma } from "../../../helpers/functions-general";

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
      <div className="grid grid-cols-[24rem_1fr] gap-4">
        <div className="w-96 ">
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
                dispatch(setMessage("Insufficient Quantity"));
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
                      num="num"
                      name="orders_product_quantity"
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
        <div className="px-8">
          <div className="grid grid-cols-2">
            <p className="mb-0 font-bold">
              Bill To:<span className="font-normal"> Lumabas Cyrene</span>
            </p>
            <p className="mb-0 font-bold">
              Date:<span className="font-normal"> Mon Jan 9, 2023</span>
            </p>
          </div>

          <div className="text-center overflow-x-auto z-0 mt-8">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th className="min-w-[10rem]">Product</th>
                  <th className="min-w-[10rem]">Date</th>
                  <th className="min-w-[8rem]">Quantity</th>
                  <th className="min-w-[8rem] text-right pr-4">Unit Price</th>
                  <th className="min-w-[8rem] text-right pr-4">Total Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> {"1"}.</td>
                  <td className="uppercase">{"Egg Medium"}</td>
                  <td>{"5/5/2023"}</td>
                  <td>{"1"}</td>
                  <td className="text-right pr-4">
                    {pesoSign} {"210.00"}
                  </td>
                  <td className="text-right pr-4">
                    {pesoSign} {"210.00"}
                  </td>
                </tr>
              </tbody>
              <tr>
                <td colSpan={6} className="text-right font-bold">
                  Total Price:{" "}
                  <span className="px-2">
                    {pesoSign} {"210.00"}
                  </span>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddOrderPage;
