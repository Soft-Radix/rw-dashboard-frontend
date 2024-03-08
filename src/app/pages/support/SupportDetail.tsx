import {
  Button,
  Checkbox,
  Container,
  Grid,
  TableCell,
  TableRow,
  Theme,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { Box } from "@mui/system";
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
import TitleBar from "src/app/components/TitleBar";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddNewTicket from "src/app/components/support/AddNewTicket";

import AddUserModal from "src/app/components/users/AddUser";
import styled from "styled-components";
import Paper from "@mui/material/Paper";
import CustomButton from "src/app/components/custom_button";

const rows = [
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Progress",
    department: "Account Manager",
    date: "Feb 12,2024",
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Review",
    department: "Account Manager",
    date: "Feb 12,2024",
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Completed",
    department: "Account Manager",
    date: "Feb 12,2024",
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Progress",
    department: "Account Manager",
    date: "Feb 12,2024",
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Review",
    department: "Account Manager",
    date: "Feb 12,2024",
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Completed",
    department: "Account Manager",
    date: "Feb 12,2024",
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Progress",
    department: "Account Manager",
    date: "Feb 12,2024",
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "In Review",
    department: "Account Manager",
    date: "Feb 12,2024",
  },
  {
    ticket: "1542145611525",
    subject: "Web page design",
    status: "Completed",
    department: "Account Manager",
    date: "Feb 12,2024",
  },
];

export default function Support() {
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
  const [filterMenu, setFilterMenu] = useState<HTMLElement | null>(null);
  const [isOpenSupportDetail, setIsOpenDetailPage] = useState<boolean>(false);

  return (
    <>
      <div>
        <TitleBar title="Support Detail">
          <Button
            variant="outlined"
            color="secondary"
            className="h-[40px] text-[16px] flex gap-8"
            aria-label="Add Tasks"
            size="large"
            onClick={() => setIsOpenAddModal(true)}
          >
            <PlusIcon color={theme.palette.secondary.main} />
            New Ticket
          </Button>
        </TitleBar>
        <div
          className=" flex items-center justify-between pl-[4rem]  pr-[3rem]
         mt-20 gap-[30px]"
        >
          <div className=" w-[50%] ml-10 flex flex-col gap-[10px]">
            <div className="flex gap-[8px] h-20 items-end">
              <span className="text-xl text-[#111827] font-bold">
                1542145611525
              </span>
              <span className="text-[12px] text-[#757982] ">Ticket ID</span>
            </div>
            <div>
              <span className="text-[14px] text-[#757982] ">Due Date</span>
              <span className="text-[#111827]"> : Feb 12,2024 , 11: 30 AM</span>
            </div>
            <div className="flex">
              <span className="text-[14px] text-[#757982] "> Subject </span>
              <span> : Web page design</span>
            </div>

            <div className="  flex items-center justify-start gap-[31px] my-20 ">
              <div className="flex  flex-col gap-7 ">
                <div className="text-[14px] text-[#757982] ">Status</div>
                <Button
                  variant="outlined"
                  className="h-20
                   rounded-3xl min-h-24  text-[#FF5F15] bg-[#ffe2d5]
                    border-none mt-10"
                >
                  In Progress
                </Button>
              </div>
              <div className="flex flex-col gap-20 pl-10 items-start">
                <span className="text-[14px] text-[#757982]"> Department</span>
                <span className="text-[#111827] font-400 mb-5">
                  Account Manager
                </span>
              </div>
            </div>
            <div>
              <div className="text-[#111827] font-500 ">Attachment</div>
              <div className="flex py-5 gap-10">
                <div>
                  <img src="../assets/images/pages/supportDetail/blackAttachment.png" />
                </div>
                <div>
                  <img src="../assets/images/pages/supportDetail/whiteAttachment.png" />
                </div>
              </div>
            </div>
          </div>

          <div className=" w-[846px] h-[322px] flex items-start justify-end ">
            <div className=" w-1/2 h-[5rem] bg-[#2c334c] rounded-t-xl">
              <div className="flex item-center">
                <span></span>
                <span className="text-[#FFFFFF]">Client Name</span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-28 mb-[3rem]">
          <div className="shadow-sm bg-white rounded-lg"></div>
          <AddNewTicket isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
        </div>
      </div>
    </>
  );
}
