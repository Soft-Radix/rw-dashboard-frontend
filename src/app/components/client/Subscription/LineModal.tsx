import { Checkbox, Theme } from "@mui/material";
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

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
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

function LineModal({ isOpen, setIsOpen }: IProps) {
  const [value, setValue] = React.useState<number | null>(null);

  const theme: Theme = useTheme();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      role: "",
    },
    onSubmit: (values) => {},
  });

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle="Add Custom Line Items"
      maxWidth="733"
      btnTitle={"Save"}
      closeTitle="Cancel"
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
          name="unit Price"
          label="Unit Price"
          placeholder="Enter Unit Price"
        />
        <InputField
          formik={formik}
          name="Quantity"
          label="Quantity"
          placeholder="Enter Quantity"
        />
        <SelectField
          formik={formik}
          name="status"
          label="Billing Frequency"
          placeholder="Select"
          sx={{
            border: "0.5px solid #9DA0A6",
            padding: "0px 12px",
            "& .radioIcon": { display: "none" },
          }}
        >
          {EmployOptions.map((item) => (
            <StyledMenuItem key={item.value} value={item.value}>
              {item.label}
            </StyledMenuItem>
          ))}
        </SelectField>
        <SelectField
          formik={formik}
          name="terms"
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

        <NumberInput
          label="Number of Payments"
        
        />
        <div className="w-full">
          <div className="flex items-center mb-[2rem]">
            <Checkbox
              id="billingDate"
              name="billingDate"
              value="billing"
              sx={{
                "&.Mui-checked": {
                  color: "#4f46e5",
                },
              }}
              className="w-[18px] h-[18px] me-[16px] "
            />
            <label className="text-[16px] font-medium leading-[20px]">
              {" "}
              Delay Billing Start Date
            </label>
            <br />
          </div>
          <DateInput
          
          />
        </div>
      </div>
    </CommonModal>
  );
}

export default LineModal;
