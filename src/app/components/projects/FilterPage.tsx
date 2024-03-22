import React, { ReactHTMLElement, useState } from "react";
import { Button, Typography, Popover } from "@mui/material";
import { FilterIcon } from "public/assets/icons/user-icon";
import { SortIcon } from "public/assets/icons/projectsIcon";
import { SearchIcon } from "public/assets/icons/topBarIcons";
import InputField from "src/app/components/InputField";

const FilterPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className="px-4 sm:px-28 mb-20">
      <div className="relative bg-[#ffff] py-5 sm:py-10 px-5 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-10 rounded-xl">
        <div className="mb-3 sm:mb-0 w-full sm:w-auto">
          <InputField
            name="search"
            placeholder="Search Board"
            className="hello"
            inputProps={{
              className: "ps-[4rem] w-full sm:w-[227px]",
            }}
          />
          <SearchIcon
            width={18}
            height={18}
            className="absolute left-[2.4rem] sm:left-28 top-[26%] sm:top-[50%] translate-y-[-50%] text-para_light"
          />
        </div>
        <div className="w-full sm:w-auto flex  flex-row items-center justify-between gap-3 sm:gap-40 cursor-pointer">
          <Button
            variant="text"
            className="h-[40px] text-[16px] flex gap-2 sm:gap-12 text-para_light whitespace-nowrap"
            aria-label="filter"
            size="large"
            startIcon={<FilterIcon className="shrink-0" />}
            onClick={handleClick}
          >
            Filter
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {/* Content of the popover */}
            <div style={{ padding: 16 }}>
              {/* Your popover content goes here */}
              <Typography>Popover content goes here</Typography>
            </div>
          </Popover>
          <div className="flex items-center bg-[#F6F6F6] justify-between px-5  sm:px-20 py-10 sm:py-10 rounded-md sm:w-[238px] w-full">
            <Typography className="text-[14px] sm:text-[16px] text-[#9DA0A6]">
              Sort By
            </Typography>
            <SortIcon className="shrink-0" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPage;
