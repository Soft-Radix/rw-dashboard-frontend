import { Button, Typography } from "@mui/material";
import { DownArrowBlank } from "public/assets/icons/dashboardIcons";
import { FilterIcon } from "public/assets/icons/user-icon";
import React from "react";
import { SortIcon } from "public/assets/icons/projectsIcon";
const FilterPage = () => {
  return (
    <div className="flex items-center">
      <div className=" ">
        <Button
          variant="text"
          className="h-[40px] text-[16px] flex gap-12 text-para_light whitespace-nowrap"
          aria-label="Add User"
          size="large"
          // onClick={(event) => setFilterMenu(event.currentTarget)}
        >
          <FilterIcon className="shrink-0" />
          Filter
        </Button>
      </div>

      <div
        className="flex items items-center  min-w-[50px] w-[250px] bg-[#F6F6F6]
       justify-between px-20 py-10 rounded-md"
      >
        <Typography className="text-[16px] text-[#9DA0A6]">Sort By</Typography>
        <SortIcon className="shrink-0" />
      </div>
    </div>
  );
};

export default FilterPage;
