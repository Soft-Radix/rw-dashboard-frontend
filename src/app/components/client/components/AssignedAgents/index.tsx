import { TableCell, TableRow, Theme } from "@mui/material";
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

export default function AssignedAgents({
  setAgentFilterMenu,
  agentfilterMenu,
}) {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [filterMenu, setFilterMenu] = useState<HTMLElement | null>(null);
  const [isOpenUnssignedModal, setIsOpenUnassignedModal] = useState(false);
  const [deleteId, setIsDeleteId] = useState<number>(null);

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
                  <span className="font-bold text-20 text-[#e4e4e4]">
                    No Data Found
                  </span>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {assignedAgentDetail.map((row, index) => (
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
                         : "text-[#F0B402] bg-[#FFEEBB]"
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
      />
    </>
  );
}
