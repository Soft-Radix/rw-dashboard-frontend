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
import AddAccountManagerModel from "src/app/components/accountManager/AddAccountmanagerModal";
import {
  AccManagerRootState,
  filterType,
} from "app/store/accountManager/Interface";
import { useAppDispatch } from "app/store/store";
import { getAccManagerList } from "app/store/accountManager";
import { useSelector } from "react-redux";

const rows = [
  {
    id: "#2367055342",
    fname: "Benjamin",
    lname: "Benjamin",

    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    status: "Active ",
  },
  {
    id: "#2367055342",
    fname: "Benjamin",
    lname: "Benjamin",

    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    status: "Suspended",
  },
  {
    id: "#2367055342",
    fname: "Benjamin",
    lname: "Benjamin",

    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    status: "Pending",
  },
  {
    id: "#2367055342",
    fname: "Benjamin",
    lname: "Benjamin",

    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    status: "Pending",
  },
  {
    id: "#2367055342",
    fname: "Benjamin",
    lname: "Benjamin",

    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    status: "Suspended",
  },

  {
    id: "#2367055342",
    fname: "Benjamin",
    lname: "Benjamin",

    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    status: "Active",
  },
];

export default function AccountManager() {
  const dispatch = useAppDispatch();
  const accManagerState = useSelector(
    (store: AccManagerRootState) => store.accManager
  );
  console.log(accManagerState, "managerList");
  const theme: Theme = useTheme();
  const formik = useFormik({
    initialValues: {
      role: "",
      verification: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => {},
  });

  const [isOpenSupportDetail, setIsOpenDetailPage] = useState<boolean>(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [filters, setfilters] = useState<filterType>({
    start: 0,
    limit: 10,
    search: "",
  });
  const fetchManagerList = useCallback(() => {
    dispatch(getAccManagerList(filters));
  }, [filters]);
  useEffect(() => {
    fetchManagerList();
  }, [fetchManagerList]);

  return (
    <>
      <>
        <TitleBar title="Account Manager">
          <Button
            variant="outlined"
            color="secondary"
            className="h-[40px] text-[16px] flex gap-8 font-[600] sm:leading-3 leading-0"
            aria-label="Add New Group"
            size="large"
            onClick={() => setIsOpenAddModal(true)}
            startIcon={<PlusIcon color={theme.palette.secondary.main} />}
          >
            Add Manager
          </Button>
        </TitleBar>
        <div className="px-28 mb-[3rem]">
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-[2rem]">
              <SearchInput name="search" placeholder="Search agents" />
            </div>
            <CommonTable
              headings={[
                "ID",
                "First Name",
                "Last Name",
                "Assigned Client",
                "Status",
                ,
              ]}
            >
              <>
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
                    <TableCell scope="row" className="text-[14px] font-500">
                      {row.id}
                    </TableCell>
                    <TableCell
                      align="center"
                      className="whitespace-nowrap text-[14px] font-500"
                    >
                      {row.fname}
                    </TableCell>
                    <TableCell
                      align="center"
                      className="whitespace-nowrap text-[14px] font-500"
                    >
                      {row.lname}
                    </TableCell>

                    <TableCell align="center">
                      <ImagesOverlap images={row.assignedImg} />
                    </TableCell>
                    <TableCell
                      align="center"
                      className="whitespace-nowrap text-[14px] font-500"
                    >
                      <span
                        className={`inline-flex items-center justify-center rounded-full w-[95px] min-h-[25px] text-sm font-500
                      ${row.status === "Active" ? "text-[#4CAF50] bg-[#4CAF502E]" : row.status === "Suspended" ? "text-[#F44336] bg-[#F443362E]" : "text-[#F0B402]  bg-[#FFEEBB]"}`}
                      >
                        {row.status}
                      </span>
                    </TableCell>
                    <TableCell
                      align="center"
                      className="whitespace-nowrap text-[14px] font-500 cursor-pointer"
                    >
                      <Link to="/admin/acc-manager/detail">
                        <ArrowRightCircleIcon />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </>
            </CommonTable>
            <div className="flex justify-end py-14 px-[3rem]">
              <CommonPagination count={10} />
            </div>
          </div>
        </div>
        <AddAccountManagerModel
          isOpen={isOpenAddModal}
          setIsOpen={setIsOpenAddModal}
          isEditing={false}
        />
      </>
    </>
  );
}
