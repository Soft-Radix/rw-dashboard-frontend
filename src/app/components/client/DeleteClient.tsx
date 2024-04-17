import { MenuItem, Typography, styled } from "@mui/material";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import CommonModal from "../CommonModal";
import { DeleteIcon } from "public/assets/icons/common";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: "8px 20px",
  minWidth: "250px",
}));

function DeleteClient({ isOpen, setIsOpen }: IProps) {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: (values) => {},
  });

  return (
    <>
      <CommonModal
        open={isOpen}
        handleToggle={() => setIsOpen((prev) => !prev)}
        modalTitle="Add Client"
        maxWidth="310"
        DeleteModal={true}
      >
        <div className="flex flex-col items-center justify-center gap-10 ">
          <div className="h-56 w-56 flex items-center justify-center rounded-full border-1 border-solid border-[#F44336] cursor-pointer ">
            <DeleteIcon className="h-28 w-28 " />
          </div>
          <Typography className="text-[20px] font-600 text-[#111827]">
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
