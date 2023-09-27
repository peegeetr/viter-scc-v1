import React from "react";

const StatusPending = ({ text = "pending" }) => {
  return (
    <span
      className={
        text === "pending"
          ? "bg-orange-100 text-orange-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full capitalize"
          : text === "insufficient qty"
          ? "bg-red-200 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full capitalize"
          : "bg-red-800 text-orange-100 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full capitalize"
      }
    >
      {text}
    </span>
  );
};

export default StatusPending;
