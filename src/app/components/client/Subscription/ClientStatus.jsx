import { DownGreenIcon } from "public/assets/icons/common";
import React, { useEffect, useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { useAppDispatch } from "app/store/store";
import { UpdateStatus } from "app/store/Client";

const ClientStatus = ({ rowstatus, id }) => {
  const [anchorEl, setAnchorEl] = useState(null); // State to manage anchor element for menu
  const [selectedItem, setSelectedItem] = useState("Active");
  const [disable, setIsDisable] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // State to manage confirmation dialog visibility
  const [pendingStatus, setPendingStatus] = useState(null); // State to manage the status to be updated
  const dispatch = useAppDispatch();

  // Open menu handler
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element to the clicked button
  };

  // Close menu handler
  const handleClose = () => {
    setAnchorEl(null); // Reset anchor element to hide the menu
  };

  // Open confirmation dialog handler
  const handleMenuItemClick = async (status) => {
    setPendingStatus(status);
    setIsConfirmOpen(true); // Open confirmation dialog
  };

  // Confirm status update handler
  const handleConfirm = async (confirmed) => {
    if (confirmed && pendingStatus) {
      setIsDisable(true);
      setSelectedItem(pendingStatus);
      const res = await dispatch(
        UpdateStatus({
          user_id: id,
          status: pendingStatus === "Inactive" ? 2 : 1,
        })
      );
      setIsDisable(false);
      toast.success(res?.payload?.data?.message);
    }
    setIsConfirmOpen(false);
    setPendingStatus(null);
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
          selectedItem === "Active"
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
        <MenuItem
          onClick={() => handleMenuItemClick("Active")}
          disabled={selectedItem == "Active"}
        >
          Active
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("Inactive")}
          disabled={selectedItem == "Inactive"}
        >
          Inactive
        </MenuItem>
      </Menu>
      <Dialog
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        className="p-10"
      >
        {/* <DialogTitle>Confirm Status Change</DialogTitle> */}
        <DialogContent>
          <DialogContentText className="text-[#000]">
            Are you sure you want to change the user status to {pendingStatus}?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="pb-10">
          <Button
            variant="contained"
            color="secondary"
            disabled={disable}
            className={`${disable ? "btn-disable" : ""}
                      
                          text-[18px]`}
            onClick={(e) => {
              handleConfirm(true);
            }}
          >
            Confirm
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            disabled={disable}
            className={`${disable ? "btn-disable-light" : ""}
       
           text-[18px] ml-14`}
            onClick={(e) => {
              handleConfirm(false);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClientStatus;
