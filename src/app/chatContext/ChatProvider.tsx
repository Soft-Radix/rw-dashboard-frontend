import { initCometChat, loginCometChat } from "app/configs/cometChatConfig";
import React, { createContext, useContext, useEffect } from "react";
import IncomingCallHandler from "../components/chatBoard/IncomingCallHandler";

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
      <IncomingCallHandler />
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
