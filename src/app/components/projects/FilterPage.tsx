import React, { ReactHTMLElement, useState } from "react";
import { Button, Typography, Popover, MenuItem } from "@mui/material";
import { FilterIcon } from "public/assets/icons/user-icon";
import { SortIcon } from "public/assets/icons/projectsIcon";
import { SearchIcon } from "public/assets/icons/topBarIcons";
import InputField from "src/app/components/InputField";
import SelectField from "../selectField";
import DropdownMenu from "../Dropdown";
import { useFormik } from "formik";
import ProjectMenuItems from "./ProjectMenuItems";
import SearchInput from "../SearchInput";

interface FilterDesign {
  filterDesign?: boolean;
}
const FilterPage = (props: FilterDesign) => {
  const [inputValue, setInputValue] = useState("");

  const { filterDesign } = props;

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
  const [selectMenuItems, setSelectMenuItems] = useState<string>("");

  const showMenuItems = (e: any) => {
    const { value } = e.target;
    console.log(value, "value");
    setSelectMenuItems(value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    // debouncedSearch(value);
  };

  // const handleInputClear = () => {
  //   setInputValue("");
  //   setfilters((prevFilters) => ({
  //     ...prevFilters,
  //     search: "",
  //     start: 0,
  //   }));
  // };

  return (
    <div className="px-4 ">
      <div
        className="relative bg-[#ffff] py-5
      sm:py-10 px-5 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-10 rounded-xl overflow-hidden"
      >
        <div>
          <SearchInput
            name="search"
            placeholder="Search Task"
            onChange={handleSearchChange}
            // handleInputClear={handleInputClear}
            inputValue={inputValue}
          />
        </div>
        <div className="w-full sm:w-auto flex  flex-row sm:items-center justify-between gap-3 sm:gap-40 cursor-pointer">
          {!filterDesign ? (
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
                <div className="px-20 py-14 flex flex-col gap-14 w-1/3">
                  <SelectField
                    name="role"
                    formik={formik}
                    placeholder="Select Filter"
                    // value={selectMenuItems}
                    // value={selectMenuItems || "Select Filter"}
                    onChange={(e) => showMenuItems(e)}
                    sx={{
                      "&.MuiInputBase-root": {
                        "& .MuiSelect-select": {
                          minHeight: "40px",
                        },
                      },
                    }}
                  >
                    <MenuItem value="Status">Status</MenuItem>
                    <MenuItem value="Due Date">Due Date</MenuItem>
                    <MenuItem value="Priority">Priority</MenuItem>
                    <MenuItem value="Assignee">Assignee</MenuItem>
                    <MenuItem value="Archived">Archived</MenuItem>
                    <MenuItem value="Label">Label</MenuItem>
                    <MenuItem value="Created By">Created By</MenuItem>
                    <MenuItem value="Date Closed">Date Closed</MenuItem>
                  </SelectField>
                </div>
              </div>
            </DropdownMenu>
          ) : (
            <div className="sm:px-20 pr-10 flex gap-32 text-para_light  ">
              <ProjectMenuItems
                label={"Filter"}
                icon={<FilterIcon />}
                className="bg-[#F6F6F6] rounded-md px-10 py-20 text-[#757982] font-400
                cursor-pointer text-[16px]"
              />
            </div>
          )}

          <div className="flex items-center bg-[#F6F6F6] justify-between px-5  sm:px-20 py-10 sm:py-10 rounded-md sm:w-[200px] w-full">
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
