import ListLoading from "@fuse/core/ListLoading";
import { Button, TableCell, TableRow, Theme, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import {
  addAgentInagentGroup,
  changeFetchStatus,
  deleteAgentMemberGroup,
  // getAgentGroupInfo,
  getGroupMemberDetail,
  updateGroupName,
} from "app/store/Agent group";
import {
  AgentGroupRootState,
  AgentGroupType,
  UpdateAgentGroupPayload,
} from "app/store/Agent group/Interface";
import { AgentRootState } from "app/store/Agent/Interafce";
import { filterType } from "app/store/Client/Interface";
import { useAppDispatch } from "app/store/store";
import { useFormik } from "formik";
import { DeleteIcon, NoDataFound } from "public/assets/icons/common";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import TitleBar from "src/app/components/TitleBar";
import AddGroupModel from "src/app/components/agents/AddGroupModel";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import { AgentGroupSchema } from "src/formSchema";
import InputField from "../InputField";
import DeleteClient from "../client/DeleteClient";

export default function GroupAgentsList() {
  const [deleteId, setIsDeleteId] = useState<number>(null);

  const [isOpenDeletedModal, setIsOpenDeletedModal] = useState(false);
  const { group_id } = useParams();
  const navigate = useNavigate();
  const [rows, setRows] = useState<any[]>([]);
  const [currentRows, setCurrentRows] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterMenu, setFilterMenu] = useState<filterType>({
    start: 0,
    limit: -1,
    search: "",
  });
  const [filterPagination, setFilterPagination] = useState<filterType>({
    start: 0,
    limit: 10,
    search: "",
  });

  const itemsPerPage = 10;
  // console.log(group_id, "check");
  const dispatch = useAppDispatch();
  const {
    agentGroupDetail,
    actionStatus,
    actionStatusEdit,
    agentGroupListMember,
    total_groupDetail,
  } = useSelector((store: AgentGroupRootState) => store?.agentGroup);
  const { list } = useSelector((store: AgentRootState) => store.agent);
  // console.log("🚀 ~ GroupAgentsList ~ list:", list);

  // console.log(agentGroupDetail.group_members, "girl");
  const onSubmit = async (values: AgentGroupType, { resetForm }) => {
    const newData: UpdateAgentGroupPayload = {
      ...values,
      group_id,
      agent_ids: [],
      delete_agent_ids: [],
    };

    const { payload } = await dispatch(updateGroupName(newData));

    // console.log(payload, "chPayload");
    if (payload?.data?.message) {
      navigate("/admin/agents/groups");
      // resetForm();
    }
    // console.log(newData, "values");
  };
  const theme: Theme = useTheme();
  const deleteGroup = async (id: any) => {
    if (!!actionStatus || !id) return;
    // console.log(id, "idasdsdffs");
    try {
      const { payload } = await dispatch(
        deleteAgentMemberGroup({ member_id: id })
      );
      console.log(payload, "payloadddd");
      if (payload?.data?.status) {
        setIsOpenDeletedModal(false);
        // fetchAgentGroupLsssist();
      }
      dispatch(getGroupMemberDetail({ ...filterPagination, group_id }));
      setIsDeleteId(null);
    } catch (error) {
      console.error("Failed to delete agent group:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      group_name: "",
    },
    validationSchema: AgentGroupSchema,
    onSubmit,
  });

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  // const [isOpenSupportDetail, setIsOpenDetailPage] = useState<boolean>(false);
  useEffect(() => {
    if (!group_id) return null;
    const fetchData = async () => {
      setLoading(true);
      await dispatch(getGroupMemberDetail({ ...filterPagination, group_id }));
      setLoading(false);
    };
    fetchData();
    // console.log(group_id, "groupid");
    return () => {
      dispatch(changeFetchStatus());
    };
  }, [filterPagination]);

  useEffect(() => {
    if (agentGroupListMember) {
      // console.log(agentGroupListMember, "agentGroupListMember");
      formik.setValues({
        group_name: agentGroupListMember?.group_name,
      });
    }
  }, [agentGroupListMember]);

  const checkPageNum = (e: any, pageNumber: number) => {
    // console.log(pageNumber, "rr");
    setFilterPagination((prevFilters) => {
      if (pageNumber !== prevFilters.start + 1) {
        return {
          ...prevFilters,
          start: pageNumber - 1,
        };
      }
      return prevFilters; // Return the unchanged filters if the condition is not met
    });
  };

  if (agentGroupListMember?.fetchStatus == "loading" || loading == true) {
    return <ListLoading />;
  }

  return (
    <>
      <TitleBar title="Agents Groups">
        <Button
          variant="outlined"
          color="secondary"
          className="h-[40px] text-[16px] flex gap-8 font-[600]"
          aria-label="Add New Agent"
          size="large"
          onClick={() => setIsOpenAddModal(true)}
        >
          <PlusIcon color={theme.palette.secondary.main} />
          Add New Agent
        </Button>
      </TitleBar>
      <div className="px-28 mb-[3rem]">
        <div className="bg-white rounded-lg shadow-sm">
          <form onSubmit={formik.handleSubmit}>
            <div className="p-[2rem] flex items-end gap-20 flex-col sm:flex-row w-full">
              {/* Use formik.handleSubmit as the onSubmit handler */}
              <div className="relative">
                <InputField
                  formik={formik}
                  name="group_name"
                  id="group_name"
                  label="Group Name"
                />
                <div className="absolute left-0 top-[97%]">
                  <span className=" text-red pt-[9px]  block ">
                    {formik?.errors.group_name &&
                      formik?.touched.group_name &&
                      formik?.errors.group_name}
                  </span>
                </div>
              </div>
              <Button
                type="submit" // Use type="submit" to submit the form
                variant="contained"
                color="secondary"
                className="w-[169px] text-[18px] font-700 "
                disabled={actionStatusEdit}
              >
                Save
              </Button>
            </div>
          </form>
          <>
            <div className="px-20 text-[20px] font-600 text-[#0A0F18] pb-10 pt-20 mb-20">
              All agents list assigned to this group
            </div>
            <CommonTable
              headings={["Agent ID", "Agent First Name", "Last Name", "Action"]}
            >
              {" "}
              {agentGroupListMember?.list?.length == 0 && !loading ? (
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
                  {agentGroupListMember?.list?.map((row: any, index) => {
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
                        <TableCell scope="row" className="px-20">
                          {row.member_details.id}
                        </TableCell>
                        <TableCell align="center" className="whitespace-nowrap">
                          {row.member_details.first_name}
                        </TableCell>

                        <TableCell align="center" className="whitespace-nowrap">
                          {row.member_details.last_name}
                        </TableCell>

                        <TableCell align="left" className="w-[18%]  px-[7px]">
                          <div className="flex gap-5 pe-20 items-center justify-center">
                            <span className="p-2 cursor-pointer">
                              <DeleteIcon
                                onClick={() => {
                                  setIsOpenDeletedModal(true);
                                  setIsDeleteId(row.id);
                                }}
                              />
                            </span>
                            <span className="p-2 cursor-pointer ">
                              <Link to="/admin/agents/list">
                                Go to Agent Page
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
          </>
          <div className="flex justify-end py-14 px-[3rem]">
            {agentGroupListMember.list?.length > 0 && (
              <CommonPagination
                count={total_groupDetail}
                onChange={(e, PageNumber: number) =>
                  checkPageNum(e, PageNumber)
                }
                page={filterPagination.start + 1}
              />
            )}
          </div>
        </div>
      </div>
      <AddGroupModel
        isOpen={isOpenAddModal}
        setIsOpen={setIsOpenAddModal}
        isNewAgent={true}
        filterPagination={filterPagination}
      />
      <DeleteClient
        isOpen={isOpenDeletedModal}
        setIsOpen={setIsOpenDeletedModal}
        onDelete={() => deleteGroup(deleteId)}
        heading={"Delete Agent"}
        description={"Are you sure you want to delete this Agent? "}
      />
    </>
  );
}
 