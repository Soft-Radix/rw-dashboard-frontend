import {
  FormControlLabel,
  Radio,
  TableCell,
  TableRow,
  Theme,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { defaultAccManagerList, deleteAccManagerList } from "app/store/Client";
import { ClientRootState } from "app/store/Client/Interface";
import { useAppDispatch } from "app/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import AddAgentModel from "src/app/components/agents/AddAgentModel";
import CommonTable from "src/app/components/commonTable";
import UnassignedAgent from "../AssignedAgents/UnassignedAgent";
import CommonPagination from "src/app/components/pagination";
import { start } from "repl";

export default function AssignedAccountManager({
  setManagerFilterMenu,
  managerfilterMenu,
}) {
  const { assignAccManagerDetail, managertotal_records } = useSelector(
    (store: ClientRootState) => store?.client
  );
  const [isOpenUnssignedModal, setIsOpenUnassignedModal] = useState(false);
  const [deleteId, setIsDeleteId] = useState<number>(null);
  const { client_id } = useParams();
  const dispatch = useAppDispatch();
  // console.log(assignAccManagerDetail, "popopff");
  const theme: Theme = useTheme();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  const urlForImage = import.meta.env.VITE_API_BASE_IMAGE_URL;
  const unassignAccManager = async (id: any) => {
    try {
      const { payload } = await dispatch(
        deleteAccManagerList({ client_id: client_id, account_manager_id: id })
      );
      // console.log(payload, "payload");

      if (payload?.data?.status) {
        setManagerFilterMenu((prevFilters) => ({
          ...prevFilters,
          start: assignAccManagerDetail.length - 1 == 0 ? 0 : prevFilters.start,
        }));
        // callAgentApi();
        setIsOpenUnassignedModal(false);
      }
    } catch (error) {
      console.error("Failed to delete agent group:", error);
    }
  };
  const defaultAddAccManager = (id) =>
    // if(default)
    dispatch(
      defaultAccManagerList({
        client_id: client_id,
        account_manager_id: id,
      })
    );

  // console.log(assignAccManagerDetail.length, "length");
  // console.log(totalPageCount, "totalPageCount");

  const checkPageNum = (e: any, pageNumber: number) => {
    // console.log(pageNumber, "rr");
    setManagerFilterMenu((prevFilters) => {
      if (pageNumber !== prevFilters.start + 1) {
        return {
          ...prevFilters,
          start: pageNumber - 1,
        };
      }
      return prevFilters; // Return the unchanged filters if the condition is not met
    });
  };

  return (
    <>
      <div className="mb-[3rem]">
        <div className="bg-white rounded-lg shadow-sm">
          <CommonTable
            headings={[
              "Account Manager",
              "Account Manager Id",
              "Assigned date",
              "",
              "",
            ]}
          >
            {assignAccManagerDetail?.length === 0 ? (
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
                {assignAccManagerDetail.map((row, index) => (
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
                      {row.id}
                    </TableCell>

                    <TableCell
                      align="center"
                      className="whitespace-nowrap font-500"
                    >
                      {row.assigned_date_time}
                    </TableCell>
                    <TableCell
                      align="center"
                      className="whitespace-nowrap font-500"
                    >
                      <FormControlLabel
                        onClick={() =>
                          defaultAddAccManager(row.account_manager_id)
                        }
                        value="Mark as default"
                        control={<Radio checked={row.is_default === 1} />}
                        label="Mark as default"
                      />
                    </TableCell>
                    <TableCell
                      align="center"
                      className="whitespace-nowrap cursor-pointer"
                      onClick={() => {
                        setIsOpenUnassignedModal(true);
                        setIsDeleteId(row.account_manager_id);
                      }}
                    >
                      <span
                        className={`inline-flex items-center justify-center rounded-full w-[95px] min-h-[25px] text-sm font-500
                      ${row.status === "Unassign" ? "text-secondary bg-secondary_bg" : row.status === "Unassigned" ? "text-[#F44336] bg-[#F443362E]" : "text-[#F0B402] bg-[#FFEEBB]"}`}
                      >
                        {row.status ? row.status : "Unassigned"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
          </CommonTable>
          <div className="flex justify-end py-14 px-[3rem]">
            {/* {assignAccManagerDetail?.length > 0 && ( */}
            <CommonPagination
              count={managertotal_records}
              onChange={(e, PageNumber: number) => checkPageNum(e, PageNumber)}
              page={managerfilterMenu.start + 1}
            />
            {/* )} */}
          </div>
        </div>
      </div>
      <AddAgentModel isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
      <UnassignedAgent
        isOpen={isOpenUnssignedModal}
        setIsOpen={setIsOpenUnassignedModal}
        onDelete={() => unassignAccManager(deleteId)}
      />
    </>
  );
}
