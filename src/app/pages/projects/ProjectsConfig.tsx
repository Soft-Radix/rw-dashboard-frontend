import i18next from "i18next";
import { lazy } from "react";
import ar from "./i18n/ar";
import en from "./i18n/en";
import tr from "./i18n/tr";

i18next.addResourceBundle("en", "dashboardPage", en);
i18next.addResourceBundle("tr", "dashboardPage", tr);
i18next.addResourceBundle("ar", "dashboardPage", ar);

const Projects = lazy(() => import("./Projects"));
/**
 * The Dashboard page config.
 */
const ProjectsConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "projects",
      element: <Projects />,
    },
    {
      path: "projects/p",
      element: <Projects />,
    },
  ],
};

export default ProjectsConfig;
