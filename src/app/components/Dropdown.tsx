import Popover, { PopoverProps } from "@mui/material/Popover";
import { ReactNode } from "react";

interface IProps {
  button: ReactNode;
  children: ReactNode;
  marginTop?: string;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  popoverProps?: PopoverProps;
}

function DropdownMenu({
  button,
  children,
  anchorEl,
  handleClose,
  popoverProps, marginTop
}: IProps) {
  return (
    <>
      {button}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        {...popoverProps}
        classes={{
          paper: `text-title_light shadow-[0_0_54px_0_rgba(214,215,227,0.6)]   ${popoverProps?.classes?.paper} ${marginTop}`,
          root: popoverProps?.classes?.root,
        }}
      >
        {children}
      </Popover>
    </>
  );
}

export default DropdownMenu;
