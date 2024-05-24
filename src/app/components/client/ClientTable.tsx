import { Checkbox, TableCell, TableRow, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { ArrowRightCircleIcon } from "public/assets/icons/common";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddNewTicket from "src/app/components/support/AddNewTicket";
import ListLoading from "@fuse/core/ListLoading";
import moment from "moment";
import { sortColumn } from "app/store/Client";
import { useAppDispatch } from "app/store/store";
import { sortList } from "src/utils";
import Table from "material-ui/Table/Table";

function ClientTable({
  clientState,
  handleSelectAll,
  selectedIds,
  handleCheckboxChange,
  setfilters,
  filters,
  status = true,
}) {
  const theme: Theme = useTheme();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const dispatch = useAppDispatch();

  const sortData = (column: string) => {
    const isAsc = sortBy === column && sortOrder === "asc";
    setSortBy(column);
    setSortOrder(isAsc ? "desc" : "asc");
    dispatch(sortColumn(sortList(column, isAsc, clientState?.list)));
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

  if (clientState.status === "loading") {
    return <ListLoading />;
  }
  const checkPageNum = (e: any, pageNumber: number) => {
    // console.log(pageNumber, "rr");
    setfilters((prevFilters) => {
      if (pageNumber !== prevFilters.start + 1) {
        return {
          ...prevFilters,
          start: pageNumber - 1,
        };
      }
      return prevFilters; // Return the unchanged filters if the condition is not met
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm">
        <CommonTable
          headings={
            clientState?.selectedColumn?.length > 0
              ? clientState?.selectedColumn
              : status
                ? ["ID", "Name", "Company Name", "Date", "Status", ""]
                : ["ID", "Name", "Company Name", "Date", ""]
          }
          sortColumn={sortBy}
          isSorting={true}
          sortOrder={sortOrder}
          onSort={sortData}
          handleSelectAll={handleSelectAll}
        >
          {clientState?.list.length == 0 ? (
            <TableRow
              sx={{
                "& td": {
                  borderBottom: "1px solid #EDF2F6",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  color: theme.palette.primary.main,
                },
              }}
            >
              <TableCell colSpan={5} align="center">
                <span className="font-bold text-20 text-[#e4e4e4]">
                  No Data Found
                </span>
              </TableCell>
            </TableRow>
          ) : (
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
                  {renderCell("Id") && (
                    <TableCell scope="row" className="font-500">
                      <div
                        className="flex items-center pe-[3.25rem] cursor-pointer"
                        onClick={() => handleCheckboxChange(row.id)}
                      >
                        <Checkbox
                          sx={{ padding: "4px" }}
                          color="secondary"
                          checked={selectedIds.includes(row.id)}
                          inputProps={{
                            "aria-labelledby": `table-checkbox-${index}`,
                          }}
                        />{" "}
                        <div className="flex ml-10 grow">#{row.id}</div>
                      </div>
                    </TableCell>
                  )}
                  {renderCell("Name") && (
                    <TableCell
                      align="left"
                      className="whitespace-nowrap font-500"
                    >
                      {row.first_name + " " + row.last_name}
                    </TableCell>
                  )}

                  {renderCell("Company Name") && (
                    <TableCell
                      align="left"
                      className="whitespace-nowrap font-500"
                    >
                      {row.company_name}
                    </TableCell>
                  )}
                  {renderCell("Date") && (
                    <TableCell
                      align="left"
                      className="whitespace-nowrap font-500"
                    >
                      {moment(row.created_at).format("ll")}
                    </TableCell>
                  )}
                  {status && renderCell("Status") && (
                    <TableCell
                      align="left"
                      className="whitespace-nowrap font-500"
                    >
                      <span
                        className={`inline-flex items-center justify-center rounded-full w-[70px] min-h-[25px] text-sm font-500
    ${
      row.subcription_status === "Active"
        ? "text-[#4CAF50] bg-[#DFF1E0]" // Red for Active
        : row.subcription_status === "Pending"
          ? "text-[#FFC107] bg-[#FFEEBB]" // Yellow for Pending
          : row.subcription_status === "Suspended"
            ? "text-[#FF0000] bg-[#FFD1D1]" // Green for Suspended
            : row.subcription_status === "Cancelled"
              ? "text-[#FF5C00] bg-[#FFE2D5]" // Brown for Cancelled
              : ""
    }`}
                      >
                        {row.subcription_status}
                      </span>
                    </TableCell>
                  )}

                  <TableCell scope="row">
                    <Link to={`/admin/client/detail/${row.id}`}>
                      <ArrowRightCircleIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </>
          )}
        </CommonTable>
        <div className="flex justify-end py-14 px-[3rem]">
          {clientState?.list.length > 0 && (
            <CommonPagination
              count={clientState?.total_records}
              page={filters.start + 1}
              onChange={(event, pageNumber) => checkPageNum(event, pageNumber)}
              onPageChange={function (
                event: ChangeEvent<unknown>,
                page: number
              ): void {
                throw new Error("Function not implemented.");
              }}
              currentPage={0}
            />
          )}
        </div>
      </div>
      <AddNewTicket isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
    </>
  );
}

export default ClientTable;
