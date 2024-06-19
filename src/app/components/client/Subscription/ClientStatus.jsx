import { DownGreenIcon } from "public/assets/icons/common";
import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Menu,
  TableCell,
  TableRow,
  MenuItem,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { useAppDispatch } from "app/store/store";
import { UpdateStatus } from "app/store/Client";

const ClientStatus = ({ rowstatus, id }) => {
  const [anchorEl, setAnchorEl] = useState(null); // State to manage anchor element for menu
  const [selectedItem, setSelectedItem] = useState("Active");
  const dispatch = useAppDispatch();
  // Open menu handler
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element to the clicked button
  };

  // Close menu handler
  const handleClose = () => {
    setAnchorEl(null); // Reset anchor element to hide the menu
  };

  // Menu item click handler
  const handleMenuItemClick = async (status) => {
    setSelectedItem(status);
    const res = await dispatch(
      UpdateStatus({
        user_id: id,
        status: status == "InActive" ? 2 : 1,
      })
    );
    // setList(res?.payload?.data?.data?.list);
    toast.success(res?.payload?.data?.message);
    handleClose(); // Close the menu after handling the click
  };
  useEffect(() => {
    setSelectedItem(rowstatus);
  }, [rowstatus]);
  return (
    <>
      <Button
        variant="outlined"
        className={`h-20 rounded-3xl border-none sm:min-h-24 leading-none ${
          selectedItem == "Active"
            ? "text-[#4CAF50] bg-[#4CAF502E]" // Green for 'Active'
            : "text-[#F44336] bg-[#F443362E]"
        }`}
        endIcon={
          <DownGreenIcon
            color={selectedItem === "Active" ? "#4CAF50" : "#F44336"}
          />
        }
        onClick={handleClick}
      >
        {selectedItem}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose} // Close the menu when clicking outside or selecting an item
      >
        <MenuItem onClick={() => handleMenuItemClick("Active")}>
          Active
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick("InActive")}>
          Inactive
        </MenuItem>
      </Menu>
    </>
  );
};

export default ClientStatus;
