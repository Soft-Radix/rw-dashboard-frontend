import i18next from "i18next";
import { lazy } from "react";
import en from "./i18n/en";
import tr from "./i18n/tr";
import ar from "./i18n/ar";

i18next.addResourceBundle("en", "tasksPage", en);
i18next.addResourceBundle("tr", "tasksPage", tr);
i18next.addResourceBundle("ar", "tasksPage", ar);

const Users = lazy(() => import("./Users"));

/**
 * The Tasks page config.
 */
const UsersConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "users",
      element: <Users />,
    },
  ],
};

export default UsersConfig;
