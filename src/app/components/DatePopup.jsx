import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { CrossIcon } from "public/assets/icons/common";
import { ReactNode, useState } from "react";
import CustomButton from "./custom_button";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";
import { red } from "@mui/material/colors";
import enUS from "date-fns/locale/en-US";
import moment from "moment";

const StylesDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "10px",
    margin: 0,
    [theme.breakpoints.up("sm")]: {
      width: "387",
    },
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// type ModalType = {
//   open?: boolean,
//   handleToggle: (e: React.FormEvent) => void,
//   modalTitle: string,
//   children: ReactNode,
//   maxWidth?: string,
//   DeleteModal?: boolean,
//   btnTitle?: string,
//   closeTitle?: string,
//   disabled?: boolean,
//   onSubmit?: () => void,
//   bgColor?: string,
//   headerBgColor?: string,
//   titleColor?: string,
//   isValid?: boolean,
//   isHeaderDisplay?: boolean,
// };

export default function DatePopup({
  modalTitle,
  open,
  handleToggle,
  btnTitle,
  closeTitle,
  maxWidth = "733",
  setStartDate,
  setEndDate,
}) {
  const [disable, setDisable] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const handleApplyDates = () => {
    if (setStartDate) {
      setStartDate(moment(state[0].startDate).format("YYYY-MM-DD"));
    }
    if (setEndDate) {
      setEndDate(moment(state[0].endDate).format("YYYY-MM-DD"));
    }
  };
  return (
    <StylesDialog
      aria-labelledby="customized-dialog-title"
      open={open}
      onClose={(e) => {
        e.stopPropagation();
        handleToggle(e);
      }}
      sx={{
        ".MuiPaper-root": {
          maxWidth: `${maxWidth}px`,
        },

        ".muiltr-5gnc0a-MuiPaper-root-MuiDialog-paper": {
          backgroundColor: "white",
        },
      }}
    >
      <div
        className={`p-16 flex justify-between w-full items-center bg-[#fff] `}
      >
        <Typography
          className={`text-[16px] font-semibold
            text-black`}
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
      <DateRangePicker
        onChange={(item) => {
          setState([item.selection]);
          setDisable(true);
        }}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        locale={enUS}
        months={2}
        ranges={state}
        direction="horizontal"
        renderStaticRangeLabel={() => null}
      />
      {/* <div className="p-20 pb-0">{children}</div> */}
      <div className="flex p-20 pt-20">
        <Button
          variant="contained"
          color="secondary"
          className={`${
            !state[0].startDate || !state[0].endDate ? "btn-disable" : ""
          } w-[156px] h-[48px] text-[18px]`}
          onClick={(e) => {
            e.stopPropagation();
            handleApplyDates();
          }}
          disabled={!state[0].startDate || !state[0].endDate}
        >
          {btnTitle}
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          className={`
       
           w-[156px] h-[48px] text-[18px] ml-14`}
          onClick={(e) => {
            e.stopPropagation();
            handleToggle(e);
          }}
        >
          {closeTitle}
        </Button>
      </div>
    </StylesDialog>
  );
}
