import { initCometChat, loginCometChat } from "app/configs/cometChatConfig";
import React, { createContext, useContext, useEffect } from "react";

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
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
