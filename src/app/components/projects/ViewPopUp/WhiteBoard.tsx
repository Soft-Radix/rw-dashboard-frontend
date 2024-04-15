import { Dispatch, SetStateAction, useState } from "react";
import CommonModal from "../../CommonModal";
import CommonChip from "../../chip";
import {
  ChatIcon,
  DocIcon,
  WhiteBoardIcon,
} from "public/assets/icons/projectsIcon";
import WhiteBoardPage from "./WhiteBoardPage";
import DocDesign from "./DocDesign";
import ChatDesign from "./ChatDesign";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function WhiteBoard({ isOpen, setIsOpen }: IProps) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );

  const handleChipClick = (component: string) => {
    setSelectedComponent(component);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedComponent(null); // Reset selected component when closing modal
  };

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle="Add More List"
      maxWidth="910"
      customButton={true}
    >
      <div className="flex gap-12">
        <CommonChip
          label="Whiteboard"
          icon={<WhiteBoardIcon />}
          className={`${selectedComponent === "whiteboard" ? "border-2 " : ""}`}
          onClick={() => handleChipClick("whiteboard")}
        />
        <CommonChip
          label="Doc"
          icon={<DocIcon />}
          className="cursor-pointer"
          onClick={() => handleChipClick("doc")}
        />
        <CommonChip
          label="Chat"
          icon={<ChatIcon />}
          className="cursor-pointer"
          onClick={() => handleChipClick("chat")}
        />
      </div>
      {selectedComponent === "whiteboard" && <WhiteBoardPage />}
      {selectedComponent === "doc" && <DocDesign />}
      {selectedComponent === "chat" && <ChatDesign />}
      {/* Add more conditions for other components */}
    </CommonModal>
  );
}

export default WhiteBoard;
