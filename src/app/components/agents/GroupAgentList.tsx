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
import { changeFetchStatus, getAgentGroupInfo } from "app/store/Agent group";
import { useSelector } from "react-redux";
import { AgentGroupRootState } from "app/store/Agent group/Interface";

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
  const { group_id } = useParams();
  // console.log(group_id, "check");
  const dispatch = useAppDispatch();
  const { agentGroupDetail } = useSelector(
    (store: AgentGroupRootState) => store?.agentGroup
  );
  // console.log(agentGroupDetail, "girl");
  const theme: Theme = useTheme();
  const formik = useFormik({
    initialValues: {
      role: "",
      verification: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => {
      console.log(values, "value");
    },
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

  return (
    <>
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
            <div className="p-[2rem]  sm:w-1/3 flex items-center gap-20 flex-col sm:flex-row w-full">
              <InputField
                formik={formik}
                name="group_name"
                label=" Group Name"
                placeholder={agentGroupDetail.group_name}
              />
              <Button
                variant="contained"
                color="secondary"
                className="w-[250px] h-[50px] text-[18px] font-700"
              >
                Save
              </Button>
            </div>
            <>
              <div className="px-20 text-[20px] font-600 text-[#0A0F18] py-10 mb-20">
                All agents list assigned to this group
              </div>
              <CommonTable
                headings={[
                  "Agent ID",
                  "Agent First Name",
                  "Last Name",
                  "Action",
                ]}
              >
                <>
                  {/* {agentGroupDetail.group_members.map((row, index) => ( */}
                  {rows.map((row, index) => (
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
                        {row.firstName}
                      </TableCell>

                      <TableCell align="center" className="whitespace-nowrap">
                        {row.lastName}
                      </TableCell>

                      <TableCell scope="row" className="w-[15%]">
                        <div className="flex gap-20 pe-20">
                          <span className="p-2 cursor-pointer">
                            <DeleteIcon />
                          </span>
                          <span className="p-2 cursor-pointer">
                            <Link to="/admin/agents/groups/details">
                              Go to Agent Page
                            </Link>
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              </CommonTable>
            </>
            <div className="flex justify-end py-14 px-[3rem]">
              <CommonPagination count={10} />
            </div>
          </div>
        </div>
        <AddGroupModel
          isOpen={isOpenAddModal}
          setIsOpen={setIsOpenAddModal}
          isNewAgent={true}
          // fetchAgentGroupList={fetchAgentGroupList}
        />
      </>
    </>
  );
}
