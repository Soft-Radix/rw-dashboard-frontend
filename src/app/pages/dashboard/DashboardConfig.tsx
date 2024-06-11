import i18next from "i18next";
import { lazy } from "react";
import en from "./i18n/en";
import tr from "./i18n/tr";
import ar from "./i18n/ar";

i18next.addResourceBundle("en", "dashboardPage", en);
i18next.addResourceBundle("tr", "dashboardPage", tr);
i18next.addResourceBundle("ar", "dashboardPage", ar);

const Dashboard = lazy(() => import("./Dashboard"));
const commonSetting = {
  settings: {
    layout: {},
  },
};
/**
 * The Dashboard page config.
 */
export const AdminDashboardConfig = {
  ...commonSetting,
  routes: [
    {
      path: "admin/dashboard",
      element: <Dashboard />,
    },
  ],
};

/**
 * The Dashboard page config.
 */
export const ClientDashboardConfig = {
  ...commonSetting,
  routes: [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ],
};

// export default DashboardConfig;
