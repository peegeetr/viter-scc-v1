import React from "react";
import { StoreReducer } from "./StoreReducer";

const initVal = {
  error: false,
  info: false,
  success: false,
  isSave: false,
  isShow: false,
  isConfirm: false,
  isRestore: false,
  isAdd: false,
  isEditProfile: false,
  isBeneficiaries: false,
  isSearch: false,
  isModalSearch: false,
  startIndex: 0,
  isCreatePassSuccess: false,
  isForgotPassSuccess: false,
  isAdminForgetPassSuccess: false,
  isLogin: false,
  isLogout: false,
  isAccountUpdated: false,
  credentials: {},
};

const StoreContext = React.createContext();

const StoreProvider = (props) => {
  const [store, dispatch] = React.useReducer(StoreReducer, initVal);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
