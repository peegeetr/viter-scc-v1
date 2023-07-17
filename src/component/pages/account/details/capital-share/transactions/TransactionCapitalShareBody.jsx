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
import ModalViewCapitalShare from "./ModalViewCapitalShare";

const TransactionCapitalShareBody = ({ item, setItemEdit }) => {
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
  const handleView = (item) => {
    dispatch(setIsConfirm(true));
    setItemEdit(item);
  };

  return (
    <>
      <td>{item.year}</td>
      {getMonth()?.map((item, key) => {
        return (
          <td
            key={key}
            className={`${
              getCapitalShareByMonth(item, capitalByIdAndYear?.data).result ===
                "" && "bg-gray-200"
            } pr-4 `}
          >
            {getCapitalShareByMonth(item, capitalByIdAndYear?.data).result ===
            "" ? (
              // is penalty
              ""
            ) : (
              <span
                className="tooltip-action-table cursor-pointer underline"
                data-tooltip="View"
                onClick={() =>
                  handleView(
                    getCapitalShareByMonth(item, capitalByIdAndYear?.data).list
                  )
                }
              >
                {pesoSign}{" "}
                {numberWithCommas(
                  Number(
                    getCapitalShareByMonth(item, capitalByIdAndYear?.data)
                      .result
                  ).toFixed(2)
                )}
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
