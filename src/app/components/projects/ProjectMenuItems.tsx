import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Divider from "@mui/material/Divider";
import { GroupIcon } from "public/assets/icons/projectsIcon";
import CommonChip from "../chip";
import DropdownMenu from "../Dropdown";
import { PriorityIcon } from "public/assets/icons/task-icons";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function ProjectMenuItems() {
  const [groupMenu, setGroupMenu] = React.useState<HTMLElement | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const groupMenuData = [
    { label: "None" },
    { label: "Status" },
    { label: "Asignee" },
    { label: "Priority" },
    { label: "Label" },
    { label: "Due Date" },
  ];
  const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    padding: "8px 20px",
    minWidth: "250px",
  }));
  return (
    <div>
      <div className="flex gap-20">
        <DropdownMenu
          anchorEl={groupMenu}
          handleClose={() => setGroupMenu(null)}
          button={
            <CommonChip
              onClick={(event) => setGroupMenu(event.currentTarget)}
              label="Group By"
              icon={<GroupIcon />}
            />
          }
          popoverProps={{
            open: !!groupMenu,
            classes: {
              paper: "pt-10 pb-20",
            },
          }}
        >
          {groupMenuData.map((item) => (
            <StyledMenuItem onClick={() => setGroupMenu(null)}>
              {item.label}
            </StyledMenuItem>
          ))}
        </DropdownMenu>
      </div>
    </div>
  );
}
