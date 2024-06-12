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

export const loginCometChat = async (uid) => {
  return CometChatUIKit.login(uid)
    .then(
      (user) => {
        console.log("Chat Login Successful:", { user });
      },
      (error) => {
        console.log("Chat Login failed with exception:", { error });
      }
    )
    .catch((err) => {
      console.log("login chat eerrrr=-----", err);
    });
};

export const logoutCometChat = async () => {
  return CometChatUIKit.logout()
    .then(
      () => {
        console.log("Chat Logout completed successfully");
      },
      (error) => {
        console.error("Chat Logout failed with exception:", error);
      }
    )
    .catch((err) => {
      console.log("Logout chat eerrrr=-----", err);
    });
};
