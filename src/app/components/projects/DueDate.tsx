import { Checkbox, TableCell, TableRow, Theme } from "@mui/material";
import { DownArrowBlack, SortIcon } from "public/assets/icons/projectsIcon";
import CommonTable from "../commonTable";

import { useTheme } from "@mui/styles";
import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
} from "public/assets/icons/common";
import ImagesOverlap from "../ImagesOverlap";
import { ReactHTMLElement, useState } from "react";

const DueDate = (props) => {
  const { rows, title, className } = props;
  const [showTableData, setShowTableData] = useState<boolean>(false);
  const theme: Theme = useTheme();
  const showTable = () => {
    setShowTableData(!showTableData);
  };
  return (
    <div>
      <div className="flex items-center gap-20 px-20 h-40 w-full  shadow-sm bg-[#E7E8E9] ">
        {showTableData ? (
          <DownArrowBlack onClick={showTable} />
        ) : (
          <SortIcon
            onClick={showTable}
            className="bg-white h-28 w-28 rounded-sm"
          />
        )}
        <div className={className}>{title}</div>
      </div>
      {showTableData && (
        <>
          {rows.map((row: any, index: number) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "& td": {
                  borderBottom: "1px solid #EDF2F6",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  color: theme.palette.primary.main,
                },
              }}
            >
              <TableCell scope="row">
                <span className="flex items-center gap-10">
                  <Checkbox
                    sx={{ padding: "4px" }}
                    color="primary"
                    defaultChecked={row.defaultChecked}
                    inputProps={{
                      "aria-labelledby": `table-checkbox-${index}`,
                    }}
                  />{" "}
                  {row.title}
                </span>
              </TableCell>
              <TableCell align="center">
                <ImagesOverlap images={row.assignedImg} />
              </TableCell>
              <TableCell align="center">Feb 12,2024</TableCell>
              <TableCell align="center">
                <span
                  className={`inline-flex items-center justify-center rounded-full w-[70px] min-h-[25px] text-sm font-500
              ${row.priority === "Low" ? "text-[#4CAF50] bg-[#4CAF502E]" : row.priority === "Medium" ? "text-[#FF5F15] bg-[#FF5F152E]" : "text-[#F44336] bg-[#F443362E]"}`}
                >
                  {row.priority}
                </span>
              </TableCell>
              <TableCell align="left" className="w-[1%]">
                <div className="flex gap-20">
                  <span className="p-2 cursor-pointer">
                    <DeleteIcon />
                  </span>
                  <span className="p-2 cursor-pointer">
                    <EditIcon />
                  </span>
                  <span className="p-2 cursor-pointer">
                    <ArrowRightCircleIcon />
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </>
      )}
    </div>
  );
};

export default DueDate;
