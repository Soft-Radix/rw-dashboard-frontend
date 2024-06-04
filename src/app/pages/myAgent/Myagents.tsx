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
import { GetAssignAgentsInfo } from "app/store/Client";

export default function Myagents() {
  const agentState = useSelector((store: AgentRootState) => store.agent);
  // console.log(agentState, "as");

  const dispatch = useAppDispatch();
  const client_id = JSON.parse(localStorage.getItem("userDetail"));
  const [filters, setfilters] = useState<filterType>({
    start: 0,
    limit: 10,
    search: "",
    // client_id: 0,
  });
  const theme: Theme = useTheme();
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("");
  const agentState1 = {
    list: [
      {
        id: 497,
        user_id: 419,
        agent_id: 273,
        type: 1,
        assigned_date: 1717420362,
        deleted_at: null,
        created_at: "2024-06-03T13:12:42.000Z",
        updated_at: "2024-06-03T13:12:42.000Z",
        userName: "dfsfds dsfdf",
        assigned_date_time: "June 3, 2024",
        first_name: "dfsfds",
        last_name: "dsfdf",
        user_image: null,
        status: "Active",
      },
      {
        id: 496,
        user_id: 419,
        agent_id: 274,
        type: 1,
        assigned_date: 1717420362,
        deleted_at: null,
        created_at: "2024-06-03T13:12:42.000Z",
        updated_at: "2024-06-03T13:12:42.000Z",
        userName: "regd fdggd",
        assigned_date_time: "June 3, 2024",
        first_name: "regd",
        last_name: "fdggd",
        user_image: null,
        status: "Active",
      },
      {
        id: 495,
        user_id: 419,
        agent_id: 275,
        type: 1,
        assigned_date: 1717420362,
        deleted_at: null,
        created_at: "2024-06-03T13:12:42.000Z",
        updated_at: "2024-06-03T13:12:42.000Z",
        userName: "sadasd sadsd",
        assigned_date_time: "June 3, 2024",
        first_name: "sadasd",
        last_name: "sadsd",
        user_image: "Users/275/1716900300894-rcw.png",
        status: "Active",
      },
      {
        id: 493,
        user_id: 419,
        agent_id: 278,
        type: 1,
        assigned_date: 1717420362,
        deleted_at: null,
        created_at: "2024-06-03T13:12:42.000Z",
        updated_at: "2024-06-03T13:12:42.000Z",
        userName: "NewAgent fsfsf",
        assigned_date_time: "June 3, 2024",
        first_name: "NewAgent",
        last_name: "fsfsf",
        status: "Active",
        user_image: null,
      },
      {
        id: 492,
        user_id: 419,
        agent_id: 292,
        type: 1,
        assigned_date: 1717420362,
        deleted_at: null,
        created_at: "2024-06-03T13:12:42.000Z",
        updated_at: "2024-06-03T13:12:42.000Z",
        userName: "dsad dsad",
        assigned_date_time: "June 3, 2024",
        first_name: "dsad",
        last_name: "dsad",
        user_image: null,
        status: "Active",
      },
      {
        id: 491,
        user_id: 419,
        agent_id: 311,
        type: 1,
        assigned_date: 1717420362,
        deleted_at: null,
        created_at: "2024-06-03T13:12:42.000Z",
        updated_at: "2024-06-03T13:12:42.000Z",
        userName: "xass ass",
        assigned_date_time: "June 3, 2024",
        first_name: "xass",
        last_name: "ass",
        user_image: null,
        status: "Active",
      },
      {
        id: 490,
        user_id: 419,
        agent_id: 310,
        type: 1,
        assigned_date: 1717420362,
        deleted_at: null,
        created_at: "2024-06-03T13:12:42.000Z",
        updated_at: "2024-06-03T13:12:42.000Z",
        userName: "nvxm cxcc",
        assigned_date_time: "June 3, 2024",
        first_name: "nvxm",
        last_name: "cxcc",
        user_image: null,
        status: "Active",
      },
      {
        id: 489,
        user_id: 419,
        agent_id: 312,
        type: 1,
        assigned_date: 1717420362,
        deleted_at: null,
        created_at: "2024-06-03T13:12:42.000Z",
        updated_at: "2024-06-03T13:12:42.000Z",
        userName: "rtr ass",
        assigned_date_time: "June 3, 2024",
        first_name: "rtr",
        last_name: "ass",
        user_image: null,
        status: "Active",
      },
      {
        id: 488,
        user_id: 419,
        agent_id: 314,
        type: 1,
        assigned_date: 1717420362,
        deleted_at: null,
        created_at: "2024-06-03T13:12:42.000Z",
        updated_at: "2024-06-03T13:12:42.000Z",
        userName: "jmhmhghghh csfd",
        assigned_date_time: "June 3, 2024",
        first_name: "jmhmhghghh",
        last_name: "csfd",
        user_image: null,
        status: "Active",
      },
      {
        id: 487,
        user_id: 419,
        agent_id: 322,
        type: 1,
        assigned_date: 1717420261,
        deleted_at: null,
        created_at: "2024-06-03T13:11:01.000Z",
        updated_at: "2024-06-03T13:11:01.000Z",
        userName: "xzasdfghhjklpi uiuytrqe",
        assigned_date_time: "June 3, 2024",
        first_name: "xzasdfghhjklpi",
        last_name: "uiuytrqe",
        user_image: "Users/322/1717047783625-rcw.jpg",
        status: "Active",
      },
    ],
    total_records: 19,
    filtered_records: 10,
  };

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
  // const debouncedSearch = debounce((searchValue) => {
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
  const fetchAgentList = useCallback(() => {
    dispatch(GetAssignAgentsInfo({ ...filters, client_id: client_id?.id }));
  }, [filters]);

  useEffect(() => {
    fetchAgentList();
  }, [filters]);
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
      <TitleBar title="Agents"></TitleBar>

      <div className="px-28 mb-[3rem]">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-[2rem]">
            <SearchInput
              name="search"
              placeholder="Search Agents"
              onChange={handleSearchChange}
              handleInputClear={handleInputClear}
              inputValue={inputValue}
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
            {agentState1?.list?.length === 0 ? (
              // &&
              // agentState.status != "loading"
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
              agentState1.list.map((row, index) => (
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
                        <Link to={`/my-agents/detail/${row.id}`}>
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
            {agentState1?.list.length > 0 && (
              <CommonPagination
                count={agentState1?.total_records}
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
