import React from "react";
import { setIsSearch } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { numberWithCommas } from "../../helpers/functions-general";
import NoData from "../../partials/NoData";
import TableSpinner from "../../partials/spinners/TableSpinner";
import { getRemaningQuantity } from "../Inventory/products/functions-product";
import { FaFolderOpen } from "react-icons/fa";

const SearchToAddProduct = ({
  stocksGroupProd,
  orderGroupProd,
  setSearch,
  onSearch,
  isLoading,
  setItems,
  setTotalPrice,
  result,
  name,
}) => {
  const { store, dispatch } = React.useContext(StoreContext);

  const handleChange = (e) => {
    if (onSearch.current.value === "") {
      setSearch("0");
      dispatch(setIsSearch(false));
      return;
    }
    setSearch(onSearch.current.value);
    dispatch(setIsSearch(true));
  };

  const handleProductChange = (item) => {
    setItems(item);
    setTotalPrice(item.suppliers_products_scc_price);
    dispatch(setIsSearch(false));
  };

  return (
    <>
      <input
        placeholder="Search Product"
        type="search"
        name={name}
        ref={onSearch}
        onChange={handleChange}
        className={
          store.isSearch ? `rounded-bl-none rounded-br-none border-b-0` : ``
        }
      />
      {store.isSearch && (
        <div className="overflow-auto max-h-[15rem] absolute rounded-tr-none rounded-tl-none rounded bg-slate-100 z-50 w-full">
          {isLoading || result?.data.length === 0 ? (
            <>
              {isLoading && <TableSpinner />}
              <div className="flex justify-center items-center flex-col p-2">
                <span className="text-5xl text-gray-400">
                  <FaFolderOpen />
                </span>
                <span className="font-bold text-gray-300 text-lg">No Data</span>
              </div>
            </>
          ) : (
            <>
              {result?.data.map((item, key) => {
                return (
                  <p key={key} className="hover:bg-slate-200 cursor-pointer">
                    <option
                      className="ml-2"
                      onClick={() => handleProductChange(item)}
                    >
                      {`${item.suppliers_products_name}  (${getRemaningQuantity(
                        item,
                        stocksGroupProd,
                        orderGroupProd
                      )} pcs) - ${item.suppliers_company_name.slice(0, 10)} `}
                      &#8369;{" "}
                      {numberWithCommas(
                        Number(item.suppliers_products_scc_price).toFixed(2)
                      )}
                    </option>
                  </p>
                );
              })}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SearchToAddProduct;
