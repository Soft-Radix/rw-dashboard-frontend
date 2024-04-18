import { useState } from "react";
import CommonTable from "../../commonTable";

import { TableCell, TableRow, useTheme } from "@mui/material";
import { useFormik } from "formik";

const rows = [
  {
    agents: "Feb 13, 2024",
    task: "Lorem ipsum dolor sit amet",
    DueDate: 300,
    status: "PDF",
  },
  {
    agents: "Feb 13, 2024",
    task: "Lorem ipsum dolor sit amet",
    DueDate: 300,
    status: "PDF",
  },
  {
    agents: "Feb 13, 2024",
    task: "Lorem ipsum dolor sit amet",
    DueDate: 300,
    status: "PDF",
  },
  {
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
    <div>
      <div className="flex items-center justify-between  py-24 px-[2rem]">
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
              <TableCell scope="row">{row.agents}</TableCell>
              <TableCell align="left">{row.task}</TableCell>
              <TableCell align="left">${row.DueDate}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
            </TableRow>
          ))}
        </>
      </CommonTable>
    </div>
  );
};

export default ItemTable;
