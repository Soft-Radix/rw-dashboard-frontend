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
import { useNavigate, useParams } from "react-router";
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
import ListLoading from "@fuse/core/ListLoading";

export default function AssignedAgents() {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [filterMenu, setFilterMenu] = useState<HTMLElement | null>(null);
  const [isOpenUnssignedModal, setIsOpenUnassignedModal] = useState(false);
  const [deleteId, setIsDeleteId] = useState<number>(null);
  const [rows, setRows] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { assignedAgentDetail } = useSelector(
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
      // console.log(payload, "payload");
      if (payload?.data?.status) {
        setIsOpenUnassignedModal(false);
      }
    } catch (error) {
      console.error("Failed to delete agent group:", error);
    }
  };
  const totalPageCount = Math.ceil(assignedAgentDetail.length / itemsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    // Handle any additional logic when the page changes, e.g., fetching data
  };

  const currentRows = assignedAgentDetail.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // console.log(deleteId, "delete");
  return (
    <>
      <div className="mb-[3rem]">
        <div className="bg-white rounded-lg shadow-sm">
          <CommonTable headings={["Agents", "Agents Id", "Assigned Date", ""]}>
            <>
              {currentRows.map((row, index) => (
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
                  <TableCell
                    align="center"
                    className="whitespace-nowrap"
                    onClick={() => {
                      setIsOpenUnassignedModal(true);
                      setIsDeleteId(row.agent_id);
                    }}
                  >
                    <span
                      className={`inline-flex items-center justify-center rounded-full w-[95px] min-h-[25px] text-sm font-500 cursor-pointer
                   ${row.status === "Unassign" ? "text-secondary bg-secondary_bg" : row.status === "Unassigned" ? "text-[#F44336] bg-[#F443362E]" : "text-[#F0B402] bg-[#FFEEBB]"}`}
                    >
                      {row.status ? row.status : "Unassign"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </>
          </CommonTable>
          <div className="flex justify-end py-14 px-[3rem]">
            <CommonPagination
              count={totalPageCount}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
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
