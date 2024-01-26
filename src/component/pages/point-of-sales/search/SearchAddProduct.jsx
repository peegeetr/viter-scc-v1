import React from "react";
import { setError, setMessage } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import useQueryData from "../../../custom-hooks/useQueryData";
import { InputSearch } from "../../../helpers/FormInputs";
import { queryData } from "../../../helpers/queryData";
import NoData from "../../../partials/NoData";
import TableSpinner from "../../../partials/spinners/TableSpinner";
import { getRemaningQuantity } from "../../Inventory/products/functions-product";

const SearchAddProduct = ({
  label,
  name,
  disabled,
  endpoint,
  setSearch,
  setIsSearch,
  setLoading,
  setData,
  search,
  isSearch,
  loading,
  data,
  setProductBarcode,
}) => {
  const { dispatch } = React.useContext(StoreContext);
  const handleSearch = async (
    e,
    setSearch,
    setIsSearch,
    setLoading,
    endpoint,
    setData,
    setProductBarcode,
    value
  ) => {
    if (e.target.value.trim() === "") {
      setSearch("");
      setProductBarcode("");
      setIsSearch(false);
      return;
    }
    setLoading(true);
    setIsSearch(true);
    setSearch(e.target.value);

    const data = await queryData(endpoint, "post", {
      search: value,
    });

    // console.log(data);

    if (typeof data === "undefined") {
      setLoading(true);
      console.log("undefined");
      return;
    }

    if (!data.success) {
      setLoading(true);
      setData([]);
      setIsSearch(false);
      return;
    }

    if (data.success) {
      setData(data.data);

      setLoading(false);
    }
  };

  const handleClick = (item, setSearch, setIsSearch, setProductBarcode) => {
    if (getRemaningQuantity(item, remainingQuantity) <= 0) {
      setSearch("");
      setIsSearch(false);
      setProductBarcode("");

      dispatch(setError(true));
      dispatch(
        setMessage(
          `Insufficient Quantity ${
            item.suppliers_products_name
          } is ${getRemaningQuantity(item, remainingQuantity)} qty.`
        )
      );
    }
    if (getRemaningQuantity(item, remainingQuantity) > 0) {
      setSearch(
        `${item.suppliers_products_name} - (${getRemaningQuantity(
          item,
          remainingQuantity
        )} qty)`
      );
      setIsSearch(false);
      setProductBarcode(item.stocks_barcode_id);
    }
  };

  // use if not loadmore button undertime
  const { data: remainingQuantity } = useQueryData(
    `/v1/product/remaining-quantity`, // endpoint
    "get", // method
    "remaining-quantity", // key
    {},
    isSearch
  );

  return (
    <>
      <InputSearch
        label={label}
        type="search"
        id="searchProduct"
        disabled={disabled}
        name={name}
        onChange={(e) =>
          handleSearch(
            e,
            setSearch,
            setIsSearch,
            setLoading,
            endpoint,
            setData,
            setProductBarcode,
            e.target.value
          )
        }
        value={search}
        placeholder="Search..."
      />

      {isSearch && (
        <ul className="absolute z-50 max-h-32 overflow-y-auto top-[2.5rem] w-full bg-white shadow-3xl rounded-md h-[30rem] border border-t-0">
          {loading ? (
            <li className=" p-2 w-full text-center bg-white focus:bg-gray-200 border-b border-white">
              <TableSpinner />
            </li>
          ) : data.length > 0 ? (
            data.map((item, key) => {
              return (
                // getRemaningQuantity(item, remainingQuantity) !== "0" && (
                <li key={key}>
                  <button
                    type="button"
                    className="text-left pl-2 py-[1px] w-full bg-white hover:bg-gray-200 focus:bg-gray-200 cursor-pointer duration-200"
                    onClick={() =>
                      handleClick(
                        item,
                        setSearch,
                        setIsSearch,
                        setProductBarcode
                      )
                    }
                  >
                    {`${item.suppliers_products_name} - (${getRemaningQuantity(
                      item,
                      remainingQuantity
                    )} qty)`}
                  </button>
                </li>
                // )
              );
            })
          ) : (
            <li className="pt-1 w-full text-center bg-white focus:bg-gray-200 border-b border-white">
              <NoData />
            </li>
          )}
        </ul>
      )}
    </>
  );
};

export default SearchAddProduct;
