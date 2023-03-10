import React from "react";
import { Navigate } from "react-router-dom";
import { setCredentials } from "../../../store/StoreAction";
import { StoreContext } from "../../../store/StoreContext";
import { devApiUrl, devNavUrl } from "../../helpers/functions-general";
import { queryData } from "../../helpers/queryData";
import TableSpinner from "../../partials/spinners/TableSpinner";

const ProtectedRouteSystem = ({ children }) => {
  const { store, dispatch } = React.useContext(StoreContext);
  const [loading, setLoading] = React.useState(true);
  const [isAuth, setIsAuth] = React.useState("");
  const sccToken = JSON.parse(localStorage.getItem("sccToken"));

  React.useEffect(() => {
    const fetchLogin = async () => {
      const login = await queryData(`/v1/user-systems/token`, "post", {
        token: sccToken.token,
      });

      console.log(login);
      console.log(typeof login);

      if (typeof login === "undefined" || !login.success) {
        setLoading(false);
        setIsAuth("456");
      } else {
        dispatch(setCredentials(login.data));
        setIsAuth("123");
        setLoading(false);
      }
      delete login.data.user_system_password;
      delete login.data.role_description;
      delete login.data.role_created;
      delete login.data.role_datetime;
    };

    if (sccToken !== null) {
      fetchLogin();
    } else {
      setLoading(false);
      localStorage.removeItem("sccToken");
      setIsAuth("456");
    }
  }, [dispatch]);

  return loading ? (
    <TableSpinner />
  ) : isAuth === "123" ? (
    children
  ) : isAuth === "456" ? (
    <Navigate to={`${devNavUrl}/system/login`} />
  ) : (
    <p>API end point error / Page not found.</p>
  );
};

export default ProtectedRouteSystem;
