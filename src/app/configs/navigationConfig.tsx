import { FuseNavItemType } from "@fuse/core/FuseNavigation/types/FuseNavItemType";
import i18next from "i18next";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";
import { ProjectChiildrenIcon } from "public/assets/icons/projectsIcon";
import {
  ClientNavIcon,
  DashBoardIcon,
  AgentNavIcon,
  BillingNavIcon,
  SettingNavIcon,
  AgentGroupIcon,
} from "public/assets/icons/navabarIcon";

i18next.addResourceBundle("en", "navigation", en);
i18next.addResourceBundle("tr", "navigation", tr);
i18next.addResourceBundle("ar", "navigation", ar);

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
    url: "dashboard",
  },
  {
    id: "projects",
    title: "Projects",
    translate: "Projects",
    type: "collapse",
    icon: "heroicons-outline:list",
    children: [
      {
        id: "project-1",
        title: "Project1",
        type: "item",
        icon: "material-twotone:compress",
        url: "/projects",
        end: true,
      },
      {
        id: "project-2",
        title: "Project2",
        type: "item",
        icon: "material-twotone:compress",
        url: "/projects/p",
        end: true,
      },
    ],
  },
  {
    id: "client",
    title: "Client",
    translate: "client",
    type: "item",
    icon: "heroicons-outline:clipboard-check",
    url: "client",
  },

  {
    id: "task",
    title: "Task",
    translate: "TASK",
    type: "item",
    icon: "heroicons-outline:clipboard-check",
    url: "tasks",
  },

  {
    id: "chatBoard",
    title: "Chat Board",
    translate: "CHAT_BOARD",
    type: "item",
    icon: "heroicons-outline:chat-alt-2",
    url: "chat-board",
  },
  {
    id: "sharedFiles",
    title: "Shared Files",
    translate: "SHARED_FILES",
    type: "item",
    icon: "heroicons-outline:external-link",
    url: "shared-files",
  },
  {
    id: "passwordManager",
    title: "Password Manager",
    translate: "PASSWORD_MANAGER",
    type: "item",
    icon: "heroicons-outline:lock-closed",
    url: "password-manager",
  },
  {
    id: "myAgents",
    title: "My Agents",
    translate: "MY_AGENTS",
    type: "item",
    icon: "heroicons-outline:user-group",
    url: "my-agents",
  },

  {
    id: "users",
    title: "Users",
    translate: "USERS",
    type: "item",
    icon: "heroicons-outline:users",
    url: "users",
  },
  {
    id: "settings",
    title: "Settings",
    translate: "SETTINGS",
    type: "item",
    icon: "heroicons-outline:cog",
    url: "settings",
  },
  {
    id: "billings",
    title: "Billings",
    translate: "BILLINGS",
    type: "item",
    icon: "heroicons-outline:cash",
    url: "billings",
  },
  {
    id: "support",
    title: "Support",
    translate: "SUPPORT",
    type: "item",
    icon: "heroicons-outline:question-mark-circle",
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
        title: "AgentsGroup",
        type: "item",
        icon: "material-twotone:compress",
        url: "/admin/agents/groups",
        customIcon: <AgentGroupIcon />,
        end: true,
      },
    ],
  },
  {
    id: "billings",
    title: "Billings",
    translate: "Billings",
    type: "item",
    icon: "billing",
    customIcon: <BillingNavIcon />,
    url: "admin/billings",
  },
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
