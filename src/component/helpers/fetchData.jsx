import fetchApi from "./fetchApi";

import {
  consoleLog,
  devApiUrl,
  devNavUrl,
  doList,
  doLoadmore,
  setStorageRoute,
  UrlSystem,
} from "./functions-general";

import {
  setAdminForgetPassSuccess,
  setCreatePassSuccess,
  setCredentials,
  setError,
  setForgotPassSuccess,
  setIsAdd,
  setIsConfirm,
  setIsLogin,
  setIsRestore,
  setMessage,
  setSave,
  setSuccess,
} from "../../store/StoreAction";
import { checkRoleToRedirect } from "./login-functions";

export const fetchData = async (
  //parameters
  setLoading, // Boolean loading values optional
  endpoint, // url endpoint
  fd, // form data values
  setResult, // result data
  successMsg, // success msg optional
  errorMsg, // additional error msg if needed optional
  dispatch, // context api action
  store, // context api state
  successModal, // boolean to show success modal
  isLoadMore, // boolean to show load more functionality button
  navigate = null, // props optional
  method // method (GET, POST, PUT, DELETE)
) => {
  setLoading !== null && setLoading(true);

  const data = await fetchApi(devApiUrl + endpoint, fd, dispatch, method);
  consoleLog(data);

  // if result data is undefined or false
  if (data === undefined || !data) {
    setResult(-1); // set result to -1 for server error to show
    dispatch(setError(true));
    dispatch(setMessage("API / Network Error"));
    setLoading !== null && setLoading(false);
    return;
  }

  // used for result set by read api
  isLoadMore && setResult !== null && doLoadmore(data, setResult);
  !isLoadMore && setResult !== null && doList(data, setResult);

  // if result data is empty and success is false
  if (!data.success) {
    setLoading !== null && setLoading(false);
    dispatch(setError(true));
    dispatch(setMessage(data.error));
    return;
  }

  // if result data is not empty and success is true
  if (data.success) {
    setLoading !== null && setLoading(false);
    // add modal will be closed when used
    if (store.isAdd) {
      dispatch(setIsAdd(false));
      //this will refresh table list
      store.isSave ? dispatch(setSave(false)) : dispatch(setSave(true));
    }

    // delete modal will be closed when used
    if (store.isConfirm) {
      dispatch(setIsConfirm(false));
      store.isSave ? dispatch(setSave(false)) : dispatch(setSave(true));
    }

    // restore modal will be closed when used
    if (store.isRestore) {
      dispatch(setIsRestore(false));
      store.isSave ? dispatch(setSave(false)) : dispatch(setSave(true));
    }

    // success modal will be closed when used
    if (successModal) {
      dispatch(setSuccess(true));
      dispatch(setMessage(successMsg));
      // return;
    }

    // redirect to other page after request forgot password
    if (store.isForgotPassSuccess) {
      dispatch(setForgotPassSuccess(false));
      console.log(fd);
      window.location.replace(
        `${devNavUrl}/forgot-password-verification?email=${fd.user_system_email}`
      );
    }

    // redirect to other page after request forgot password for admin
    if (store.isAdminForgetPassSuccess) {
      dispatch(setAdminForgetPassSuccess(false));
      window.location.replace(
        `${devNavUrl}/${UrlSystem}/reset-password-success`
      );
    }

    // redirect to other page after request forgot password
    if (store.isCreatePassSuccess) {
      dispatch(setCreatePassSuccess(false));
      navigate(`${devNavUrl}${fd.redirect_link}`);
    }

    // redirect to other page after login
    if (store.isLogin) {
      delete data.data[0].user_other_password;
      delete data.data[0].role_description;
      delete data.data[0].role_created;
      delete data.data[0].role_datetime;

      dispatch(setCredentials(data.data[0]));

      setStorageRoute(data.data[1], data.data[2]);
      dispatch(setIsLogin(false));
      checkRoleToRedirect(navigate, data.data[0]);
    }
  }
};
