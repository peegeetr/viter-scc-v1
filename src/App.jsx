import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  UrlAdmin,
  UrlCasher,
  UrlManager,
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
import UserPage from "./component/pages/settings/users/UserPage";
import Role from "./component/pages/settings/users/role/Role";
import SystemUser from "./component/pages/settings/users/system/SystemUser";
import PageNotFound from "./component/partials/PageNotFound";

import AdminCategory from "./component/pages/Inventory/categories/links/AdminCategory";
import CasherCategory from "./component/pages/Inventory/categories/links/CasherCategory";
import ManagerCategory from "./component/pages/Inventory/categories/links/ManagerCategory";
import SystemCategory from "./component/pages/Inventory/categories/links/SystemCategory";
import AdminInventoryDetails from "./component/pages/Inventory/links/AdminInventoryDetails";
import CasherInventoryDetails from "./component/pages/Inventory/links/CasherInventoryDetails";
import ManagerInventoryDetails from "./component/pages/Inventory/links/ManagerInventoryDetails";
import SystemInventoryDetails from "./component/pages/Inventory/links/SystemInventoryDetails";
import AdminOrders from "./component/pages/Inventory/orders/links/AdminOrders";
import CasherOrders from "./component/pages/Inventory/orders/links/CasherOrders";
import ManagerOrders from "./component/pages/Inventory/orders/links/ManagerOrders";
import SystemOrders from "./component/pages/Inventory/orders/links/SystemOrders";
import AddOrderPage from "./component/pages/Inventory/orders/order-page/AddOrderPage";
import OrderSuccess from "./component/pages/Inventory/orders/order-page/OrderSuccess";
import AdminProducts from "./component/pages/Inventory/products/links/AdminProducts";
import CasherProducts from "./component/pages/Inventory/products/links/CasherProducts";
import ManagerProducts from "./component/pages/Inventory/products/links/ManagerProducts";
import SystemProducts from "./component/pages/Inventory/products/links/SystemProducts";
import AdminReports from "./component/pages/Inventory/reports/links/AdminReports";
import CasherReports from "./component/pages/Inventory/reports/links/CasherReports";
import ManagerReports from "./component/pages/Inventory/reports/links/ManagerReports";
import SystemReports from "./component/pages/Inventory/reports/links/SystemReports";
import AdminSales from "./component/pages/Inventory/sales/links/AdminSales";
import CasherSales from "./component/pages/Inventory/sales/links/CasherSales";
import ManagerSales from "./component/pages/Inventory/sales/links/ManagerSales";
import SystemSales from "./component/pages/Inventory/sales/links/SystemSales";
import AdminStocks from "./component/pages/Inventory/stocks/links/AdminStocks";
import CasherStocks from "./component/pages/Inventory/stocks/links/CasherStocks";
import ManagerStocks from "./component/pages/Inventory/stocks/links/ManagerStocks";
import SystemStocks from "./component/pages/Inventory/stocks/links/SystemStocks";
import AdminSuppliers from "./component/pages/Inventory/suppliers/links/AdminSuppliers";
import CasherSuppliers from "./component/pages/Inventory/suppliers/links/CasherSuppliers";
import ManagerSuppliers from "./component/pages/Inventory/suppliers/links/ManagerSuppliers";
import SystemSuppliers from "./component/pages/Inventory/suppliers/links/SystemSuppliers";
import AdminSupplierProduct from "./component/pages/Inventory/suppliers/products/links/AdminSupplierProduct";
import CasherSupplierProduct from "./component/pages/Inventory/suppliers/products/links/CasherSupplierProduct";
import ManagerSupplierProduct from "./component/pages/Inventory/suppliers/products/links/ManagerSupplierProduct";
import SystemSupplierProduct from "./component/pages/Inventory/suppliers/products/links/SystemSupplierProduct";
import AdminCapitalShare from "./component/pages/account/details/capital-share/links/AdminCapitalShare";
import SystemCapitalShare from "./component/pages/account/details/capital-share/links/SystemCapitalShare";
import AdminDeatils from "./component/pages/account/details/links/AdminDeatils";
import SystemDeatils from "./component/pages/account/details/links/SystemDeatils";
import AdminPatronage from "./component/pages/account/details/patronage/links/AdminPatronage";
import SystemPatronage from "./component/pages/account/details/patronage/links/SystemPatronage";
import AdminProfile from "./component/pages/account/details/profile/links/AdminProfile";
import SystemProfile from "./component/pages/account/details/profile/links/SystemProfile";
import AdminSavings from "./component/pages/account/details/savings/links/AdminSavings";
import SystemSavings from "./component/pages/account/details/savings/links/SystemSavings";
import AdminAccount from "./component/pages/account/links/AdminAccount";
import SystemAccount from "./component/pages/account/links/SystemUserPayrollList";
import AdminAppProfile from "./component/pages/application/details/links/AdminAppProfile";
import SystemAppProfile from "./component/pages/application/details/links/SystemAppProfile";
import AdminApplication from "./component/pages/application/links/AdminApplication";
import SystemApplication from "./component/pages/application/links/SystemApplication";
import AdminDashboard from "./component/pages/dashboard/links/AdminDashboard";
import CasherDashboard from "./component/pages/dashboard/links/CasherDashboard";
import ManagerDashboard from "./component/pages/dashboard/links/ManagerDashboard";
import MemberDashboard from "./component/pages/dashboard/links/MemberDashboard";
import SystemDashboard from "./component/pages/dashboard/links/SystemDashboard";
import AdminFileUpload from "./component/pages/file-upload/links/AdminFileUpload";
import CasherFileUpload from "./component/pages/file-upload/links/CasherFileUpload";
import ManagerFileUpload from "./component/pages/file-upload/links/ManagerFileUpload";
import MemberFileUpload from "./component/pages/file-upload/links/MemberFileUpload";
import SystemFileUpload from "./component/pages/file-upload/links/SystemFileUpload";
import AdminMyCapitalShare from "./component/pages/my-account/capital-share/links/AdminMyCapitalShare";
import CasherMyCapitalShare from "./component/pages/my-account/capital-share/links/CasherMyCapitalShare";
import ManagerMyCapitalShare from "./component/pages/my-account/capital-share/links/ManagerMyCapitalShare";
import MemberMyCapitalShare from "./component/pages/my-account/capital-share/links/MemberMyCapitalShare";
import AdminMyAccount from "./component/pages/my-account/links/AdminMyAccount";
import CasherMyAccount from "./component/pages/my-account/links/CasherMyAccount";
import ManagerMyAccount from "./component/pages/my-account/links/ManagerMyAccount";
import MemberMyAccount from "./component/pages/my-account/links/MemberMyAccount";
import AdminMyPatronage from "./component/pages/my-account/patronage/links/AdminMyPatronage";
import CasherMyPatronage from "./component/pages/my-account/patronage/links/CasherMyPatronage";
import ManagerMyPatronage from "./component/pages/my-account/patronage/links/ManagerMyPatronage";
import MemberMyPatronage from "./component/pages/my-account/patronage/links/MemberMyPatronage";
import AdminMyProfile from "./component/pages/my-account/profile/links/AdminMyProfile";
import CasherMyProfile from "./component/pages/my-account/profile/links/CasherMyProfile";
import ManagerMyProfile from "./component/pages/my-account/profile/links/ManagerMyProfile";
import MemberMyProfile from "./component/pages/my-account/profile/links/MemberMyProfile";
import AdminMySavings from "./component/pages/my-account/savings/links/AdminMySavings";
import CasherMySavings from "./component/pages/my-account/savings/links/CasherMySavings";
import ManagerMySavings from "./component/pages/my-account/savings/links/ManagerMySavings";
import MemberMySavings from "./component/pages/my-account/savings/links/MemberMySavings";
import AdminSettingsLink from "./component/pages/settings/links/AdminSettingsLink";
import SystemSettingsLink from "./component/pages/settings/links/SystemSettingsLink";
import AdminNetSurPlus from "./component/pages/settings/net-surplus/links/AdminNetSurPlus";
import SystemNetSurPlus from "./component/pages/settings/net-surplus/links/SystemNetSurPlus";
import AdminOtherUser from "./component/pages/settings/users/other/links/AdminOtherUser";
import SystemOtherUser from "./component/pages/settings/users/other/links/SystemOtherUser";
import { StoreProvider } from "./store/StoreContext";
import AdminPointOfSales from "./component/pages/Inventory/point-of-sales/links/AdminPointOfSales";
import CasherPointOfSales from "./component/pages/Inventory/point-of-sales/links/CasherPointOfSales";
import ManagerPointOfSales from "./component/pages/Inventory/point-of-sales/links/ManagerPointOfSales";
import SystemPointOfSales from "./component/pages/Inventory/point-of-sales/links/SystemPointOfSales";
import ManagerInvoice from "./component/pages/Inventory/invoice/links/ManagerInvoice";
import SystemInvoice from "./component/pages/Inventory/invoice/links/SystemInvoice";
import AdminInvoice from "./component/pages/Inventory/invoice/links/AdminInvoice";
import CasherInvoice from "./component/pages/Inventory/invoice/links/CasherInvoice";

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
              path={`/${devNavUrl}/order-page`}
              element={<AddOrderPage />}
            />
            <Route
              path={`/${devNavUrl}/order-page/success`}
              element={<OrderSuccess />}
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
                  <SystemDashboard />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/account`}
              element={
                <ProtectedRouteSystem>
                  <SystemAccount />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/application`}
              element={
                <ProtectedRouteSystem>
                  <SystemApplication />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/application/profile`}
              element={
                <ProtectedRouteSystem>
                  <SystemAppProfile />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/account/details`}
              element={
                <ProtectedRouteSystem>
                  <SystemDeatils />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/account/details/profile`}
              element={
                <ProtectedRouteSystem>
                  <SystemProfile />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/account/details/savings`}
              element={
                <ProtectedRouteSystem>
                  <SystemSavings />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/account/details/capital-share`}
              element={
                <ProtectedRouteSystem>
                  <SystemCapitalShare />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/account/details/patronage`}
              element={
                <ProtectedRouteSystem>
                  <SystemPatronage />
                </ProtectedRouteSystem>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlSystem}/file-upload`}
              element={
                <ProtectedRouteSystem>
                  <SystemFileUpload />
                </ProtectedRouteSystem>
              }
            />

            {/* system settings */}
            <Route
              path={`${devNavUrl}/${UrlSystem}/inventory/pos`}
              element={
                <ProtectedRouteSystem>
                  <SystemPointOfSales />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/inventory`}
              element={
                <ProtectedRouteSystem>
                  <SystemInventoryDetails />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/inventory/category`}
              element={
                <ProtectedRouteSystem>
                  <SystemCategory />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/inventory/orders`}
              element={
                <ProtectedRouteSystem>
                  <SystemOrders />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/inventory/invoice`}
              element={
                <ProtectedRouteSystem>
                  <SystemInvoice />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/inventory/products`}
              element={
                <ProtectedRouteSystem>
                  <SystemProducts />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/inventory/stocks`}
              element={
                <ProtectedRouteSystem>
                  <SystemStocks />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/inventory/reports`}
              element={
                <ProtectedRouteSystem>
                  <SystemReports />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/inventory/sales`}
              element={
                <ProtectedRouteSystem>
                  <SystemSales />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/inventory/suppliers`}
              element={
                <ProtectedRouteSystem>
                  <SystemSuppliers />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/inventory/suppliers/products`}
              element={
                <ProtectedRouteSystem>
                  <SystemSupplierProduct />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings`}
              element={
                <ProtectedRouteSystem>
                  <SystemSettingsLink />
                </ProtectedRouteSystem>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/net-surplus`}
              element={
                <ProtectedRouteSystem>
                  <SystemNetSurPlus />
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
                  <SystemOtherUser />
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
                  <MemberDashboard />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlMember}/details`}
              element={
                <ProtectedRouteOther>
                  <MemberMyAccount />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlMember}/details/profile`}
              element={
                <ProtectedRouteOther>
                  <MemberMyProfile />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlMember}/details/savings`}
              element={
                <ProtectedRouteOther>
                  <MemberMySavings />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlMember}/details/capital-share`}
              element={
                <ProtectedRouteOther>
                  <MemberMyCapitalShare />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlMember}/details/patronage`}
              element={
                <ProtectedRouteOther>
                  <MemberMyPatronage />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlMember}/file-upload`}
              element={
                <ProtectedRouteOther>
                  <MemberFileUpload />
                </ProtectedRouteOther>
              }
            />

            {/* admin user */}
            <Route
              path={`${devNavUrl}/${UrlAdmin}/dashboard`}
              element={
                <ProtectedRouteOther>
                  <AdminDashboard />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlAdmin}/account`}
              element={
                <ProtectedRouteOther>
                  <AdminAccount />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlAdmin}/application`}
              element={
                <ProtectedRouteOther>
                  <AdminApplication />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/account/details`}
              element={
                <ProtectedRouteOther>
                  <AdminDeatils />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/account/details/profile`}
              element={
                <ProtectedRouteOther>
                  <AdminProfile />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlAdmin}/account/details/savings`}
              element={
                <ProtectedRouteOther>
                  <AdminSavings />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlAdmin}/account/details/capital-share`}
              element={
                <ProtectedRouteOther>
                  <AdminCapitalShare />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/account/details/patronage`}
              element={
                <ProtectedRouteOther>
                  <AdminPatronage />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/application/profile`}
              element={
                <ProtectedRouteOther>
                  <AdminAppProfile />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlAdmin}/details`}
              element={
                <ProtectedRouteOther>
                  <AdminMyAccount />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/details/profile`}
              element={
                <ProtectedRouteOther>
                  <AdminMyProfile />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlAdmin}/details/savings`}
              element={
                <ProtectedRouteOther>
                  <AdminMySavings />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlAdmin}/details/capital-share`}
              element={
                <ProtectedRouteOther>
                  <AdminMyCapitalShare />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/details/patronage`}
              element={
                <ProtectedRouteOther>
                  <AdminMyPatronage />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/file-upload`}
              element={
                <ProtectedRouteOther>
                  <AdminFileUpload />
                </ProtectedRouteOther>
              }
            />
            {/* admin invetory */}

            <Route
              path={`${devNavUrl}/${UrlAdmin}/inventory/pos`}
              element={
                <ProtectedRouteOther>
                  <AdminPointOfSales />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/inventory`}
              element={
                <ProtectedRouteOther>
                  <AdminInventoryDetails />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/inventory/category`}
              element={
                <ProtectedRouteOther>
                  <AdminCategory />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/inventory/orders`}
              element={
                <ProtectedRouteOther>
                  <AdminOrders />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/inventory/invoice`}
              element={
                <ProtectedRouteOther>
                  <AdminInvoice />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/inventory/products`}
              element={
                <ProtectedRouteOther>
                  <AdminProducts />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/inventory/stocks`}
              element={
                <ProtectedRouteOther>
                  <AdminStocks />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/inventory/reports`}
              element={
                <ProtectedRouteOther>
                  <AdminReports />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/inventory/sales`}
              element={
                <ProtectedRouteOther>
                  <AdminSales />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/inventory/suppliers`}
              element={
                <ProtectedRouteOther>
                  <AdminSuppliers />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/inventory/suppliers/products`}
              element={
                <ProtectedRouteOther>
                  <AdminSupplierProduct />
                </ProtectedRouteOther>
              }
            />
            {/* system settings */}
            <Route
              path={`${devNavUrl}/${UrlAdmin}/settings`}
              element={
                <ProtectedRouteOther>
                  <AdminSettingsLink />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/settings/net-surplus`}
              element={
                <ProtectedRouteOther>
                  <AdminNetSurPlus />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlAdmin}/settings/other`}
              element={
                <ProtectedRouteOther>
                  <AdminOtherUser />
                </ProtectedRouteOther>
              }
            />

            {/* casher user */}
            <Route
              path={`${devNavUrl}/${UrlCasher}/dashboard`}
              element={
                <ProtectedRouteOther>
                  <CasherDashboard />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlCasher}/details`}
              element={
                <ProtectedRouteOther>
                  <CasherMyAccount />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlCasher}/details/profile`}
              element={
                <ProtectedRouteOther>
                  <CasherMyProfile />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlCasher}/details/savings`}
              element={
                <ProtectedRouteOther>
                  <CasherMySavings />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlCasher}/details/capital-share`}
              element={
                <ProtectedRouteOther>
                  <CasherMyCapitalShare />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlCasher}/details/patronage`}
              element={
                <ProtectedRouteOther>
                  <CasherMyPatronage />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlCasher}/file-upload`}
              element={
                <ProtectedRouteOther>
                  <CasherFileUpload />
                </ProtectedRouteOther>
              }
            />
            {/* casher inventory*/}
            <Route
              path={`${devNavUrl}/${UrlCasher}/inventory/pos`}
              element={
                <ProtectedRouteOther>
                  <CasherPointOfSales />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlCasher}/inventory`}
              element={
                <ProtectedRouteOther>
                  <CasherInventoryDetails />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlCasher}/inventory/category`}
              element={
                <ProtectedRouteOther>
                  <CasherCategory />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlCasher}/inventory/orders`}
              element={
                <ProtectedRouteOther>
                  <CasherOrders />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlCasher}/inventory/invoice`}
              element={
                <ProtectedRouteOther>
                  <CasherInvoice />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlCasher}/inventory/products`}
              element={
                <ProtectedRouteOther>
                  <CasherProducts />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlCasher}/inventory/sales`}
              element={
                <ProtectedRouteOther>
                  <CasherSales />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlCasher}/inventory/stocks`}
              element={
                <ProtectedRouteOther>
                  <CasherStocks />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlCasher}/inventory/suppliers`}
              element={
                <ProtectedRouteOther>
                  <CasherSuppliers />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlCasher}/inventory/suppliers/products`}
              element={
                <ProtectedRouteOther>
                  <CasherSupplierProduct />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlCasher}/inventory/reports`}
              element={
                <ProtectedRouteOther>
                  <CasherReports />
                </ProtectedRouteOther>
              }
            />
            {/* manager user */}
            <Route
              path={`${devNavUrl}/${UrlManager}/dashboard`}
              element={
                <ProtectedRouteOther>
                  <ManagerDashboard />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlManager}/details`}
              element={
                <ProtectedRouteOther>
                  <ManagerMyAccount />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlManager}/details/profile`}
              element={
                <ProtectedRouteOther>
                  <ManagerMyProfile />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlManager}/details/savings`}
              element={
                <ProtectedRouteOther>
                  <ManagerMySavings />
                </ProtectedRouteOther>
              }
            />

            <Route
              path={`${devNavUrl}/${UrlManager}/details/capital-share`}
              element={
                <ProtectedRouteOther>
                  <ManagerMyCapitalShare />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlManager}/details/patronage`}
              element={
                <ProtectedRouteOther>
                  <ManagerMyPatronage />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlManager}/file-upload`}
              element={
                <ProtectedRouteOther>
                  <ManagerFileUpload />
                </ProtectedRouteOther>
              }
            />
            {/* manager invetory */}

            <Route
              path={`${devNavUrl}/${UrlManager}/inventory/pos`}
              element={
                <ProtectedRouteOther>
                  <ManagerPointOfSales />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlManager}/inventory`}
              element={
                <ProtectedRouteOther>
                  <ManagerInventoryDetails />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlManager}/inventory/category`}
              element={
                <ProtectedRouteOther>
                  <ManagerCategory />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlManager}/inventory/orders`}
              element={
                <ProtectedRouteOther>
                  <ManagerOrders />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlManager}/inventory/invoice`}
              element={
                <ProtectedRouteOther>
                  <ManagerInvoice />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlManager}/inventory/products`}
              element={
                <ProtectedRouteOther>
                  <ManagerProducts />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlManager}/inventory/stocks`}
              element={
                <ProtectedRouteOther>
                  <ManagerStocks />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlManager}/inventory/reports`}
              element={
                <ProtectedRouteOther>
                  <ManagerReports />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlManager}/inventory/sales`}
              element={
                <ProtectedRouteOther>
                  <ManagerSales />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlManager}/inventory/suppliers`}
              element={
                <ProtectedRouteOther>
                  <ManagerSuppliers />
                </ProtectedRouteOther>
              }
            />
            <Route
              path={`${devNavUrl}/${UrlManager}/inventory/suppliers/products`}
              element={
                <ProtectedRouteOther>
                  <ManagerSupplierProduct />
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
