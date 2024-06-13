import i18next from "i18next";
import { lazy } from "react";
import en from "./i18n/en";
import tr from "./i18n/tr";
import ar from "./i18n/ar";

i18next.addResourceBundle("en", "tasksPage", en);
i18next.addResourceBundle("tr", "tasksPage", tr);
i18next.addResourceBundle("ar", "tasksPage", ar);

const Tasks = lazy(() => import("./Tasks"));
const TaskDetails = lazy(() => import("../../components/tasks/TaskDetails"));

/**
 * The Tasks page config.
 */
const TasksConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "tasks",
      element: <Tasks />,
    },
    {
      path: "/:projectId/tasks/detail/:taskId",
      element: <TaskDetails />,
    },
  ],
};

export default TasksConfig;
