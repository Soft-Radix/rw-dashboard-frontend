import TitleBar from "src/app/components/TitleBar";
import { CometChatConversationsWithMessages } from "@cometchat/chat-uikit-react"; //import the component in your App.js file

function ChatBoard() {
  return (
    <div>
      <TitleBar title="Chat Board" />
      <div className="px-28 flex gap-20 flex-wrap lg:flex-nowrap h-[calc(100vh-150px)]">
        <CometChatConversationsWithMessages />
      </div>
    </div>
  );
}

export default ChatBoard;
