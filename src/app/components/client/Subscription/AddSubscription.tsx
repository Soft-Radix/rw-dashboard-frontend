import {
  Button,
  InputAdornment,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  TextField,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { useField, useFormik } from "formik";
import { DownArrowIcon } from "public/assets/icons/dashboardIcons";
import { useEffect, useRef, useState } from "react";
import AddAgentModel from "src/app/components/agents/AddAgentModel";
import CommonTable from "src/app/components/commonTable";
import toast from "react-hot-toast";

import {
  Action,
  BillingTermsOptions,
  MonthlyOptions,
  StyledMenuItem,
  UnitDiscount,
  getAdjusted,
  getAdjustedTime,
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
import { addsubscription, subscriptionList } from "app/store/Client";
import { useAppDispatch } from "app/store/store";
import * as Yup from "yup";
import { NumericFormat } from "react-number-format";

export const TruncateText = ({ text, maxWidth }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth;
      setIsTruncated(textWidth > maxWidth);
    }
  }, [text, maxWidth]);

  return (
    <Tooltip title={text} enterDelay={500} disableHoverListener={!isTruncated}>
      <Typography
        ref={textRef}
        noWrap
        style={{
          maxWidth: `${maxWidth}px`,
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "inline-block",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </Typography>
    </Tooltip>
  );
};

const validationSchema = Yup.array().of(
  Yup.object().shape({
    title: Yup.string().required("Title is required"),
    unit_price: Yup.number()
      .required("Unit Price is required")
      .min(0.01, "Unit Price must be greater than 0")
      .test(
        "decimal-places",
        "Only two decimal places are allowed",
        (value: any) => value === undefined || /^\d+(\.\d{1,2})?$/.test(value)
      )
      .test(
        "max-length",
        "Unit Price must be less than or equal to 6 digits",
        (value: any) =>
          value === undefined || /^\d{1,6}(\.\d{1,2})?$/.test(value)
      ),
    quantity: Yup.number()
      .required("Quantity is required")
      .min(0.01, "Quantity must be greater than 0")
      .test(
        "decimal-places",
        "Only two decimal places are allowed",
        (value: any) => value === undefined || /^\d+(\.\d{1,2})?$/.test(value)
      )
      .test(
        "max-length",
        "Quantity must be less than or equal to 6 digits",
        (value: any) =>
          value === undefined || /^\d{1,6}(\.\d{1,2})?$/.test(value)
      ),
  })
);

export default function AddSubscription() {
  const dispatch = useAppDispatch();
  const theme: Theme = useTheme();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const client_id = localStorage.getItem("client_id");
  const [dateError, setDateError] = useState("");
  const [customList, setCustomList] = useState<any[]>([]);
  const [disable, setDisable] = useState(false);
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
  const [deleteList, setDeleteList] = useState([]);
  const [recurring, setRecurring] = useState<any>(0);
  const [isLineModal, setIsLineModal] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [UnitDiscountMode, setUnitDiscontMode] = useState<any[]>([]);
  const [isOpenDeletedModal, setIsOpenDeletedModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [deleteDescription, SetDeleteDescription] = useState("");
  const [Action, setAction] = useState([]);
  const [recurringShow, setRecurringShow] = useState(false);
  const [error, setError] = useState("");
  const [nameError, setNameError] = useState("");
  const [unitPriceError, setUnitPriceError] = useState<string[]>([]);
  const [quantityError, setQuantityError] = useState<string[]>([]);
  const [paymentError, setPaymentError] = useState("");
  const [disableDelete, setDisableDelete] = useState(false);
  const [frequencyMode, setFrequencyMode] = useState(0);
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
                  Add Line Items
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
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setDate(tomorrow.getDate() + 2); // Add one more day
  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, "0"); // Months start at 0!
  const dd = String(tomorrow.getDate()).padStart(2, "0");
  const tomorrowStr = `${yyyy}-${mm}-${dd}`;

  const handleListFromChild = (arg) => {
    if (!arg || !arg.length) return;

    // Extract common data from the first item in arg
    const billingFrequency = arg[0].billing_frequency;
    const billingTerms = arg[0].billing_terms;
    const noOfPayments = arg[0].no_of_payments;
    const billingStartDate = arg[0].billing_start_date;
    setFrequencyMode(billingFrequency);
    if (billingStartDate >= tomorrowStr) {
      const validation = validateBillingStartDate(billingStartDate);

      if (validation.isValid) {
        // Handle valid date, e.g., update state or form data
        setDateError(""); // Clear any previous error
      } else {
        console.error(validation.error);
        setDateError(validation.error); // Set the error message to be displayed
      }
    }
    // Map over arg to ensure all objects have consistent values
    const extractedData = arg.map((item) => ({
      ...item,
      net_price: item.unit_price,
      billing_frequency: billingFrequency,
      billing_terms: billingTerms,
      no_of_payments: noOfPayments,
      billing_start_date: billingStartDate,
    }));

    setList((prevList) => {
      if (!prevList || prevList.length === 0) {
        // If prevList is empty, set it to extractedData
        return extractedData;
      }

      // Create a map for the new items by id for quick lookup
      const extractedDataMap = extractedData.reduce((map, item) => {
        map[item.id] = item;
        return map;
      }, {});

      // Update the existing list with new extracted data or add new items
      const updatedList = prevList.map((item) => {
        if (extractedDataMap[item.id]) {
          return {
            ...extractedDataMap[item.id],
            billing_frequency: billingFrequency,
            billing_terms: billingTerms,
            no_of_payments: noOfPayments,
            billing_start_date: billingStartDate,
          };
        }
        return {
          ...item,
          billing_frequency: billingFrequency,
          billing_terms: billingTerms,
          no_of_payments: noOfPayments,
          billing_start_date: billingStartDate,
        };
      });

      // Add any new items from extractedData that don't exist in the updatedList
      extractedData.forEach((item) => {
        if (!updatedList.some((existingItem) => existingItem.id === item.id)) {
          updatedList.push({
            ...item,
            billing_frequency: billingFrequency,
            billing_terms: billingTerms,
            no_of_payments: noOfPayments,
            billing_start_date: billingStartDate,
          });
        }
      });

      return updatedList;
    });

    // Compute the new subtotal
    const sum = extractedData.reduce(
      // (total, item) => total + Number(item.net_price * item.quantity),
      (total, item, index) =>
        total +
        handleNetPrice(
          item.unit_discount,
          item.unit_discount_type,
          item.unit_price,
          index,
          item.quantity
        ),
      0
    );
    setDetails((prevDetails) => ({
      ...prevDetails,
      subtotal: sum,
    }));

    // setCustomList(deleteList);
  };

  // const handleChange = (index: number) => (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   var mode = "";
  //   var payment = null;
  //   const newErrors = list?.map((item, i) => {
  //     mode = item["billing_terms"]; // Assign value to mode
  //     payment = item["no_of_payments"];
  //     if (item.unit_price <= 0) {
  //       return "Please add a unit price";
  //     }
  //     return "";
  //   });
  //   setUnitPriceError(newErrors);
  //   const newQuantityErrors = list?.map((item, i) => {
  //     if (item.quantity <= 0) {
  //       return "Please add a Quantity"; // Populate the error message if unit price is 0
  //     }
  //     return ""; // Otherwise, set the error message to an empty string
  //   });
  //   setQuantityError(newQuantityErrors);

  //   if (mode != "2" && (payment <= 0 || payment == null)) {
  //     setPaymentError("Please Enter Payment greater than 0");
  //   } else {
  //     setPaymentError("");
  //   }

  //   const { value, name } = event.target;
  //   if (
  //     name == "billing_frequency" ||
  //     name == "billing_terms" ||
  //     name == "no_of_payments" ||
  //     name == "billing_start_date"
  //   ) {
  //     if (name == "billing_start_date") {
  //       const validation = validateBillingStartDate(value);

  //       if (validation.isValid) {
  //         // Handle valid date, e.g., update state or form data
  //         setDateError(""); // Clear any previous error
  //       } else {
  //         console.error(validation.error);
  //         setDateError(validation.error); // Set the error message to be displayed
  //       }
  //     }
  //     setList((prevList) => {
  //       return prevList?.map((item, i) => {
  //         return {
  //           ...item,
  //           [name]: value,
  //         };
  //       });
  //     });
  //   } else {
  //     setList((prevList) => {
  //       const updatedList = [...prevList];
  //       updatedList[index][name] = value;
  //       // Calculate net price and update the net_price key in the list array
  //       const netPrice = handleNetPrice(
  //         updatedList[index].unit_discount || 0,
  //         updatedList[index].unit_discount_type || 1,
  //         updatedList[index].unit_price,
  //         index,
  //         updatedList[index].quantity
  //       );
  //       updatedList[index].net_price = netPrice
  //         ? netPrice
  //         : updatedList[index].unit_price;
  //       return updatedList;
  //     });
  //   }
  // };

  const handleChange = (index: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const formatNumber = (value: string) => {
      const numberValue = parseFloat(value);
      if (isNaN(numberValue)) return value;
      const parts = value.split(".");
      let integerPart = parts[0].slice(0, 6); // Limit integer part to 6 digits
      let decimalPart = parts.length > 1 ? parts[1].substring(0, 2) : "";
      return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
    };

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
    const formatQuantity = (value: string) => {
      // Remove any non-digit characters and limit to 6 digits
      return value.replace(/\D/g, "").slice(0, 6);
    };
    const { value, name } = event.target;

    let formattedValue = value;
    if (name == "quantity") {
      formattedValue = formatQuantity(value);
    } else if (!isNaN(Number(value))) {
      formattedValue = formatNumber(value);
    }

    if (
      name === "billing_frequency" ||
      name === "billing_terms" ||
      name === "no_of_payments" ||
      name === "billing_start_date"
    ) {
      if (name === "billing_start_date") {
        const validation = validateBillingStartDate(value);

        if (validation.isValid) {
          // Handle valid date, e.g., update state or form data
          setDateError(""); // Clear any previous error
        } else {
          console.error(validation.error);
          setDateError(validation.error); // Set the error message to be displayed
        }
      }

      setList((prevList) => {
        return prevList?.map((item, i) => {
          return {
            ...item,
            [name]: formattedValue,
          };
        });
      });
    } else {
      setList((prevList) => {
        const updatedList = [...prevList];
        updatedList[index][name] = formattedValue;
        // Calculate net price and update the net_price key in the list array
        const netPrice = handleNetPrice(
          updatedList[index].unit_discount || 0,
          updatedList[index].unit_discount_type || 1,
          updatedList[index].unit_price,
          index,
          updatedList[index].quantity
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
        unitDiscount += Number(
          handleNetPrice(
            item.unit_discount,
            item.unit_discount_type,
            item.unit_price,
            i,
            item.quantity
          )
        );
      });
    setRecurring(unitDiscount - Number(sum));
    setDetails({ ...details, subtotal: Number(unitDiscount) });
  };

  useEffect(() => {
    handleSubTotal();
  }, [list]);

  const handleNetPrice = (
    discount: any,
    mode: any,
    price: any,
    index: any,
    quantity?: any
  ) => {
    if (discount && discount > 0) {
      if (mode == undefined || mode == 0 || mode == "1") {
        const netPrice = quantity * (price - (price * discount) / 100);

        return netPrice.toFixed(2);
      } else if (mode == "2") {
        const netPrice = quantity * price - discount;

        return netPrice.toFixed(2);
      }
    }
    handleChange(index);

    return (quantity * price).toFixed(2);
  };

  const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Helper function to ensure value has no more than 2 decimal places and max 6 digits
    const formatToTwoDecimalsAndMaxSixDigits = (num: string) => {
      // Ensure that the total number of digits does not exceed 6
      if (num.length > 6 && !num.includes(".")) {
        return num?.slice(0, 6);
      }

      const regex = /^\d{0,6}(\.\d{0,2})?$/;
      if (regex.test(num)) {
        return num;
      } else {
        // Limit input to 2 decimal places without altering the preceding digits
        const parts = num.split(".");
        const integerPart = parts[0]?.slice(0, 6);
        const decimalPart = parts?.length > 1 ? parts[1].substring(0, 2) : "";
        return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
      }
    };

    let formattedValue = value;

    // If the field needs to be formatted to 2 decimal places and max 6 digits
    if (name == "subtotal" || name == "one_time_discount") {
      formattedValue = formatToTwoDecimalsAndMaxSixDigits(value);
    }

    if (formattedValue.trim() === "" && formattedValue !== "") {
      return;
    }
    if (name == "title") {
      if (formattedValue.trim() === "") {
        setError("Title is required");
      } else if (formattedValue.length > 50) {
        setError("Title should be less than or equal to 50 characters");
      } else {
        setError("");
      }
    }

    if (recurringShow && name == "one_time_discount_name") {
      if (formattedValue.trim() === "") {
        setNameError("Discount name is required");
      } else if (formattedValue.length > 50) {
        setNameError(
          "Discount name should be less than or equal to 50 characters"
        );
      } else {
        setNameError("");
      }
    }

    setDetails({ ...details, [name]: formattedValue });

    // setDetails({ ...details, [name]: formattedValue });
  };

  const validateTitle = () => {};

  const onDelete = () => {
    setDisableDelete(true);
    const updatedList = list.filter((item) => item.id != id);
    const updatedCustomList = list.filter((item) => item.id == id);
    if (updatedCustomList[0].type == 0) {
      setCustomList([...updatedCustomList, ...customList]);
    }
    setList(updatedList);
    setId(null);
    setIsOpenDeletedModal(false);

    setDisableDelete(false);
  };

  const onDeleteRecurring = () => {
    setDisableDelete(true);
    setIsOpenDeletedModal(false);
    setRecurringShow(false);
    setDetails({
      ...details,
      one_time_discount_name: "",
      one_time_discount_type: "",
      one_time_discount: 0,
    });
    setDisableDelete(false);
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
      (!recurringShow ||
        (recurringShow &&
          details.one_time_discount_name != "" &&
          details.one_time_discount_name.length <= 50)) &&
      details.title.length <= 50 &&
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
        setDisable(true);
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
          setDisable(false);
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
          setDisable(false);
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
    if (details.title == "") {
      setError("Title is required");
    }
    if (recurringShow) {
      if (details.one_time_discount_name == "") {
        setNameError("Discount name is required");
      }
    }
  };
  // const uniqueList = [];
  const uniqueList = [...new Set(list)];

  const handleCancel = () => {
    setList([]);
    setDetails({
      title: "",
      one_time_discount_name: "",
      one_time_discount_type: 0,
      one_time_discount: 0,
      subtotal: 0,
    });
  };

  const validateBillingStartDate = (dateString) => {
    const selectedDate = new Date(dateString);
    selectedDate.setHours(0, 0, 0, 0); // Set to the beginning of the day for comparison

    const year = selectedDate.getFullYear().toString();
    const isFourDigitYear = /^\d{4}$/.test(year);

    if (!isFourDigitYear) {
      return { isValid: false, error: "Year must be in 4 digits" };
    }

    if (selectedDate <= today) {
      return {
        isValid: false,
        error: "Billing Start Date must be greater than tomorrow",
      };
    }

    return { isValid: true, error: "" };
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {
          start: 0,
          limit: -1,
          search: "",
        };
        const res = await dispatch(subscriptionList(payload));
        setCustomList(res?.payload?.data?.data?.list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const actions = [];
    uniqueList?.forEach((item) => {
      actions.push("action");
    });
    setAction([...actions]);
  }, [list]);

  useEffect(() => {
    if (!isLineModal && !isOpenDeletedModal) {
      const actions = uniqueList.map(() => "action");
      setAction(actions);
    }
  }, [isLineModal, isOpenDeletedModal]);

  const subtotal = details?.subtotal;
  const formattedSubtotal = !isNaN(Number(subtotal))
    ? Number(subtotal).toFixed(2)
    : "0.00";

  let discountedSubtotal;

  if (details.one_time_discount_type == 2) {
    discountedSubtotal = details?.subtotal - details?.one_time_discount;
  } else {
    discountedSubtotal =
      details.subtotal - (details?.subtotal * details?.one_time_discount) / 100;
  }
  const formattedDiscountedSubtotal = discountedSubtotal.toFixed(2);

  let frequencyModeValue;
  useEffect(() => {
    frequencyModeValue = getAdjustedTime(Number(frequencyMode));
  }, [frequencyMode]);

  const inputRef = useRef(null);

  useEffect(() => {
    const handleWheel = (event) => {
      const activeElement = document.activeElement as HTMLInputElement;
      if (
        activeElement.tagName === "INPUT" &&
        activeElement.type === "number" &&
        activeElement.classList.contains("noscroll")
      ) {
        activeElement.blur();
      }
    };

    document.addEventListener("wheel", handleWheel);

    return () => {
      document.removeEventListener("wheel", handleWheel);
    };
  }, [list]);
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
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="start">
                //       <Link to="#">
                //         <img
                //           src={penIcon}
                //           alt="pen-icon"
                //           className="h-[2.5rem] w-[2.5rem]"
                //         />{" "}
                //       </Link>{" "}
                //     </InputAdornment>
                //   ),
                // }}
              />
              <p className="text-left text-red pt-[5px] ml-20 text-[11px]">
                {error}
              </p>
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
              {uniqueList &&
                uniqueList?.map((row, index) => (
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
                      className="font-500 whitespace-nowrap pl-[20px]"
                    >
                      <TruncateText text={row.name} maxWidth={200} />
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
                          defaultValue={"action"}
                          value={Action[index] || "action"}
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
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "transparent",
                              border: "0.5px solid #9DA0A6",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderWidth: "1px",
                              border: "0.5px solid #9DA0A6",
                            },
                            "&.Mui-focused": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderWidth: "1px",
                                border: "0.5px solid #9DA0A6",
                              },
                            },
                          }}
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem
                            value={"action"}
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
                              const action = [...Action];
                              action[index] = "Edit";
                              setAction([...action]);
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
                              const action = [...Action];
                              action[index] = "Delete";
                              setAction([...action]);
                              setIsOpenDeletedModal(true);
                              setId(row.id);
                              setDeleteItem("Delete Line Item");
                              SetDeleteDescription(
                                "Are you sure you want to delete this line item?"
                              );
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
                      <TruncateText text={row.description} maxWidth={200} />
                    </TableCell>
                    <TableCell
                      align="center"
                      className="border-solid whitespace-nowrap font-500 border-1 "
                    >
                      <div className="relative common-inputField">
                        <input
                          name="quantity"
                          type="number"
                          ref={inputRef}
                          // hidden
                          defaultValue=""
                          placeholder="0"
                          value={
                            row.quantity !== 0 && row.quantity !== ""
                              ? row.quantity
                              : ""
                          }
                          onChange={(event) => handleChange(index)(event)}
                          className="m-auto common-inputField w-max noscroll"
                          min={0}
                          style={{
                            padding: "0.25rem 14px",
                            maxWidth: "111px",
                            margin: "auto",
                            border: "0.5px solid #9DA0A6",
                            borderRadius: "7px",
                            color: "#111827",
                            minWidth: "46px",
                          }}
                          onWheel={(event) => event.currentTarget.blur()}
                        />

                        {quantityError[index] && (
                          <span
                            style={{
                              color: "red",
                              position: "absolute",
                              top: "100%",
                              left: "-9px",
                              fontSize: "11px",
                              fontWeight: "400",
                              width: "140px",
                              wordWrap: "break-word", // camelCase for CSS properties
                              whiteSpace: "normal",
                            }}
                          >
                            {quantityError[index]}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell
                      align="center"
                      className="border-solid whitespace-nowrap font-500 border-1"
                    >
                      <div className="relative common-inputField">
                        <input
                          name="unit_price"
                          type="number"
                          value={
                            row.unit_price != 0 && row.unit_price != ""
                              ? row.unit_price
                              : ""
                          }
                          onChange={(event) => handleChange(index)(event)}
                          className="m-auto common-inputField w-max noscroll"
                          placeholder="$00.00"
                          style={{
                            padding: "0.25rem 14px",
                            maxWidth: "111px",
                            margin: "auto",
                            border: "0.5px solid #9DA0A6",
                            borderRadius: "7px",
                            color: "#111827",
                            minWidth: "46px",
                          }}
                          min={0}
                        />
                        {/* <InputField
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
                          className="m-auto common-inputField w-max "
                          inputProps={{
                            className: "ps-[1rem] max-w-[90px] m-auto ",
                            placeholderTextColor: "#111827 !important",
                            min: 0,
                          }}
                          hideTopPadding={true}
                          sx={{
                            "& .MuiInputBase-input": {
                              border: "0.5px solid #9DA0A6",
                              "::placeholder": {
                                color: "#111827 !important", // Set placeholder color
                                opacity: 1,
                              },
                            },
                          }}
                        /> */}
                        {unitPriceError[index] && (
                          <span
                            style={{
                              color: "red",
                              position: "absolute",
                              top: "100%",
                              left: "-9px",
                              fontSize: "11px",
                              fontWeight: "400",
                              width: "140px",
                              wordWrap: "break-word", // camelCase for CSS properties
                              whiteSpace: "normal",
                            }}
                          >
                            {unitPriceError[index]}
                          </span>
                        )}
                      </div>
                    </TableCell>

                    <TableCell
                      align="center"
                      className="cursor-pointer whitespace-nowrap font-500 "
                    >
                      <div
                        className=" min-h-[48px] border-[0.5px] border-solid border-[#9DA0A6] rounded-[7px] flex bg-bgGrey items-center
                     justify-center gap-10"
                      >
                        <div className="  border-r-1 border-solid border-[#9DA0A6] ">
                          <SelectField
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
                        <div className="flex-1 common-inputField">
                          <input
                            hidden
                            id="filled-hidden-label-small"
                            defaultValue=""
                            name="unit_discount"
                            type="number"
                            placeholder={
                              row.unit_discount_type == 2 ? "$00.00" : "%00.00"
                            }
                            value={row.unit_discount || ""}
                            onChange={(event) => handleChange(index)(event)}
                            className="noscroll"
                            style={{
                              width: "80px",
                              paddingBottom: "0px",
                              display: "flex",
                              alignItems: "center",
                              textDecoration: "none",
                              border: "none",
                              borderBottom: "none",
                              color: "#111827",
                            }}
                            min={0}
                          />
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
                        index,
                        row.quantity
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
                            setFrequencyMode(Number(event.target.value));
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
                          <div className="relative common-inputField">
                            <input
                              id="filled-hidden-label-small"
                              defaultValue=""
                              name="no_of_payments"
                              placeholder="0"
                              type="number"
                              value={row.no_of_payments || ""}
                              onChange={(event) => handleChange(index)(event)}
                              className="m-auto common-inputField w-max noscroll"
                              style={{
                                padding: "0.25rem 14px",
                                maxWidth: "111px",
                                margin: "auto",
                                border: "0.5px solid #9DA0A6",
                                borderRadius: "7px",
                                color: "#111827",
                                minWidth: "46px",
                              }}
                              min={0}
                            />
                            {paymentError && (
                              <span
                                style={{
                                  color: "red",
                                  position: "absolute",
                                  top: "100%",
                                  left: "-9px",
                                  fontSize: "11px",
                                  fontWeight: "400",
                                  width: "140px",
                                  wordWrap: "break-word", // camelCase for CSS properties
                                  whiteSpace: "normal",
                                }}
                              >
                                {paymentError}
                              </span>
                            )}
                          </div>
                        </>
                      ) : (
                        <TextField
                          id="filled-hidden-label-small"
                          defaultValue=""
                          name={"no_of_payments"}
                          placeholder={"0"}
                          type="number"
                          disabled={true}
                          // value={row.unit_price}
                          value={0}
                          className="m-auto common-inputField w-max"
                          inputProps={{
                            className: "ps-[1rem] max-w-[90px] m-auto ",
                            min: 0,
                          }}
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
                      <div className="relative">
                        <input
                          type="date"
                          name="billing_start_date"
                          className="w-full h-[48px] px-4 py-2 border border-gray-300 rounded-md"
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
                          // value={
                          //   row.billing_start_date != 0 &&
                          //   row.billing_start_date != "" &&
                          //   row.billing_start_date != null
                          //     ? row.billing_start_date >= tomorrowStr
                          //       ? row.billing_start_date
                          //       : null
                          //     : ""
                          // }
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            handleChange(index)(event);
                          }}
                        />

                        {dateError ? (
                          <div
                            style={{
                              color: "red",
                              position: "absolute",
                              top: "100%",
                              left: "-9px",
                              fontSize: "11px",
                              fontWeight: "400",
                              width: "140px",
                              wordWrap: "break-word", // camelCase for CSS properties
                              whiteSpace: "normal", // camelCase for CSS properties
                            }}
                          >
                            {dateError}
                          </div>
                        ) : null}
                      </div>
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
                  ${formattedSubtotal}
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
                      <div className="relative">
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
                          // InputProps={{
                          //   endAdornment: (
                          //     <InputAdornment position="start">
                          //       <Link to="#">
                          //         <img
                          //           src={penIcon}
                          //           alt="pen-icon"
                          //           className="h-[2.5rem] w-[2.5rem]"
                          //         />{" "}
                          //       </Link>{" "}
                          //     </InputAdornment>
                          //   ),
                          // }}
                        />
                        <span className="text-left text-[11px] text-red pt-[5px] absolute left-0 top-[92%]">
                          {nameError}
                        </span>
                      </div>

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
                        <div className="flex-1 common-inputField">
                          <input
                            id="filled-hidden-label-small"
                            defaultValue=""
                            name="one_time_discount"
                            type="number"
                            placeholder={
                              details.one_time_discount_type == 2
                                ? "$00"
                                : "%00"
                            }
                            value={details.one_time_discount || ""}
                            className="noscroll"
                            onChange={handleDetailsChange}
                            style={{
                              width: "60px",
                              paddingBottom: "0px",
                              display: "flex",
                              alignItems: "center",
                              textDecoration: "none",
                              border: "none",
                              borderBottom: "none",
                              color: "#111827",
                            }}
                            min={0}
                          />
                        </div>
                      </div>
                    </div>
                    <p className="flex items-center text-base font-semibold leading-5 text-[#757982] ">
                      {details.one_time_discount_type == 2 ? "-$" : "-%"}
                      {details.one_time_discount}
                      <Link to={"#"} className="ms-10">
                        <DeleteIcon
                          className="w-[16px]"
                          onClick={() => {
                            setIsOpenDeletedModal(true);
                            setDeleteItem("Delete Line Item Discount");
                            SetDeleteDescription(
                              "Are you sure you want to delete this line item discount?"
                            );
                          }}
                        />
                      </Link>
                    </p>
                  </div>
                </>
              )}
              {!recurringShow && (
                <span
                  color="secondary"
                  className="text-[#4f46e5] font-500 cursor-pointer"
                  style={{ width: "fit-content" }}
                  onClick={() => setRecurringShow(true)}
                >
                  +Add discount
                </span>
              )}
              {/*  {/* with discount end */}
            </li>
            <li className="border-b py-[2rem] bg-[#F7F9FB] flex justify-between px-[3rem]">
              <span className="text-para_light font-500">Due Now</span>
              <span className="inline-block ml-20 font-600">
                {/* {details.one_time_discount_type == 2
                  ? `$${details.subtotal - details.one_time_discount}`
                  : `$${
                      details.subtotal -
                      (details.subtotal * details.one_time_discount) / 100
                    }`} */}
                ${formattedDiscountedSubtotal}
              </span>
            </li>
            <li className="border-b py-[2rem] bg-[#F7F9FB] flex justify-between px-[3rem]">
              <span className="text-para_light font-500">Future payments</span>
              <div className="inline-block ml-20 text-[#111827) text-[14px] font-300 ">
                <span className="flex flex-col gap-5">
                  <span>
                    <span className="font-600">
                      ${formattedSubtotal} {frequencyMode != 0 && "/"}{" "}
                      {getAdjusted(Number(frequencyMode))}{" "}
                      {/* ${details.subtotal.toFixed(2)} / Month{" "} */}
                    </span>
                    {frequencyMode != 1 && frequencyMode != 0
                      ? `starting ${getAdjustedTime(Number(frequencyMode))}
                    after payment`
                      : null}
                  </span>
                </span>
              </div>
            </li>
            <li className="border-b pb-[2.5rem] px-[3rem] flex justify-between">
              <span className="text-[#0A0F18] text-[20px] font-600">
                Total -
              </span>
              <span className="inline-block ml-20 font-600">
                {/* {details.one_time_discount_type == 2
                  ? `$${details.subtotal - details.one_time_discount}`
                  : `$${
                      details.subtotal -
                      (details.subtotal * details.one_time_discount) / 100
                    }`} */}
                ${formattedDiscountedSubtotal}
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
            disabled={
              list.length == 0 ||
              details.subtotal <= 0 ||
              formattedDiscountedSubtotal <= 0 ||
              dateError != "" ||
              disable
                ? true
                : false
            }
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            disabled={disable}
            className="w-[156px] h-[48px] text-[18px] ml-14  leading-5"
            onClick={() => handleCancel()}
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

      {customLine && (
        <CustomLineModal
          isOpen={customLine}
          setIsOpen={setCustomLine}
          handleList={handleListFromChild}
          customList={customList}
          setCustomList={setCustomList}
        />
      )}

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
        title={deleteItem}
        onDelete={id ? onDelete : onDeleteRecurring}
        description={deleteDescription}
        disable={disableDelete}
      />
    </>
  );
}
