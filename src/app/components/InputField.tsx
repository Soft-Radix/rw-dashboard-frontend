import { FormLabel, TextField, TextFieldProps } from "@mui/material";
import { FormikProps } from "formik";
import { useState } from "react";

interface CustomButtonProps {
  // className?: string;
  name: string;
  label?: string;
  formik?: FormikProps<unknown>;
  type?: string;
  inputClass?: string;
  // props: TextFieldProps;
}

function InputField({
  // className,
  name,
  formik,
  label,
  type = "text",
  inputClass,
  ...rest
}: CustomButtonProps & TextFieldProps) {
  const [isType, setIsType] = useState<string>(type);
  const handleEyeToggle = () => {
    setIsType(isType === "text" ? "password" : "text");
  };

  return (
    <div className={`${rest.className} common-inputField w-full`}>
      {label && (
        <FormLabel className="block text-[16px] font-medium text-[#111827] mb-5">
          {label}
        </FormLabel>
      )}
      <div className={`input_wrap ${inputClass}`}>
        <TextField
          type={isType}
          onChange={(e) => formik.setFieldValue(name, e.target.value)}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          value={formik?.values[name ?? ""]}
          error={!!(formik?.errors[name ?? ""] && formik?.touched[name ?? ""])}
          {...rest}
          className=""
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
      <span className="inline-block text-red pt-[5px]">
        {(formik?.errors[name ?? ""]
          && formik?.touched[name ?? ""]) && formik?.errors[name ?? ""]
        }
      </span>
    </div>
  );
}

export default InputField;
