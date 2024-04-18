import React, { useState } from "react";
import DropdownMenu from "../../Dropdown";
import { Button, MenuItem, Theme, Typography } from "@mui/material";
import {
  DownArrowBlank,
  DownArrowIcon,
} from "public/assets/icons/dashboardIcons";
import { useTheme } from "@mui/styles";
import { DownArrowwhite } from "public/assets/icons/subscription";
import InputField from "../../InputField";

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
  const [anchorEl1, setAnchorEl1] = useState<HTMLElement | null>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleButtonClick1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleMenuItemClick = (value: string) => {
    setSelectedValue(value);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl1(null);
  };
  return (
    <div>
      <DropdownMenu
        marginTop={"mt-20"}
        button={
          <div
            className="relative flex items-center"
            onClick={handleButtonClick}
          >
            <Button
              variant="contained"
              color="secondary"
              className="h-[40px] sm:text-[16px] flex gap-8  leading-none "
              aria-label="Manage Sections"
              size="large"
              endIcon={<DownArrowwhite className="cursor-pointer" />}
            >
              Cancel
            </Button>
          </div>
        }
        anchorEl={anchorEl}
        handleClose={handleClose}
      >
        <div className="min-w-[400px] p-20">
          <p className="text-title font-600 text-[1.6rem]">Client</p>

          <div className="relative w-full mt-10 mb-3 sm:mb-0 flex ">
            <DropdownMenu
              marginTop={"mt-20"}
              button={
                <div
                  className="relative flex items-center justify-between w-full bg-bgGrey rounded-sm my-20"
                  onClick={handleButtonClick1}
                >
                  <Button
                    variant="text"
                    color="secondary"
                    className="h-[40px] sm:text-[16px] font-400 text-[#9DA0A6] sm:mb-[1rem] leading-none"
                    aria-label="Manage Sections"
                    size="large"
                  >
                    Select Cancel Options
                  </Button>
                  <span>
                    <DownArrowBlank />
                  </span>
                </div>
              }
              anchorEl={anchorEl1}
              handleClose={handleClose}
            >
              <div className="w-[375px] ">
                <MenuItem>Cancel immediately</MenuItem>
                <MenuItem>Cancel at the end of billing cycle</MenuItem>
                <MenuItem></MenuItem>
              </div>
            </DropdownMenu>
          </div>
          <div className="flex pt-10">
            <Button
              variant="contained"
              color="secondary"
              className="w-[156px] h-[48px] text-[18px]"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DropdownMenu>
    </div>
  );
};

export default CancelButtonPage;
