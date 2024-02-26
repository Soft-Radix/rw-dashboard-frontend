import Popover, { PopoverProps } from "@mui/material/Popover";
import { ReactNode } from "react";

interface IProps {
  button: ReactNode;
  children: ReactNode;
  anchorEl: HTMLElement | null;
  handleClose: () => void;
  popoverProps?: PopoverProps;
}

function DropdownMenu({
  button,
  children,
  anchorEl,
  handleClose,
  popoverProps,
}: IProps) {
  //   const [userMenu, setUserMenu] = useState<HTMLElement | null>(null);

  //   const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
  //     setUserMenu(event.currentTarget);
  //   };

  //   const userMenuClose = () => {
  //     setUserMenu(null);
  //   };

  return (
    <>
      {button}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        {...popoverProps}
        classes={{
          paper: `pb-20 pt-10 text-title_light shadow-md ${popoverProps?.classes.paper}`,
          root: popoverProps?.classes.root,
        }}
      >
        {children}
      </Popover>
    </>
  );
}

export default DropdownMenu;
