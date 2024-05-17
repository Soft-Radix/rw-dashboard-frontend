import { Checkbox, FormHelperText, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
import React, { Dispatch, SetStateAction } from "react";
import { BillingTermsOptions, EmployOptions, StyledMenuItem } from "src/utils";
import CommonModal from "../../CommonModal";
import InputField from "../../InputField";
import SelectField from "../../selectField";
import NumberInput from "../../NumberInput";
import DateInput from "../../DateInput";
import { red } from "@mui/material/colors";
import * as Yup from "yup";
import { addLineItem } from "app/store/Client";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "app/store/store";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleList: (list: any[]) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  unit_price: Yup.number().required("Unit Price is required"),
  quantity: Yup.number().required("Quantity is required"),
  billing_frequency: Yup.string().required("Billing Frequency is required"),
  billing_terms: Yup.string().required("Billing Terms are required"),
  no_of_payments: Yup.number().required("Number of Payments is required"),
  billing_start_date: Yup.date().nullable(),
});

const list = [
  {
    name: "Full time virtual professional - business analyst",
    price: "$5.99",
  },
  {
    name: "Full time virtual professional - business analyst",
    price: "$5.99",
  },
  {
    name: "Full time virtual professional - business analysts",
    price: "$5.99",
  },
  {
    name: "Full time virtual professional - business analyst",
    price: "$5.99",
  },
];

function LineModal({ isOpen, setIsOpen, handleList }: IProps) {
  const [value, setValue] = React.useState<number | null>(null);
  const dispatch = useAppDispatch();
  const theme: Theme = useTheme();
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      unit_price: 0,
      quantity: 0,
      billing_frequency: "",
      billing_terms: "",
      no_of_payments: 0,
      billing_start_date: null,
      is_delay_in_billing: 0,
    },
    validationSchema,
    onSubmit: (values) => {},
  });
  // const handleSave = () => {
  //   formik.handleSubmit();
  //   console.log("=========formik.values===", formik.values);
  // };

  const fetchData = async () => {
    try {
      //@ts-ignore
      const res = await dispatch(addLineItem(formik.values));
      // setList(res?.payload?.data?.data?.list);
      setIsOpen((prev) => !prev);
      handleList([res?.payload?.data?.data]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSave = () => {
    formik.submitForm().then(() => {
      if (formik.isValid) {
        fetchData();
      }
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update is_delay_in_billing based on checkbox status
    const isChecked = event.target.checked;
    formik.setFieldValue("is_delay_in_billing", isChecked ? 1 : 0);
  };

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle="Add Custom Line Items"
      maxWidth="733"
      btnTitle={"Save"}
      closeTitle="Cancel"
      onSubmit={handleSave}
    >
      <div className="flex flex-col gap-20 mb-20">
        <InputField
          formik={formik}
          name="name"
          label=" Name"
          placeholder="Enter Name"
        />

        <InputField
          formik={formik}
          name="description"
          label="Description"
          placeholder="Enter Description"
        />

        <InputField
          formik={formik}
          name="unit_price"
          label="Unit Price"
          placeholder="Enter Unit Price"
        />

        <InputField
          formik={formik}
          name="quantity"
          label="Quantity"
          placeholder="Enter Quantity"
        />

        <SelectField
          formik={formik}
          name="billing_frequency"
          label="Billing Frequency"
          placeholder="Select"
          sx={{
            border: "0.5px solid #9DA0A6",
            padding: "0px 12px",
            "& .radioIcon": { display: "none" },
            "&:focus": {
              border: "none !important", // Remove border on focus
              outline: "none", // Remove outline on focus
            },
          }}
        >
          quantity
          {EmployOptions.map((item) => (
            <StyledMenuItem key={item.value} value={item.value}>
              {item.label}
            </StyledMenuItem>
          ))}
        </SelectField>

        <SelectField
          formik={formik}
          name="billing_terms"
          label="Billing Terms"
          placeholder="Fixed number of payments"
          sx={{
            border: "0.5px solid #9DA0A6",
            "& .radioIcon": { display: "none" },
          }}
        >
          {BillingTermsOptions.map((item) => (
            <StyledMenuItem key={item.value} value={item.value}>
              {item.label}
            </StyledMenuItem>
          ))}
        </SelectField>

        <NumberInput label="Number of Payments" />
        <div className="w-full">
          <div className="flex items-center mb-[2rem]">
            <Checkbox
              id="billing_start_date"
              name="billingDate"
              value="billing"
              onChange={handleCheckboxChange}
              checked={formik.values.is_delay_in_billing === 1}
              sx={{
                "&.Mui-checked": {
                  color: "#4f46e5",
                },
              }}
              className="w-[18px] h-[18px] me-[16px]"
            />
            <label className="text-[16px] font-medium leading-[20px]">
              Delay Billing Start Date
            </label>
            <br />
          </div>
          <input
            type="date"
            id="billing_start_date"
            name="billing_start_date"
            min={new Date().toISOString().split("T")[0]}
            value={formik.values.billing_start_date || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full h-[48px] px-4 py-2 border border-gray-300 rounded-md"
          />
          {/* <DateInput /> */}
        </div>
      </div>
    </CommonModal>
  );
}

export default LineModal;
