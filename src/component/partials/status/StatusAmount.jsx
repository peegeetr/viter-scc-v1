import React from "react";
import { numberWithCommas, pesoSign } from "../../helpers/functions-general";

const StatusAmount = ({ text = "", amount = 0 }) => {
  return (
    <>
      <p className="m-0 capitalize font-bold">Total {text}:</p>
      <p className="m-0">
        <span
          className={`${
            text === "draft"
              ? "bg-gray-100 text-gray-800  "
              : text === "discount"
              ? "bg-gray-100 text-gray-800  "
              : text === "pending"
              ? "bg-orange-100 text-orange-800 "
              : text === "paid"
              ? "bg-green-100 text-green-800 "
              : "bg-blue-100 text-primary "
          } text-[14px] font-medium ml-2 px-2.5 py-0.5 rounded-full`}
        >
          {text === "qty" ? (
            `${numberWithCommas(amount)}`
          ) : (
            <>
              {pesoSign} {numberWithCommas(amount.toFixed(2))}
            </>
          )}
        </span>
      </p>
    </>
  );
};

export default StatusAmount;
