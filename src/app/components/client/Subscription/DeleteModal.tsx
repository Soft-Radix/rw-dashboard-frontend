import { Typography } from "@mui/material";
import { DeleteIcon } from "public/assets/icons/common";
import { Dispatch, SetStateAction } from "react";
import CommonModal from "src/app/components/CommonModal";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onDelete?: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
  disable?: boolean;
}

function DeleteModal({
  isOpen,
  setIsOpen,
  onDelete,
  loading,
  title,
  description,
  disable,
}: IProps) {
  return (
    <>
      <CommonModal
        open={isOpen}
        handleToggle={() => setIsOpen(false)}
        modalTitle="Delete Line Item"
        maxWidth="310"
        DeleteModal={true}
        disabled={loading || disable}
        onSubmit={onDelete}
        btnTitle="Yes"
        closeTitle="Cancel"
      >
        <div className="flex flex-col items-center justify-center gap-10 ">
          <div className="h-56 w-56 flex items-center justify-center rounded-full border-1 border-solid border-[#F44336] cursor-pointer ">
            <DeleteIcon className="h-28 w-28 " />
          </div>
          <Typography className="text-[20px] font-600 text-[#111827]">
            {title ? title : "Delete Item"}
          </Typography>
          <Typography className="text-[14px] font-400 text-[#757982] text-center px-28">
            {description
              ? description
              : " Are you sure you want to delete this item ?"}
          </Typography>
        </div>
      </CommonModal>
    </>
  );
}

export default DeleteModal;
