import React from "react";

const StatusActive = ({ text = "active" }) => {
  return (
    <span
      className={
        text === "canceled"
          ? "bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full capitalize"
          : "bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full capitalize"
      }
    >
      {text}
    </span>
  );
};

export default StatusActive;
