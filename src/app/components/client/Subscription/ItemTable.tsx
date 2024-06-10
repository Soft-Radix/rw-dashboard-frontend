import { useEffect, useState } from "react";
import CommonTable from "../../commonTable";

import { TableCell, TableRow, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { getLabelByValue } from "src/utils";

const rows = [
  {
    name: "Penelope",
    agents: "Feb 13, 2024",
    task: "Lorem ipsum dolor sit amet",
    DueDate: 300,
    status: "Unassigned",
  },
  {
    name: "Penelope",
    agents: "Feb 13, 2024",
    task: "Lorem ipsum dolor sit amet",
    DueDate: 300,
    status: "Unassigned",
  },
  {
    name: "Penelope",
    agents: "Feb 13, 2024",
    task: "Lorem ipsum dolor sit amet",
    DueDate: 300,
    status: "Unassigned",
  },
  {
    name: "Penelope",
    agents: "Feb 13, 2024",
    task: "Lorem ipsum dolor sit amet",
    DueDate: 300,
    status: "Unassigned",
  },
];
const ItemTable = ({ row }) => {
  const theme = useTheme();
  const [filterMenu, setFilterMenu] = useState<HTMLElement | null>(null);
  const [data, setData] = useState(row?.subscription_plans);
  const formik = useFormik({
    initialValues: {
      month: "",
      year: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => {},
  });
  useEffect(() => {
    setData(row?.subscription_plans);
  }, [row]);
  return (
    <div className="bg-white rounded-lg shadow-sm py-[2rem] mx-28 mb-[3rem]">
      <div className="flex items-center justify-between  pb-24 px-[2rem] ">
        <h5 className="text-title text-xl font-600 flex items-center gap-12">
          Subscription Details
        </h5>
      </div>
      <CommonTable
        headings={["Product Name", "Frequency", "Unit Price", "Quantity"]}
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
          {data?.map((row, index) => (
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
                className="flex items-center gap-8 font-500 flex-col sm:flex-row"
              >
                {row?.product_name ? row?.product_name : "---"}
              </TableCell>
              <TableCell align="center" className="font-500">
                {getLabelByValue(row.billing_frequency)}
              </TableCell>
              <TableCell align="center" className="font-500">
                $ {row?.unit_price ? row?.unit_price : "---"}
              </TableCell>
              <TableCell align="center" className="whitespace-nowrap font-500">
                {row?.quantity ? row?.quantity : "---"}
              </TableCell>
            </TableRow>
          ))}
        </>
      </CommonTable>
    </div>
  );
};

export default ItemTable;
