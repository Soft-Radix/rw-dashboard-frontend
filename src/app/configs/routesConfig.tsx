import FuseUtils from "@fuse/utils";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";
import settingsConfig from "app/configs/settingsConfig";
import { FuseRouteConfigsType, FuseRoutesType } from "@fuse/utils/FuseUtils";
import SignInConfig from "../main/sign-in/SignInConfig";
import SignUpConfig from "../main/sign-up/SignUpConfig";
import ForgotPasswordConfig from "../main/forgot-password/ForgotPasswordConfig";
import SignOutConfig from "../main/sign-out/SignOutConfig";
import Error404Page from "../main/404/Error404Page";
// import ExampleConfig from "../main/example/ExampleConfig";
import ResetPasswordConfig from "../main/reset-password/ResetPasswordConfig";
import SetPasswordConfig from "../main/set-password/SetPasswordConfig";
import OtpVerificationConfig from "../main/otp-verification/OtpVerificationConfig";
import AddProjectConfig from "../main/add-project/AddProjectConfig";
import {
  AdminDashboardConfig,
  ClientDashboardConfig,
} from "../pages/dashboard/DashboardConfig";
import TasksConfig from "../pages/tasks/TasksConfig";
import UsersConfig from "../pages/users/usersConfig";
import PasswordManagerConfig from "../pages/password-manager/passwordManagerConfig";
import SharedFilesConfig from "../pages/shared-files/sharedFilesConfig";
import BillingConfig, {
  AdminBillingConfig,
} from "../pages/billing/billingConfig";
import ProfileConfig from "../pages/profile/profileConfig";
import SupportConfig from "../pages/support/supportConfig";
import ProjectsConfig from "../pages/projects/ProjectsConfig";
import ClientConfig from "../pages/client/clientConfig";
import AdminAgentsConfig from "../pages/agents/agentsListConfig";
import SettingConfig, {
  clientSettingConfig,
} from "../pages/setting/settingConfig";
import ClientOnBoardConfig from "../main/clientOnBoard/ClientOnBoardConfig";
import AgentOnBoardConfig from "../main/agentsOnBoard/AgentOnBoardConfig";
import { AdminAccountManagerConfig } from "../pages/accountManager/accountConfig";
import ManageProductsConfig from "../pages/manageProducts/manageProductConfig";
import VerificationConfig from "../main/testing/VerificationConfig";
import SucessConfig from "../main/subscriptionSuccess/SucessConfig";
import CancelConfig from "../main/subscriptionCancel/CancelConfig";
import MyAgentsConfig from "../pages/myAgent/MyAgentsConfig";

const commonRoutes = [
  {
    path: "loading",
    element: <FuseLoading />,
  },
  {
    path: "404",
    element: <Error404Page />,
  },
  {
    path: "*",
    element: <Navigate to="404" />,
  },
];
const adminRouteConfigs: FuseRouteConfigsType = [
  AdminDashboardConfig,
  AdminBillingConfig,
  ProfileConfig,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
  ForgotPasswordConfig,
  ResetPasswordConfig,
  SetPasswordConfig,
  OtpVerificationConfig,
  ClientConfig,
  AdminAgentsConfig,
  SettingConfig,
  ClientOnBoardConfig,
  AgentOnBoardConfig,
  AdminAccountManagerConfig,
  ManageProductsConfig,
  VerificationConfig,
  SucessConfig,
  CancelConfig,
];

const clientRouteConfigs: FuseRouteConfigsType = [
  ClientDashboardConfig,
  ProjectsConfig,
  TasksConfig,
  MyAgentsConfig,
  SignOutConfig,
  SignInConfig,
  SignUpConfig,
  ForgotPasswordConfig,
  ResetPasswordConfig,
  SetPasswordConfig,
  OtpVerificationConfig,
  ClientConfig,
  AdminAgentsConfig,
  UsersConfig,
  SettingConfig,
  ClientOnBoardConfig,
  PasswordManagerConfig,
  SharedFilesConfig,
  clientSettingConfig,
  BillingConfig,
  SupportConfig,
  VerificationConfig,
  SucessConfig,
  CancelConfig,
  AgentOnBoardConfig,
];

/**
 * The routes of the Admin application.
 */
export const adminRoutes: FuseRoutesType = [
  ...FuseUtils.generateRoutesFromConfigs(
    adminRouteConfigs,
    settingsConfig.defaultAuth
  ),
  {
    path: "/",
    element: <Navigate to="/admin/dashboard" />,
    auth: settingsConfig.defaultAuth,
  },
  ...commonRoutes,
];

/**
 * The routes of the Client application.
 */
export const clientRoutes: FuseRoutesType = [
  ...FuseUtils.generateRoutesFromConfigs(
    clientRouteConfigs,
    settingsConfig.defaultAuth
  ),
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
    auth: settingsConfig.defaultAuth,
  },
  ...commonRoutes,
];
