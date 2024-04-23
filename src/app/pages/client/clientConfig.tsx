import i18next from "i18next";
import { lazy } from "react";
import en from "./i18n/en";
import tr from "./i18n/tr";
import ar from "./i18n/ar";

const Client = lazy(() => import("./Client"));
const ClientDetail = lazy(() => import("../../components/client/ClientDetail"));
const AddSubscription = lazy(() => import("../../components/client/Subscription/AddSubscription"));
const SubscriptionDetails = lazy(
  () => import("../../components/client/Subscription/SubscriptionDetails")
);

i18next.addResourceBundle("en", "tasksPage", en);
i18next.addResourceBundle("tr", "tasksPage", tr);
i18next.addResourceBundle("ar", "tasksPage", ar);

/**
 * The Tasks page config.
 */
const ClientConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "admin/client",
      element: <Client />,
    },
    {
      path: "admin/client/detail/:client_id",
      element: <ClientDetail />,
    },
    {
      path: "admin/client/add-subscription",
      element: <AddSubscription />,
    },
    {
      path: "admin/client/subscription-detail",
      element: <SubscriptionDetails />,
    },
  ],
};

export default ClientConfig;
