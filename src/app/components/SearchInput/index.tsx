import React from "react";
import InputField from "../InputField";
import { SearchIcon } from "public/assets/icons/topBarIcons";
import { CrossGreyIcon } from "public/assets/icons/common";
import { InputAdornment, TextField } from "@mui/material";

interface IProps {
  name: string;
  placeholder: string;
  onChange?: any;
  handleInputClear?: any;
  inputValue?: string;
}
function SearchInput({
  name,
  placeholder,
  onChange,
  handleInputClear,
  inputValue,
}: IProps) {
  return (
    <div className="w-full mb-3 sm:mb-0 sm:w-max">
      <TextField
        hiddenLabel
        id="filled-hidden-label-small"
        name={name}
        defaultValue=""
        value={inputValue}
        variant="standard"
        placeholder={placeholder}
        onChange={onChange}
        className="flex items-center justify-center"
        sx={{
          height: "50px",
          pl: 2,
          pr: 2,
          width: "286px",
          // border: "1px solid blue",
          backgroundColor: "#F6F6F6",
          borderRadius: "8px",
          border: "1px solid transparent", // Show border when focused
          "&:focus-within": {
            border: "1px solid blue", // Show border when focused
          },
          "& .MuiInputBase-input": {
            textDecoration: "none", // Example: Remove text decoration (not typically used for input)
            border: "none", // Hide the border of the input element
          },
          "& .MuiInput-underline:before": {
            border: "none !important", // Hide the underline (if using underline variant)
          },
          "& .MuiInput-underline:after": {
            borderBottom: "none !important", // Hide the underline (if using underline variant)
          },
          "& .MuiInputBase-input::placeholder": {
            color: "#757982", // Change placeholder color here
            opacity: 1, // Override opacity
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="pl-2" />
            </InputAdornment>
          ),
          endAdornment: inputValue != "" && (
            <InputAdornment position="end">
              <CrossGreyIcon
                className="  cursor-pointer fill-[#c2cad2] h-[14px]"
                onClick={handleInputClear}
              />
            </InputAdornment>
          ),
        }}

        // <InputField
        //   name={name}
        //   placeholder={placeholder}
        //   // className="common-inputField_v2 "
        //   inputProps={{
        //     className: "ps-[4rem] w-full sm:w-[227px] ",
        //   }}
        //   onChange={onChange}
        //   InputProps={{
        //     startAdornment: (
        //       <InputAdornment position="start">
        //         <SearchIcon className="p-2" />
        //       </InputAdornment>
        //     ),
        //     endAdornment: (
        //       <InputAdornment position="end">
        //         <CrossGreyIcon
        //           className="mr-16 p-1 cursor-pointer fill-[#c2cad2] h-[14px]"
        //           // onClick={handleInputClear}
        //         />
        //       </InputAdornment>
        //     ),
        //   }}
      />
      {/* <SearchIcon
        width={18}
        height={18}
        className="absolute left-[2rem] sm:left-10 top-[44%] translate-y-[-50%] text-para_light"
      /> */}
    </div>
  );
}

export default SearchInput;
