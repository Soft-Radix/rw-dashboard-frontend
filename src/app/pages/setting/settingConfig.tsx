import i18next from "i18next";
import { lazy } from "react";

const Setting = lazy(() => import("./Setting"));

/**
 * The Tasks page config.
 */
const SettingConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "admin/setting",
      element: <Setting />,
    },
  ],
};

export const clientSettingConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "/settings",
      element: <Setting />,
    },
  ],
};
export default SettingConfig;
