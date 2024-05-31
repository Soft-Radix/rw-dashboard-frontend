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
import AddAgentModel from "src/app/components/agents/AddAgentModel";
import { useSelector } from "react-redux";
import { AgentRootState } from "app/store/Agent/Interafce";
import { addAgent, getAgentInfo, getAgentList } from "app/store/Agent";
import { useAppDispatch } from "app/store/store";
import moment from "moment";
import ListLoading from "@fuse/core/ListLoading";
import SearchInput from "src/app/components/SearchInput";
import { debounce } from "lodash";
import { filterType } from "app/store/Client/Interface";

export default function AgentsList() {
  const agentState = useSelector((store: AgentRootState) => store.agent);
  // console.log(agentState, "as");

  const dispatch = useAppDispatch();

  const [filters, setfilters] = useState<filterType>({
    start: 0,
    limit: 10,
    search: "",
    // client_id: 0,
  });
  const theme: Theme = useTheme();

  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);

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
  // Debounce function to delay executing the search
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
  const fetchAgentList = useCallback(() => {
    dispatch(getAgentList(filters));
    // console.log(filters, "filters");
  }, [filters]);

  useEffect(() => {
    fetchAgentList();
  }, [filters]);

  return (
    <>
      <TitleBar title="Agents">
        <Button
          variant="outlined"
          color="secondary"
          className="h-[40px] text-[16px] flex gap-8 font-[600]"
          aria-label="Add Tasks"
          size="large"
          onClick={() => setIsOpenAddModal(true)}
        >
          <PlusIcon color={theme.palette.secondary.main} />
          Add Agent
        </Button>
      </TitleBar>

      <div className="px-28 mb-[3rem]">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="h-24" />
          <div className="p-[2rem]">
            <SearchInput
              name="search"
              placeholder="Search Agents"
              onChange={handleSearchChange}
            />
          </div>

          <CommonTable
            headings={[
              "ID",
              "First Name",
              "Last Name",
              "Start Date",
              "Last Login",
              "Status",
              "",
            ]}
          >
            {agentState?.list?.length === 0 &&
            agentState.status != "loading" ? (
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
            ) : agentState.status === "loading" ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <ListLoading /> {/* Render loader component */}
                </TableCell>
              </TableRow>
            ) : (
              agentState.list.map((row, index) => (
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
                  <TableCell scope="row" className="font-500 pl-[20px]">
                    {row.id}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="whitespace-nowrap font-500"
                  >
                    {row.first_name}
                  </TableCell>

                  <TableCell
                    align="center"
                    className="whitespace-nowrap font-500"
                  >
                    {row.last_name}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="whitespace-nowrap font-500"
                  >
                    {moment(row.created_at).format("MMMM Do, YYYY")}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="whitespace-nowrap font-500"
                  >
                    {moment(row.updated_at).format("MMMM Do, YYYY")}
                  </TableCell>

                  <TableCell
                    align="center"
                    className="whitespace-nowrap font-500"
                  >
                    <span
                      className={`inline-flex items-center justify-center rounded-full w-[95px] min-h-[25px] text-sm font-500
                  ${
                    row.status === "Completed"
                      ? "text-[#4CAF50] bg-[#4CAF502E]"
                      : row.status === "In Progress"
                        ? "text-[#F44336] bg-[#F443362E]"
                        : "text-[#4CAF50] bg-[#4CAF502E]"
                  }`}
                    >
                      {row.status || "Active"}
                    </span>
                  </TableCell>
                  <TableCell align="left" className="w-[1%] font-500">
                    <div className="flex gap-20 pe-20">
                      <span className="p-2 cursor-pointer">
                        <Link to={`/admin/agent-detail/${row.id}`}>
                          <ArrowRightCircleIcon />
                        </Link>
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </CommonTable>

          <div className="flex justify-end py-14 px-[3rem]">
            {agentState?.list.length > 0 && (
              <CommonPagination
                count={agentState?.total_records}
                onChange={(e, PageNumber: number) =>
                  checkPageNum(e, PageNumber)
                }
                page={filters.start + 1}
              />
            )}
          </div>
        </div>
      </div>

      <AddAgentModel
        isOpen={isOpenAddModal}
        setIsOpen={setIsOpenAddModal}
        fetchAgentList={fetchAgentList}
        isEditing={false}
      />
    </>
  );
}
