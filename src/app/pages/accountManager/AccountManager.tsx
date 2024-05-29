import {
  Button,
  Checkbox,
  TableCell,
  TableRow,
  Theme,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
  NoDataFound,
} from "public/assets/icons/common";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import ImagesOverlap from "src/app/components/ImagesOverlap";
import TitleBar from "src/app/components/TitleBar";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddGroupModel from "src/app/components/agents/AddGroupModel";
import SearchInput from "src/app/components/SearchInput";
import AddAccountManagerModel from "src/app/components/accountManager/AddAccountmanagerModal";
import {
  AccManagerRootState,
  filterType,
} from "app/store/AccountManager/Interface";
import { RootState, useAppDispatch } from "app/store/store";
import {
  changeFetchStatus,
  deleteAccManager,
  getAccManagerInfo,
  getAccManagerList,
} from "app/store/AccountManager";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import DeleteClient from "src/app/components/client/DeleteClient";

export default function AccountManager() {
  const accountManager_Id = useParams();
  console.log(accountManager_Id, "kk");

  const dispatch = useAppDispatch();
  const accManagerState = useSelector(
    (state: RootState) => state.accManagerSlice
  );
  //@ts-ignore
  // console.log("accManage========rttState.", accManagerState?.list?.length > 0);
  // console.log(accManagerState?.list?.data?.list, "managerList");

  const theme: Theme = useTheme();
  const formik = useFormik({
    initialValues: {
      role: "",
      verification: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => {
      // console.log(values, "kk");
    },
  });
  const debouncedSearch = debounce((searchValue) => {
    // Update the search filter here
    setfilters((prevFilters) => ({
      ...prevFilters,
      search: searchValue,
    }));
  }, 300); // Adjust the delay as needed (300ms in this example)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSearch(value);
  };

  const [isOpenSupportDetail, setIsOpenDetailPage] = useState<boolean>(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [deleteId, setIsDeleteId] = useState<number>(null);
  const [filters, setfilters] = useState<filterType>({
    start: 0,
    limit: 10,
    search: "",
  });
  const fetchManagerList = useCallback(() => {
    dispatch(getAccManagerList(filters));
  }, [filters]);
  useEffect(() => {
    fetchManagerList();
    setIsOpenAddModal(false);
    dispatch(changeFetchStatus());
  }, [fetchManagerList]);
  // Include necessary dependencies for useEffect
  const [isOpenDeletedModal, setIsOpenDeletedModal] = useState(false);
  // Other component logic

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
  // if (payload?.data?.status) {
  //   setManagerFilterMenu((prevFilters) => ({
  //     ...prevFilters,
  //     start: assignAccManagerDetail.length - 1 == 0 ? 0 : prevFilters.start,
  //   }));
  //   dispatch(
  //     getAccManagerList({ ...managerfilterMenu, client_id: client_id })
  //   );

  const deleteAccManagerList = async (id: any) => {
    if (!!accManagerState.actionStatus || !id) return;
    try {
      const { payload } = await dispatch(
        deleteAccManager({ accountManger_id: id })
      );

      if (payload?.data?.status) {
        setfilters((prevFilters) => ({
          ...prevFilters,
          start: accManagerState?.list?.length === 1 ? 0 : prevFilters.start,
        }));
        setIsOpenDeletedModal(false);
        setIsDeleteId(null);
      }
    } catch (error) {
      console.error("Failed to delete agent group:", error);
    }
  };
  return (
    <>
      <TitleBar title="Account Manager">
        <Button
          variant="outlined"
          color="secondary"
          className="h-[40px] text-[16px] flex gap-8 font-[600] sm:leading-3 leading-0"
          aria-label="Add New Group"
          size="large"
          onClick={() => setIsOpenAddModal(true)}
          startIcon={<PlusIcon color={theme.palette.secondary.main} />}
        >
          Add Manager
        </Button>
      </TitleBar>
      <div className="px-28 mb-[3rem]">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-[2rem]">
            <SearchInput
              name="search"
              placeholder="Search agents"
              onChange={(e) => handleSearchChange(e)}
            />
          </div>
          <CommonTable
            headings={["ID", "First Name", "Last Name", "Email", "Status", ""]}
          >
            {accManagerState?.list?.length === 0 ? (
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
                      <p className="text-[16px] font-300 text-[#757982] leading-4 pt-20">
                        No data has been added yet. Please input the
                      </p>
                      <p className="text-[16px] font-300 text-[#757982] leading-4 pt-10">
                        necessary information to proceed.
                      </p>
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {accManagerState?.list?.length > 0 &&
                  accManagerState?.list?.map((row: any, index: number) => (
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
                      <TableCell scope="row" className="text-[14px] font-500">
                        {row.id}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="whitespace-nowrap text-[14px] font-500"
                      >
                        {row.first_name}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="whitespace-nowrap text-[14px] font-500"
                      >
                        {row.last_name}
                      </TableCell>
                      <TableCell
                        align="center"
                        className="whitespace-nowrap text-[14px] font-500"
                      >
                        {row.email}
                      </TableCell>

                      <TableCell
                        align="center"
                        className="whitespace-nowrap text-[14px] font-500"
                      >
                        <span
                          className={`inline-flex items-center justify-center rounded-full w-[95px] min-h-[25px] text-sm font-500
                      ${
                        row.status === "Active"
                          ? "text-[#4CAF50] bg-[#4CAF502E]"
                          : row.status === "Suspended"
                            ? "text-[#F44336] bg-[#F443362E]"
                            : "text-[#4CAF50] bg-[#4CAF502E]"
                      }`}
                        >
                          {row.status || "Active"}
                        </span>
                      </TableCell>
                      <TableCell
                        align="center"
                        className="whitespace-nowrap text-[14px] font-500 cursor-pointer"
                      >
                        <div className="flex items-center gap-10">
                          <DeleteIcon
                            onClick={() => {
                              setIsOpenDeletedModal(true);
                              setIsDeleteId(row.id);
                            }}
                          />
                          {/* <DeleteIcon onClick={() => deleteAccManger(row.id)} /> */}
                          <Link to={`/admin/acc-manager/detail/${row.id}`}>
                            <ArrowRightCircleIcon />
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </>
            )}
          </CommonTable>
          <div className="flex justify-end py-14 px-[3rem]">
            <CommonPagination
              count={accManagerState?.total_records}
              page={filters.start + 1}
              onChange={(event, pageNumber) => checkPageNum(event, pageNumber)}
            />
          </div>
        </div>
      </div>
      <AddAccountManagerModel
        isOpen={isOpenAddModal}
        setIsOpen={setIsOpenAddModal}
        isEditing={false}
        fetchManagerList={fetchManagerList}
      />
      <DeleteClient
        isOpen={isOpenDeletedModal}
        setIsOpen={setIsOpenDeletedModal}
        onDelete={() => deleteAccManagerList(deleteId)}
        heading={"Delete Account Manager"}
        description={"Are you sure you want to delete this Account Manager  ? "}
      />
    </>
  );
}
