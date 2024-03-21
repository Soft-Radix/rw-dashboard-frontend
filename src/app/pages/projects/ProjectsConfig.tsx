import i18next from "i18next";
import { lazy } from "react";
import en from "./i18n/en";
import tr from "./i18n/tr";
import ar from "./i18n/ar";
import ProjectLayout from "./ProjectLayout";

i18next.addResourceBundle("en", "dashboardPage", en);
i18next.addResourceBundle("tr", "dashboardPage", tr);
i18next.addResourceBundle("ar", "dashboardPage", ar);

const Projects = lazy(() => import("./Projects"));
const ProjectTaskTabel = lazy(() => import("./ProjectTaskTabel"));
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
      path: "taskTable",

      element: (
        <ProjectLayout>
          <ProjectTaskTabel />,
        </ProjectLayout>
      ),
    },
  ],
};

export default ProjectsConfig;
