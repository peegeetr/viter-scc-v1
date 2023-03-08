import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { devNavUrl, UrlSystem } from "./component/helpers/functions-general"; 
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
            <Route path={`/${devNavUrl}`} element={<div>SCC </div>} />
            <Route
              path={`${devNavUrl}/${UrlSystem}/dashboard`}
              element={<DashboardLink />}
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/account`}
              element={<Account />}
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/profile`}
              element={<Profile />}
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/application`}
              element={<ApplicationLink />}
            />
            {/* Settings Link */}
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings`}
              element={<SettingsLink />}
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/users`}
              element={<UserPage />}
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/users/system`}
              element={<SystemUser />}
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/users/other`}
              element={<OtherUser />}
            />
            <Route
              path={`${devNavUrl}/${UrlSystem}/settings/users/role`}
              element={<Role />}
            />
 
          </Routes>
        </Router>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export default App;
