import { FuseRouteConfigType } from "@fuse/utils/FuseUtils";
import authRoles from "../../auth/authRoles";
import CreatePassword from "./CreatePassWord";
import SignDocuement from "../clientOnBoard/SignDocuement";
import AgentSignDocument from "./AgentSignDocument";
import UploadKyc from "./UploadKyc";
import PhotoId from "./PhotoId";
import UploadPage from "./UploadPage";
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
    {
      path: "kyc-doc/:token",
      element: <UploadKyc />,
    },
    {
      path: "photo-id/:token",
      element: <PhotoId />,
    },
    {
      path: "upload-doc/:token",
      element: <UploadPage />,
    },
  ],
};

export default AgentOnBoardConfig;
