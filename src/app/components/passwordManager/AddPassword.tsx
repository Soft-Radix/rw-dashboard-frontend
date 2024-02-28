import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {
  Box,
  Checkbox,
  Chip,
  Grid,
  MenuItem,
  styled,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import CommonModal from "../CommonModal";
import InputField from "../InputField";
import SelectField from "../selectField";
import { CrossIcon } from "public/assets/icons/common";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function AddPassword({ isOpen, setIsOpen }: IProps) {
  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      assigned_to: [],
    },
    onSubmit: (values) => {},
  });

  const roleItems = [
    { value: "Developer", label: "Developer" },
    { value: "Tester", label: "Tester" },
    { value: "Designer", label: "Designer" },
  ];

  const AssignedName = [
    {
      name: "Michelle",
      image: "male-01-jpg",
    },
    {
      name: "Natalie",
      image: "female-02-jpg",
    },
  ];

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle="Add Password"
      maxWidth="733"
    >
      <div className="flex flex-col gap-20 mb-20">
        <InputField
          formik={formik}
          name="name"
          label="Site Name"
          placeholder="Enter Site Name"
        />
        <InputField
          formik={formik}
          name="email"
          label="User Name"
          placeholder="Enter User Name"
        />
        <InputField
          type="password"
          formik={formik}
          name="password"
          label="Password"
          placeholder="Enter Password"
        />
        <SelectField
          name="assigned_to"
          label="Assigned To"
          formik={formik}
          placeholder="Select"
          multiple
          renderValue={(selected: string[]) => {
            return (
              <Box className="flex gap-16">
                {selected.map((value, i) => (
                  <div className="relative">
                    <Chip
                      key={i}
                      label={value}
                      className="bg-white px-4"
                      onMouseDown={(e) => e.stopPropagation()}
                    />
                    <span
                      onMouseDown={(e) => {
                        e.stopPropagation();
                        formik.setFieldValue(
                          "assigned_to",
                          typeof formik.values.assigned_to === "object"
                            ? formik.values.assigned_to?.filter(
                                (obj) => obj !== value
                              )
                            : formik.values.assigned_to
                        );
                      }}
                      className="absolute z-[1] rounded-full top-[50%] translate-y-[-50%] right-[-8px] h-16 aspect-square border border-borderColor bg-white flex items-center justify-center"
                    >
                      <CrossIcon className="text-para" height={8} width={8} />
                    </span>
                  </div>
                ))}
              </Box>
            );
          }}
        >
          {AssignedName.map((item) => (
            <MenuItem
              key={item.name}
              value={item.name}
              // style={getStyles(name, personName, theme)}
            >
              <Checkbox
                checked={formik.values.assigned_to.includes(item.name)}
              />
              {item.name}
            </MenuItem>
          ))}
        </SelectField>
      </div>
    </CommonModal>
  );
}

export default AddPassword;
