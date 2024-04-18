import React, { useState } from "react";
import DropdownMenu from "../../Dropdown";
import { Button, MenuItem, Theme, Typography } from "@mui/material";
import { DownArrowIcon } from "public/assets/icons/dashboardIcons";
import { useTheme } from "@mui/styles";
import { DownArrowwhite } from "public/assets/icons/subscription";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CancelButtonPage = () => {
  const theme: Theme = useTheme();

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (value: string) => {
    setSelectedValue(value);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <DropdownMenu
        button={
          <div className="flex items-start " onClick={handleButtonClick}>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<DownArrowwhite />}
              className="text-[#fff] font-600 text-[16px] px-36"
            >
              Cancel
            </Button>
          </div>
        }
        anchorEl={anchorEl}
        handleClose={handleClose}
      >
        <div style={{ marginTop: "8px" }}>
          <MenuItem
            onClick={() => handleMenuItemClick("Project 1")}
            className="w-[300px] px-20 py-10 "
          >
            <Typography className="text-[#111827] font-600 text-[16px] ">
              Cancel
            </Typography>
          </MenuItem>
        </div>
      </DropdownMenu>
    </div>
  );
};

export default CancelButtonPage;
