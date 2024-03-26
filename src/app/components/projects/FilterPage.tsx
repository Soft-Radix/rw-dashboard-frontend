import React, { ReactHTMLElement, useState } from "react";
import { Button, Typography, Popover, MenuItem } from "@mui/material";
import { FilterIcon } from "public/assets/icons/user-icon";
import { SortIcon } from "public/assets/icons/projectsIcon";
import { SearchIcon } from "public/assets/icons/topBarIcons";
import InputField from "src/app/components/InputField";
import SelectField from "../selectField";
import DropdownMenu from "../Dropdown";
import { useFormik } from "formik";

const FilterPage = () => {
  const formik = useFormik({
    initialValues: {
      role: "",
      verification: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => {},
  });

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [filterMenu, setFilterMenu] = useState<HTMLElement | null>(null);
  const groupMenuData = [
    { label: "None" },
    { label: "Status" },
    { label: "Asignee" },
    { label: "Priority" },
    { label: "Label" },
    { label: "Due Date" },
  ];

  return (
    <div className="px-4  mb-20 ">
      <div
        className="relative bg-[#ffff] py-5
      sm:py-10 px-5 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-10 rounded-xl"
      >
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
          <DropdownMenu
            handleClose={() => setFilterMenu(null)}
            anchorEl={filterMenu}
            button={
              <Button
                variant="text"
                className="h-[40px] text-[16px] flex gap-12 text-para_light whitespace-nowrap"
                aria-label="Add User"
                size="large"
                onClick={(event) => setFilterMenu(event.currentTarget)}
              >
                <FilterIcon className="shrink-0" />
                Filter
              </Button>
            }
            popoverProps={{
              open: !!filterMenu,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "right",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "right",
              },
              classes: {
                paper: "pt-0 pb-0",
              },
            }}
          >
            <div className="w-[810px] h-[300px]">
              <div className="text-black text-lg font-500 px-20 py-16 border-b border-b-[#EDF2F6] flex items-center justify-between">
                <div>Filter Options</div>
                <div className="flex items-center gap-10">
                  <Button className=" text-para_light">Clear All</Button>
                  <Button
                    variant="text"
                    className="h-[40px] text-[16px] flex gap-12 text-secondary whitespace-nowrap"
                  >
                    Apply
                  </Button>
                </div>
              </div>
              <div className="px-20 py-14 flex flex-col gap-14 w-1/3 g">
                <SelectField
                  name="role"
                  formik={formik}
                  placeholder="Select Filter"
                  sx={{
                    "&.MuiInputBase-root": {
                      "& .MuiSelect-select": {
                        minHeight: "40px",
                      },
                    },
                  }}
                >
                  <MenuItem value="Designer">Status</MenuItem>
                  <MenuItem value="Tester">Due Date</MenuItem>
                  <MenuItem value="Developer">Priority</MenuItem>
                  <MenuItem value="Designer">Assignee</MenuItem>
                  <MenuItem value="Tester">Archived</MenuItem>
                  <MenuItem value="Developer">Label</MenuItem>
                  <MenuItem value="Tester">Created By</MenuItem>
                  <MenuItem value="Developer">Date Closed</MenuItem>
                </SelectField>
              </div>
            </div>
          </DropdownMenu>
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
