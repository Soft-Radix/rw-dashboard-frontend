import i18next from "i18next";
import { lazy } from "react";
import ManagerProfile from "../../components/accountManager/ManagerProfile";

const AccountManager = lazy(() => import("./AccountManager"));
// const ManagerProfile=  lazy(() => import("../../components/accountManager/ManagerProfile"));
const commonSetting = {
  settings: {
    layout: {},
  },
};
/**
 * The AccountManager page config.
 */
export const AdminAccountManagerConfig = {
  ...commonSetting,
  routes: [
    {
      path: "admin/acc-manager",
      element: <AccountManager />,
    },
    {
      path: "admin/acc-manager/detail/:accountManager_id",

      element: <ManagerProfile />,
    },
  ],
};

// export default DashboardConfig;
