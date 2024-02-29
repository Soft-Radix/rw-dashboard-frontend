import i18next from "i18next";
import { lazy } from "react";
import en from "./i18n/en";
import tr from "./i18n/tr";
import ar from "./i18n/ar";

const Billing = lazy(() => import("./Billing"));

i18next.addResourceBundle("en", "tasksPage", en);
i18next.addResourceBundle("tr", "tasksPage", tr);
i18next.addResourceBundle("ar", "tasksPage", ar);

/**
 * The Tasks page config.
 */
const BillingConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "billings",
      element: <Billing />,
    },
  ],
};

export default BillingConfig;
