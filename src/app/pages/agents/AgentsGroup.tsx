import { Button, Checkbox, TableCell, TableRow, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
} from "public/assets/icons/common";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ImagesOverlap from "src/app/components/ImagesOverlap";
import TitleBar from "src/app/components/TitleBar";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddGroupModel from "src/app/components/agents/AddGroupModel";
import SearchInput from "src/app/components/SearchInput";
import {
  AgentGroupRootState,
  filterType,
} from "app/store/Agent group/Interface";
import { useSelector } from "react-redux";
import { useAppDispatch } from "app/store/store";
import { deleteAgentGroup, getAgentGroupList } from "app/store/Agent group";
import DeleteClient from "src/app/components/client/DeleteClient";
import { debounce } from "lodash";

const rows = [
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Progress",
    department: "Account Manager",
    date: "4",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Review",
    department: "Account Manager",
    date: "4",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Completed",
    department: "Account Manager",
    date: "4",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Progress",
    department: "Account Manager",
    date: "4",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Review",
    department: "Account Manager",
    date: "4",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Completed",
    department: "Account Manager",
    date: "4",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Progress",
    department: "Account Manager",
    date: "4",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Review",
    department: "Account Manager",
    date: "4",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Completed",
    department: "Account Manager",
    date: "4",
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
  },
];

export default function AgentsGroup() {
  const agentGroupState = useSelector(
    (store: AgentGroupRootState) => store.agentGroup
  );
  // console.log(agentGroupState, "as");

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

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [deleteId, setIsDeleteId] = useState<number>(null);
  const [isOpenDeletedModal, setIsOpenDeletedModal] = useState(false);
  const [isOpenSupportDetail, setIsOpenDetailPage] = useState<boolean>(false);
  const [filters, setfilters] = useState<filterType>({
    start: 0,
    limit: 10,
    search: "",
  });
  const checkPageNum = (e: any, pageNumber: number) => {
    setfilters((prevFilters) => ({
      ...prevFilters,
      start: pageNumber - 1,
    }));
  };
  const deleteGroup = async (id: any) => {
    // console.log(id, "id");
    try {
      const { payload } = await dispatch(deleteAgentGroup({ group_id: id }));
      console.log(payload, "payload");
      if (payload?.data?.status) {
        setIsOpenDeletedModal(false);
        // fetchAgentGroupLsssist();
      }
    } catch (error) {
      console.error("Failed to delete agent group:", error);
    }
  };
  // Debounce function to delay executing the search
  const debouncedSearch = debounce((searchValue) => {
    // Update the search filter here
    setfilters((prevFilters) => ({
      ...prevFilters,
      search: searchValue,
    }));
  }, 300);
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSearch(value);
  };
  const fetchAgentGroupList = useCallback(() => {
    dispatch(getAgentGroupList(filters));
  }, [filters]);

  useEffect(() => {
    fetchAgentGroupList();
  }, [fetchAgentGroupList]);
  // useEffect(() => {
  //   if (agentGroupState) {
  //     setValues: agentGroupState.group_name;
  //   }
  // });

  return (
    <>
      <TitleBar title="Agents Groups">
        <Button
          variant="outlined"
          color="secondary"
          className="h-[40px] text-[16px] flex gap-8 font-[600]"
          aria-label="Add New Group"
          size="large"
          onClick={() => {
            setIsOpenAddModal(true);
          }}
        >
          <PlusIcon color={theme.palette.secondary.main} />
          Add New Group
        </Button>
      </TitleBar>
      <div className="px-28 mb-[3rem]">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-[2rem]">
            <SearchInput
              name="search"
              placeholder="Search agents group"
              onChange={handleSearchChange}
            />
          </div>
          <CommonTable
            headings={["ID", "Group Name", "Number of Agents", "Action"]}
          >
            <>
              {agentGroupState.list.map((row, index) => {
                // console.log(row, "row");
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
                    <TableCell scope="row">{row.id}</TableCell>
                    <TableCell align="center" className="whitespace-nowrap">
                      {row.group_name}
                    </TableCell>

                    <TableCell align="center" className="whitespace-nowrap">
                      {row.members_count}
                    </TableCell>

                    <TableCell align="center" className="w-[1%]">
                      <div className="flex gap-20 pe-20">
                        <span
                          className="p-2 cursor-pointer"
                          // onClick={deleteGroup}
                        >
                          <DeleteIcon
                            onClick={() => {
                              setIsOpenDeletedModal(true);
                              setIsDeleteId(row.id);
                            }}
                          />
                        </span>
                        <span className="p-2 cursor-pointer">
                          <Link to={`/admin/agents/groups/${row.id}`}>
                            <EditIcon />
                          </Link>
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </>
          </CommonTable>
          <div className="flex justify-end py-14 px-[3rem]">
            <CommonPagination
              count={agentGroupState?.total_records}
              page={filters.start + 1}
              onChange={(event, pageNumber) => checkPageNum(event, pageNumber)}
            />
          </div>
        </div>
      </div>
      <AddGroupModel
        isOpen={isOpenAddModal}
        setIsOpen={setIsOpenAddModal}
        isNewAgent={false}
        fetchAgentGroupList={fetchAgentGroupList}
      />
      <DeleteClient
        isOpen={isOpenDeletedModal}
        setIsOpen={setIsOpenDeletedModal}
        onDelete={() => deleteGroup(deleteId)}
      />
    </>
  );
}
