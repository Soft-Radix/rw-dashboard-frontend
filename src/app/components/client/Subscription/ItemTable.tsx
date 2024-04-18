import { useState } from "react";
import CommonTable from "../../commonTable";

import { TableCell, TableRow, useTheme } from "@mui/material";
import { useFormik } from "formik";

const rows = [
  {
    name: "Penelope",
    agents: "Feb 13, 2024",
    task: "Lorem ipsum dolor sit amet",
    DueDate: 300,
    status: "PDF",
  },
  {
    name: "Penelope",
    agents: "Feb 13, 2024",
    task: "Lorem ipsum dolor sit amet",
    DueDate: 300,
    status: "PDF",
  },
  {
    name: "Penelope",
    agents: "Feb 13, 2024",
    task: "Lorem ipsum dolor sit amet",
    DueDate: 300,
    status: "PDF",
  },
  {
    name: "Penelope",
    agents: "Feb 13, 2024",
    task: "Lorem ipsum dolor sit amet",
    DueDate: 300,
    status: "PDF",
  },
];
const ItemTable = () => {
  const theme = useTheme();
  const [filterMenu, setFilterMenu] = useState<HTMLElement | null>(null);

  const formik = useFormik({
    initialValues: {
      month: "",
      year: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => {},
  });
  return (
    <div className="bg-white rounded-lg shadow-sm py-[2rem] mx-28 mb-[3rem]">
      <div className="flex items-center justify-between  py-24 px-[2rem] ">
        <h5 className="text-title text-xl font-600 flex items-center gap-12">
          Billing History
        </h5>
      </div>
      <CommonTable
        headings={["Agents", "Task", "DueDate", "Status"]}
        headingRowProps={{
          sx: {
            textAlign: "center",
            "& th:last-child": {
              textAlign: "center",
            },
          },
        }}
      >
        <>
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
              <TableCell
                scope="row"
                className="flex items-center gap-8 font-500"
              >
                <img
                  src={`../assets/images/avatars/male-01.jpg`}
                  className="w-[34px] rounded-full"
                />
                {row.name}
              </TableCell>
              <TableCell align="center">{row.task}</TableCell>
              <TableCell align="center">${row.DueDate}</TableCell>
              <TableCell align="center" className="whitespace-nowrap">
                <span
                  className={`inline-flex items-center justify-center rounded-full w-[95px] min-h-[25px] text-sm font-500
                      ${row.status === "Unassigned" ? "text-secondary bg-secondary_bg" : row.status === "Unassigned" ? "text-[#F44336] bg-[#F443362E]" : "text-[#F0B402] bg-[#FFEEBB]"}`}
                >
                  {row.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </>
      </CommonTable>
    </div>
  );
};

export default ItemTable;
