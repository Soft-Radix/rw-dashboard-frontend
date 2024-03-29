import { FuseNavItemType } from "@fuse/core/FuseNavigation/types/FuseNavItemType";
import i18next from "i18next";
import ar from "./navigation-i18n/ar";
import en from "./navigation-i18n/en";
import tr from "./navigation-i18n/tr";

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

export default navigationConfig;
