import { Checkbox, TableCell, TableRow, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
} from "public/assets/icons/common";
import CommonTable from "../commonTable";
import ImagesOverlap from "../ImagesOverlap";
// import DueDate from "./DueDate";
import { useState } from "react";
import { DownArrowBlack, SortIcon } from "public/assets/icons/projectsIcon";
import DueDate from "../projects/DueDate";

const rows = [
  {
    title: "Brand logo design",
    defaultChecked: true,
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    priority: "Medium",
  },
  {
    title: "Brand logo design",
    defaultChecked: true,
    assignedImg: [
      "female-01.jpg",
      "female-02.jpg",
      "female-03.jpg",
      "female-04.jpg",
      "female-05.jpg",
    ],
    priority: "Medium",
  },
  {
    title: "Brand logo design",
    defaultChecked: false,
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    priority: "Medium",
  },
  {
    title: "Brand logo design",
    defaultChecked: false,
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    priority: "Low",
  },
  {
    title: "Brand logo design",
    defaultChecked: false,
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    priority: "High",
  },
  {
    title: "Brand logo design",
    defaultChecked: false,
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    priority: "Low",
  },
  {
    title: "Brand logo design",
    defaultChecked: false,
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    priority: "High",
  },
];

function ThemePageTable(props) {
  const { tableSelectedItemDesign, selectedTab } = props;
  const theme: Theme = useTheme();
  console.log(selectedTab, "5547747474");

  return (
    <>
      {tableSelectedItemDesign == "Due Date" ? (
        <>
          <CommonTable
            headings={["Title", "Assigned", "Due Date", "Priority", "Action"]}
          >
            <div></div>
          </CommonTable>
          <div className="flex flex-col gap-5">
            <DueDate
              rows={rows}
              title={"Overdue (2)"}
              className="text-lg font-medium text-[#F44336]"
            />
            <DueDate
              title={"No Due Date (5)"}
              rows={rows}
              className="text-lg font-medium text-[#757982]"
            />
          </div>
        </>
      ) : (
        <CommonTable
          headings={["Title", "Assigned", "Due Date", "Priority", "Action"]}
        >
          {rows.map((row, index) => (
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
        </CommonTable>
      )}
    </>
  );
}

export default ThemePageTable;
