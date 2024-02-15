import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import { CircularDeleteIcon } from "public/assets/icons/common";

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
  modalSubTitle: string;
  type: string;
};

export default function ActionModal({
  modalTitle,
  open,
  handleToggle,
  modalSubTitle,
  type,
}: ModalType) {
  return (
    <BootstrapDialog
      aria-labelledby="customized-dialog-title"
      open={open}
      className="commonModal"
    >
      <div className="p-28 flex flex-col items-center">
        {type === "delete" ? <CircularDeleteIcon /> : null}

        <Typography className="mt-20 text-[20px] font-semibold">
          {modalTitle}
        </Typography>
        <Typography
          className="mt-10 text-[14px] max-w-[221px] text-center"
          color="primary.light"
        >
          {modalSubTitle}
        </Typography>
      </div>

      <div className="flex p-20 pt-10">
        <Button
          variant="contained"
          color="secondary"
          className="w-[156px] h-[48px] text-[18px]"
        >
          Yes
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
