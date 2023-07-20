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

  const handleView = (newItem) => {
    dispatch(setIsConfirm(true));
    setItemEdit(newItem);
  };

  return (
    <>
      <td>{item.year}</td>
      {getMonth()?.map((mItem, key) => {
        return (
          <td
            key={key}
            className={`${
              getCapitalShareByMonth(mItem, item, capitalByIdAndYear?.data)
                .result === "" && "bg-red-100 "
            } pr-2 `}
          >
            {getCapitalShareByMonth(mItem, item, capitalByIdAndYear?.data)
              .result === "" ? (
              ""
            ) : (
              <span
                className="tooltip-action-table cursor-pointer underline"
                data-tooltip="View"
                onClick={() =>
                  handleView(
                    getCapitalShareByMonth(
                      mItem,
                      item,
                      capitalByIdAndYear?.data
                    ).list
                  )
                }
              >
                {pesoSign}
                {numberWithCommas(
                  Number(
                    getCapitalShareByMonth(
                      mItem,
                      item,
                      capitalByIdAndYear?.data
                    ).result
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
