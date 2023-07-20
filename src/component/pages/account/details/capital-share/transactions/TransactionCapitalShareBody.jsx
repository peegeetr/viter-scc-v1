import React from "react";
import { setIsConfirm } from "../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../store/StoreContext";
import useQueryData from "../../../../../custom-hooks/useQueryData";
import {
  getUrlParam,
  numberWithCommas,
  pesoSign,
} from "../../../../../helpers/functions-general";
import { getMonth } from "../../../../Inventory/reports/report-function";
import { getCapitalShareByMonth } from "../functions-capital-share";

const TransactionCapitalShareBody = ({ item, count, setItemEdit }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const memberid = getUrlParam().get("memberid");

  // use if not loadmore button undertime
  const { data: capitalByIdAndYear } = useQueryData(
    `/v1/capital-share/read-by-id-and-year/${memberid}/${item.year}`, // endpoint
    "get", // method
    "capital-share", // key
    {}, // fb
    `${item.year}` // id
  );

  const handleView = (newItem) => {
    dispatch(setIsConfirm(true));
    setItemEdit(newItem);
  };

  return (
    <>
      <td>{item.year}</td>
      {getMonth()?.map((mItem, key) => {
        const getCapitalByMonth = getCapitalShareByMonth(
          mItem,
          capitalByIdAndYear?.data,
          count
        );
        return (
          <td
            key={key}
            className={`${
              getCapitalByMonth.result === 0 && " bg-red-100"
            } pr-2 `}
          >
            {getCapitalByMonth.result === 0 ? (
              getCapitalByMonth.penalty !== 0 ? (
                <span
                  className="tooltip-action-table cursor-pointer text-red-800 underline !p-0 "
                  data-tooltip="View"
                  onClick={() => handleView(getCapitalByMonth.list)}
                >
                  <span>
                    {pesoSign}{" "}
                    {numberWithCommas(getCapitalByMonth.penalty.toFixed(2))}
                  </span>
                </span>
              ) : (
                ""
              )
            ) : (
              <span
                className="tooltip-action-table cursor-pointer underline"
                data-tooltip="View"
                onClick={() => handleView(getCapitalByMonth.list)}
              >
                {pesoSign}
                {numberWithCommas(Number(getCapitalByMonth.result).toFixed(2))}
              </span>
            )}
          </td>
        );
      })}
      <td>
        {pesoSign} {numberWithCommas(Number(item.total).toFixed(2))}
      </td>
      <td>
        {pesoSign} {numberWithCommas((Number(item.total) / 12).toFixed(2))}
      </td>
      <td></td>
    </>
  );
};

export default TransactionCapitalShareBody;
