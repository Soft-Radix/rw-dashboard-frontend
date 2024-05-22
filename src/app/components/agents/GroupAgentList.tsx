import {
  Button,
  Checkbox,
  Input,
  TableCell,
  TableRow,
  Theme,
} from "@mui/material";
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
import AddGroupModel from "src/app/components/agents/AddGroupModel";
import SearchInput from "src/app/components/SearchInput";
import InputField from "../InputField";
import { useAppDispatch } from "app/store/store";
import {
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

const rows = [
  {
    id: "1542145611525",
    firstName: "Benajmin",
    lastName: "Benajmin",
  },
  {
    id: "1542145611525",
    firstName: "Benajmin",
    lastName: "Benajmin",
  },
  {
    id: "1542145611525",
    firstName: "Benajmin",
    lastName: "Benajmin",
  },
  {
    id: "1542145611525",
    firstName: "Benajmin",
    lastName: "Benajmin",
  },
  {
    id: "1542145611525",
    firstName: "Benajmin",
    lastName: "Benajmin",
  },
  {
    id: "1542145611525",
    firstName: "Benajmin",
    lastName: "Benajmin",
  },
  {
    id: "1542145611525",
    firstName: "Benajmin",
    lastName: "Benajmin",
  },
  {
    id: "1542145611525",
    firstName: "Benajmin",
    lastName: "Benajmin",
  },
  {
    id: "1542145611525",
    firstName: "Benajmin",
    lastName: "Benajmin",
  },
];

export default function GroupAgentsList() {
  const [deleteId, setIsDeleteId] = useState<number>(null);

  const [isOpenDeletedModal, setIsOpenDeletedModal] = useState(false);
  const { group_id } = useParams();
  const navigate = useNavigate();
  const [rows, setRows] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // console.log(group_id, "check");
  const dispatch = useAppDispatch();
  const { agentGroupDetail } = useSelector(
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
    // console.log(id, "id");
    try {
      const { payload } = await dispatch(
        deleteAgentMemberGroup({ member_id: id })
      );
      console.log(payload, "payload");
      if (payload?.data?.status) {
        setIsOpenDeletedModal(false);
        // fetchAgentGroupLsssist();
      }
    } catch (error) {
      console.error("Failed to delete agent group:", error);
    }
  };
  const formik = useFormik({
    initialValues: {
      group_name: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit,
  });
  // useEffect(()=>{
  //   formik.setValues()
  // })

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [filterMenu, setFilterMenu] = useState<HTMLElement | null>(null);
  // const [isOpenSupportDetail, setIsOpenDetailPage] = useState<boolean>(false);
  useEffect(() => {
    if (!group_id) return null;
    dispatch(getAgentGroupInfo({ group_id }));
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
    agentGroupDetail?.group_members.length / itemsPerPage
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    // Handle any additional logic when the page changes, e.g., fetching data
  };

  const currentRows = agentGroupDetail?.group_members.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            <div className="p-[2rem]  sm:w-1/3 flex items-center gap-20 flex-col sm:flex-row w-full">
              {" "}
              {/* Use formik.handleSubmit as the onSubmit handler */}
              <InputField
                formik={formik}
                name="group_name"
                label="Group Name"
              />
              <Button
                type="submit" // Use type="submit" to submit the form
                variant="contained"
                color="secondary"
                className="w-[250px] h-[50px] text-[18px] font-700"
              >
                Save
              </Button>
            </div>
          </form>
          <>
            <div className="px-20 text-[20px] font-600 text-[#0A0F18] py-10 mb-20">
              All agents list assigned to this group
            </div>
            <CommonTable
              headings={["Agent ID", "Agent First Name", "Last Name", "Action"]}
            >
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
                    <TableCell scope="row">{row.id}</TableCell>
                    <TableCell align="center" className="whitespace-nowrap">
                      {row.first_name}
                    </TableCell>

                    <TableCell align="center" className="whitespace-nowrap">
                      {row.last_name}
                    </TableCell>

                    <TableCell scope="row" className="w-[15%]">
                      <div className="flex gap-20 pe-20">
                        <span className="p-2 cursor-pointer">
                          <DeleteIcon
                            onClick={() => {
                              setIsOpenDeletedModal(true);
                              setIsDeleteId(row.id);
                            }}
                          />
                        </span>
                        <span className="p-2 cursor-pointer">
                          <Link to="/admin/agents/list">Go to Agent Page</Link>
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            </CommonTable>
          </>
          <div className="flex justify-end py-14 px-[3rem]">
            <CommonPagination
              count={totalPageCount}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
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
      />
    </>
  );
}
