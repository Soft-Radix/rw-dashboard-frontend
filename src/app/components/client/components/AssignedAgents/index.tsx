import { Button, Checkbox, TableCell, TableRow, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
} from "public/assets/icons/common";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ImagesOverlap from "src/app/components/ImagesOverlap";
import TitleBar from "src/app/components/TitleBar";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddAgentModel from "src/app/components/agents/AddAgentModel";
import UnassignedAgent from "./UnassignedAgent";
import { useSelector } from "react-redux";
import { ClientRootState } from "app/store/Client/Interface";
import { useAppDispatch } from "app/store/store";
import { deleteAgentList } from "app/store/Client";

export default function AssignedAgents() {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [filterMenu, setFilterMenu] = useState<HTMLElement | null>(null);
  const [isOpenUnssignedModal, setIsOpenUnassignedModal] = useState(false);
  const [deleteId, setIsDeleteId] = useState<number>(null);
  const { assignedAgentDetail } = useSelector(
    (store: ClientRootState) => store.client
  );
  // console.log(assignedAgentDetail, "gdfjgh");
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
  const unassignAgent = async (id: any) => {
    // console.log(id, "id");
    try {
      const { payload } = await dispatch(
        deleteAgentList({ client_id: id, agent_id: "" })
      );
      console.log(payload, "payload");
      if (payload?.data?.status) {
        setIsOpenUnassignedModal(false);
        // fetchAgentGroupLsssist();
      }
    } catch (error) {
      console.error("Failed to delete agent group:", error);
    }
  };

  return (
    <>
      <div className="mb-[3rem]">
        <div className="bg-white rounded-lg shadow-sm">
          <CommonTable
            headings={[
              "Agents",
              "First Name",
              "Last Name",
              "Assigned Date",
              "",
            ]}
          >
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
                    {row.id}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="whitespace-nowrap font-500"
                  >
                    {row.first_name}
                  </TableCell>
                  <TableCell align="center" className="font-500">
                    {row.last_name}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="whitespace-nowrap font-500"
                  >
                    {row.assigned_date}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="whitespace-nowrap"
                    onClick={() => {
                      setIsOpenUnassignedModal(true);
                      setIsDeleteId(row.id);
                    }}
                  >
                    <span
                      className={`inline-flex items-center justify-center rounded-full w-[95px] min-h-[25px] text-sm font-500 cursor-pointer
                   ${row.status === "Unassign" ? "text-secondary bg-secondary_bg" : row.status === "Unassigned" ? "text-[#F44336] bg-[#F443362E]" : "text-[#F0B402] bg-[#FFEEBB]"}`}
                    >
                      {row.status ? row.status : "Unassigned"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </>
          </CommonTable>
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
