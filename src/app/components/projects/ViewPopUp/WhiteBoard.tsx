import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
  boardList: any;
  setBoardList: (data: any) => void;
}

function WhiteBoard({ isOpen, setIsOpen, boardList, setBoardList }: IProps) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(
    null
  );
  const [boardDetails, setBoardDetails] = useState({
    whiteBoard: false,
    doc: false,
    chat: false,
  });

  useEffect(() => {
    setBoardDetails({ ...boardList });
  }, [boardList]);

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
      btnTitle={"Add List"}
      closeTitle={"Close"}
      onSubmit={() => {
        setBoardList({ ...boardDetails });
        setIsOpen((prev) => !prev);
      }}
      // customButton={true}
    >
      <div className="flex gap-12">
        <CommonChip
          label="Whiteboard"
          icon={<WhiteBoardIcon />}
          className={`cursor-pointer ${boardDetails?.whiteBoard ? " border-1 border-solid border-[#393F4C]" : ""}`}
          onClick={() => {
            handleChipClick("whiteboard");

            setBoardDetails((values) => {
              return {
                ...values,
                whiteBoard: !boardDetails.whiteBoard,
              };
            });
          }}
        />

        <CommonChip
          label="Doc"
          icon={<DocIcon />}
          className={`cursor-pointer ${boardDetails?.doc ? "border-1 border-solid border-[#393F4C]" : ""}`}
          onClick={() => {
            handleChipClick("doc");
            setBoardDetails((values) => {
              return {
                ...values,
                doc: !boardDetails.doc,
              };
            });
          }}
        />
        <CommonChip
          label="Chat"
          icon={<ChatIcon />}
          className={`cursor-pointer ${boardDetails?.chat ? " border-1 border-solid border-[#393F4C]" : ""}`}
          onClick={() => {
            handleChipClick("chat");

            setBoardDetails((values) => {
              return {
                ...values,
                chat: !boardDetails.chat,
              };
            });
          }}
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
