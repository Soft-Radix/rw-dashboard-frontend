import { FuseNavItemType } from "@fuse/core/FuseNavigation/types/FuseNavItemType";
import i18next from "i18next";
import {
  AccountManagerIcon,
  AgentGroupIcon,
  AgentNavIcon,
  BillingIcon,
  BillingNavIcon,
  ChatBoardIcon,
  ClientNavIcon,
  DashBoardIcon,
  ManageProductIcon,
  MyAgentIcon,
  PasswordManagerIcon,
  ProjectIcon,
  SettingIcon,
  SettingNavIcon,
  SharedFileIcon,
  SubProjectIcon,
  SupportIcon,
  TaskIcon,
  UserIcon,
} from "public/assets/icons/navabarIcon";
import { getLocalStorage } from "src/utils";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";
import { useDispatch } from "react-redux";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

export const getProjectNavItems = () => {
  const userDetail = getLocalStorage("userDetail");

  return userDetail?.projects?.map((project) => ({
    id: project.id,
    title: project.name,
    type: "item",
    icon: "material-twotone:compress",
    customIcon: <SubProjectIcon />,
    url: `projects/${
      userDetail?.role == "client" ? project.id : project.project_id
    }/${project.name}/?type=kanban`,
    end: true,
    isProject: true,
  }));
};

/**
 * The navigationConfig object is an array of navigation items for the Fuse application.
 */
const navigationConfig: FuseNavItemType[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    translate: "DASHBOARD",
    type: "item",
    icon: "heroicons-outline:template",
    customIcon: <DashBoardIcon />,
    url: "dashboard",
  },
  {
    id: "projects",
    title: "Projects",
    translate: "Projects",
    type: "collapse",
    icon: "heroicons-outline:list",
    customIcon: <ProjectIcon />,
    children: getProjectNavItems(),
  },

  // {
  //   id: "task",
  //   title: "Task",
  //   translate: "TASK",
  //   type: "item",
  //   icon: "heroicons-outline:clipboard-check",
  //   customIcon: <TaskIcon />,
  //   url: "tasks",
  // },

  {
    id: "chatBoard",
    title: "Chat Board",
    translate: "CHAT_BOARD",
    type: "item",
    icon: "heroicons-outline:chat-alt-2",
    customIcon: <ChatBoardIcon />,
    url: "chat-board",
  },
  {
    id: "sharedFiles",
    title: "Shared Files",
    translate: "SHARED_FILES",
    type: "item",
    icon: "heroicons-outline:external-link",
    customIcon: <SharedFileIcon />,
    url: "shared-files",
  },
  {
    id: "passwordManager",
    title: "Password Manager",
    translate: "PASSWORD_MANAGER",
    type: "item",
    icon: "heroicons-outline:lock-closed",
    customIcon: <PasswordManagerIcon />,
    url: "password-manager",
  },
  {
    id: "myAgents",
    title: "My Agents",
    translate: "MY_AGENTS",
    type: "item",
    icon: "heroicons-outline:user-group",
    customIcon: <MyAgentIcon />,

    url: "my-agents",
  },

  {
    id: "users",
    title: "Users",
    translate: "USERS",
    type: "item",
    icon: "heroicons-outline:users",
    customIcon: <UserIcon />,
    url: "users",
  },
  {
    id: "settings",
    title: "Settings",
    translate: "SETTINGS",
    type: "item",
    icon: "heroicons-outline:cog",
    customIcon: <SettingIcon />,
    url: "settings",
  },
  {
    id: "billings",
    title: "Billings",
    translate: "BILLINGS",
    type: "item",
    icon: "heroicons-outline:cash",
    customIcon: <BillingIcon />,

    url: "billings",
  },
  {
    id: "support",
    title: "Support",
    translate: "SUPPORT",
    type: "item",
    icon: "heroicons-outline:question-mark-circle",
    customIcon: <SupportIcon />,

    url: "support",
  },
];

export const agentNavigationConfig: FuseNavItemType[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    translate: "DASHBOARD",
    type: "item",
    icon: "heroicons-outline:template",
    customIcon: <DashBoardIcon />,
    url: "agent/dashboard",
  },
  {
    id: "projects",
    title: "Projects",
    translate: "Projects",
    type: "collapse",
    icon: "heroicons-outline:list",
    customIcon: <ProjectIcon />,
    children: getProjectNavItems(),
  },

  // {
  //   id: "task",
  //   title: "Task",
  //   translate: "TASK",
  //   type: "item",
  //   icon: "heroicons-outline:clipboard-check",
  //   customIcon: <TaskIcon />,
  //   url: "tasks",
  // },

  {
    id: "chatBoard",
    title: "Chat Board",
    translate: "CHAT_BOARD",
    type: "item",
    icon: "heroicons-outline:chat-alt-2",
    customIcon: <ChatBoardIcon />,
    url: "chat-board",
  },
  {
    id: "sharedFiles",
    title: "Shared Files",
    translate: "SHARED_FILES",
    type: "item",
    icon: "heroicons-outline:external-link",
    customIcon: <SharedFileIcon />,
    url: "shared-files",
  },
  {
    id: "passwordManager",
    title: "Password Manager",
    translate: "PASSWORD_MANAGER",
    type: "item",
    icon: "heroicons-outline:lock-closed",
    customIcon: <PasswordManagerIcon />,
    url: "password-manager",
  },

  {
    id: "support",
    title: "Support",
    translate: "SUPPORT",
    type: "item",
    icon: "heroicons-outline:question-mark-circle",
    customIcon: <SupportIcon />,

    url: "support",
  },
];

export const adminNavigationConfig: FuseNavItemType[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    translate: "DASHBOARD",
    type: "item",
    icon: "dashboard",
    customIcon: <DashBoardIcon />,
    url: "admin/dashboard",
  },

  {
    id: "clients",
    title: "Clients",
    translate: "Clients",
    type: "item",
    icon: "dashboard",
    customIcon: <ClientNavIcon />,
    url: "admin/client",
  },
  {
    id: "products",
    title: "Manage Products",
    type: "item",
    icon: "dashboard",
    customIcon: <ManageProductIcon />,
    url: "admin/manage-products",
  },

  {
    id: "agents",
    title: "Agents",
    translate: "Agents",
    type: "collapse",
    hideOption: true,
    icon: "agents",
    customIcon: <AgentNavIcon />,
    children: [
      {
        id: "agents_list",
        title: "Agents",
        type: "item",
        icon: "material-twotone:compress",
        url: "/admin/agents/list",
        customIcon: <AgentNavIcon />,
        end: true,
      },
      {
        id: "agentsGroup",
        title: "Agents Group",
        type: "item",
        icon: "material-twotone:compress",
        url: "/admin/agents/groups",
        customIcon: <AgentGroupIcon />,
        end: true,
      },
    ],
  },
  {
    id: "accountManager",
    title: "Account Manager",

    type: "item",
    icon: "billing",
    customIcon: <AccountManagerIcon />,
    url: "admin/acc-manager",
  },
  {
    id: "chatBoard",
    title: "Chat Board",
    type: "item",
    icon: "heroicons-outline:chat-alt-2",
    customIcon: <ChatBoardIcon />,
    url: "chat-board",
  },

  // {
  //   id: "billings",
  //   title: "Billings",
  //   translate: "Billings",
  //   type: "item",
  //   icon: "billing",
  //   customIcon: <BillingNavIcon />,
  //   url: "admin/billings",
  // },
  {
    id: "setting",
    title: "Setting",
    translate: "Setting",
    type: "item",
    icon: "heroicons-outline:cog",
    customIcon: <SettingNavIcon />,
    url: "admin/setting",
  },
];

export default navigationConfig;
