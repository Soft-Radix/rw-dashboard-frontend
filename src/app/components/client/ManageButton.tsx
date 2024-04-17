import * as React from "react";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  DownArrowBlank,
  DownArrowIcon,
  UpArrowBlank,
} from "public/assets/icons/dashboardIcons";

const names = ["Id", "Name", "Company Name", "Date", "Status"];

export default function ManageButton() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setIsOpen(false);
  };

  const handleCheckboxToggle = (itemName: string) => () => {
    const selectedIndex = selectedItems.indexOf(itemName);
    const newSelectedItems = [...selectedItems];

    if (selectedIndex === -1) {
      newSelectedItems.push(itemName);
    } else {
      newSelectedItems.splice(selectedIndex, 1);
    }

    setSelectedItems(newSelectedItems);
  };

  const handleApply = () => {
    console.log("Selected Items:", selectedItems);
    setAnchorEl(null);
    setIsOpen(false);
  };

  const isItemSelected = (itemName: string) => {
    return selectedItems.indexOf(itemName) !== -1;
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        variant="contained"
        className="bg-transparent min-w-[250px] min-h-[45px] rounded-[8px] flex items-center justify-between text-[12px] font-400 text-[#757982]"
        sx={{ border: isOpen ? "1px solid #4F46E5" : "none" }}
      >
        Manage Columns
        <span>{!isOpen ? <DownArrowBlank /> : <UpArrowBlank />}</span>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            Height: 450, // Example: Set max height of the menu container
            width: 300,
            marginTop: 2,
            marginRight: 2,
            "& ul": {
              padding: 0, // Example: Remove padding from the ul element inside Paper
              listStyle: "none", // Example: Remove default list styles
              overflowY: "auto",
            },
          },
        }}
      >
        {names.map((name) => (
          <MenuItem key={name} sx={{}}>
            <Checkbox
              checked={isItemSelected(name)}
              onChange={handleCheckboxToggle(name)}
            />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
