import { TableCell, TableRow, Theme, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { deleteAgentList } from "app/store/Client";
import { ClientRootState } from "app/store/Client/Interface";
import { useAppDispatch } from "app/store/store";
import { useFormik } from "formik";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import AddAgentModel from "src/app/components/agents/AddAgentModel";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import UnassignedAgent from "./UnassignedAgent";
import { getAgentList } from "app/store/Agent";
import { filterAgentType } from "app/store/Agent/Interafce";
import { NoDataFound } from "public/assets/icons/common";
import { addAgentInagentGroup } from "app/store/Agent group";
import { filterType } from "app/store/Agent group/Interface";

export default function AssignedAgents({
  setAgentFilterMenu,
  agentfilterMenu,
}) {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [filterMenu, setFilterMenu] = useState<filterType>({
    start: 0,
    limit: 10,
    search: "",
  });
  const [isOpenUnssignedModal, setIsOpenUnassignedModal] = useState(false);
  const [deleteId, setIsDeleteId] = useState<number>(null);
  const [filters, setfilters] = useState<filterAgentType>({
    start: 0,
    limit: 10,
    search: "",
  });

  const { assignedAgentDetail, agentTotal_records } = useSelector(
    (store: ClientRootState) => store.client
  );
  const urlForImage = import.meta.env.VITE_API_BASE_IMAGE_URL;
  // console.log(assignedAgentDetail, "gdfjgh");
  const dispatch = useAppDispatch();
  const { client_id } = useParams();
  const theme: Theme = useTheme();
  const formik = useFormik({
    initialValues: {
      role: "",
      verification: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => {},
  });
  const unassignAgent = async (id: any) => {
    try {
      const { payload } = await dispatch(
        deleteAgentList({ client_id: client_id, agent_id: id })
      );

      if (payload?.data?.status) {
        setAgentFilterMenu((prevFilters) => ({
          ...prevFilters,
          start: assignedAgentDetail.length - 1 == 0 ? 0 : prevFilters.start,
        }));
        dispatch(addAgentInagentGroup({ ...filterMenu, client_id: client_id }));
        setIsOpenUnassignedModal(false);
      }
    } catch (error) {
      console.error("Failed to delete agent group:", error);
    }
  };

  // console.log(assignedAgentDetail.length, "finf");

  const checkPageNum = (e: any, pageNumber: number) => {
    // console.log(pageNumber, "rr");
    setAgentFilterMenu((prevFilters) => {
      if (pageNumber !== prevFilters.start + 1) {
        return {
          ...prevFilters,
          start: pageNumber - 1,
        };
      }
      return prevFilters; // Return the unchanged filters if the condition is not met
    });
  };

  // console.log("agentTotal_records", agentTotal_records);
  return (
    <>
      <div className="mb-[3rem]">
        <div className="bg-white rounded-lg shadow-sm">
          <CommonTable headings={["Agents", "Agents Id", "Assigned Date", ""]}>
            {assignedAgentDetail?.length === 0 ? (
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
                {assignedAgentDetail?.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      "& td": {
                        borderBottom: "1px solid #EDF2F6",
                        paddingTop: "26px",
                        paddingBottom: "12px",
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    <TableCell
                      scope="row"
                      className="flex items-center gap-8 font-500"
                    >
                      <img
                        className="h-40 w-40 rounded-full"
                        src={
                          row.user_image
                            ? urlForImage + row.user_image
                            : "../assets/images/logo/images.jpeg"
                        }
                      ></img>
                      <span className="ml-5">{row.first_name}</span>
                    </TableCell>

                    <TableCell
                      align="center"
                      className="whitespace-nowrap font-500"
                    >
                      {row.agent_id}
                    </TableCell>

                    <TableCell
                      align="center"
                      className="whitespace-nowrap font-500"
                    >
                      {row.assigned_date_time}
                    </TableCell>
                    <TableCell align="center" className="whitespace-nowrap">
                      <span
                        onClick={() => {
                          setIsOpenUnassignedModal(true);
                          setIsDeleteId(row.agent_id);
                        }}
                        className={`inline-flex items-center justify-center rounded-full w-[95px] min-h-[25px] text-sm font-500 cursor-pointer
                   ${
                     row.status === "Unassign"
                       ? "text-secondary bg-secondary_bg"
                       : row.status === "Unassigned"
                       ? "text-[#F44336] bg-[#F443362E]"
                       : "text-[#4F46E5] bg-[#EDEDFC]"
                   }`}
                      >
                        {row.status ? row.status : "Unassign"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </CommonTable>
          <div className="flex justify-end py-14 px-[3rem]">
            {/* {assignedAgentDetail?.length >= 0 && ( */}
            <CommonPagination
              count={agentTotal_records}
              onChange={(e, PageNumber: number) => checkPageNum(e, PageNumber)}
              page={agentfilterMenu.start + 1}
            />
            {/* )} */}
          </div>
        </div>
      </div>
      <AddAgentModel
        isOpen={isOpenAddModal}
        setIsOpen={setIsOpenAddModal}
        isEditing={false}
      />
      <UnassignedAgent
        isOpen={isOpenUnssignedModal}
        setIsOpen={setIsOpenUnassignedModal}
        onDelete={() => unassignAgent(deleteId)}
        description={"Are you sure you want to unassign this agent?"}
      />
    </>
  );
}
