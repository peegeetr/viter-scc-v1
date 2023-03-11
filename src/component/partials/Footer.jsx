import React from "react";
import Logo from "../svg/Logo";

const Footer = () => {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <>
      <footer className="absolute right-0 text-center bottom-0 left-0 flex justify-center flex-col items-center z-10 py-2 ">
        {/* <Logo /> */}
        <div className="flex items-center text-xs mt-1 gap-1">
          {/* &copy; {getCurrentYear()} | <button type="button">Support</button> */}
         {/* <p >Sambahayan <br/> Consumer Cooperative</p> */}
        </div>
         
        <small className=" text-gray-500"> Sitio Subac, Santo Nino 
          San Pablo CIty, Laguna Region IV-A (CALABARZON)
          <br />CDA REG. NO. 9520-100400033760
          <br />TIN NO. 620-402-542-00000
        </small> 
      </footer>
    </>
  );
};

export default Footer;
