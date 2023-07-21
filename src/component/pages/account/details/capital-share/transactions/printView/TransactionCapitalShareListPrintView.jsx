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
                <div className="border-gray-100 border-2" key={key}>
                  <p className="font-semibold bg-primary text-white p-2">
                    Year {item.year}
                  </p>

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
