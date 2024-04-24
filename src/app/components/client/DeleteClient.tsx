import { MenuItem, Typography, styled } from "@mui/material";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import CommonModal from "../CommonModal";
import { DeleteIcon } from "public/assets/icons/common";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onDelete: () => void
  loading?: boolean
}

function DeleteClient({ isOpen, setIsOpen, onDelete, loading }: IProps) {
  return (
    <>
      <CommonModal
        open={isOpen}
        handleToggle={() => setIsOpen((prev) => !prev)}
        modalTitle="Add Client"
        maxWidth="310"
        DeleteModal={true}
        disabled={loading}
        onSubmit={onDelete}
        btnTitle="Yes"
      >
        <div className="flex flex-col items-center justify-center gap-10 ">
          <div className="h-56 w-56 flex items-center justify-center rounded-full border-1 border-solid border-[#F44336] cursor-pointer ">
            <DeleteIcon className="h-28 w-28 " />
          </div>
          <Typography className="text-[20px] font-600 text-[#111827]"  >
            Delete Client
          </Typography>
          <Typography className="text-[14px] font-400 text-[#757982] text-center px-28">
            Are you sure you want to delete this client ?
          </Typography>
        </div>
      </CommonModal>
    </>
  );
}

export default DeleteClient;
