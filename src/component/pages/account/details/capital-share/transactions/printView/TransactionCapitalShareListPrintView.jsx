import React from "react";
import TransactionCapitalShareBodyPrintView from "./TransactionCapitalShareBodyPrintView";

const TransactionCapitalShareListPrintView = ({ result }) => {
  let count = 0;
  return (
    <>
      {/* start print version */}
      <div className="grid-cols-3 gap-2 hidden print:grid mt-8">
        {result?.pages.map((page, key) => (
          <React.Fragment key={key}>
            {page.data.map((item, key) => {
              count += 1;
              return (
                <div className="bg-gray-100 p-4" key={key}>
                  <p className="font-semibold">Year {item.year}</p>

                  <TransactionCapitalShareBodyPrintView
                    item={item}
                    count={count}
                  />
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      {/* end print version */}
    </>
  );
};

export default TransactionCapitalShareListPrintView;
