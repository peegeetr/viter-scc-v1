import { Form, Formik } from "formik";
import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import useQueryData from "../../../../custom-hooks/useQueryData";
import { InputSelect } from "../../../../helpers/FormInputs";
import {
  formatDate,
  getDateNow,
  numberWithCommas,
  pesoSign,
} from "../../../../helpers/functions-general";
import NoData from "../../../../partials/NoData";
import ServerError from "../../../../partials/ServerError";
import TableSpinner from "../../../../partials/spinners/TableSpinner";
import StatusQuantity from "../../../../partials/status/StatusQuantity";
import { getRemaningQuantity } from "../functions-product";

const ProductsViewList = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [isFilter, setIsFilter] = React.useState(false);
  let counter = 1;

  // use if not loadmore button undertime
  const { data: remainingQuantity } = useQueryData(
    `/v1/product/remaining-quantity`, // endpoint
    "get", // method
    "remaining-quantity" // key
  );
  // use if not loadmore button undertime
  const {
    isLoading,
    error,
    data: readFilterProduct,
  } = useQueryData(
    `/v1/suppliers-product`, // endpoint
    "get", // method
    "read-all-suppliers-product" // key
  );

  const handleSupplier = () => {
    setIsFilter(!isFilter);
  };

  const initVal = {
    price_category: "0",
  };

  return (
    <>
      <Formik
        initialValues={initVal}
        onSubmit={async (values, { setSubmitting, resetForm }) => {}}
      >
        {(props) => {
          return (
            <Form>
              <div className="relative w-[15rem] mb-5 print:hidden">
                <InputSelect
                  name="price_category"
                  label="Price Category"
                  onChange={handleSupplier}
                >
                  <option value="0">Member Price</option>
                  <option value="1">Retail Price</option>
                </InputSelect>
              </div>
            </Form>
          );
        }}
      </Formik>

      <div className="print:block hidden text-center">
        <h1 className="text-lg">Product List</h1>
        <p>{formatDate(getDateNow())}</p>
      </div>
      <div className="text-center overflow-x-auto z-0">
        <table>
          <thead>
            <tr>
              <th className="print:p-[1px]">#</th>
              <th className="min-w-[5rem] print:p-[1px]">Category</th>
              <th className="min-w-[8rem] print:p-[1px]">Product</th>
              <th className="min-w-[8rem] text-right print:p-[1px]">
                {isFilter ? "Retail" : "Member"} Price
              </th>
              <th className="min-w-[8rem] text-center print:hidden print:p-[1px]">
                Remaning Qty
              </th>
            </tr>
          </thead>
          <tbody>
            {(isLoading || readFilterProduct?.data.length === 0) && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  {isLoading && <TableSpinner />}
                  <NoData />
                </td>
              </tr>
            )}
            {error && (
              <tr className="text-center ">
                <td colSpan="100%" className="p-10">
                  <ServerError />
                </td>
              </tr>
            )}
            {readFilterProduct?.data.map((item, key) => {
              return (
                <tr key={key}>
                  <td className="print:p-[1px]">{counter++}.</td>

                  <td className="print:p-[1px]">
                    {item.product_category_name}
                  </td>
                  <td className="print:p-[1px]">
                    {item.suppliers_products_name}
                  </td>
                  {isFilter ? (
                    <td className="text-right print:p-[1px]">
                      {pesoSign}
                      {numberWithCommas(
                        Number(item.suppliers_products_retail_price).toFixed(2)
                      )}
                    </td>
                  ) : (
                    <td className="text-right print:p-[1px]">
                      {pesoSign}
                      {numberWithCommas(
                        Number(item.suppliers_products_scc_price).toFixed(2)
                      )}
                    </td>
                  )}

                  <td className="text-center print:hidden print:p-[1px]">
                    <StatusQuantity
                      text={getRemaningQuantity(item, remainingQuantity)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductsViewList;
