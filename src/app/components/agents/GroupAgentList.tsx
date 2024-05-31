import {
  Button,
  Checkbox,
  Input,
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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import ImagesOverlap from "src/app/components/ImagesOverlap";
import TitleBar from "src/app/components/TitleBar";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddGroupModel from "src/app/components/agents/AddGroupModel";
import SearchInput from "src/app/components/SearchInput";
import InputField from "../InputField";
import { useAppDispatch } from "app/store/store";
import {
  addAgentInagentGroup,
  changeFetchStatus,
  deleteAgentMemberGroup,
  getAgentGroupInfo,
  updateGroupName,
} from "app/store/Agent group";
import { useSelector } from "react-redux";
import {
  AgentGroupIDType,
  AgentGroupRootState,
  AgentGroupType,
  UpdateAgentGroupPayload,
} from "app/store/Agent group/Interface";
import DeleteClient from "../client/DeleteClient";
import { filterType } from "app/store/Client/Interface";
import { AgentGroupSchema } from "src/formSchema";
import ListLoading from "@fuse/core/ListLoading";

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

  const itemsPerPage = 10;
  // console.log(group_id, "check");
  const dispatch = useAppDispatch();
  const { agentGroupDetail, actionStatus, actionStatusEdit } = useSelector(
    (store: AgentGroupRootState) => store?.agentGroup
  );
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
    // console.log(id, "id");
    try {
      const { payload } = await dispatch(
        deleteAgentMemberGroup({ member_id: id })
      );
      // console.log(payload, "payload");
      if (payload?.data?.status) {
        setIsOpenDeletedModal(false);
        // fetchAgentGroupLsssist();
      }
      dispatch(addAgentInagentGroup({ ...filterMenu, group_id }));
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
      await dispatch(getAgentGroupInfo({ group_id }));
      setLoading(false);
    };
    fetchData();
    // console.log(group_id, "groupid");
    return () => {
      dispatch(changeFetchStatus());
    };
  }, []);

  useEffect(() => {
    if (agentGroupDetail) {
      formik.setValues({
        group_name: agentGroupDetail.group_name,
      });
    }
  }, [agentGroupDetail]);
  const totalPageCount = Math.ceil(
    agentGroupDetail?.group_members?.length / itemsPerPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    // Handle any additional logic when the page changes, e.g., fetching data
  };

  useEffect(() => {
    const data = agentGroupDetail?.group_members
      ? agentGroupDetail.group_members.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        )
      : [];
    setCurrentRows([...data]);
  }, [agentGroupDetail, group_id]);
  // console.log("🚀 ~ GroupAgentsList ~ agentGroupDetail:", agentGroupDetail);

  if (agentGroupDetail?.fetchStatus == "loading" || loading == true) {
    return <ListLoading />;
  }
  // useEffect(() => {
  //   if (loading) {
  //     <ListLoading />;
  //   }
  // }, []);
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
              {currentRows?.length == 0 && !loading ? (
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
                  {currentRows?.map((row: any, index) => (
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
                        {row.id}
                      </TableCell>
                      <TableCell align="center" className="whitespace-nowrap">
                        {row.first_name}
                      </TableCell>

                      <TableCell align="center" className="whitespace-nowrap">
                        {row.last_name}
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
                  ))}
                </>
              )}
            </CommonTable>
          </>
          <div className="flex justify-end py-14 px-[3rem]">
            {currentRows?.length > 0 && (
              <CommonPagination
                count={totalPageCount}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
      <AddGroupModel
        isOpen={isOpenAddModal}
        setIsOpen={setIsOpenAddModal}
        isNewAgent={true}
        // fetchAgentGroupList={fetchAgentGroupList}
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
