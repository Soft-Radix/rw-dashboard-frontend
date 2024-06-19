import ListLoading from "@fuse/core/ListLoading";
import {
  Button,
  Checkbox,
  Menu,
  TableCell,
  TableRow,
  Theme,
  MenuItem,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { UpdateStatus, sortColumn } from "app/store/Client";
import { useAppDispatch } from "app/store/store";
import moment from "moment";
import {
  ArrowRightCircleIcon,
  DownGreenIcon,
  NoDataFound,
} from "public/assets/icons/common";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddNewTicket from "src/app/components/support/AddNewTicket";
import { sortList } from "src/utils";
import ClientStatus from "./Subscription/ClientStatus";

function ClientTable({
  clientState,
  handleSelectAll,
  selectedIds,
  handleCheckboxChange,
  setfilters,
  filters,
  status = true,
  isAllSelected = false,
}) {
  const theme: Theme = useTheme();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [anchorEl, setAnchorEl] = useState(null); // State to manage anchor element for menu
  const [selectedItem, setSelectedItem] = useState("Active");
  // Open menu handler
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Set anchor element to the clicked button
  };

  // Close menu handler
  const handleClose = () => {
    setAnchorEl(null); // Reset anchor element to hide the menu
  };
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

  const handleMenuItemClick = async (status, id) => {
    setSelectedItem(status);
    const res = await dispatch(
      UpdateStatus({
        user_id: id,
        status: status == "InActive" ? 2 : 1,
      })
    );

    // setList(res?.payload?.data?.data?.list);
    toast.success(res?.payload?.data?.message);
    handleClose(); // Close the menu after handling the click
  };
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm">
        <CommonTable
          headings={
            clientState?.selectedColumn?.length > 0
              ? clientState?.selectedColumn
              : status
              ? [
                  "ID",
                  "Name",
                  "Company Name",
                  "Joining Date",
                  "Subscription Status",
                  "Account Status",

                  "",
                ]
              : ["ID", "Name", "Company Name", "Joining Date", ""]
          }
          sortColumn={sortBy}
          isSorting={true}
          sortOrder={sortOrder}
          onSort={sortData}
          handleSelectAll={handleSelectAll}
          isAllSelected={isAllSelected}
        >
          {clientState?.list?.length == 0 ? (
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
              <TableCell colSpan={7} align="center">
                <div
                  className="flex flex-col justify-center align-items-center gap-20 bg-[#F7F9FB] min-h-[400px] py-40"
                  style={{ alignItems: "center" }}
                >
                  <NoDataFound />
                  <Typography className="text-[24px] text-center font-600 leading-normal">
                    No data found !
                  </Typography>
                </div>
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
                  {renderCell("Joining Date") && (
                    <TableCell
                      align="left"
                      className="whitespace-nowrap font-500"
                    >
                      {moment(row.created_at).format("ll")}
                    </TableCell>
                  )}
                  {status && renderCell("Subscription Status") && (
                    <TableCell
                      align="left"
                      className="whitespace-nowrap font-500"
                    >
                      <span
                        className={`inline-flex items-center justify-center rounded-full w-[90px] min-h-[25px] text-sm font-500
                        ${
                          row.subscription_status == "Active"
                            ? "text-[#4CAF50] bg-[#DFF1E0]" // Red for Active
                            : row.subscription_status == "Pending"
                            ? "text-[#FFC107] bg-[#FFEEBB]" // Yellow for Pending
                            : row.subscription_status == "Suspended"
                            ? "text-[#FF0000] bg-[#FFD1D1]" // Green for Suspended
                            : row.subscription_status == "Cancelled"
                            ? "text-[#FF5C00] bg-[#FFE2D5]" // Brown for Cancelled
                            : ""
                        }`}
                      >
                        {row.subscription_status || "N/A"}
                      </span>
                    </TableCell>
                  )}

                  {status && renderCell("Account Status") && (
                    <TableCell
                      align="left"
                      className="whitespace-nowrap font-500"
                    >
                      {/* <span
                        className={`inline-flex items-center justify-center rounded-full w-[90px] min-h-[25px] text-sm font-500
                        ${
                          row.status == "Active"
                            ? "text-[#4CAF50] bg-[#DFF1E0]" // Red for Active
                            : "text-[#FF5C00] bg-[#FFE2D5]" // Brown for Cancelled
                        }`}
                      >
                        {row.status || "N/A"}
                      </span> */}

                      <ClientStatus rowstatus={row.status} id={row.id} />
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
