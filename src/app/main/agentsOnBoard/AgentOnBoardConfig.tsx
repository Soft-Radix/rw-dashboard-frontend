import { FuseRouteConfigType } from "@fuse/utils/FuseUtils";
import authRoles from "../../auth/authRoles";
import CreatePassword from "./CreatePassWord";
import SignDocuement from "../clientOnBoard/SignDocuement";
import AgentSignDocument from "./AgentSignDocument";
// import SignDocuement from "./SignDocuement";

const AgentOnBoardConfig: FuseRouteConfigType = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false,
        },
        toolbar: {
          display: false,
        },
        footer: {
          display: false,
        },
        leftSidePanel: {
          display: false,
        },
        rightSidePanel: {
          display: false,
        },
      },
    },
  },
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: "create-password",
      element: <CreatePassword />,
    },
    {
      path: "sign-doc",
      element: <AgentSignDocument />,
    },
  ],
};

export default AgentOnBoardConfig;
