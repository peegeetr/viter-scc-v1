import React from "react";
import { FaFolderOpen } from "react-icons/fa";
import { setIsModalSearch } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { numberWithCommas } from "../../helpers/functions-general";
import TableSpinner from "../../partials/spinners/TableSpinner";
import { getRemaningQuantity } from "../Inventory/products/functions-product";

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
      dispatch(setIsModalSearch(false));
      return;
    }

    setSearch(onSearch.current.value);
    dispatch(setIsModalSearch(true));
  };

  const handleProductChange = (item) => {
    setItems(item);
    setTotalPrice(item.suppliers_products_scc_price);
    dispatch(setIsModalSearch(false));
  };

  return (
    <>
      <input
        type="search"
        name="search"
        ref={onSearch}
        onChange={handleChange}
        className={
          store.isModalSearch
            ? `rounded-bl-none rounded-br-none border-b-0`
            : ``
        }
        autoComplete="off"
      />
      <label className="capitalize">{name}</label>

      {store.isModalSearch && (
        <div className="overflow-auto max-h-[15rem] absolute rounded-tr-none rounded-tl-none rounded bg-slate-100 z-50 w-full">
          {isLoading || result?.data.length === 0 ? (
            <>
              {isLoading && <TableSpinner />}
              <div className="flex justify-center items-center flex-col p-2">
                <span className="text-5xl text-gray-400">
                  <FaFolderOpen />
                </span>
                <span className="font-bold text-gray-300 ">No Data</span>
              </div>
            </>
          ) : (
            <>
              <p className=" cursor-pointer flex flex-col items-start">
                {result?.data.map((item, key) => {
                  return (
                    <button
                      key={key}
                      className="ml-2 text-left"
                      onClick={() => handleProductChange(item)}
                      type="button"
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
                    </button>
                  );
                })}
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default SearchToAddProduct;