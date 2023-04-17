import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  UrlAdmin,
  UrlMember,
  UrlSystem,
  devNavUrl,
} from "./component/helpers/functions-general";
import ProtectedRouteOther from "./component/pages/access/ProtectedRouteOther";
import ProtectedRouteSystem from "./component/pages/access/ProtectedRouteSystem";
import CreateOtherPassword from "./component/pages/access/create-password/CreateOtherPassword";
import CreatePasswordSuccess from "./component/pages/access/create-password/CreatePasswordSuccess";
import CreateSystemPassword from "./component/pages/access/create-password/CreateSystemPassword";
import ForgotPassword from "./component/pages/access/forgot-password/ForgotPassword";
import ForgotPasswordSystem from "./component/pages/access/forgot-password/ForgotPasswordSystem";
import ForgotPasswordVerification from "./component/pages/access/forgot-password/ForgotPasswordVerification";
import OtherLogin from "./component/pages/access/login/OtherLogin";
import SystemLogin from "./component/pages/access/login/SystemLogin";
import Account from "./component/pages/account/Account";
import Deatils from "./component/pages/account/details/Details";
import CapitalShare from "./component/pages/account/details/capital-share/CapitalShare";
import Patronage from "./component/pages/account/details/patronage/Patronage";
import Profile from "./component/pages/account/details/profile/Profile";
import Savings from "./component/pages/account/details/savings/Savings";
import Application from "./component/pages/application/Application";
import AppProfile from "./component/pages/application/details/AppProfile";
import Dashboard from "./component/pages/dashboard/Dashboard";
import FileUpload from "./component/pages/file-upload/FileUpload";
import MyAccount from "./component/pages/my-account/MyAccount";
import MyCapitalShare from "./component/pages/my-account/capital-share/MyCapitalShare";
import MyPatronage from "./component/pages/my-account/patronage/MyPatronage";
import MyProfile from "./component/pages/my-account/profile/MyProfile";
import MySavings from "./component/pages/my-account/savings/MySavings";
import SettingsLink from "./component/pages/settings/SettingsLink";
import NetSurPlus from "./component/pages/settings/net-surplus/NetSurPlus";
import UserPage from "./component/pages/settings/users/UserPage";
import OtherUser from "./component/pages/settings/users/other/OtherUser";
import Role from "./component/pages/settings/users/role/Role";
import SystemUser from "./component/pages/settings/users/system/SystemUser";
import PageNotFound from "./component/partials/PageNotFound";

import InventoryDetails from "./component/pages/Inventory/InventoryDetails";
import Category from "./component/pages/Inventory/categories/Category";
import Orders from "./component/pages/Inventory/orders/Orders";
import Products from "./component/pages/Inventory/products/Products";
import Reports from "./component/pages/Inventory/reports/Reports";
import Sales from "./component/pages/Inventory/sales/Sales";
import Stocks from "./component/pages/Inventory/stocks/Stocks";
import Suppliers from "./component/pages/Inventory/suppliers/Suppliers";
import { StoreProvider } from "./store/StoreContext";
import SupplierProduct from "./component/pages/Inventory/suppliers/products/SupplierProduct";

function App() {
  // Create a client
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Router>
          <Routes>
            <Route path={`*`} element={<PageNotFound />} />
            <Route
              path={`${devNavUrl}/forgot-password-verification`}
              element={<ForgotPasswordVerification />}
            />
            <Route
              path={`${devNavUrl}/create-password-success`}
              element={<CreatePasswordSuccess />}
            />
            {/* login other user */}
            <Route path={`/${devNavUrl}`} element={<OtherLogin />} />
            <Route path={`/${devNavUrl}/login`} element={<OtherLogin />} />

            <Route
              path={`${devNavUrl}/create-password`}
              element={<CreateOtherPassword />}
            />
            <Route
              path={`/${devNavUrl}/forgot-password`}
              element={<ForgotPassword />}
            />

            {/* login system user */}
            <Route
              path={`/${devNavUrl}/${UrlSystem}`}
              element={<SystemLogin />}
            />
            <Route
              path={`/${devNavUrl}/${UrlSystem}/login`}
              element={<SystemLogin />}
            />
            <Route
              path={`/${devNavUrl}/${UrlSystem}/forgot-password`}
              element={<ForgotPasswordSystem />}
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/create-password`}
              element={<CreateSystemPassword />}
            />

            {/* system user */}

            <Route
              path={`${devNavUrl}/${UrlSystem}/dashboard`}
              element={
                <ProtectedRouteSystem>
                  <Dashboard />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/account`}
              element={
                <ProtectedRouteSystem>
                  <Account />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/application`}
              element={
                <ProtectedRouteSystem>
                  <Application />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/application/profile`}
              element={
                <ProtectedRouteSystem>
                  <AppProfile />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/account/details/savings`}
              element={
                <ProtectedRouteSystem>
                  <Savings />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/account/details/capital-share`}
              element={
                <ProtectedRouteSystem>
                  <CapitalShare />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/account/details`}
              element={
                <ProtectedRouteSystem>
                  <Deatils />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/account/details/profile`}
              element={
                <ProtectedRouteSystem>
                  <Profile />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/account/details/savings`}
              element={
                <ProtectedRouteSystem>
                  <Savings />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/account/details/capital-share`}
              element={
                <ProtectedRouteSystem>
                  <CapitalShare />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/account/details/patronage`}
              element={
                <ProtectedRouteSystem>
                  <Patronage />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/file-upload`}
              element={
                <ProtectedRouteSystem>
                  <FileUpload />
                </ProtectedRouteSystem>
              }
            />

            {/* system settings */}
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings`}
              element={
                <ProtectedRouteSystem>
                  <SettingsLink />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/inventory`}
              element={
                <ProtectedRouteSystem>
                  <InventoryDetails />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/inventory/category`}
              element={
                <ProtectedRouteSystem>
                  <Category />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/inventory/orders`}
              element={
                <ProtectedRouteSystem>
                  <Orders />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/inventory/products`}
              element={
                <ProtectedRouteSystem>
                  <Products />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/inventory/stocks`}
              element={
                <ProtectedRouteSystem>
                  <Stocks />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/inventory/reports`}
              element={
                <ProtectedRouteSystem>
                  <Reports />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/inventory/sales`}
              element={
                <ProtectedRouteSystem>
                  <Sales />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/inventory/suppliers`}
              element={
                <ProtectedRouteSystem>
                  <Suppliers />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/inventory/suppliers/products`}
              element={
                <ProtectedRouteSystem>
                  <SupplierProduct />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/inventory/category`}
              element={
                <ProtectedRouteSystem>
                  <Category />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/net-surplus`}
              element={
                <ProtectedRouteSystem>
                  <NetSurPlus />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/users`}
              element={
                <ProtectedRouteSystem>
                  <UserPage />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/users/system`}
              element={
                <ProtectedRouteSystem>
                  <SystemUser />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/users/other`}
              element={
                <ProtectedRouteSystem>
                  <OtherUser />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/users/role`}
              element={
                <ProtectedRouteSystem>
                  <Role />
                </ProtectedRouteSystem>
              }
            />

            {/* member user */}
            <Route
              path={`${devNavUrl}/${UrlMember}/dashboard`}
              element={
                <ProtectedRouteOther>
                  <Dashboard />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlMember}/details`}
              element={
                <ProtectedRouteOther>
                  <MyAccount />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlMember}/details/profile`}
              element={
                <ProtectedRouteOther>
                  <MyProfile />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlMember}/details/savings`}
              element={
                <ProtectedRouteOther>
                  <MySavings />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlMember}/details/capital-share`}
              element={
                <ProtectedRouteOther>
                  <MyCapitalShare />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlMember}/details/patronage`}
              element={
                <ProtectedRouteOther>
                  <MyPatronage />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlMember}/file-upload`}
              element={
                <ProtectedRouteOther>
                  <FileUpload />
                </ProtectedRouteOther>
              }
            />

            {/* admin user */}
            <Route
              path={`${devNavUrl}/${UrlAdmin}/dashboard`}
              element={
                <ProtectedRouteOther>
                  <Dashboard />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlAdmin}/account`}
              element={
                <ProtectedRouteOther>
                  <Account />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlAdmin}/application`}
              element={
                <ProtectedRouteOther>
                  <Application />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/account/details`}
              element={
                <ProtectedRouteOther>
                  <MyAccount />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/account/details/profile`}
              element={
                <ProtectedRouteOther>
                  <Profile />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlAdmin}/account/details/savings`}
              element={
                <ProtectedRouteOther>
                  <Savings />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlAdmin}/account/details/capital-share`}
              element={
                <ProtectedRouteOther>
                  <CapitalShare />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/account/details/patronage`}
              element={
                <ProtectedRouteOther>
                  <Patronage />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/application/profile`}
              element={
                <ProtectedRouteOther>
                  <AppProfile />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/file-upload`}
              element={
                <ProtectedRouteOther>
                  <FileUpload />
                </ProtectedRouteOther>
              }
            />
            {/* system settings */}
            <Route
              path={`${devNavUrl}/${UrlAdmin}/settings`}
              element={
                <ProtectedRouteOther>
                  <SettingsLink />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/settings/other`}
              element={
                <ProtectedRouteOther>
                  <OtherUser />
                </ProtectedRouteOther>
              }
            />
          </Routes>
        </Router>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
