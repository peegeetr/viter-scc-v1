import React from "react";
import {
  formatDate,
  getDateNow,
  numberWithCommas,
} from "../../helpers/functions-general";
import { computeFinalAmount } from "../Inventory/orders/functions-orders";

const CasherPointOfSalesListPrint = ({ memberName, result }) => {
  let discount = 0;
  let sale = 0;
  let total = 0;
  return (
    <>
      <div className="hidden print:block">
        <p className="flex items-center justify-between mt-[8rem] mb-[6.5rem]">
          <span className="text-[13px] mb-0 pl-[6.2rem] font-bold">
            {" "}
            {memberName}
          </span>
          <span className="text-[13px] text-right mb-0 pr-4 mr-[3rem] font-bold">
            {formatDate(getDateNow())}
          </span>
        </p>
        <div className="font-semibold h-[17.5rem] mr-[2.4rem]">
          {result?.pages.map((page, key) => (
            <React.Fragment key={key}>
              {page.data.map((item, key) => {
                discount += Number(item.sales_discount);
                sale += Number(item.orders_product_amount);
                total +=
                  Number(item.orders_product_amount) -
                  Number(item.sales_discount);
                return (
                  <div
                    key={key}
                    className="grid grid-cols-[3rem,3rem,1fr,5rem,3.5rem] gap-2 items-center "
                  >
                    <p className="text-[13px] leading-[17.5px] text-right mb-0">
                      {item.orders_product_quantity}
                    </p>
                    <p className="text-[13px] leading-[17.5px] text-center mb-0 ">
                      pcs
                    </p>
                    <p className="text-[13px] leading-[17.5px] mb-0 ml-[3px]">
                      {item.suppliers_products_name}
                    </p>
                    <p className="text-[13px] leading-[17.5px] text-right mb-0">
                      {numberWithCommas(
                        Number(item.orders_product_srp).toFixed(2)
                      )}
                    </p>
                    <p className="text-[13px] leading-[17.5px] text-right mb-0">
                      {numberWithCommas(computeFinalAmount(item))}
                    </p>
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
        <p className="font-semibold leading-[17.5px] text-[13px] text-right m-0 mr-[2.4rem]">
          {sale.toFixed(2)}
        </p>
        <p className="font-semibold leading-[17.5px] text-[13px] text-right m-0 mr-[2.4rem]">
          {discount.toFixed(2)}
        </p>
        <p className="font-semibold leading-[17.5px] text-[13px] text-right !mb-[2px] mr-[2.4rem]">
          {total.toFixed(2)}
        </p>
      </div>
    </>
  );
};

export default CasherPointOfSalesListPrint;
