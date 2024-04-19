import { TableCell, TableRow, Theme, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
import { useState } from "react";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddAgentModel from "src/app/components/agents/AddAgentModel";
import ImagesOverlap from "src/app/components/ImagesOverlap";
import { ArrowRightCircleIcon } from "public/assets/icons/common";
import { Link } from "react-router-dom";
import TitleBar from "../../TitleBar";
import DropdownMenu from "../../Dropdown";
import { DownArrowIcon } from "public/assets/icons/dashboardIcons";
import InputField from "../../InputField";
import SelectField from "../../tableSelectField";
import { MonthlyOptions, StyledMenuItem } from "src/utils";

const rows = [
  {
    ticket: "Denojs",
    subject: "Web page design",
    status: "Unassigned",
    department: "Lorem Ipsum",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "male-02.jpg", "female-02.jpg"],
  },
  {
    ticket: "Denojs",
    subject: "Web page design",
    status: "Unassigned",
    department: "Lorem Ipsum",
    date: "Feb 12,2024",
    assignedImg: ["female-01.jpg", "male-02.jpg", "female-02.jpg"],
  },
];

export default function AddSubscription() {
  const theme: Theme = useTheme();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      role: "",
      email: "",
      phone: "",
    },
    onSubmit: (values) => {},
  });

  //custom dropdown
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [anchorEl1, setAnchorEl1] = useState<HTMLElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl1(null);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const selectCurrency = (): JSX.Element => {
    return (
      <>
        <DropdownMenu
          marginTop={"mt-[-20px] "}
          button={
            <div className="relative w-max" onClick={handleButtonClick}>
              <div className="p-[2.7rem] flex items-center">
                <span className="text-20 font-600 text-[#0A0F18]">
                  Currency :{" "}
                </span>
                <span className="inline-block pl-5 text-secondary font-600 text-18">
                  {" "}
                  Us Dollar (USD)$
                </span>
                <span className="inline-block ml-10">
                  <DownArrowIcon className="cursor-pointer" />
                </span>
              </div>
            </div>
          }
          anchorEl={anchorEl}
          handleClose={handleClose}
        >
          <div className="w-[375px] p-20 ">
            <div className="relative w-full mt-10 mb-3 sm:mb-0 ">
              <h4>$ USD</h4>
            </div>
          </div>
        </DropdownMenu>
      </>
    );
  };
  return (
    <>
      <TitleBar title="Add Subscriptions" />
      <div className="mb-[3rem] pl-[3rem] ">
        <div className="bg-white rounded-lg shadow-sm ">
          {selectCurrency()}
          <CommonTable
            headings={[
              "Name",
              "Description",
              "Quantity",
              "Unit Price",
              "Unit Discount",
              "Net Price",
              "Billing Frequency",
              "Billing Terms",
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
                  <TableCell scope="row" className="font-500">
                    {row.ticket}
                  </TableCell>
                  <TableCell align="center" className="font-500">
                    {row.department}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="whitespace-nowrap font-500"
                  >
                    <InputField
                      name={"name"}
                      placeholder={"1"}
                      className="m-auto common-inputField w-max"
                      inputProps={{
                        className: "ps-[1rem] max-w-[90px] m-auto ",
                      }}
                      hideTopPadding={true}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <InputField
                      name={"name"}
                      placeholder={"$444.00"}
                      className="m-auto common-inputField w-max"
                      inputProps={{
                        className: "ps-[1rem] max-w-[90px] m-auto ",
                      }}
                      hideTopPadding={true}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    className="whitespace-nowrap font-500"
                  >
                    <InputField
                      name={"name"}
                      placeholder={"$444.00"}
                      className="m-auto common-inputField w-max"
                      inputProps={{
                        className: "ps-[1rem] max-w-[90px] m-auto ",
                      }}
                      hideTopPadding={true}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    className="whitespace-nowrap font-500"
                  >
                    {row.date}
                  </TableCell>
                  <TableCell align="center" className="whitespace-nowrap">
                    <SelectField
                      formik={formik}
                      name="Billing"
                      defaultValue={"Monthly"}
                      sx={{
                        "& .radioIcon": { display: "none" },
                      }}
                    >
                      {MonthlyOptions.map((item) => (
                        <StyledMenuItem key={item.value} value={item.value}>
                          {item.label}
                        </StyledMenuItem>
                      ))}
                    </SelectField>
                  </TableCell>
                  <TableCell align="center" className="whitespace-nowrap">
                    <SelectField
                      formik={formik}
                      name="billingTerms"
                      defaultValue={"Monthly"}
                      sx={{
                        "& .radioIcon": { display: "none" },
                      }}
                    >
                      {MonthlyOptions.map((item) => (
                        <StyledMenuItem key={item.value} value={item.value}>
                          {item.label}
                        </StyledMenuItem>
                      ))}
                    </SelectField>
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
      <AddAgentModel isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
    </>
  );
}
