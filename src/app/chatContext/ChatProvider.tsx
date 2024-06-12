import { initCometChat, loginCometChat } from "app/configs/cometChatConfig";
import React, { createContext, useContext, useEffect } from "react";
import {
  CometChatIncomingCall,
  CometChatOngoingCall,
} from "@cometchat/chat-uikit-react";

const ChatContext = createContext({});

export const ChatProvider = ({ children }) => {
  const userDetails = JSON.parse(localStorage.getItem("userDetail"));

  useEffect(() => {
    initCometChat()
      .then(async () => {
        await loginCometChat(userDetails?.id);
      })
      .catch((err) => {
        console.log("cometeerrrr=-----", err);
      });
  }, [userDetails]);

  return (
    <ChatContext.Provider value={{}}>
      <div className="z-999">
        <CometChatIncomingCall />
        <CometChatOngoingCall />
      </div>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
