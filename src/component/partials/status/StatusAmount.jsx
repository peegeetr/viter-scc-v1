import React from "react";
import { numberWithCommas, pesoSign } from "../../helpers/functions-general";

const StatusAmount = ({
  text = "",
  amount = 0,
  other = "0",
  type = "",
  isLoading = false,
  qty = "",
}) => {
  return (
    <>
      <p className="m-0 capitalize font-bold mr-8 mb-2 xl:mb-4 print:font-normal">
        {text}:
        <span
          className={`${
            type === "draft"
              ? "bg-gray-100 text-gray-800  "
              : type === "discount"
              ? "bg-gray-100 text-gray-800  "
              : type === "penalty"
              ? "bg-red-100 text-red-800 "
              : type === "pending"
              ? "bg-orange-100 text-orange-800 "
              : type === "paid"
              ? "bg-green-100 text-green-800 "
              : "bg-blue-100 text-primary "
          } text-[14px] font-medium ml-2 px-2.5 py-0.5 rounded-full print:text-[10px]`}
        >
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              {text === "qty" ? (
                `${numberWithCommas(amount)}`
              ) : (
                <>
                  {pesoSign} {numberWithCommas(Number(amount).toFixed(3))}
                  {other !== "0" &&
                    `(${numberWithCommas(Number(other).toFixed(3))})`}
                  {qty !== "" && (
                    <span className="text-gray-600">{` ${qty}`}</span>
                  )}
                </>
              )}
            </>
          )}
        </span>
      </p>
    </>
  );
};

export default StatusAmount;
