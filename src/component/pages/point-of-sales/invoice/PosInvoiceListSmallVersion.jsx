import React from "react";
import { StoreContext } from "../../../../store/StoreContext";
import Logo from "../../../svg/Logo";
import SccLogo from "../../../svg/SccLogo";
import { pesoSign } from "../../../helpers/functions-general";

const PosInvoiceListSmallVersion = () => {
  const { store, dispatch } = React.useContext(StoreContext);
  return (
    <>
      <div className="w-[24rem] pl-3">
        <div className="border-gray-100 border-solid border-b-[2px] ">
          <div className="flex justify-between items-center border-primary border-solid border-t-[8px] ">
            <ul className="">
              <li className="pb-2 ">
                <SccLogo className="w-[8rem]" />
              </li>
            </ul>
            <ul>
              <li className="text-primary font-bold text-2xl">Invoice</li>
              <li className="text-[10px]">Date : January 23, 2024</li>
            </ul>
          </div>

          <ul className="text-[10px]">
            <li>1118 Alvarez Street, Purok 3, Brgy. San Jose,</li>
            <li>San Pablo City, Laguna 4000, Philippines</li>
            <li>TIN NO. 620-402-542-00000</li>
          </ul>

          <ul className="mt-5 flex justify-between mb-3">
            <li className="font-bold  text-[10px]">
              Bill To :
              <br />
              <span className="font-normal bg-gray-200 p-1 rounded text-[10px]">
                Lumabas, Cyrene M.
              </span>
            </li>
            <li className="font-bold  text-[10px]">
              Due :
              <br />
              <span className="font-normal bg-gray-200 p-1 rounded text-[10px]">
                January 29, 2024
              </span>
            </li>
          </ul>
        </div>

        <div className="relative text-center overflow-x-auto z-0 mt-5 ">
          <table>
            <thead>
              <tr className="border-white text-primary">
                <th className="text-[10px] !w-[1px] bg-white">#</th>
                <th className="text-[10px] bg-white">Item/Description</th>
                <th className="text-[10px] bg-white">Order Date</th>
                <th className="text-[10px] bg-white text-center">Qty</th>
                <th className="text-[10px] bg-white text-right">Unit price</th>
                <th className="text-[10px] bg-white text-right">Total price</th>
              </tr>
            </thead>
            <tbody className="ulternate-color-table">
              <tr className="border-white ">
                <td className="text-[10px]">1.</td>
                <td className="text-[10px] w-[5rem]">Coke Mismo</td>
                <td className="text-[10px] w-[5rem]">01/29/2024</td>
                <td className="text-[10px] text-center">1</td>
                <td className="text-[10px] w-[5rem] text-right">
                  {pesoSign} 16.78
                </td>
                <td className="text-[10px]  w-[5rem] text-right">
                  {pesoSign} 16.78
                </td>
              </tr>

              <tr className="border-white ">
                <td className="text-[10px]">2.</td>
                <td className="text-[10px]">M.Y. San Crushed Grahams 200g</td>
                <td className="text-[10px]">01/29/2024</td>
                <td className="text-[10px] text-center">1</td>
                <td className="text-[10px] text-right">{pesoSign}44.69</td>
                <td className="text-[10px] text-right">{pesoSign}44.69</td>
              </tr>

              <tr className="border-white ">
                <td className="text-[10px]">3.</td>
                <td className="text-[10px]">Master Gulaman Buko Pandan</td>
                <td className="text-[10px]">01/29/2024</td>
                <td className="text-[10px] text-center">1</td>
                <td className="text-[10px] text-right">{pesoSign}14.62</td>
                <td className="text-[10px] text-right">{pesoSign}14.62</td>
              </tr>

              <tr className="border-white ">
                <td colSpan={4} className="text-[10px]">
                  Note :
                </td>
                <td className="text-[10px] text-right text-primary">
                  Subtotal :
                </td>
                <td className="text-[10px] text-right font-bold">
                  {pesoSign} 16.78
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-right text-primary text-2xl mt-5">
          Total: {pesoSign}16.78
        </p>
        <p className="font-bold text-[10px] mb-0">Payment Details</p>
        <div className="grid grid-cols-2 border-solid border-[2px] ">
          <ul className="border-gray-200 border-solid border-r-[2px] text-[10px]">
            <li className="pl-3">Bank Name :</li>
            <li className="pl-3 font-semibold">Chinabank Corporation</li>
            <li className="pl-3">
              Name :
              <span className=" font-semibold">
                Sambahayan Consumers Cooperative
              </span>
            </li>
            <li className="pl-3 ">Account Number :</li>
            <li className="pl-3 font-semibold">106500004658</li>
          </ul>
          <ul className="border-gray-200 text-[10px] pl-3">
            <li className="">Gcash</li>
            <li className="font-semibold">Charlene Kyle Abrigo</li>
            <li className="font-semibold pb-3">09566914441</li>
          </ul>
        </div>
        <p className="text-2xl my-5 text-center">
          Thank you for your business!
        </p>
      </div>
    </>
  );
};

export default PosInvoiceListSmallVersion;
