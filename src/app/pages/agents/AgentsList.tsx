import { Button, Checkbox, TableCell, TableRow, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
} from "public/assets/icons/common";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import ImagesOverlap from "src/app/components/ImagesOverlap";
import TitleBar from "src/app/components/TitleBar";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddAgentModel from "src/app/components/agents/AddAgentModel";
import { useSelector } from "react-redux";
import { AgentRootState, filterType } from "app/store/Agent/Interafce";
import { getAgentInfo, getAgentList } from "app/store/Agent";
import { useAppDispatch } from "app/store/store";
import moment from "moment";
import ListLoading from "@fuse/core/ListLoading";

export default function AgentsList() {
  const { agent_id } = useParams();

  const agentState = useSelector((store: AgentRootState) => store.agent);
  console.log(agentState.list, "ddd");

  const dispatch = useAppDispatch();

  const [filters, setfilters] = useState<filterType>({
    start: 0,
    limit: 10,
    search: "",
  });
  const theme: Theme = useTheme();

  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAgentList(filters));
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

          <CommonTable
            headings={[
              "ID",
              "First Name",
              "Last Name",
              "Start Date",
              "Last Login",
              "Assigned Clients",
              "Status",
              "",
            ]}
          >
            {agentState.status === "loading" ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <ListLoading /> {/* Render loader component */}
                </TableCell>
              </TableRow>
            ) : (
              <>
                {agentState.list.map((row, index) => (
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
                    <TableCell scope="row">{row.id}</TableCell>
                    <TableCell align="center" className="whitespace-nowrap">
                      {row.first_name}
                    </TableCell>

                    <TableCell align="center" className="whitespace-nowrap">
                      {row.last_name}
                    </TableCell>
                    <TableCell align="center" className="whitespace-nowrap">
                      {moment(row.created_at).format("MMMM Do, YYYY")}
                    </TableCell>
                    <TableCell align="center" className="whitespace-nowrap">
                      {moment(row.updated_at).format("MMMM Do, YYYY")}
                    </TableCell>

                    <TableCell align="center">
                      {row.role_id}
                      {/* <ImagesOverlap images={row.user_image} /> */}
                    </TableCell>
                    <TableCell align="left" className="whitespace-nowrap">
                      <span
                        className={`inline-flex items-center justify-center rounded-full w-[95px] min-h-[25px] text-sm font-500
                      ${row.status === "Completed" ? "text-[#4CAF50] bg-[#4CAF502E]" : row.status === "In Progress" ? "text-[#F44336] bg-[#F443362E]" : "text-[#F0B402] bg-[#FFEEBB]"}`}
                      >
                        {row.status || "N/A"}
                      </span>
                    </TableCell>
                    <TableCell align="left" className="w-[1%]">
                      <div className="flex gap-20 pe-20">
                        <span className="p-2 cursor-pointer">
                          <Link to={`/admin/agent-detail/${agent_id}`}>
                            <ArrowRightCircleIcon />
                          </Link>
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </CommonTable>

          <div className="flex justify-end py-14 px-[3rem]">
            <CommonPagination count={10} />
          </div>
        </div>
      </div>

      <AddAgentModel isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
    </>
  );
}
