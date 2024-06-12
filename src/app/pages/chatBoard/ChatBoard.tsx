import TitleBar from "src/app/components/TitleBar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  CometChatUsersWithMessages,
  CometChatTabs,
  TabsStyle,
  CometChatGroups,
  CometChatMessages,
  CometChatConversations,
} from "@cometchat/chat-uikit-react";
import { TabAlignment, CometChatTabItem } from "@cometchat/uikit-resources";
import {
  AddMembersConfiguration,
  DetailsConfiguration,
  MessageComposerConfiguration,
  MessagesConfiguration,
  TabItemStyle,
  UsersConfiguration,
} from "@cometchat/uikit-shared";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import usersTabIcon from "public/assets/icons/users.svg";
import groupsTabIcon from "public/assets/icons/group.svg";
import chatsTabIcon from "public/assets/icons/chat.svg";
import { ROLES } from "src/app/constants/constants";
import { ProjectPlusIcon } from "public/assets/icons/projectsIcon";
import { CreateGroupWrapper } from "src/app/components/chatBoard/CreateGroup";
import { getUserIdInfo } from "app/store/Common";

function ChatBoard() {
  const [users, setUsersList] = useState([]);
  const [addGroup, setAddGroup] = useState(false);
  const [groupDetails, setGroupDetails] = useState<any>({});
  const [conversationDetails, setConversationDetails] = useState<any>({});
  const client_id = JSON.parse(localStorage.getItem("userDetail"));

  const dispatch = useDispatch();

  useEffect(() => {
    if (client_id?.id && client_id?.role_id !== ROLES.ADMIN) {
      dispatch(getUserIdInfo())
        .unwrap()
        .then((res) => {
          if (res?.data && res?.data?.data) {
            setUsersList([...res?.data?.data]);
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
      <div className="flex">
        <div className="w-[279px] h-[calc(100vh-150px)]">
          <CometChatConversations
            onItemClick={(group) => setConversationDetails(group)}
          />
        </div>

        {conversationDetails && conversationDetails.conversationId && (
          <div className="w-[calc(100%-279px)] h-[calc(100vh-150px)]">
            {conversationDetails.conversationType === "user" ? (
              <CometChatMessages
                user={conversationDetails.conversationWith}
                messageComposerConfiguration={
                  new MessageComposerConfiguration({
                    disableMentions: true,
                  })
                }
              />
            ) : (
              <CometChatMessages
                group={conversationDetails.conversationWith}
                detailsConfiguration={
                  new DetailsConfiguration({
                    addMembersConfiguration: new AddMembersConfiguration(
                      client_id.role_id !== ROLES.ADMIN
                        ? {
                            usersRequestBuilder:
                              new CometChat.UsersRequestBuilder()
                                .setLimit(100)
                                .setUIDs([
                                  ...users
                                ]),
                          }
                        : {}
                    ),
                  })
                }
              />
            )}
          </div>
        )}
      </div>
      // <CometChatConversationsWithMessages
      //   startConversationConfiguration={
      //     new ContactsConfiguration({
      //       usersConfiguration: new UsersConfiguration(
      //         client_id.role_id !== ROLES.ADMIN
      //           ? {
      //               usersRequestBuilder: new CometChat.UsersRequestBuilder()
      //                 .setLimit(100)
      //                 .setUIDs([...users]),
      //               onItemClick: (group) => handleOnItemClick(group),
      //             }
      //           : {}
      //       ),
      //       groupsConfiguration: new GroupsConfiguration({
      //         groupsRequestBuilder: new CometChat.GroupsRequestBuilder()
      //           .joinedOnly(true)
      //           .setLimit(100),
      //         onItemClick: (group) => handleOnItemClick(group),
      //       }),
      //     })
      //   }
      //   messagesConfiguration={
      //     new MessagesConfiguration({
      //       detailsConfiguration: new DetailsConfiguration({
      //         addMembersConfiguration: new AddMembersConfiguration({
      //           usersConfiguration: new UsersConfiguration(
      //             client_id.role_id !== ROLES.ADMIN
      //               ? {
      //                   usersRequestBuilder: new CometChat.UsersRequestBuilder()
      //                     .setLimit(100)
      //                     .setUIDs([...users]),
      //                 }
      //               : {}
      //           ),
      //         }),
      //       }),
      //       messageComposerConfiguration: new MessageComposerConfiguration({
      //         disableMentions: true,
      //       }),
      //     })
      //   }
      //   isMobileView={isMobileView}
      // />
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
                    .setUIDs([...users]),
                }
              : {}
          )
        }
        messagesConfiguration={
          new MessagesConfiguration({
            messageComposerConfiguration: new MessageComposerConfiguration({
              disableMentions: true,
            }),
          })
        }
      />
    ),
  });

  const groupsTab = new CometChatTabItem({
    id: "groups",
    title: "Groups",
    iconURL: groupsTabIcon,
    style: tabItemStyle,
    childView: (
      <div className="flex">
        {addGroup && (
          <div className="absolute h-full w-full bg-black bg-opacity-75 z-99">
            <CreateGroupWrapper
              isMobileView={isMobileView}
              onClose={() => setAddGroup(false)}
            />
          </div>
        )}
        <div className="w-[279px] relative">
          <button
            className="btn absolute top-[22px] right-[16px] z-9"
            onClick={() => setAddGroup(true)}
          >
            <ProjectPlusIcon className="text-lg" />
          </button>

          <CometChatGroups
            groupsRequestBuilder={new CometChat.GroupsRequestBuilder()
              .joinedOnly(true)
              .setLimit(100)}
            onItemClick={(group) => setGroupDetails(group)}
          />
        </div>

        {groupDetails && groupDetails.guid && (
          <div className="w-[calc(100%-279px)] h-[calc(100vh-150px)]">
            <CometChatMessages
              group={groupDetails}
              detailsConfiguration={
                new DetailsConfiguration({
                  addMembersConfiguration: new AddMembersConfiguration(
                    client_id.role_id !== ROLES.ADMIN
                      ? {
                          usersRequestBuilder:
                            new CometChat.UsersRequestBuilder()
                              .setLimit(100)
                              .setUIDs([
                                ...users
                              ]),
                        }
                      : {}
                  ),
                })
              }
            />
          </div>
        )}
      </div>
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
        {/* <CometChatAddMembers /> */}
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
