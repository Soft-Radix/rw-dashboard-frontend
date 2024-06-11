import TitleBar from "src/app/components/TitleBar";
import { useEffect, useState } from "react";
import { GetAssignAgentsInfo, getAssignAccMangerInfo } from "app/store/Client";
import { useDispatch } from "react-redux";
import {
  CometChatUsersWithMessages,
  CometChatGroupsWithMessages,
  CometChatConversationsWithMessages,
  CometChatTabs,
  TabsStyle,
} from "@cometchat/chat-uikit-react";
import { TabAlignment, CometChatTabItem } from "@cometchat/uikit-resources";
import {
  ContactsConfiguration,
  CreateGroupConfiguration,
  GroupsConfiguration,
  TabItemStyle,
  UsersConfiguration,
} from "@cometchat/uikit-shared";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import usersTabIcon from "public/assets/icons/users.svg";
import groupsTabIcon from "public/assets/icons/group.svg";
import chatsTabIcon from "public/assets/icons/chat.svg";
import { ROLES } from "src/app/constants/constants";

function ChatBoard() {
  const [users, setUsersList] = useState([]);
  const [accountManagers, setAccountManagerList] = useState([]);
  const client_id = JSON.parse(localStorage.getItem("userDetail"));

  const dispatch = useDispatch();

  useEffect(() => {
    if (client_id?.id) {
      dispatch(
        GetAssignAgentsInfo({ start: 0, limit: -1, client_id: client_id?.id })
      )
        .unwrap()
        .then((res) => {
          if (res?.data && res?.data?.data && res?.data?.data?.list) {
            setUsersList([
              ...res?.data?.data?.list.map((user) => user.agent_id),
            ]);
          }
        });

      dispatch(
        getAssignAccMangerInfo({
          start: 0,
          limit: -1,
          client_id: client_id?.id,
        })
      )
        .unwrap()
        .then((res) => {
          if (res?.data && res?.data?.data && res?.data?.data?.list) {
            setAccountManagerList([
              ...res?.data?.data?.list.map((user) => user.account_manager_id),
            ]);
          }
        });
    }
  }, []);

  const [isMobileView, setIsMobileView] = useState(false);
  const tabItemStyle = new TabItemStyle({
    iconTint: "#39f",
    width: "50px",
    height: "50px",
    activeBackground: "#39f",
    activeIconTint: "white",
    activeTitleTextColor: "white",
  });

  const tStyle = new TabsStyle({
    background: "#fff",
    tabPaneHeight: "100%",
    tabPaneWidth: "100%",
  });

  const chatsTab = new CometChatTabItem({
    id: "chats",
    title: "Chats",
    iconURL: chatsTabIcon,
    style: tabItemStyle,
    isActive: true,
    childView: (
      <CometChatConversationsWithMessages
        startConversationConfiguration={
          new ContactsConfiguration({
            usersConfiguration: new UsersConfiguration(
              client_id.role_id !== ROLES.ADMIN
                ? {
                    usersRequestBuilder: new CometChat.UsersRequestBuilder()
                      .setLimit(100)
                      .setUIDs([1, ...users, ...accountManagers]),
                  }
                : {}
            ),
            groupsConfiguration: new GroupsConfiguration({
              onItemClick: handleOnItemClick,
            }),
          })
        }
        isMobileView={isMobileView}
      />
    ),
  });

  const usersTab = new CometChatTabItem({
    id: "users",
    title: "Users",
    iconURL: usersTabIcon,
    style: tabItemStyle,
    childView: (
      <CometChatUsersWithMessages
        isMobileView={isMobileView}
        usersConfiguration={
          new UsersConfiguration(
            client_id.role_id !== ROLES.ADMIN
              ? {
                  usersRequestBuilder: new CometChat.UsersRequestBuilder()
                    .setLimit(100)
                    .setUIDs([1, ...users, ...accountManagers]),
                }
              : {}
          )
        }
      />
    ),
  });

  function handleOnItemClick(group: CometChat.Group): void {
    console.log(group, "your custom on item click action");
    const guid = group.getGuid();
  }

  const groupsTab = new CometChatTabItem({
    id: "groups",
    title: "Groups",
    iconURL: groupsTabIcon,
    style: tabItemStyle,
    childView: (
      <CometChatGroupsWithMessages
        groupsConfiguration={
          new GroupsConfiguration({
            onItemClick: handleOnItemClick,
          })
        }
        isMobileView={isMobileView}
      />
    ),
  });

  const tabs = [chatsTab, usersTab, groupsTab];

  const resizeWindow = () => {
    innerWidth = window.innerWidth;
    if (innerWidth >= 320 && innerWidth <= 767) {
      setIsMobileView(true);
    } else {
      setIsMobileView(false);
    }
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return (
    <div>
      <TitleBar title="Chat Board" />
      <div className="px-28 flex gap-20 flex-wrap lg:flex-nowrap h-[calc(100vh-150px)] chatboard">
        <CometChatTabs
          tabAlignment={TabAlignment.bottom}
          tabs={tabs}
          tabsStyle={tStyle}
        />
      </div>
    </div>
  );
}

export default ChatBoard;
