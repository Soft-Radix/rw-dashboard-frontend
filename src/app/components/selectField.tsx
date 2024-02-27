/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  FormLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  styled,
} from "@mui/material";
import { FormikProps } from "formik";

interface IProps {
  // className?: string;
  name: string;
  label?: string;
  formik?: FormikProps<unknown>;
  // props: TextFieldProps;
}

const StyledSelect = styled(Select)(({ theme }) => ({
  width: "100%",
  borderRadius: "8px",
  backgroundColor: "#f6f6f6",
  lineHeight: 1.4,
  "&.MuiInputBase-root": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderWidth: "1px",
        borderColor: theme.palette.secondary.main,
      },
    },
  },
  "& .MuiSelect-select": {
    padding: "16.5px 14px",
  },
}));

function SelectField({
  // className,
  name,
  formik,
  label,
  ...rest
}: IProps & SelectProps) {
  const formikValue = formik?.values[name];

  return (
    <div className={`${rest.className} w-full relative`}>
      {label && (
        <FormLabel className="block text-[16px] font-medium text-[#111827] mb-5">
          {label}
        </FormLabel>
      )}

      <StyledSelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={formikValue}
        onChange={(event: SelectChangeEvent) =>
          formik?.setFieldValue(name, event.target.value)
        }
        {...rest}
      >
        {rest.children}
      </StyledSelect>
      {rest.placeholder && !formikValue ? (
        <span className="absolute text-para_light text-lg left-16 bottom-[1.7rem]">
          {rest.placeholder}
        </span>
      ) : null}
      <span className="">{formik?.errors[name] && formik?.touched[name]}</span>
    </div>
  );
}

export default SelectField;
