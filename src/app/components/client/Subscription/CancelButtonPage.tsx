import React, { useState } from "react";
import DropdownMenu from "../../Dropdown";
import { Button, MenuItem, TextField, Theme } from "@mui/material";
import { DownArrowwhite } from "public/assets/icons/subscription";
import { useTheme } from "@mui/styles";
import {
  DownArrowBlank,
  UpArrowBlank,
} from "public/assets/icons/dashboardIcons";
import InputField from "../../InputField";

const CancelButtonPage = () => {
  const theme: Theme = useTheme();

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [anchorEl1, setAnchorEl1] = useState<HTMLElement | null>(null);
  const [showCustomDate, setShowCustomDate] = useState<boolean>(false);

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleButtonClick1 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleMenuItemClick = (value: string) => {
    setSelectedValue(value);
    setAnchorEl1(null); // Close the second dropdown menu
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
              className="h-[40px] sm:text-[16px] flex gap-8 leading-none"
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
          {selectedValue == "Cancel on custom date" ? (
            <>
              <div>
                <p className="text-title font-600 text-[1.6rem] pb-20">
                  Custom Date
                </p>
                <InputField name="cName" placeholder="22/5/2024" />
              </div>
            </>
          ) : (
            <>
              <p className="text-title font-600 text-[1.6rem]">Client</p>

              <div className="relative w-full mt-10 mb-3 sm:mb-0 flex">
                <DropdownMenu
                  marginTop={"mt-20"}
                  button={
                    <div
                      className={`relative flex items-center justify-between w-full bg-bgGrey  my-20 hover:bg-transparent rounded-lg ${
                        anchorEl1
                          ? "border-1 border-solid border-secondary "
                          : "" // Conditionally add border
                      }`}
                      onClick={handleButtonClick1}
                    >
                      <Button
                        variant="text"
                        color="secondary"
                        className="h-[40px] sm:text-[16px] font-400 text-[#9DA0A6] sm:mb-[1rem] leading-none border-none hover:bg-transparent"
                        size="large"
                      >
                        {/* className={`relative flex items-center justify-between w-full bg-bgGrey my-20 hover:bg-transparent rounded-none ${
                          anchorEl1 ? 'border border-gray-500' : '' // Conditionally add border
                        }`} */}
                        {selectedValue || "Select Cancel Options"}
                      </Button>
                      <span>
                        {anchorEl1 ? <DownArrowBlank /> : <UpArrowBlank />}
                      </span>
                    </div>
                  }
                  anchorEl={anchorEl1}
                  handleClose={handleClose}
                >
                  <div className="w-[375px] flex flex-col py-20">
                    <MenuItem
                      onClick={() => handleMenuItemClick("Cancel immediately")}
                      className="px-36 py-10 text-[14px] font-400"
                    >
                      Cancel immediately
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        handleMenuItemClick(
                          "Cancel at the end of billing cycle"
                        )
                      }
                      className="px-36 py-10 text-[14px] font-400"
                    >
                      Cancel at the end of billing cycle
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        handleMenuItemClick("Cancel on custom date")
                      }
                      className="px-36 py-10 text-[14px] font-400"
                    >
                      Cancel on custom date
                    </MenuItem>
                  </div>
                </DropdownMenu>
              </div>
            </>
          )}

          <div className="flex pt-10">
            <Button
              variant="contained"
              color="secondary"
              className="w-[156px] h-[48px] text-[18px]"
              onClick={handleClose}
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
