import { Checkbox, TableCell, TableRow, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
} from "public/assets/icons/common";
import { CalenderIcon, SortIcon } from "public/assets/icons/projectsIcon";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddNewTicket from "src/app/components/support/AddNewTicket";
import ListLoading from "@fuse/core/ListLoading";
import moment from "moment";
import { sortColumn } from "app/store/Client";
import { useAppDispatch } from "app/store/store";
import { sortList } from "src/utils";

const columnKey = {
  ID: "id",
  Name: "first_name",
  ['Company Name']: "company_name",
  Date: "date",
  Status: "status",
};

function ClientTable({ clientState }) {
  const theme: Theme = useTheme();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const dispatch = useAppDispatch()

  const sortData = (column: string) => {
    const isAsc = sortBy === column && sortOrder === "asc";
    setSortBy(column);
    setSortOrder(isAsc ? "desc" : "asc");
    dispatch(sortColumn(sortList(column, isAsc, clientState?.list)))
  };

  const renderCell = (cellId: string): boolean => {
    const { selectedColumn } = clientState ?? {};
    // If there's no selectedColumn or it's empty, always return true
    if (!selectedColumn || selectedColumn.length === 0) {
      return true;
    }
    // Return true if the cellId is in the selectedColumn array
    return selectedColumn.includes(cellId);
  };

  if (clientState.status === 'loading') {
    return <ListLoading />
  }
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm">
        <CommonTable
          headings={clientState?.selectedColumn?.length > 0 ? clientState?.selectedColumn :
            ["ID", "Name", "Company Name", "Date", "Status", ""]}
          sortColumn={sortBy}
          isSorting={true}
          sortOrder={sortOrder}
          onSort={sortData}
        >
          <>
            {clientState?.list.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "& td": {
                    borderBottom: "1px solid #EDF2F6",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    color: theme.palette.primary.main,
                  },
                }}
              >
                {renderCell('Id') &&
                  <TableCell scope="row" className="font-500">
                    <div className="flex items-center pe-[3.25rem]">
                      <Checkbox
                        sx={{ padding: "4px" }}
                        color="secondary"
                        defaultChecked={row.defaultChecked}
                        inputProps={{
                          "aria-labelledby": `table-checkbox-${index}`,
                        }}
                      />{" "}
                      <div className="flex ml-10 grow">
                        #{row.id}
                      </div>
                    </div>
                  </TableCell>
                }
                {renderCell('Name') &&
                  <TableCell align="left" className="whitespace-nowrap font-500">
                    {row.first_name + " " + row.last_name}
                  </TableCell>
                }

                {renderCell('Company Name') &&
                  <TableCell align="left" className="whitespace-nowrap font-500">
                    {row.company_name}
                  </TableCell>
                }
                {renderCell('Date') &&
                  <TableCell align="left" className="whitespace-nowrap font-500">
                    {moment(row.created_at).format('ll')}
                  </TableCell>
                }
                {renderCell('Status') &&
                  <TableCell align="center" className="whitespace-nowrap font-500">
                    <span
                      className={`inline-flex items-center justify-center rounded-full w-[70px] min-h-[25px] text-sm font-500
                    ${row.status === "Enabled" ? "text-[#4CAF50] bg-[#4CAF502E]" : "text-[#F44336] bg-[#F443362E]"}`}
                    >
                      {row.status || 'N/A'}
                    </span>
                  </TableCell>
                }

                <TableCell scope="row">
                  <Link to={`/admin/client/detail/${row.id}`}>
                    <ArrowRightCircleIcon />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </>
        </CommonTable>
        <div className="flex justify-end py-14 px-[3rem]">
          <CommonPagination count={1} />
        </div>
      </div>
      <AddNewTicket isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
    </>
  );
}

export default ClientTable