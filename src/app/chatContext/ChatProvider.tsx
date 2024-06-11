import { initCometChat, loginCometChat } from "app/configs/cometChatConfig";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  CometChatIncomingCall,
  CometChatOngoingCall,
  CometChatUIKit,
} from "@cometchat/chat-uikit-react";

const ChatContext = createContext({ userChat: null });

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const userDetails = JSON.parse(localStorage.getItem("userDetail"));

  useEffect(() => {
    initCometChat()
      .then(async () => {
        await loginCometChat(userDetails?.id)
          .then((loggedInUser) => {
            setUser(loggedInUser);
          })
          .catch((err) => {
            console.log("login cometeerrrr=-----", err);
          });
      })
      .catch((err) => {
        console.log("cometeerrrr=-----", err);
      });
  }, [userDetails]);

  return (
    <ChatContext.Provider value={{ userChat: user }}>
      <CometChatIncomingCall />
      <CometChatOngoingCall />
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
