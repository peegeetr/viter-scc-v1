import React from "react";

const StatusQuantity = ({ text = "0" }) => {
  return (
    <span
      className={`${
        text === "loading"
          ? "bg-warning "
          : Number(text) <= 10
          ? "bg-red-800 "
          : "bg-green-800 "
      } text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full`}
    >
      {text}
    </span>
  );
};

export default StatusQuantity;
