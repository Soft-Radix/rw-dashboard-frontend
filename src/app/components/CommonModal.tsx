import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { CrossIcon } from "public/assets/icons/common";
import { ReactNode } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type ModalType = {
  open: boolean;
  handleToggle: () => void;
  modalTitle: string;
  children: ReactNode;
};

export default function CommonModal({
  modalTitle,
  open,
  handleToggle,
  children,
}: ModalType) {
  return (
    <BootstrapDialog
      aria-labelledby="customized-dialog-title"
      open={open}
      className="commonModal"
    >
      <div className="p-16 flex justify-between w-full items-center bg-[#2C334C]">
        <Typography className="text-[16px] font-medium" color="#fff">
          {modalTitle}
        </Typography>
        <CrossIcon
          className="cursor-pointer"
          color="#fff"
          onClick={handleToggle}
        />
      </div>
      <div className="p-20">{children}</div>

      <div className="flex p-20 pt-10">
        <Button
          variant="contained"
          color="secondary"
          className="w-[156px] h-[48px] text-[18px]"
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          className="w-[156px] h-[48px] text-[18px] ml-10"
          onClick={handleToggle}
        >
          Cancel
        </Button>
      </div>
    </BootstrapDialog>
  );
}
