import { SearchIcon } from "public/assets/icons/topBarIcons";
import InputField from "../InputField";
import ManageButton from "./ManageButton";
import SearchInput from "../SearchInput";

const ClientTabButton = () => {
  return (
    <div className="flex items-center gap-10 pr-10">
      <div className="mt-16">
        <SearchInput placeholder="Search" name="name" />
      </div>

      <ManageButton />
    </div>
  );
};

export default ClientTabButton;
