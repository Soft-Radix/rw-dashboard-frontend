import { FormLabel, TextField, TextFieldProps } from "@mui/material";
import { FormikProps } from "formik";
import { useEffect, useRef, useState } from "react";

interface CustomButtonProps {
  // className?: string;
  name: string;
  label?: string;
  formik?: FormikProps<unknown>;
  type?: string;
  inputClass?: string;
  hideTopPadding?: boolean;

  // props: TextFieldProps;
}

function InputField({
  // className,
  disabled = false,
  name,
  formik,
  label,
  type = "text",
  inputClass,
  hideTopPadding,

  ...rest
}: CustomButtonProps & TextFieldProps) {
  const [isType, setIsType] = useState<string>(type);
  const handleEyeToggle = () => {
    setIsType(isType === "text" ? "password" : "text");
  };
  const inputRef = useRef(null);

  useEffect(() => {
    const handleWheel = (event) => {
      if (document.activeElement === inputRef.current) {
        event.preventDefault();
      }
    };

    const inputElement = inputRef.current;
    inputElement.addEventListener("wheel", handleWheel);

    return () => {
      inputElement.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;
    if (type == "number") {
      if (value == "") {
        formik.setFieldValue(name, value);
        return;
      }
      const regex = /^\d*\.?\d{0,2}$/;
      if (regex.test(value)) {
        formik.setFieldValue(name, value);
      }
    } else {
      formik.setFieldValue(name, value);
    }
  };

  return (
    <div className={`${rest.className} common-inputField w-full relative`}>
      {label && (
        <FormLabel className="block text-[16px] font-medium text-[#111827] mb-5">
          {label}
        </FormLabel>
      )}
      <div className={`input_wrap ${inputClass}`}>
        <TextField
          ref={inputRef}
          name={name}
          type={isType}
          disabled={disabled}
          inputProps={{
            min: 0,
          }}
          // onChange={(e) => formik.setFieldValue(name, e.target.value)}
          onChange={(e) => handleChange(e)}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          value={formik?.values[name ?? ""]}
          error={!!(formik?.errors[name ?? ""] && formik?.touched[name ?? ""])}
          {...rest}
          className={rest.className}
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

      {!hideTopPadding && (
        <div>
          <span className=" text-red pt-[5px]  ">
            {formik?.errors[name ?? ""] &&
              formik?.touched[name ?? ""] &&
              formik?.errors[name ?? ""]}
          </span>
        </div>
      )}
    </div>
  );
}

export default InputField;
