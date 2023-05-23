import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { devNavUrl } from "../../../../helpers/functions-general";
import SccLogo from "../../../../svg/SccLogo";
const OrderSuccess = () => {
  return (
    <>
      <div
        className="flex justify-center items-center"
        style={{ transform: "translateY(clamp(5rem,10vw,22rem))" }}
      >
        <div className="max-w-[25rem] w-full text-center p-6">
          <div className="flex justify-center ">
            <SccLogo />
          </div>
          <FaCheck className="mx-auto text-6xl my-5 fill-green-600" />
          <h1 className="text-2xl uppercase mb-2">Success</h1>
          <p className="mb-6">You already added your order</p>
          <Link to={`${devNavUrl}/order-page`} className="btn-primary">
            Order Again
          </Link>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
