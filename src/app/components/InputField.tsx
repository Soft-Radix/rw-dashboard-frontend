import { FormLabel, TextField, TextFieldProps } from "@mui/material";
import { FormikProps } from "formik";
import { useState } from "react";

interface CustomButtonProps {
  className?: string;
  label?: string;
  formik?: FormikProps<unknown>;
  type?: string;
  // props: TextFieldProps;
}

function InputField({
  className,
  formik,
  label,
  type = "text",
  ...rest
}: CustomButtonProps & TextFieldProps) {
  const [isType, setIsType] = useState<string>(type);
  const handleEyeToggle = () => {
    setIsType(isType === "text" ? "password" : "text");
  };
  return (
    <div className={`${className} common-inputField w-full`}>
      {label && (
        <FormLabel className="block text-[16px] font-medium text-[#111827] mb-5">
          {label}
        </FormLabel>
      )}
      <div className="input_wrap">
        <TextField
          type={isType}
          onChange={formik.handleChange}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          value={formik.values[rest?.name ?? ""]}
          error={
            !!(
              formik.errors[rest?.name ?? ""] &&
              formik.touched[rest?.name ?? ""]
            )
          }
          {...rest}
        />
        {type === "password" && (
          <span
            className="password_icon"
            onClick={handleEyeToggle}
            aria-hidden="true"
          >
            <img
              src={
                isType === "password"
                  ? "assets/icons/invisibleEye.svg"
                  : "assets/icons/visibleEye.svg"
              }
              alt=""
            />
          </span>
        )}
      </div>
      <span className="">
        {formik?.errors[rest?.name ?? ""] && formik?.touched[rest?.name ?? ""]}
      </span>
    </div>
  );
}

export default InputField;
