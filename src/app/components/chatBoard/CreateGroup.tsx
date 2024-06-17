import { createGroupStyle, createGroupWrapperStyle } from "./style";
import { useContext, useEffect, useRef } from "react";
import { CometChatThemeContext } from "@cometchat/chat-uikit-react";
import { useNavigate } from "react-router-dom";
import { CometChat } from "@cometchat/chat-sdk-javascript";

type CreateGroupWrapperProps = {
  isMobileView: boolean;
  onClose: () => void;
};

export function CreateGroupWrapper({
  isMobileView,
  onClose,
}: CreateGroupWrapperProps) {
  const createGroupRef = useRef<
    JSX.IntrinsicElements["cometchat-create-group"] | null
  >(null);
  const navigate = useNavigate();
  const client_id = JSON.parse(localStorage.getItem("userDetail"));

  const { theme } = useContext(CometChatThemeContext);

  useEffect(() => {
    const createGroupElement = createGroupRef.current;
    if (!createGroupElement) {
      return;
    }

    const closeClickedEventName = "cc-creategroup-close-clicked";
    const handleCreateGroup = (e: any) => {
      CometChat.createGroup({
        name: e.name,
        type: e.type,
        guid: e.guid,
        tags: [client_id.id.toString()]
      }).then((res) => {
        onClose();
      });
    };
    const handleCloseClicked = () => onClose();
    createGroupElement.createClick = handleCreateGroup;
    createGroupElement.addEventListener(
      closeClickedEventName,
      handleCloseClicked
    );
    return () => {
      createGroupElement.createClick = null;
      createGroupElement.removeEventListener(
        closeClickedEventName,
        handleCloseClicked
      );
    };
  }, [navigate]);

  return (
    <div style={createGroupWrapperStyle(theme)}>
      <cometchat-create-group
        ref={createGroupRef}
        type={["PRIVATE"]}
        createGroupStyle={JSON.stringify(createGroupStyle(isMobileView, theme))}
      />
    </div>
  );
}
