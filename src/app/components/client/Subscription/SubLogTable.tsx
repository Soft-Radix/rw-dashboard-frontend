import { useState } from "react";
import CommonTable from "../../commonTable";

import { TableCell, TableRow, useTheme } from "@mui/material";
import { useFormik } from "formik";

const rows = [
  {
    title: "Lorem ipsum dolor sit amet",
    Date: 300,
    status: "PDF",
  },
  {
    title: "Lorem ipsum dolor sit amet",
    Date: 300,
    status: "PDF",
  },
  {
    title: "Lorem ipsum dolor sit amet",
    Date: 300,
    status: "PDF",
  },
  {
    title: "Lorem ipsum dolor sit amet",
    Date: 300,
    status: "PDF",
  },
];
const SubLogTable = () => {
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
    <div className="bg-white rounded-lg shadow-sm py-[2rem] mx-28">
      <div className="flex items-center justify-between   px-[2rem] mb-10">
        <h5 className="text-title text-xl font-600 flex items-center gap-12">
          Subscription Log
        </h5>
      </div>
      <CommonTable
        headings={["Title", "Date", "Status"]}
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
              <TableCell scope="row">{row.title}</TableCell>
              <TableCell align="center">${row.Date}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
            </TableRow>
          ))}
        </>
      </CommonTable>
    </div>
  );
};

export default SubLogTable;
