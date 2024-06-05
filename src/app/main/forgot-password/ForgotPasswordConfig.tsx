import { FuseRouteConfigType } from "@fuse/utils/FuseUtils";
import ForgotPassword from "./ForgotPassword";
import authRoles from "../../auth/authRoles";

const ForgotPasswordConfig: FuseRouteConfigType = {
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
      path: "forgot-password",
      element: <ForgotPassword />,
    },
  ],
};

export default ForgotPasswordConfig;
