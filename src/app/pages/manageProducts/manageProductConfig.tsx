import i18next from "i18next";
import { lazy } from "react";
import en from "./i18n/en";
import tr from "./i18n/tr";
import ar from "./i18n/ar";


const ManageProducts = lazy(() => import("./ManageProducts"));

i18next.addResourceBundle("en", "tasksPage", en);
i18next.addResourceBundle("tr", "tasksPage", tr);
i18next.addResourceBundle("ar", "tasksPage", ar);

/**
 * The Tasks page config.
 */
const ManageProductsConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "admin/manage-products",
      element: <ManageProducts />,
    },
  ],
};

export default ManageProductsConfig;
