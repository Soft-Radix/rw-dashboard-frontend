import { initCometChat, loginCometChat } from "app/configs/cometChatConfig";
import React, { createContext, useContext, useState, useEffect } from "react";
import { selectUser } from "../auth/user/store/userSlice";
import { useSelector } from "react-redux";
import {
  CometChatIncomingCall,
  CometChatOngoingCall,
} from "@cometchat/chat-uikit-react";
import { CometChatCreateGroup } from "@cometchat/chat-uikit-react";

const ChatContext = createContext({ userChat: null });

export const ChatProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const userDetails = useSelector(selectUser);

  useEffect(() => {
    console.log("userDetails...", userDetails);
    initCometChat()
      .then(async () => {
        await loginCometChat("amit")
          .then((loggedInUser) => {
            console.log("Login Successful:", loggedInUser);
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
