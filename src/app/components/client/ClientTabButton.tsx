import { SearchIcon } from "public/assets/icons/topBarIcons";
import InputField from "../InputField";
import { Button, Typography } from "@mui/material";
import {
  ProjectNavIconArrow,
  SortIcon,
} from "public/assets/icons/projectsIcon";
import DropdownMenu from "../Dropdown";
import ManageButton from "./ManageButton";

const ClientTabButton = () => {
  return (
    <div
      className="relative bg-[#ffff] py-5
 sm:py-10 px-5 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-10 rounded-xl"
    >
      <div className="mb-3 sm:mb-0 w-full sm:w-auto  ">
        <InputField
          name="search"
          placeholder="Search Client"
          className=""
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
      <ManageButton />
    </div>
  );
};

export default ClientTabButton;
