import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { CrossIcon } from "public/assets/icons/common";
import { ReactNode } from "react";
import CustomButton from "./custom_button";
import { red } from "@mui/material/colors";

const StylesDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "10px",
    margin: 0,
    [theme.breakpoints.up("sm")]: {
      width: "80%",
    },
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

type ModalType = {
  open?: boolean;
  handleToggle: (e: React.FormEvent) => void;
  modalTitle: string;
  children: ReactNode;
  maxWidth?: string;
  DeleteModal?: boolean;
  btnTitle?: string;
  closeTitle?: string;
  disabled?: boolean;
  onSubmit?: () => void;
  bgColor?: string;
  headerBgColor?: string;
  titleColor?: string;
  isValid?: boolean;
  isHeaderDisplay?: boolean;
};

export default function CommonModal({
  modalTitle,
  open,
  handleToggle,
  children,
  btnTitle,
  closeTitle,
  DeleteModal = false,
  maxWidth = "387",
  onSubmit,
  disabled,
  bgColor,
  headerBgColor,
  titleColor,
  isValid = true,
  isHeaderDisplay,
}: ModalType) {
  return (
    <StylesDialog
      aria-labelledby="customized-dialog-title"
      open={open}
      onClose={(e: any) => {
        e.stopPropagation();
        handleToggle(e);
      }}
      sx={{
        ".MuiPaper-root": {
          maxWidth: `${maxWidth}px`,
          backgroundColor: bgColor || "white",
        },

        // "& .MuiPaper-root-MuiDialog-paper": {

        // },
      }}
    >
      {!DeleteModal ? (
        <div
          className={`p-16 flex justify-between w-full items-center ${
            headerBgColor ? `bg-[${headerBgColor}` : "bg-[#2C334C]"
          } ${isHeaderDisplay ? "hidden" : ""}`}
        >
          <Typography
            className={`text-[16px] font-semibold" ${
              titleColor ? "text-black" : "text-white"
            }`}
          >
            {modalTitle}
          </Typography>
          <IconButton>
            <CrossIcon
              className="cursor-pointer"
              color="#fff"
              onClick={(e) => {
                e.stopPropagation();
                handleToggle(e);
              }}
            />
          </IconButton>
        </div>
      ) : (
        <IconButton
          className="flex items-center justify-end pt-20 pr-20 rounded-none "
          onClick={(e) => {
            e.stopPropagation();
            handleToggle(e);
          }}
        >
          <CrossIcon className="cursor-pointer" color="#9DA0A6" />
        </IconButton>
      )}
      <div className="p-20 pb-0">{children}</div>

      <div className="flex p-20 pt-20">
        <Button
          variant="contained"
          color="secondary"
          className={`${
            disabled ? "btn-disable" : ""
          } w-[156px] h-[48px] text-[18px]`}
          onClick={(e) => {
            e.stopPropagation();
            onSubmit();
          }}
          disabled={!isValid || disabled}
        >
          {btnTitle}
        </Button>
        <Button
          variant="outlined"
          disabled={disabled}
          color="secondary"
          className={`${
            disabled ? "btn-disable-light" : ""
          } w-[156px] h-[48px] text-[18px] ml-14`}
          onClick={(e) => {
            handleToggle(e);
            // e.stopPropagation();
          }}
        >
          {closeTitle}
        </Button>
      </div>
    </StylesDialog>
  );
}
