import React from "react";
import { Button, Checkbox, TableCell, TableRow, Theme } from "@mui/material";
import ImagesOverlap from "../../ImagesOverlap";
import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
} from "public/assets/icons/common";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useTheme } from "@mui/styles";
import { DownArrowBlack } from "public/assets/icons/projectsIcon";
import CommonTable from "../../commonTable";
interface assignee {
  tableSelectedItemDesign: string;
}
const Assignee = (props: assignee) => {
  const { tableSelectedItemDesign } = props;
  const theme: Theme = useTheme();
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
      assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
      priority: "Medium",
    },
    {
      title: "No Due date",
      defaultChecked: false,
      assignedImg: [],
      priority: "",
    },
  ];
  return (
    <div>
      {tableSelectedItemDesign === "Assignee" && (
        <CommonTable
          headings={["Title", "Assigned", "Due Date", "Priority", "Action"]}
          useBorderDesign={true}
        >
          {rows.map((row: any, index: number) => (
            <TableRow key={index}>
              <TableCell scope="row">
                <span className="flex items-center gap-10">
                  <Checkbox
                    sx={{ padding: "4px" }}
                    color="primary"
                    defaultChecked={row.defaultChecked}
                  />
                  {row.title}
                </span>
              </TableCell>
              <TableCell align="center">
                <ImagesOverlap images={row.assignedImg} />
              </TableCell>
              <TableCell align="center">Feb 12, 2024</TableCell>
              <TableCell align="center">
                <span
                  className={`inline-flex items-center justify-center rounded-full w-[70px] min-h-[25px] text-sm font-500 ${
                    row.priority === "Low"
                      ? "text-[#4CAF50] bg-[#4CAF502E]"
                      : row.priority === "Medium"
                        ? "text-[#FF5F15] bg-[#FF5F152E]"
                        : "text-[#F44336] bg-[#F443362E]"
                  }`}
                >
                  {row.priority}
                </span>
              </TableCell>
              <TableCell align="left">
                <div className="flex gap-20 px-10">
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

      <div className="border-1 border-solid border-[#D1D7DB]">
        <Button
          variant="text"
          color="secondary"
          className="h-[40px] sm:text-[16px] flex gap-2 sm:mb-[1rem] leading-none pt-10 pl-10"
          aria-label="Manage Sections"
          size="large"
          startIcon={<PlusIcon color={theme.palette.secondary.main} />}
        >
          Add Task
        </Button>
      </div>
    </div>
  );
};

export default Assignee;
