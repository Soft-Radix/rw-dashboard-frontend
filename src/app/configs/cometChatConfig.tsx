import { UIKitSettingsBuilder } from "@cometchat/uikit-shared";
import { CometChatUIKit } from "@cometchat/chat-uikit-react";

const UIKitSettings = new UIKitSettingsBuilder()
  .setAppId(import.meta.env.VITE_CHAT_APP_ID)
  .setRegion(import.meta.env.VITE_CHAT_REGION)
  .setAuthKey(import.meta.env.VITE_CHAT_AUTH_KEY)
  .subscribePresenceForAllUsers()
  .build();

export const initCometChat = () => {
  return CometChatUIKit.init(UIKitSettings).then(
    () => {
      console.log("Initialization completed successfully");
    },
    (error) => {
      console.log("Initialization failed with error:", error);
    }
  );
};

export const loginCometChat = (uid) => {
  return CometChatUIKit.login(uid).then(
    (user) => {
      console.log("Login Successful:", { user });
    },
    (error) => {
      console.log("Login failed with exception:", { error });
    }
  );
};
