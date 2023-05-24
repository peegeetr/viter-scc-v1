import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { devNavUrl, getUrlParam } from "../../../helpers/functions-general";
import SccLogo from "../../../svg/SccLogo";

const CreateVerification = () => {
  return (
    <>
      <div
        className="flex justify-center items-center "
        style={{ transform: "translateY(clamp(5rem,10vw,22rem))" }}
      >
        <div className="max-w-[25rem] w-full text-center p-6">
          <div className="flex justify-center ">
            <SccLogo />
          </div>
          <FaCheck className="mx-auto text-6xl my-5 fill-green-600" />
          <h1 className="text-2xl uppercase mb-2">Create Verification</h1>
          <p>
            We have sent an email. After receiving the email follow the link
            provided to create your password.
          </p>
          <p className="mt-6 py-4 border-t-[1px] border-solid border-zinc-100 text-xs">
            Did not receive the mail? Check your spam or junk folder
          </p>
          <a href={`${devNavUrl}/login`} className="btn-primary">
            Proceed to Login
          </a>
        </div>
      </div>
    </>
  );
};

export default CreateVerification;
