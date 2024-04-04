import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Divider from "@mui/material/Divider";
import { GroupIcon, RightIcon } from "public/assets/icons/projectsIcon";
import CommonChip from "../chip";
import DropdownMenu from "../Dropdown";
import { PriorityIcon } from "public/assets/icons/task-icons";
import { Chip } from "@mui/material";

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

export default function ProjectMenuItems(props) {
  const { icon, label, className, setTableSelectedItemDesign } = props;
  const [groupMenu, setGroupMenu] = React.useState<HTMLElement | null>(null);
  const [activeItem, setActiveItem] = React.useState(null); // State to keep track of active item

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setAnchorEl(event.currentTarget);
    setActiveItem(index); // Set the clicked item as active

    // console.log(groupMenu, "check");
  };
  const handleClose = () => {
    setGroupMenu(null);
  };
  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
    label: string
  ) => {
    handleClick(event, index); // Handle the click event
    handleClose(); // Close the menu
    setTableSelectedItemDesign(label);
  };
  // console.log(anchorEl, "kkk");
  console.log(label, "label");
  const groupMenuData = [
    { label: "None" },
    { label: "Status" },
    { label: "Asignee" },
    { label: "Priority" },
    { label: "Label" },
    { label: "Due Date" },
  ];
  // console.log(groupMenu, "groupenu");
  const activeLabel =
    activeItem !== null
      ? `${label}: ${groupMenuData[activeItem].label}`
      : label;

  return (
    <div>
      <div className="flex gap-20">
        <DropdownMenu
          anchorEl={groupMenu}
          handleClose={() => setGroupMenu(null)}
          button={
            <Chip
              onClick={(event) => setGroupMenu(event.currentTarget)}
              label={activeLabel}
              icon={icon}
              className={className}
              style={
                !!activeItem || activeItem == 0
                  ? { border: "1px solid #393F4C" }
                  : {}
              }
            />
          }
          popoverProps={{
            open: !!groupMenu,
            classes: {
              paper: "pt-10 pb-20",
            },
          }}
        >
          {groupMenuData.map((item, index) => {
            const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
              padding: "8px 20px",
              minWidth: "250px",

              backgroundColor:
                activeItem === index
                  ? alpha(
                      theme.palette.primary.main,
                      theme.palette.action.selectedOpacity
                    )
                  : "transparent",
            }));

            return (
              <StyledMenuItem
                key={index}
                onClick={(event) =>
                  handleMenuItemClick(event, index, item.label)
                }
                className="w-full justify-between"
              >
                {item.label} {activeItem === index && <RightIcon />}
              </StyledMenuItem>
            );
          })}
        </DropdownMenu>
      </div>
    </div>
  );
}
