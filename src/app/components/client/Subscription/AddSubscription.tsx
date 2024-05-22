import {
  Button,
  InputAdornment,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  TextField,
  Theme,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { useField, useFormik } from "formik";
import { DownArrowIcon } from "public/assets/icons/dashboardIcons";
import { useEffect, useState } from "react";
import AddAgentModel from "src/app/components/agents/AddAgentModel";
import CommonTable from "src/app/components/commonTable";
import toast from "react-hot-toast";
import {
  Action,
  BillingTermsOptions,
  MonthlyOptions,
  StyledMenuItem,
  UnitDiscount,
} from "src/utils";
import DropdownMenu from "../../Dropdown";
import InputField from "../../InputField";
import TitleBar from "../../TitleBar";
import SelectField from "../../tableSelectField";
import CustomLineModal from "./CustomLineModal";
import LineModal from "./LineModal";
import {
  NavigateFunction,
  useLocation,
  Location,
  useNavigate,
} from "react-router-dom";
import penIcon from "../../../../../public/assets/icons/subscription-title.svg";
import { Link } from "react-router-dom";
import { DeleteIcon } from "public/assets/icons/common";
import DeleteModal from "./DeleteModal";
import { useSelector } from "react-redux";
import { ClientRootState } from "app/store/Client/Interface";
import { addsubscription } from "app/store/Client";
import { useAppDispatch } from "app/store/store";
import * as Yup from "yup";

const validationSchema = Yup.array().of(
  Yup.object().shape({
    title: Yup.string().required("Title is required"),
    unit_price: Yup.number()
      .required("Unit Price is required")
      .min(0.01, "Unit Price must be greater than 0"),
    quantity: Yup.number()
      .required("Quantity is required")
      .min(1, "Quantity must be greater than 0"),
  })
);

export default function AddSubscription() {
  const dispatch = useAppDispatch();
  const theme: Theme = useTheme();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const client_id = localStorage.getItem("client_id");
  const formik = useFormik({
    initialValues: [
      {
        title: "",
        unit_price: "",
        quantity: "",
      },
    ],
    validationSchema,
    onSubmit: (values) => {},
  });
  interface Details {
    title: string;
    one_time_discount_name: string;
    one_time_discount_type: any;
    one_time_discount: number;
    subtotal: number;
  }
  //custom dropdown
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [anchorEl1, setAnchorEl1] = useState<HTMLElement | null>(null);
  const [anchorEl2, setAnchorEl2] = useState<HTMLElement | null>(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [details, setDetails] = useState<Details>({
    title: "",
    one_time_discount_name: "",
    one_time_discount_type: 0,
    one_time_discount: 0,
    subtotal: 0,
  });
  const [customLine, setCustomLine] = useState(false);
  const [recurring, setRecurring] = useState<any>(0);
  const [isLineModal, setIsLineModal] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [UnitDiscountMode, setUnitDiscontMode] = useState<any[]>([]);
  const [isOpenDeletedModal, setIsOpenDeletedModal] = useState(false);
  const [recurringShow, setRecurringShow] = useState(false);
  const [error, setError] = useState("");
  const [unitPriceError, setUnitPriceError] = useState<string[]>([]);
  const [quantityError, setQuantityError] = useState<string[]>([]);
  const [paymentError, setPaymentError] = useState("");
  const location: Location = useLocation();
  const [id, setId] = useState();
  const navigate: NavigateFunction = useNavigate();
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
                  className="h-[40px] ps-[2rem] sm:text-[16px] flex gap-8  leading-none bg-secondary_bg rounded-[.7rem]"
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
            <div className="  w-[314px] p-4 flex flex-col flex-end">
              <MenuItem
                className="rounded-lg hover:bg-[#E7E8E9] py-10"
                onClick={() => {
                  setCustomLine(true);
                  handleClose();
                }}
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
                onClick={() => {
                  setIsLineModal(true);
                  handleClose();
                }}
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
          button={"+Add discount "}
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

  // const handleListFromChild = (arg: any[]) => {
  //   const extractedData = arg?.map((item) => ({
  //     ...item,
  //     net_price: item.unit_price,
  //   }));
  //   const data = [...list];
  //   data?.forEach((item, index) => {
  //     data[index]["billing_frequency"] = extractedData[0]["billing_frequency"];
  //     data[index]["billingTerms"] = extractedData[0]["billingTerms"];
  //     data[index]["no_of_payments"] = extractedData[0]["no_of_payments"];
  //     data[index]["billing_start_date"] =
  //       extractedData[0]["billing_start_date"];
  //   });
  //   console.log("=====data===", extractedData);
  //   setList((prevList) => [...prevList, ...extractedData]);

  //   setList((prevList) => {
  //     return prevList.map((item, i) => {
  //       return {
  //         ...item,
  //       };
  //     });
  //   });
  //   let sum = 0;
  //   extractedData.map((item, i) => {
  //     sum += Number(item.net_price);
  //     setDetails({ ...details, subtotal: sum });
  //   });
  // };

  const handleListFromChild = (arg) => {
    if (!arg || !arg.length) return;

    // Extract data and ensure all billing_frequency values are the same
    const billingFrequency = arg[0].billing_frequency;
    const billingTerms = arg[0].billing_terms;
    const noOfPayments = arg[0].no_of_payments;
    const billingStartDate = arg[0].billing_start_date;
    const extractedData = arg?.map((item) => ({
      ...item,
      net_price: item.unit_price,
      billing_frequency: billingFrequency,
      billing_terms: billingTerms,
      no_of_payments: noOfPayments,
      billing_start_date: billingStartDate,
    }));

    // Update the existing list with new extracted data
    setList((prevList) => {
      const updatedList = prevList
        ? prevList?.map((item) => ({
            ...item,
            billing_frequency: billingFrequency,
            billing_terms: billingTerms,
            no_of_payments: noOfPayments,
            billing_start_date: billingStartDate,
          }))
        : [];

      // Combine the updated list with the new extracted data
      return [...updatedList, ...extractedData];
    });

    // Compute the new subtotal
    let sum = 0;
    extractedData.forEach((item) => {
      sum += Number(item.net_price);
    });

    setDetails((prevDetails) => ({
      ...prevDetails,
      subtotal: sum,
    }));

    console.log("Updated extracted data:", extractedData);
  };

  const handleChange = (index: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    var mode = "";
    var payment = null;
    const newErrors = list?.map((item, i) => {
      mode = item["billing_terms"]; // Assign value to mode
      payment = item["no_of_payments"];
      if (item.unit_price <= 0) {
        return "Please add a unit price";
      }
      return "";
    });
    setUnitPriceError(newErrors);
    const newQuantityErrors = list?.map((item, i) => {
      if (item.quantity <= 0) {
        return "Please add a Quantity"; // Populate the error message if unit price is 0
      }
      return ""; // Otherwise, set the error message to an empty string
    });
    setQuantityError(newQuantityErrors);

    if (mode != "2" && (payment <= 0 || payment == null)) {
      setPaymentError("Please Enter Payment greater than 0");
    } else {
      setPaymentError("");
    }

    const { value, name } = event.target;
    if (
      name == "billing_frequency" ||
      name == "billing_terms" ||
      name == "no_of_payments" ||
      name == "billing_start_date"
    ) {
      setList((prevList) => {
        return prevList?.map((item, i) => {
          return {
            ...item,
            [name]: value,
          };
        });
      });
    } else {
      setList((prevList) => {
        const updatedList = [...prevList];
        updatedList[index][name] = value;
        console.log("===", updatedList[index][name], value);
        // Calculate net price and update the net_price key in the list array
        const netPrice = handleNetPrice(
          updatedList[index].unit_discount,
          updatedList[index].unit_discount_type,
          updatedList[index].unit_price,
          index
        );
        updatedList[index].net_price = netPrice
          ? netPrice
          : updatedList[index].unit_price;
        return updatedList;
      });
    }
  };

  useEffect(() => {
    var mode = "";
    var payment = null;
    const newErrors = list?.map((item, i) => {
      mode = item["billing_terms"]; // Assign value to mode
      payment = item["no_of_payments"];
      if (item.unit_price <= 0) {
        return "Please add a unit price";
      }
      return "";
    });
    setUnitPriceError(newErrors);
    const newQuantityErrors = list?.map((item, i) => {
      if (item.quantity <= 0) {
        return "Please add a Quantity"; // Populate the error message if unit price is 0
      }
      return ""; // Otherwise, set the error message to an empty string
    });
    setQuantityError(newQuantityErrors);

    if (mode != "2" && (payment <= 0 || payment == null)) {
      setPaymentError("Please Enter Payment greater than 0");
    } else {
      setPaymentError("");
    }
  }, [list]);

  const handleSubTotal = () => {
    let sum = 0;
    let unitDiscount = 0;
    list &&
      list?.map((item, i) => {
        sum += Number(item.net_price);
        unitDiscount += Number(item.unit_price);
      });
    setRecurring(unitDiscount - Number(sum));
    setDetails({ ...details, subtotal: Number(sum) });
  };

  useEffect(() => {
    handleSubTotal();
  }, [list]);

  // useEffect(() => {
  //   setDetails({
  //     ...details,
  //     total_price: details.subtotal - details.one_time_discount,
  //   });
  // }, [list]);

  const handleNetPrice = (discount: any, mode: any, price: any, index: any) => {
    if (discount && discount > 0) {
      if (mode == undefined || mode == 0 || mode == "1") {
        const netPrice = price - (price * discount) / 100;

        return netPrice.toFixed(2);
      } else if (mode == "2") {
        const netPrice = price - discount;

        return netPrice.toFixed(2);
      }
    }
    handleChange(index);
    // const updateList = [...list];
    // updateList[index] = { ...updateList[index], net_price: price };
    // setList(updateList);
    return price;
  };

  const handleDetailsChange = (e: any) => {
    const { name, value } = e.target;
    if (name == "title") {
      setError("");
    }
    setDetails({ ...details, [name]: value });
  };
  const onDelete = () => {
    const updatedList = list.filter((item) => item.id != id);
    setList(updatedList);
    setId(null);
    setIsOpenDeletedModal(false);
    setRecurringShow(false);
    setDetails({
      ...details,
      one_time_discount_name: "",
      one_time_discount_type: "",
      one_time_discount: 0,
    });
  };

  const handleSave = () => {
    let mode = "";
    let payment = null;
    const newErrors = list?.map((item, i) => {
      mode = item["billing_terms"]; // Assign value to mode
      payment = item["no_of_payments"];
      if (item.unit_price <= 0) {
        (mode = item[0].billing_terms), (payment = item[0].no_of_payments);
        return "Please add a unit price"; // Populate the error message if unit price is 0
      }
      return ""; // Otherwise, set the error message to an empty string
    });
    if (mode != "2" && (payment <= 0 || payment == null)) {
      setPaymentError("Please Enter Payment greater than 0");
    } else {
      setPaymentError("");
    }

    setUnitPriceError(newErrors);
    const newQuantityErrors = list?.map((item, i) => {
      if (item.quantity <= 0) {
        return "Please add a Quantity"; // Populate the error message if unit price is 0
      }
      return ""; // Otherwise, set the error message to an empty string
    });
    setQuantityError(newQuantityErrors);

    if (
      details.title != "" &&
      newErrors.every((error) => error == "") &&
      paymentError == "" &&
      newQuantityErrors.every((error) => error == "")
    ) {
      const extractedData = list?.map((item) => ({
        product_id: item.id,
        unit_price: item.unit_price,
        unit_discount_type: item.unit_discount_type || 1,
        unit_discount: item.unit_discount,
        net_price: item.net_price,
        quantity: item.quantity || 1,
        billing_frequency: item.billing_frequency || "2",
        billing_terms: item.billing_terms || 1,
        no_of_payments: item.no_of_payments || 1,
        is_delay_in_billing: item.is_delay_in_billing || 0,
        billing_start_date: item.billing_start_date || "",
      }));
      const fetchData = async () => {
        try {
          const payload = {
            client_id: client_id,
            ...details,
            total_price: details.subtotal - details.one_time_discount || 0,
            subscription_data: Array.from(extractedData),
          };
          //@ts-ignore
          const res = await dispatch(addsubscription(payload));
          // setList(res?.payload?.data?.data?.list);
          toast.success(res?.payload?.data?.message);

          navigate(`/admin/client/detail/${client_id}?type=subscription`);
          setList([]);
          setDetails({
            title: "",
            one_time_discount_name: "",
            one_time_discount_type: 0,
            one_time_discount: 0,
            subtotal: 0,
          });
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
    if (details.title == "") {
      setError("Title is required");
    }
  };
  const uniqueList = [];
  const seenIds = new Set();

  // Iterate through the list in reverse order
  for (let i = list.length - 1; i >= 0; i--) {
    const item = list[i];
    if (!seenIds.has(item.id)) {
      uniqueList.push(item);
      seenIds.add(item.id);
    }
  }
  const today = new Date();
  // Add one day to get tomorrow's date
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, "0"); // Months start at 0!
  const dd = String(tomorrow.getDate()).padStart(2, "0");
  const tomorrowStr = `${yyyy}-${mm}-${dd}`;
  return (
    <>
      <TitleBar title="Add Subscriptions" />
      <div className="px-[3rem]">
        <div className="bg-white rounded-lg shadow-sm pb-[2.7rem] mb-[3rem] ">
          <div className="flex items-center justify-between py-[14px]">
            <div>
              <TextField
                hiddenLabel
                className="ml-20 justify-center w-[30rem] pe-6"
                id="filled-hidden-label-small"
                defaultValue=""
                name={"title"}
                value={details.title}
                onChange={handleDetailsChange}
                variant="standard"
                placeholder="Add Title Name"
                sx={{
                  pl: 2,
                  backgroundColor: "#F6F6F6",
                  borderRadius: "8px",
                  minHeight: "48px",
                  border: "0.5px solid #9DA0A6", // Show border when focused
                  "&:focus-within": {
                    border: "1px solid blue", // Show border when focused
                  },
                  "& .MuiInputBase-input": {
                    textDecoration: "none", // Example: Remove text decoration (not typically used for input)
                    border: "none", // Hide the border of the input element
                  },
                  "& .MuiInput-underline:before": {
                    border: "none !important", // Hide the underline (if using underline variant)
                  },
                  "& .MuiInput-underline:after": {
                    borderBottom: "none !important", // Hide the underline (if using underline variant)
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <Link to="#">
                        <img
                          src={penIcon}
                          alt="pen-icon"
                          className="h-[2.5rem] w-[2.5rem]"
                        />{" "}
                      </Link>{" "}
                    </InputAdornment>
                  ),
                }}
              />
              <p className="text-right text-red pt-[5px]">{error}</p>
            </div>
            {SubButton()}
          </div>
          <CommonTable
            headings={[
              "Name",
              "",
              "Description",
              "Quantity",
              "Unit Price",
              "Unit Discount",
              "Net Price",
              "Billing Frequency",

              "Billing Terms",
              "No of Payments",
              "Delayed Billing Start Date",
            ]}
          >
            <>
              {list &&
                list?.map((row, index) => (
                  <TableRow
                    key={row.id}
                    sx={{
                      "& td": {
                        borderBottom: "1px solid #EDF2F6",
                        paddingTop: "12px",
                        paddingBottom: "12px",
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    <TableCell
                      scope="row"
                      className="font-500 whitespace-nowrap"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell
                      scope="row"
                      className="font-500 whitespace-nowrap"
                    >
                      <div
                        className="rounded-[7px] flex bg-bgGrey items-center
                     justify-center gap-10"
                      >
                        <Select
                          // formik={formik}
                          name="unitDiscount"
                          defaultValue={""}
                          sx={{
                            height: "30px",
                            minWidth: 100,
                            minHeight: "0px !important",
                            "&.MuiSelect-selectMenu": {
                              paddingRight: "0px !important", // Adjust padding for the select menu
                            },
                            "& .muiltr-1hy9xe8-MuiModal-root-MuiPopover-root-MuiMenu-root .MuiList-root": {
                              paddingBottom: "0px",
                              padding: "4px",
                            },
                            "& .MuiSelect-select": {
                              minHeight: "0rem !important",
                            },
                          }}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem
                            value=""
                            style={{
                              display: "none",
                            }}
                          >
                            Action
                          </MenuItem>
                          {/* {Action?.map((item) => ( */}
                          <StyledMenuItem
                            // key={item.value}
                            value={"Edit"}
                            onClick={() => {
                              setIsLineModal(true);
                              setId(row.id);
                            }}
                          >
                            {/* {item.label} */}
                            Edit
                          </StyledMenuItem>
                          <StyledMenuItem
                            // key={item.value}
                            value={"Delete"}
                            onClick={() => {
                              setIsOpenDeletedModal(true);
                              setId(row.id);
                            }}
                          >
                            {/* {item.label} */}
                            Delete
                          </StyledMenuItem>
                          {/* ))} */}
                        </Select>
                      </div>
                    </TableCell>
                    <TableCell
                      align="center"
                      className="font-500 whitespace-nowrap"
                    >
                      {row.description}
                    </TableCell>
                    <TableCell
                      align="center"
                      className="border-solid whitespace-nowrap font-500 border-1"
                    >
                      <InputField
                        name={"quantity"}
                        type="number"
                        formik={formik}
                        placeholder={"0"}
                        className="m-auto common-inputField w-max"
                        inputProps={{
                          className: "ps-[1rem] max-w-[90px] m-auto ",
                          placeholderTextColor: "#111827 !important",
                        }}
                        hideTopPadding={true}
                        value={
                          row.quantity != 0 ||
                          row.quantity != "" ||
                          row.quantity != null
                            ? row.quantity
                            : ""
                        }
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          handleChange(index)(event);
                        }}
                        sx={{
                          "& .MuiInputBase-input": {
                            border: "0.5px solid #9DA0A6",
                            "::placeholder": {
                              color: "#111827 !important", // Set placeholder color
                              opacity: 1,
                            },
                          },
                        }}
                      />
                      {quantityError[index] && (
                        <span style={{ color: "red" }}>
                          {quantityError[index]}
                        </span>
                      )}
                    </TableCell>
                    <TableCell align="center" className="whitespace-nowrap">
                      <InputField
                        name={"unit_price"}
                        type="number"
                        placeholder={"$00.00"}
                        formik={formik[index]}
                        // value={row.unit_price}
                        value={
                          row.unit_price != 0 ||
                          row.unit_price != "" ||
                          row.unit_price != null
                            ? row.unit_price
                            : ""
                        }
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          handleChange(index)(event);
                        }}
                        className="m-auto common-inputField w-max"
                        inputProps={{
                          className: "ps-[1rem] max-w-[90px] m-auto ",
                        }}
                        hideTopPadding={true}
                        sx={{
                          "&  .MuiInputBase-input": {
                            border: "0.5px solid #9DA0A6",
                            height: 44,
                            "::placeholder": {
                              color: "#111827 !important", // Set placeholder color
                              opacity: 1,
                            },
                          },
                        }}
                      />
                      {unitPriceError[index] && (
                        <span style={{ color: "red" }}>
                          {unitPriceError[index]}
                        </span>
                      )}
                    </TableCell>

                    <TableCell
                      align="center"
                      className="cursor-pointer whitespace-nowrap font-500 "
                    >
                      <div
                        className=" min-h-[48px] border-[0.5px] border-solid border-[#9DA0A6] rounded-[7px] flex bg-bgGrey items-center
                     justify-center gap-10"
                      >
                        <div className="unit_discount">
                          <Select
                            // formik={formik}
                            name="unit_discount_type"
                            defaultValue={"1"}
                            value={
                              row.unit_discount_type != 0 ||
                              row.unit_discount_type != ""
                                ? row.unit_discount_type
                                : "1"
                            }
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              handleChange(index)(event);
                            }}
                            // onChange={(e) =>
                            //   handleChangeUnitMode(index, e.target.value)
                            // }
                            sx={{
                              height: "46px",
                              "& .MuiInputBase-root": {
                                borderRadius: 60,

                                minHeight: "0px !important",
                              },
                              "&.MuiSelect-selectMenu": {
                                paddingRight: "0px !important", // Adjust padding for the select menu
                                border: "none",
                                borderRadius: "0",
                              },
                              "& .MuiSelect-select": {
                                minHeight: "0rem !important",
                              },
                            }}
                          >
                            {UnitDiscount?.map((item) => (
                              <StyledMenuItem
                                key={item.value}
                                value={item.value}
                              >
                                {item.label}
                              </StyledMenuItem>
                            ))}
                          </Select>
                        </div>
                        <div className="flex-1">
                          <TextField
                            hiddenLabel
                            id="filled-hidden-label-small"
                            defaultValue=""
                            name="unit_discount"
                            variant="standard"
                            size="small"
                            placeholder="%00.00"
                            value={
                              row.unit_discount != 0 || row.unit_discount != ""
                                ? row.unit_discount
                                : ""
                            }
                            inputProps={{
                              min: 0, // Set the minimum value here
                            }}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              handleChange(index)(event);
                            }}
                            sx={{
                              width: "80px",

                              "& .MuiInputBase-input": {
                                textDecoration: "none", // Example: Remove text decoration (not typically used for input)
                                border: "none", // Hide the border of the input element
                                padding: 0,
                                paddingTop: 0,
                                "::placeholder": {
                                  color: "#111827 !important", // Set placeholder color
                                  opacity: 1,
                                },
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
                    </TableCell>
                    <TableCell
                      align="center"
                      className="whitespace-nowrap font-500"
                    >
                      {/* Render the result of handleNetPrice */}
                      {handleNetPrice(
                        row.unit_discount,

                        row.unit_discount_type,
                        row.unit_price,
                        index
                      )}
                    </TableCell>

                    <TableCell align="center" className="whitespace-nowrap">
                      <div
                        className="w-[120px] truncate md:text-clip "
                        style={{
                          border: "0.5px solid #9DA0A6",
                          borderRadius: "7px",
                        }}
                      >
                        <SelectField
                          formik={formik}
                          name="billing_frequency"
                          defaultValue={"2"}
                          sx={{
                            height: "46px",
                          }}
                          value={
                            row.billing_frequency != 0
                              ? row.billing_frequency
                              : "2"
                          }
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleChange(index)(event);
                          }}
                        >
                          {MonthlyOptions?.map((item) => (
                            <StyledMenuItem
                              key={item.value}
                              value={item.value}
                              sx={{
                                minWidth: "207px",
                              }}
                            >
                              {item.label}
                            </StyledMenuItem>
                          ))}
                        </SelectField>
                      </div>
                    </TableCell>

                    <TableCell align="center" className="whitespace-nowrap ">
                      <div
                        className="w-[120px] truncate md:text-clip "
                        style={{
                          border: "0.5px solid #9DA0A6",
                          borderRadius: "7px",
                        }}
                      >
                        {/* Assign employees to this Subscriptions */}
                        <SelectField
                          formik={formik}
                          name="billing_terms"
                          defaultValue={"1"}
                          value={
                            row.billing_terms != 0 ? row.billing_terms : "1"
                          }
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleChange(index)(event);
                          }}
                          sx={{
                            height: "46px",
                          }}
                        >
                          {BillingTermsOptions?.map((item) => (
                            <StyledMenuItem key={item.value} value={item.value}>
                              {item.label}
                            </StyledMenuItem>
                          ))}
                        </SelectField>
                      </div>
                    </TableCell>

                    <TableCell
                      align="center"
                      className="whitespace-nowrap font-500"
                    >
                      {row.billing_terms == 1 ||
                      row.billing_terms == 0 ||
                      row.billing_terms == null ||
                      row.billing_terms == "" ? (
                        <>
                          <InputField
                            name={"no_of_payments"}
                            placeholder={"0"}
                            type="number"
                            // value={row.unit_price}
                            value={
                              row.no_of_payments != 0 ||
                              row.no_of_payments != "" ||
                              row.no_of_payments != null
                                ? row.no_of_payments
                                : ""
                            }
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              handleChange(index)(event);
                            }}
                            className="m-auto common-inputField w-max"
                            inputProps={{
                              className: "ps-[1rem] max-w-[90px] m-auto ",
                            }}
                            hideTopPadding={true}
                            sx={{
                              "&  .MuiInputBase-input": {
                                border: "0.5px solid #9DA0A6",
                                height: 44,
                                "::placeholder": {
                                  color: "#111827 !important", // Set placeholder color
                                  opacity: 1,
                                },
                              },
                            }}
                          />
                          {paymentError && (
                            <span style={{ color: "red" }}>{paymentError}</span>
                          )}
                        </>
                      ) : (
                        <InputField
                          name={"no_of_payments"}
                          placeholder={"0"}
                          type="number"
                          disabled={true}
                          // value={row.unit_price}
                          value={0}
                          className="m-auto common-inputField w-max"
                          inputProps={{
                            className: "ps-[1rem] max-w-[90px] m-auto ",
                          }}
                          hideTopPadding={true}
                          sx={{
                            "&  .MuiInputBase-input": {
                              border: "0.5px solid #9DA0A6",
                              height: 44,
                              "::placeholder": {
                                color: "#111827 !important", // Set placeholder color
                                opacity: 1,
                              },
                            },
                          }}
                        />
                      )}
                    </TableCell>

                    <TableCell
                      align="center"
                      className="whitespace-nowrap font-500"
                    >
                      <input
                        type="date"
                        name="billing_start_date"
                        // min={new Date().toISOString().split("T")[0]} // Set the minimum date to today
                        // disabled={row.billing_start_date ? false : true} // Disable the input if billing_start_date does not exist
                        min={tomorrowStr}
                        value={
                          row.billing_start_date != 0 ||
                          row.billing_start_date != "" ||
                          row.billing_start_date != null
                            ? row.billing_start_date
                            : ""
                        }
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          handleChange(index)(event);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </>
          </CommonTable>
        </div>
        <div className="bg-white rounded-lg shadow-sm  mb-[3rem] ">
          <h5 className="text-[#0A0F18] text-20 font-600 py-20 px-[3rem] ">
            Summary
          </h5>
          <ul className="flex flex-col text-14 gap-[3rem]">
            <li className="border-b pt-[1.5rem] pb-[2rem]  bg-[#F7F9FB] flex flex-col gap-10 px-[3rem]">
              <div className="mb-10 flex justify-between">
                <span className="text-para_light font-500">Subtotal</span>
                <span className="inline-block ml-20 font-600">
                  ${details.subtotal}
                </span>
              </div>

              {recurringShow && (
                <>
                  {" "}
                  <div className="mb-10 flex justify-between">
                    <span className="text-para_light font-500">
                      Recurring line item discount
                    </span>
                    <span className="inline-block ml-20 font-600 text-para_light">
                      ${recurring.toFixed(2)}/ month
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      <TextField
                        hiddenLabel
                        className="me-20 justify-center w-[30rem] pe-6"
                        id="filled-hidden-label-small"
                        defaultValue=""
                        name="one_time_discount_name"
                        value={details.one_time_discount_name}
                        onChange={handleDetailsChange}
                        variant="standard"
                        placeholder="XYZ Name"
                        sx={{
                          pl: 2,
                          backgroundColor: "#F6F6F6",
                          borderRadius: "8px",
                          minHeight: "48px",
                          border: "0.5px solid #9DA0A6", // Show border when focused
                          height: "48px",

                          "&:focus-within": {
                            border: "1px solid blue", // Show border when focused
                          },
                          "& .MuiInputBase-input": {
                            textDecoration: "none", // Example: Remove text decoration (not typically used for input)
                            border: "none", // Hide the border of the input element
                            padding: "0px",
                            paddingTop: "0px",
                          },
                          "& .MuiInput-underline:before": {
                            border: "none !important", // Hide the underline (if using underline variant)
                          },
                          "& .MuiInput-underline:after": {
                            borderBottom: "none !important", // Hide the underline (if using underline variant)
                          },
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="start">
                              <Link to="#">
                                <img
                                  src={penIcon}
                                  alt="pen-icon"
                                  className="h-[2.5rem] w-[2.5rem]"
                                />{" "}
                              </Link>{" "}
                            </InputAdornment>
                          ),
                        }}
                      />
                      <div
                        className="border-[0.5px] w-max border-solid border-[#9DA0A6] rounded-[7px] flex bg-bgGrey items-center
                     justify-center gap-10"
                      >
                        <div className="border-r-1 border-solid border-[#9DA0A6] ">
                          <SelectField
                            formik={formik}
                            defaultValue={"percentage"}
                            name="one_time_discount_type"
                            value={
                              details.one_time_discount_type != ""
                                ? details.one_time_discount_type
                                : "1"
                            }
                            onChange={handleDetailsChange}
                            sx={{
                              height: "46px",
                              "&.MuiSelect-selectMenu": {
                                paddingRight: "0px !important", // Adjust padding for the select menu
                              },
                            }}
                          >
                            {UnitDiscount?.map((item) => (
                              <StyledMenuItem
                                key={item.value}
                                value={item.value}
                              >
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
                            name="one_time_discount"
                            // value={details.one_time_discount}
                            value={
                              details.one_time_discount != 0
                                ? details.one_time_discount
                                : null
                            }
                            onChange={handleDetailsChange}
                            size="small"
                            placeholder="%00"
                            sx={{
                              width: "60px",
                              paddingBottom: "0px",
                              display: "flex",
                              alignItems: "center",
                              "& .MuiInputBase-input": {
                                textDecoration: "none", // Example: Remove text decoration (not typically used for input)
                                border: "none",
                                paddingBottom: "0px", // Hide the border of the input element
                                "::placeholder": {
                                  color: "#111827 !important", // Set placeholder color
                                  opacity: 1,
                                },
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
                    </div>
                    <p className="flex items-center text-base font-semibold leading-5 text-[#757982] ">
                      -${details.one_time_discount}
                      <Link to={"#"} className="ms-10">
                        <DeleteIcon
                          className="w-[16px]"
                          onClick={() => {
                            setIsOpenDeletedModal(true);
                          }}
                        />
                      </Link>
                    </p>
                  </div>
                </>
              )}
              {!recurringShow && (
                <p
                  color="secondary"
                  className="text-[#4f46e5] font-500 cursor-pointer"
                  onClick={() => setRecurringShow(true)}
                >
                  +Add discount
                </p>
              )}
              {/*  {/* with discount end */}
            </li>
            <li className="border-b py-[2rem] bg-[#F7F9FB] flex justify-between px-[3rem]">
              <span className="text-para_light font-500">Due Now</span>
              <span className="inline-block ml-20 font-600">
                ${details.subtotal - details.one_time_discount}
              </span>
            </li>
            <li className="border-b py-[2rem] bg-[#F7F9FB] flex justify-between px-[3rem]">
              <span className="text-para_light font-500">Future payments</span>
              <div className="inline-block ml-20 text-[#111827) text-[14px] font-300 ">
                <span className="flex flex-col gap-5">
                  <span>
                    <span className="font-600">
                      ${details.subtotal.toFixed(2)} / Month{" "}
                    </span>
                    starting 1 month after payment
                  </span>
                </span>
              </div>
            </li>
            <li className="border-b pb-[2.5rem] px-[3rem] flex justify-between">
              <span className="text-[#0A0F18] text-[20px] font-600">
                Total -
              </span>
              <span className="inline-block ml-20 font-600">
                ${details.subtotal - details.one_time_discount}
              </span>
            </li>
          </ul>
        </div>
        <div className="flex mb-[3rem]">
          <Button
            variant="contained"
            color="secondary"
            className="w-[156px] h-[48px] text-[18px] leading-5"
            onClick={() => handleSave()}
            disabled={list.length == 0 ? true : false}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className="w-[156px] h-[48px] text-[18px] ml-14  leading-5"
          >
            Cancel
          </Button>
        </div>
      </div>
      <AddAgentModel
        isOpen={isOpenAddModal}
        setIsOpen={setIsOpenAddModal}
        isEditing={false}
      />

      <CustomLineModal
        isOpen={customLine}
        setIsOpen={setCustomLine}
        handleList={handleListFromChild}
      />

      {isLineModal && (
        <LineModal
          isOpen={isLineModal}
          setIsOpen={setIsLineModal}
          handleList={handleListFromChild}
          setId={setId}
          // fetchUpdateData={fetchUpdateData}
          id={id}
        />
      )}
      <DeleteModal
        isOpen={isOpenDeletedModal}
        setIsOpen={setIsOpenDeletedModal}
        title="Delete Line Item"
        onDelete={onDelete}
        description="Are you sure you want to delete this line item ?"
      />
    </>
  );
}
