//agentgroup
import ListLoading from "@fuse/core/ListLoading";
import { Button, TableCell, TableRow, Theme, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { deleteAgentGroup, getAgentGroupList } from "app/store/Agent group";
import {
  AgentGroupRootState,
  filterType,
} from "app/store/Agent group/Interface";
import { useAppDispatch } from "app/store/store";
import { useFormik } from "formik";
import { DeleteIcon, EditIcon, NoDataFound } from "public/assets/icons/common";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import SearchInput from "src/app/components/SearchInput";
import TitleBar from "src/app/components/TitleBar";
import AddGroupModel from "src/app/components/agents/AddGroupModel";
import DeleteClient from "src/app/components/client/DeleteClient";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";

export default function AgentsGroup() {
  const group_id = useParams();
  const agentGroupState = useSelector(
    (store: AgentGroupRootState) => store.agentGroup
  );

  // console.log(agentGroupState, "as");

  const dispatch = useAppDispatch();
  const theme: Theme = useTheme();
  const formik = useFormik({
    initialValues: {
      role: "",
      verification: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => {},
  });

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [deleteId, setIsDeleteId] = useState<number>(null);
  const [isOpenDeletedModal, setIsOpenDeletedModal] = useState(false);
  const [isOpenSupportDetail, setIsOpenDetailPage] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const [filters, setfilters] = useState<filterType>({
    start: 0,
    limit: 10,
    search: "",
  });
  const { limit, search, start } = filters;
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
  const deleteGroup = async (id: any) => {
    // console.log(id, "id");
    if (!!agentGroupState.actionStatusDisabled || !id) return;
    try {
      const { payload } = await dispatch(deleteAgentGroup({ group_id: id }));
      // console.log(payload, "payload");

      if (payload?.data?.status) {
        setfilters((prevFilters) => ({
          ...prevFilters,
          start: agentGroupState.list.length - 1 == 0 ? 0 : prevFilters.start,
        }));
        setIsOpenDeletedModal(false);
        setIsDeleteId(null);
        dispatch(getAgentGroupList(filters));
      }
    } catch (error) {
      // console.error("Failed to delete agent group:", error);
    }
  };
  // Debounce function to delay executing the search
  // const debouncedSearch = debounce((searchValue) => {
  //   // Update the search filter here
  //   setfilters((prevFilters) => ({
  //     ...prevFilters,
  //     start: 0,
  //     search: searchValue,
  //   }));
  // }, 300);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setfilters((prevFilters) => ({
        ...prevFilters,
        search: inputValue,
        start: 0,
      }));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue, 500]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    // debouncedSearch(value);
  };
  const fetchAgentGroupList = () => {
    dispatch(getAgentGroupList(filters));
  };

  useEffect(() => {
    dispatch(getAgentGroupList(filters));
  }, [limit, start, search]);

  const handleInputClear = () => {
    setInputValue("");
    setfilters((prevFilters) => ({
      ...prevFilters,
      search: "",
      start: 0,
    }));
  };

  return (
    <>
      <TitleBar title="Agents Groups">
        <Button
          variant="outlined"
          color="secondary"
          className="h-[40px] text-[16px] flex gap-8 font-[600] leading-none"
          aria-label="Add New Group"
          size="large"
          onClick={() => {
            setIsOpenAddModal(true);
          }}
        >
          <PlusIcon color={theme.palette.secondary.main} />
          Add New Group
        </Button>
      </TitleBar>
      <div className="px-28 mb-[3rem]">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-[2rem]">
            <SearchInput
              name="search"
              placeholder="Search agents group"
              onChange={handleSearchChange}
              handleInputClear={handleInputClear}
              inputValue={inputValue}
            />
          </div>
          <CommonTable
            headings={["ID", "Group Name", "Number of Agents", "Action"]}
          >
            {" "}
            {agentGroupState?.list?.length === 0 &&
            agentGroupState?.status !== "loading" ? (
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
            ) : agentGroupState.status === "loading" ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <ListLoading /> {/* Render loader component */}
                </TableCell>
              </TableRow>
            ) : (
              <>
                {agentGroupState?.list?.map((row, index) => {
                  // console.log(row, "row");
                  return (
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
                      <TableCell scope="row" className="px-[20px]">
                        {row.id}
                      </TableCell>
                      <TableCell align="center" className="whitespace-nowrap">
                        {row.group_name}
                      </TableCell>

                      <TableCell align="center" className="whitespace-nowrap">
                        {row.members_count}
                      </TableCell>

                      <TableCell align="center" className="w-[1%]">
                        <div className="flex gap-20 pe-20">
                          <span
                            className="p-2 cursor-pointer"
                            // onClick={deleteGroup}
                          >
                            <DeleteIcon
                              onClick={() => {
                                setIsOpenDeletedModal(true);
                                setIsDeleteId(row.id);
                              }}
                            />
                          </span>
                          <span className="p-2 cursor-pointer">
                            <Link to={`/admin/agents/groups/${row.id}`}>
                              <EditIcon />
                            </Link>
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </>
            )}
          </CommonTable>
          <div className="flex justify-end py-14 px-[3rem]">
            {agentGroupState?.total_records > 1 && (
              <CommonPagination
                count={agentGroupState?.total_records}
                page={filters.start + 1}
                onChange={(event, pageNumber) =>
                  checkPageNum(event, pageNumber)
                }
              />
            )}
          </div>
        </div>
      </div>
      <AddGroupModel
        isOpen={isOpenAddModal}
        setIsOpen={setIsOpenAddModal}
        isNewAgent={false}
        fetchAgentGroupList={fetchAgentGroupList}
      />
      <DeleteClient
        isOpen={isOpenDeletedModal}
        setIsOpen={setIsOpenDeletedModal}
        onDelete={() => deleteGroup(deleteId)}
        heading={"Delete Group"}
        description={"Are you sure you want to delete this Group? "}
      />
    </>
  );
}
