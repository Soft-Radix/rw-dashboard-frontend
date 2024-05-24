import { MenuItem, Typography, styled } from "@mui/material";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import CommonModal from "../CommonModal";
import { DeleteIcon } from "public/assets/icons/common";
import { useSelector } from "react-redux";
import { AgentGroupRootState } from "app/store/Agent group/Interface";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onDelete: () => void;
  loading?: boolean;
  heading?: string;
  description?: string;
}

function DeleteClient({
  isOpen,
  setIsOpen,
  onDelete,
  loading,
  heading,
  description,
}: IProps) {
  const { actionStatus } = useSelector(
    (store: AgentGroupRootState) => store.agentGroup
  );
  return (
    <>
      <CommonModal
        open={isOpen}
        handleToggle={() => setIsOpen((prev) => !prev)}
        modalTitle="Add Client"
        maxWidth="310"
        DeleteModal={true}
        disabled={actionStatus}
        onSubmit={onDelete}
        btnTitle="Yes"
        closeTitle="Cancel"
      >
        <div className="flex flex-col items-center justify-center gap-10 ">
          <div className="h-56 w-56 flex items-center justify-center rounded-full border-1 border-solid border-[#F44336] cursor-pointer ">
            <DeleteIcon className="h-28 w-28 " />
          </div>
          <Typography className="text-[20px] font-600 text-[#111827]">
            {heading}
          </Typography>
          <Typography className="text-[14px] font-400 text-[#757982] text-center px-28">
            {description}
          </Typography>
        </div>
      </CommonModal>
    </>
  );
}

export default DeleteClient;
