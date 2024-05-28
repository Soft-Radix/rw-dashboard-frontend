import { useFormik } from "formik";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CommonModal from "../../CommonModal";
import InputField from "../../InputField";
import {
  Checkbox,
  InputAdornment,
  TableCell,
  TableRow,
  Theme,
  Typography,
} from "@mui/material";
import { EmployOptions, StyledMenuItem } from "src/utils";
import SelectField from "../../selectField";
import { SearchIcon } from "public/assets/icons/topBarIcons";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CommonTable from "../../commonTable";
import { useTheme } from "@mui/styles";
import { useAppDispatch } from "app/store/store";
import { subscriptionList } from "app/store/Client";
import { array } from "zod";
interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleList: (list: any[]) => void;
  customList?: any[];
  setCustomList?: Dispatch<SetStateAction<any[]>>;
}

const tableTiltles = ["Name", "Description", "Unit Price"];

function CustomLineModal({
  isOpen,
  setIsOpen,
  handleList,
  customList,
  setCustomList,
}: IProps) {
  const [list, setList] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setList(customList);
  }, [dispatch]);

  const handleSave = () => {
    handleList(selectedItems);
    const updatedList = list.filter(
      (item) => !selectedItems.some((selected) => selected.id == item.id)
    );
    setList(updatedList);
    setCustomList(updatedList);
    setIsOpen((prev) => !prev);
    setSelectedItems([]);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>, data: any) => {
    if (e.target.checked) {
      // Add the item only if it doesn't already exist in selectedItems
      if (!selectedItems.includes(data)) {
        setSelectedItems((prevSelectedItems) => [...prevSelectedItems, data]);
      }
    } else {
      // Remove the item from selectedItems
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item !== data)
      );
    }
  };
  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      onSubmit={() => handleSave()}
      modalTitle="Add Line Items"
      maxWidth="733"
      btnTitle={"Add"}
      closeTitle="Close"
    >
      <div className="flex flex-col gap-20 mb-20 border-1 border-[#D9D9D9] rounded-[10px] overflow-hidden">
        <CommonTable headings={["Name", "Description", "Unit Price"]}>
          {list?.map((row, index) => (
            <TableRow
              key={index}
              // sx={{
              //     "& td": {
              //         borderBottom: "1px solid #EDF2F6",
              //         paddingTop: "12px",
              //         paddingBottom: "12px",
              //         color: theme.palette.primary.main,
              //     },
              // }}
            >
              <TableCell scope="row" className="font-500">
                <div className="py-2">
                  <Checkbox onChange={(e) => handleSelect(e, row)} />

                  {row.name}
                </div>
              </TableCell>
              <TableCell align="center" className="font-500">
                {row.description}
              </TableCell>
              <TableCell align="center" className="whitespace-nowrap font-500">
                {row.unit_price}
              </TableCell>
            </TableRow>
          ))}
        </CommonTable>
      </div>
    </CommonModal>
  );
}

export default CustomLineModal;
