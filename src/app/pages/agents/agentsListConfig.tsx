import { lazy } from "react";
const AgentsList = lazy(() => import("./AgentsList"));
const AgentDetails = lazy(() => import("../../components/agents/AgentDetails"));

/**
 * The Tasks page config.
 */
const AdminAgentsConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "admin/agents/list",
      element: <AgentsList />,
    },
    {
      path: "admin/agent-detail",
      element: <AgentDetails />,
    },
  ],
};

export default AdminAgentsConfig;
