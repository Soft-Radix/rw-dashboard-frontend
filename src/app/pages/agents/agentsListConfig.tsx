import { lazy } from "react";
const AgentsList = lazy(() => import("./AgentsList"));
const AgentDetails = lazy(() => import("../../components/agents/AgentDetails"));
const AgentsGroup = lazy(() => import("./AgentsGroup"));

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
      path: "admin/agent-detail/:agent_id",
      element: <AgentDetails />,
    },
    {
      path: "admin/agents/groups",
      element: <AgentsGroup />,
    },
  ],
};

export default AdminAgentsConfig;
