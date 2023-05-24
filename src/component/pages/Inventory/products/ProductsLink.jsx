import React from "react";
import { RiUserSharedFill } from "react-icons/ri";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import { setStartIndex } from "../../../../store/StoreAction";
import { StoreContext } from "../../../../store/StoreContext";
import { getUserType } from "../../../helpers/functions-general";
import { MdOutlineInventory } from "react-icons/md";

const ProductsLink = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  const urlLink = getUserType(store);

  return (
    <div
      className="group flex items-center justify-between border-b border-solid border-gray-300"
      onClick={() => dispatch(setStartIndex(0))}
    >
      <Link to={`${urlLink}/inventory/products`} className="w-full py-2">
        <div className="flex items-center">
          <span className="text-lg mr-4">
            <MdOutlineInventory />
          </span>
          <span className="text-md font-bold">Products</span>
        </div>
        <p className="ml-[35px] my-0">
          Add and manage the information of prices per product.
        </p>
      </Link>

      <Link
        to={`${urlLink}/inventory/products`}
        className="btn-action-table group-hover:bg-primary group-hover:text-white"
      >
        <SlArrowRight className="inline" />
      </Link>
    </div>
  );
};

export default ProductsLink;
