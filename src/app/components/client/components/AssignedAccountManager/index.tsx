import {
  FormControlLabel,
  Radio,
  TableCell,
  TableRow,
  Theme,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { defaultAccManagerList, deleteAccManagerList } from "app/store/Client";
import { ClientRootState } from "app/store/Client/Interface";
import { useAppDispatch } from "app/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import AddAgentModel from "src/app/components/agents/AddAgentModel";
import CommonTable from "src/app/components/commonTable";
import UnassignedAgent from "../AssignedAgents/UnassignedAgent";
import CommonPagination from "src/app/components/pagination";
import { start } from "repl";
import { getAccManagerList } from "app/store/AccountManager";
import { NoDataFound } from "public/assets/icons/common";

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
  const [defaultAccManagerId, setDefaultAccManagerId] = useState(null);

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
        dispatch(
          getAccManagerList({ ...managerfilterMenu, client_id: client_id })
        );

        setIsOpenUnassignedModal(false);
      }
    } catch (error) {
      console.error("Failed to delete agent group:", error);
    }
  };
  const handleDefaultAccManagerChange = (id) => {
    // Update the state with the ID of the selected default account manager
    setDefaultAccManagerId(id);

    // Dispatch your action here if needed
    dispatch(
      defaultAccManagerList({
        client_id: client_id,
        account_manager_id: id,
      })
    );
  };

  useEffect(() => {
    if (assignAccManagerDetail.length > 0) {
      // Set the first element's account_manager_id as the default checked
      setDefaultAccManagerId(assignAccManagerDetail[0].account_manager_id);
    }
  }, [assignAccManagerDetail]);

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
          {assignAccManagerDetail?.length === 0 ? (
            <div
              className="flex flex-col justify-center align-items-center gap-20 bg-[#F7F9FB] min-h-[400px] py-40"
              style={{ alignItems: "center" }}
            >
              <NoDataFound />
              <Typography className="text-[24px] text-center font-600 leading-normal">
                No data found !
              </Typography>
            </div>
          ) : (
            <CommonTable
              headings={[
                "Account Manager",
                "Account Manager Id",
                "Assigned date",
                "",
                "",
              ]}
            >
              <>
                {assignAccManagerDetail.map((row, index) => (
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
                      className="whitespace-nowrap font-500 "
                    >
                      {row.id}
                    </TableCell>

                    <TableCell
                      align="center"
                      className="whitespace-nowrap font-500 custom"
                    >
                      {row.assigned_date_time}
                    </TableCell>
                    <TableCell
                      align="center"
                      className="whitespace-nowrap font-500"
                    >
                      <FormControlLabel
                        onClick={() =>
                          handleDefaultAccManagerChange(row.account_manager_id)
                        }
                        value="Mark as default"
                        control={
                          <Radio
                            checked={
                              defaultAccManagerId === row.account_manager_id
                            }
                            // checked={
                            //   index === 0 ||
                            //   defaultAccManagerId === row.account_manager_id
                            // }
                          />
                        }
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
            </CommonTable>
          )}
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
        description={"Are you sure you want to unassign this account manager?"}
      />
    </>
  );
}
