import TitleBar from "src/app/components/TitleBar";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
import {
  CometChat,
  ConversationsRequestBuilder,
} from "@cometchat/chat-sdk-javascript";
import usersTabIcon from "public/assets/icons/user.svg";
import groupsTabIcon from "public/assets/icons/groupIcon.svg";
import chatsTabIcon from "public/assets/icons/chat.svg";
import { ProjectPlusIcon } from "public/assets/icons/projectsIcon";
import { CreateGroupWrapper } from "src/app/components/chatBoard/CreateGroup";
import { Typography } from "@mui/material";
import { getChatBoardData } from "app/store/Projects";
import { useParams } from "react-router";

function ChatBoard() {
  const [users, setUsersList] = useState([]);
  const [addGroup, setAddGroup] = useState(false);
  const [groupDetails, setGroupDetails] = useState<any>({});
  const [conversationDetails, setConversationDetails] = useState<any>({});
  const client_id = JSON.parse(localStorage.getItem("userDetail"));
  const { id } = useParams<{ id: string }>();
  const divRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id && client_id?.id) {
      dispatch(getChatBoardData(id))
        .unwrap()
        .then((res) => {
          if (res?.data && res?.data?.data) {
            setUsersList([...res?.data?.data.map((d) => d.toString())]);
          }
        });
    }
  }, [id]);


  const checkElements = () => {
    const elements = document.getElementsByTagName("cometchat-list-item");
    const list = users.map(
      (data) => data != client_id.id && client_id.id + "_user_" + data
    );
    for (const iterator of elements) {
      if (iterator.id.includes("_user_")) {
        if (!list.includes(iterator.id)) {
          iterator.parentElement.style.display = "none";
        }
      }
    }
  };

  useEffect(() => {
    if (users && users.length > 0) {
      checkElements();
    }
  }, [users]);

  const [isMobileView, setIsMobileView] = useState(false);
  const tabItemStyle = new TabItemStyle({
    iconTint: "#4F46E5",
    width: "60px",
    height: "60px",
    activeBackground: "#4F46E5",
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
      <div className="flex h-[calc(100vh-270px)]">
        <button className="hidden h-1" onClick={checkElements}></button>
        <div className="w-[279px]">
          <CometChatConversations
            onItemClick={(group) => setConversationDetails(group)}
          />
        </div>

        {conversationDetails && conversationDetails.conversationId ? (
          <div className="w-[calc(100%-279px)]">
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
                    addMembersConfiguration: new AddMembersConfiguration({
                      usersRequestBuilder: new CometChat.UsersRequestBuilder()
                        .setLimit(100)
                        .setUIDs([...users]),
                    }),
                  })
                }
              />
            )}
          </div>
        ) : (
          <div className="w-[calc(100%-279px)] flex flex-col items-center justify-center gap-3">
            <img
              src={import.meta.env.VITE_API_BASE_IMAGE_URL + "chat/no-msg.png"}
            />
            <Typography className="text-[24px] text-center font-600 leading-normal">
              No Message !
            </Typography>
            <p style={{ color: "#757982" }}>
              Please select list to view messages.
            </p>
          </div>
        )}
      </div>
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
          new UsersConfiguration({
            usersRequestBuilder: new CometChat.UsersRequestBuilder()
              .setLimit(100)
              .setUIDs([...users]),
          })
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
      <div className="flex h-[calc(100vh-270px)]">
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

        {groupDetails && groupDetails.guid ? (
          <div className="w-[calc(100%-279px)]">
            <CometChatMessages
              group={groupDetails}
              detailsConfiguration={
                new DetailsConfiguration({
                  addMembersConfiguration: new AddMembersConfiguration({
                    usersRequestBuilder: new CometChat.UsersRequestBuilder()
                      .setLimit(100)
                      .setUIDs([...users]),
                  }),
                })
              }
            />
          </div>
        ) : (
          <div className="w-[calc(100%-279px)] flex flex-col items-center justify-center gap-3">
            <img
              src={import.meta.env.VITE_API_BASE_IMAGE_URL + "chat/no-msg.png"}
            />
            <h2 className="font-bold" style={{ color: "#111827" }}>
              No Message !
            </h2>
            <p style={{ color: "#757982" }}>
              Please select list to view messages.
            </p>
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
    <div className="px-28 flex gap-20 flex-wrap lg:flex-nowrap h-[calc(100vh-270px)] chatboard">
      <CometChatTabs
        tabAlignment={TabAlignment.bottom}
        tabs={tabs}
        tabsStyle={tStyle}
      />
    </div>
  );
}

export default ChatBoard;

export function useIsVisible(ref) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if(ref && ref.current) {
      const observer = new IntersectionObserver(([entry]) =>
        setIntersecting(entry.isIntersecting)
      );
  
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };

    }
  }, [ref]);

  return isIntersecting;
}
