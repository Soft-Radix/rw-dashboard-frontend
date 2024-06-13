import i18next from "i18next";
import { lazy } from "react";
import en from "./i18n/en";
import tr from "./i18n/tr";
import ar from "./i18n/ar";

i18next.addResourceBundle("en", "tasksPage", en);
i18next.addResourceBundle("tr", "tasksPage", tr);
i18next.addResourceBundle("ar", "tasksPage", ar);

const WhiteBoard= lazy(() => import("./WhiteBoard"));

/**
 * The Tasks page config.
 */
const WhiteBoardConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "white-board",
      element: <WhiteBoard />,
    },
  ],
};

export default WhiteBoardConfig;
