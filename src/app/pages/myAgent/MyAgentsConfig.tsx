import i18next from "i18next";
import { lazy } from "react";
import en from "./i18n/en";
import tr from "./i18n/tr";
import ar from "./i18n/ar";
import Myagents from "./Myagents";

i18next.addResourceBundle("en", "tasksPage", en);
i18next.addResourceBundle("tr", "tasksPage", tr);
i18next.addResourceBundle("ar", "tasksPage", ar);

const Tasks = lazy(() => import("./Myagents"));

/**
 * The Tasks page config.
 */
const MyAgentsConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "my-agents",
      element: <Myagents />,
    },
  ],
};

export default MyAgentsConfig;
