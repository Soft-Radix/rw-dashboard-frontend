import { MenuItem, Typography, styled } from "@mui/material";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import CommonModal from "../CommonModal";
import { DeleteIcon } from "public/assets/icons/common";
import { useSelector } from "react-redux";
import { AgentGroupRootState } from "app/store/Agent group/Interface";
import { AccManagerRootState } from "app/store/AccountManager/Interface";
import { AgentRootState } from "app/store/Agent/Interafce";
import { ClientRootState } from "app/store/Client/Interface";

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
    (store: AccManagerRootState) => store.accManagerSlice
  );
  const { actionStatusDisabled } = useSelector(
    (store: AgentGroupRootState) => store.agentGroup
  );
  const { actionStatusAttachment } = useSelector(
    (store: AgentRootState) => store.agent
  );
  const { actionStatusClient } = useSelector(
    (store: ClientRootState) => store.client
  );

  return (
    <>
      <CommonModal
        open={isOpen}
        handleToggle={() => setIsOpen((prev) => !prev)}
        modalTitle="Add Client"
        maxWidth="310"
        DeleteModal={true}
        disabled={
          actionStatus ||
          actionStatusDisabled ||
          actionStatusAttachment ||
          actionStatusClient
        }
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
