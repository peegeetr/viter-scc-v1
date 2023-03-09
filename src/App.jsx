import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { devNavUrl, UrlOtherUser, UrlSystem } from "./component/helpers/functions-general"; 
import CreateOtherPassword from "./component/pages/access/create-password/CreateOtherPassword";
import CreatePasswordSuccess from "./component/pages/access/create-password/CreatePasswordSuccess";
import CreateSystemPassword from "./component/pages/access/create-password/CreateSystemPassword";
import ForgotPassword from "./component/pages/access/forgot-password/ForgotPassword";
import ForgotPasswordSystem from "./component/pages/access/forgot-password/ForgotPasswordSystem";
import ForgotPasswordVerification from "./component/pages/access/forgot-password/ForgotPasswordVerification";
import OtherLogin from "./component/pages/access/login/OtherLogin";
import SystemLogin from "./component/pages/access/login/SystemLogin";
import ProtectedRouteSystem from "./component/pages/access/ProtectedRouteSystem";
import Account from "./component/pages/account/Account";
import ApplicationLink from "./component/pages/application/ApplicationLink";
import DashboardLink from "./component/pages/dashboard/DashboardLink"; 
import Profile from "./component/pages/profile/Profile"; 
import SettingsLink from "./component/pages/settings/SettingsLink";
import OtherUser from "./component/pages/settings/users/other/OtherUser";
import Role from "./component/pages/settings/users/role/Role";
import SystemUser from "./component/pages/settings/users/system/SystemUser";
import UserPage from "./component/pages/settings/users/UserPage";
import PageNotFound from "./component/partials/PageNotFound";

import { StoreProvider } from "./store/StoreContext";

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
            <Route path={`/${devNavUrl}`} 
              element={<OtherLogin />}
              />
            <Route path={`/${devNavUrl}/${UrlOtherUser}`} 
              element={<OtherLogin />}
              />
            <Route path={`/${devNavUrl}/${UrlOtherUser}/login`} 
              element={<OtherLogin />}
              />
              
            <Route
              path={`${devNavUrl}/other/create-password`}
              element={<CreateOtherPassword />}
            />
            <Route path={`/${devNavUrl}/${UrlOtherUser}/forgot-password`} 
              element={<ForgotPassword />}
              />
              
            {/* login system user */}
            <Route path={`/${devNavUrl}/${UrlSystem}`} 
              element={<SystemLogin />}
              />
            <Route path={`/${devNavUrl}/${UrlSystem}/login`} 
              element={<SystemLogin />}
              />
              <Route path={`/${devNavUrl}/${UrlSystem}/forgot-password`} 
                element={<ForgotPasswordSystem />}
                />
              <Route
                path={`${devNavUrl}/${UrlSystem}/create-password`}
                element={<CreateSystemPassword />}
              />
               
              {/* system user */}
            <Route
              path={`${devNavUrl}/${UrlSystem}/dashboard`}
              element={<ProtectedRouteSystem><DashboardLink /> </ProtectedRouteSystem>}
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/account`}
              element={<ProtectedRouteSystem><Account /></ProtectedRouteSystem>}
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/profile`}
              element={<ProtectedRouteSystem><Profile /></ProtectedRouteSystem>}
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/application`}
              element={<ProtectedRouteSystem><ApplicationLink /></ProtectedRouteSystem>}
            />
            {/* Settings Link */}
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings`}
              element={<ProtectedRouteSystem><SettingsLink /></ProtectedRouteSystem>}
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/users`}
              element={<ProtectedRouteSystem><UserPage /></ProtectedRouteSystem>}
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/users/system`}
              element={<ProtectedRouteSystem><SystemUser /></ProtectedRouteSystem>}
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/users/other`}
              element={<ProtectedRouteSystem><OtherUser /></ProtectedRouteSystem>}
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/users/role`}
              element={<ProtectedRouteSystem><Role /></ProtectedRouteSystem>}
            />
 
          </Routes>
        </Router>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
