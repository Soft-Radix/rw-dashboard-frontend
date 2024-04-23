import {
  Button,
  InputAdornment,
  MenuItem,
  TableCell,
  TableRow,
  TextField,
  Theme,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
import { EditIcon } from "public/assets/icons/common";
import { DownArrowIcon } from "public/assets/icons/dashboardIcons";
import { useState } from "react";
import AddAgentModel from "src/app/components/agents/AddAgentModel";
import CommonTable from "src/app/components/commonTable";
import {
  BillingTermsOptions,
  EmployOptions,
  MonthlyOptions,
  StyledMenuItem,
  UnitDiscount,
} from "src/utils";
import DropdownMenu from "../../Dropdown";
import InputField from "../../InputField";
import TitleBar from "../../TitleBar";
import SelectUser from "../../selectField";
import SelectField from "../../tableSelectField";
import CustomLineModal from "./CustomLineModal";
import LineModal from "./LineModal";

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
  const [anchorEl2, setAnchorEl2] = useState<HTMLElement | null>(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [customLine, setCustomLine] = useState(false);
  const [isLineModal, setIsLineModal] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl1(null);
    setAnchorEl2(null);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handlelineClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl1(event.currentTarget);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleTexFeeClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl2(event.currentTarget);
  };
  const SubButton = (): JSX.Element => {
    return (
      <>
        <div className="flex items-center gap-20 mr-20 ">
          <Button
            className="items-center px-20 rounded-lg text-secondary bg-secondary_bg w-max font-600 "
            endIcon={<EditIcon fill="#4F46E5" />}
          >
            Edit Column
          </Button>
          <DropdownMenu
            marginTop={"mt-20"}
            button={
              <div
                className="relative flex items-center"
                onClick={handlelineClick}
              >
                <Button
                  variant="text"
                  color="secondary"
                  className="h-[40px] sm:text-[16px] flex gap-8  leading-none bg-secondary_bg rounded "
                  aria-label="Lines"
                  endIcon={<DownArrowIcon className="cursor-pointer" />}
                >
                  Add Lines Items
                </Button>
              </div>
            }
            anchorEl={anchorEl1}
            handleClose={handleClose}
          >
            <div className="w-[375px] pt-1 pb-20 flex flex-col gap-10  ">
              <MenuItem
                className="rounded-lg hover:bg-[#E7E8E9] py-10"
                onClick={() => setCustomLine(true)}
              >
                <label
                  htmlFor="agents"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#111827",
                  }}
                >
                  Select from product library
                </label>
              </MenuItem>

              <MenuItem
                className="rounded-lg hover:bg-[#E7E8E9] py-10"
                onClick={() => setIsLineModal(true)}
              >
                <label
                  htmlFor="activity"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: "16px",
                    fontWeight: "500",
                    color: "#111827",
                  }}
                >
                  Create custom line item
                </label>
              </MenuItem>
            </div>
          </DropdownMenu>
        </div>
      </>
    );
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
  const DiscountFee = (): JSX.Element => {
    return (
      <>
        <DropdownMenu
          marginTop={"mt-[20px] "}
          button={
            <div className="relative w-max flex" onClick={handleTexFeeClick}>
              <span className="inline-block pl-5 text-secondary font-600 text-18">
                {" "}
                +Add discount fee or tax
              </span>
              <span className="inline-block ml-10">
                <DownArrowIcon className="cursor-pointer" />
              </span>
            </div>
          }
          anchorEl={anchorEl2}
          handleClose={handleClose}
        >
          <div className="p-5 w-[300px]">
            <MenuItem className="rounded-lg hover:bg-[#E7E8E9] py-10">
              <label
                htmlFor="activity"
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#111827",
                }}
              >
                Add one time discount
              </label>
            </MenuItem>
            <MenuItem className="rounded-lg hover:bg-[#E7E8E9] py-10">
              <label
                htmlFor="activity"
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#111827",
                }}
              >
                Add one time tax
              </label>
            </MenuItem>
            <MenuItem className="rounded-lg hover:bg-[#E7E8E9] py-10">
              <label
                htmlFor="activity"
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#111827",
                }}
              >
                Add one time fee
              </label>
            </MenuItem>
          </div>
        </DropdownMenu>
      </>
    );
  };
  return (
    <>
      <TitleBar title="Add Subscriptions" />
      <div className="px-[3rem]">
        <div className="bg-white rounded-lg shadow-sm pb-[2.7rem] mb-[3rem]">
          <div className="flex items-center justify-between">
            {selectCurrency()}
            {SubButton()}
          </div>
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
                  <TableCell scope="row" className="font-500 ">
                    {row.ticket}
                  </TableCell>
                  <TableCell align="center" className="font-500">
                    {row.department}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="whitespace-nowrap font-500 border-1 border-solid"
                  >
                    <InputField
                      name={"name"}
                      placeholder={"1"}
                      className="m-auto common-inputField w-max"
                      inputProps={{
                        className: "ps-[1rem] max-w-[90px] m-auto ",
                      }}
                      hideTopPadding={true}
                      sx={{
                        "&  .MuiInputBase-input": {
                          border: "0.5px solid #9DA0A6",
                        },
                      }}
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
                      sx={{
                        "&  .MuiInputBase-input": {
                          border: "0.5px solid #9DA0A6",
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    className="cursor-pointer whitespace-nowrap font-500 "
                  >
                    <div
                      className="border-[0.5px]  border-solid border-[#9DA0A6] rounded-[7px] flex bg-bgGrey items-center
                     justify-center gap-10"
                    >
                      <div className="border-r-1 border-solid border-[#9DA0A6] ">
                        <SelectField
                          formik={formik}
                          name="unitDiscount"
                          defaultValue={"percentage"}
                          sx={{
                            "& .MuiSelect-selectMenu": {
                              paddingRight: "0px", // Adjust padding for the select menu
                            },
                          }}
                        >
                          {UnitDiscount.map((item) => (
                            <StyledMenuItem key={item.value} value={item.value}>
                              {item.label}
                            </StyledMenuItem>
                          ))}
                        </SelectField>
                      </div>
                      <div className="flex-1">
                        <TextField
                          hiddenLabel
                          id="filled-hidden-label-small"
                          defaultValue=""
                          variant="standard"
                          size="small"
                          placeholder="$444.00"
                          sx={{
                            width: "60px",
                            "& .MuiInputBase-input": {
                              textDecoration: "none", // Example: Remove text decoration (not typically used for input)
                              border: "none", // Hide the border of the input element
                            },
                            "& .MuiInput-underline:before": {
                              borderBottom: "none !important", // Hide the underline (if using underline variant)
                            },
                            "& .MuiInput-underline:after": {
                              borderBottom: "none !important", // Hide the underline (if using underline variant)
                            },
                          }}
                        ></TextField>
                      </div>
                    </div>
                    {/* <TextField
                      hiddenLabel
                      id="filled-hidden-label-small"
                      defaultValue=""
                      variant="standard"
                      size="small"
                      placeholder="$444.00"
                      className="bg-bgGrey border-solid border-1 border-[#9DA0A6] "
                      sx={{
                        borderRadius: "10px",
                        pl: "4px",
                        pr: 2,
                        pt: 1,
                        pb: 1,

                        "& .MuiInputBase-input": {
                          textDecoration: "none", // Example: Remove text decoration (not typically used for input)
                          border: "none", // Hide the border of the input element
                        },
                        "& .MuiInput-underline:before": {
                          borderBottom: "none !important", // Hide the underline (if using underline variant)
                        },
                        "& .MuiInput-underline:after": {
                          borderBottom: "none !important", // Hide the underline (if using underline variant)
                        },
                      }}
                      InputProps={{
                        className: " max-w-[130px] m-auto",
                        startAdornment: (
                          <InputAdornment position="start">
                            <SelectField
                              formik={formik}
                              name="Billing"
                              defaultValue={"percentage"}
                              sx={{
                                borderRight: "0.5px solid #9DA0A6",
                                borderRadius: "0px",

                                "& .radioIcon": { display: "none" },
                                "&.MuiInputBase-root": {
                                  "& .MuiSelect-select": {
                                    paddingTop: "6px",
                                    PaddingBottom: "8px",
                                  },
                                },
                              }}
                            >
                              {UnitDiscount.map((item) => (
                                <StyledMenuItem
                                  key={item.value}
                                  value={item.value}
                                >
                                  {item.label}
                                </StyledMenuItem>
                              ))}
                            </SelectField>
                          </InputAdornment>
                        ),
                      }}
                    ></TextField> */}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="whitespace-nowrap font-500"
                  >
                    {row.date}
                  </TableCell>
                  <TableCell align="center" className="whitespace-nowrap">
                    {/* <div className="border-[0.5px] border-[#9DA0A6] rounded-8 text-center"> */}
                    <SelectField
                      formik={formik}
                      name="Billing"
                      defaultValue={"Monthly"}
                      sx={{
                        "& .radioIcon": { display: "none" },
                        "&  .MuiInputBase-input": {
                          border: "0.5px solid #9DA0A6",
                          borderRadius: "7px",
                        },
                      }}
                    >
                      {MonthlyOptions.map((item) => (
                        <StyledMenuItem key={item.value} value={item.value}>
                          {item.label}
                        </StyledMenuItem>
                      ))}
                    </SelectField>
                    {/* </div> */}
                  </TableCell>
                  <TableCell align="center" className="whitespace-nowrap ">
                    <SelectField
                      formik={formik}
                      name="billingTerms"
                      defaultValue={"One"}
                      sx={{
                        "& .radioIcon": { display: "none" },
                        "&  .MuiInputBase-input": {
                          border: "0.5px solid #9DA0A6",
                          borderRadius: "7px",
                          maxWidth: "80 px", // Limit the width of the input
                          overflow: "hidden", // Hide overflowing content
                          textOverflow: "ellipsis", // Display ellipsis for truncated text
                          whiteSpace: "nowrap",
                        },
                      }}
                    >
                      {BillingTermsOptions.map((item) => (
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
          <div className="flex justify-end py-14 px-[3rem] mt-[2rem] w-full  md:w-9/12">
            <SelectUser
              formik={formik}
              name="status"
              label="Assign employees to this Subscriptions"
              placeholder="Select"
              sx={{
                "& .radioIcon": { display: "none" },
              }}
            >
              {EmployOptions.map((item) => (
                <StyledMenuItem key={item.value} value={item.value}>
                  {item.label}
                </StyledMenuItem>
              ))}
            </SelectUser>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm py-[2.7rem] mb-[3rem]">
          <h5 className="text-[#0A0F18] text-20 font-500 mb-20 px-[3rem] ">
            Summary
          </h5>
          <ul className="flex flex-col text-14 gap-[4rem]">
            <li className="border-b pb-[2rem] bg-[#F7F9FB] flex flex-col gap-10">
              <div className="mb-10">
                <span className="text-para_light  px-[3rem]">
                  Subtotal---------------------------------------------------
                </span>
                <span className="inline-block ml-20 font-500">$444.00</span>
              </div>
              <span className="px-[3rem] text-secondary text-[14px] font-500 flex items-center cursor-pointer">
                {DiscountFee()}
                {/* +Add discount fee or tax{" "}
                <span>
                  {" "}
                  <DownArrowIcon className="ml-10" />
                </span> */}
              </span>
            </li>
            <li className="border-b pb-[2rem] bg-[#F7F9FB]">
              <span className="text-para_light  px-[3rem]">
                Due Now--------------------------------------------------
              </span>
              <span className="inline-block ml-20 font-500">$444.00</span>
            </li>
            <li className="border-b pb-[2rem] bg-[#F7F9FB]">
              <span className="text-para_light  px-[3rem]">
                Future payments------------------------------------------
              </span>
              <div className="inline-block ml-20 text-[#111827) text-[14px] font-300 ">
                <span className="flex flex-col gap-5">
                  <span>
                    <span className="font-500">$555.00 / Month </span>
                    starting 4 days after payment
                  </span>
                  <span>
                    {" "}
                    <span className="font-500">$555.00 / Month </span>starting 1
                    month after payment
                  </span>
                </span>
              </div>
            </li>
            <li className="border-b pb-[2rem] bg-[#F7F9FB]">
              <span className="text-[#0A0F18] text-[20px] font-600 px-[3rem]">
                Total -
              </span>
            </li>
          </ul>
        </div>
      </div>
      <AddAgentModel isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
      <CustomLineModal isOpen={customLine} setIsOpen={setCustomLine} />
      <LineModal isOpen={isLineModal} setIsOpen={setIsLineModal} />
    </>
  );
}
