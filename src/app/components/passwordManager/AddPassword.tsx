import {
  Box,
  Checkbox,
  Chip,
  ListItem,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import { CrossIcon } from "public/assets/icons/common";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CommonModal from "../CommonModal";
import InputField from "../InputField";
import SelectField from "../selectField";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface IPropsAssignedTo {
  name: string;
  image: string;
}

function AddPassword({ isOpen, setIsOpen }: IProps) {
  const theme = useTheme();

  const [allSelected, setAllSelected] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      assigned_to: [],
      created_on: "",
    },
    onSubmit: (values) => {},
  });

  const AssignedName = [
    {
      name: "Michelle",
      image: "male-01.jpg",
    },
    {
      name: "Natalie",
      image: "female-02.jpg",
    },
  ];

  const handleAssignedToAll = () => {
    if (allSelected) {
      formik.setFieldValue("assigned_to", []);
    } else {
      formik.setFieldValue(
        "assigned_to",
        AssignedName.map((value) => value.name)
      );
    }
  };

  useEffect(() => {
    setAllSelected(
      AssignedName.every((value: IPropsAssignedTo) =>
        formik.values.assigned_to.includes(value.name)
      )
    );
  }, [formik.values.assigned_to]);

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
              <Box className="flex flex-wrap gap-16">
                {selected.map((value, i) =>
                  value ? (
                    <div className="relative flex items-center bg-white px-6 py-5 pe-16 rounded-full gap-8">
                      <img
                        className="w-[28px] aspect-square rounded-full object-cover"
                        src={`/assets/images/avatars/${AssignedName.find((item) => item.name === value).image}`}
                        alt=""
                      />
                      <span className=" ">{value}</span>
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
                  ) : null
                )}
              </Box>
            );
          }}
        >
          <MenuItem className="p-0">
            <ListItem
              onClick={(event) => {
                event.stopPropagation();
                handleAssignedToAll();
              }}
              className="py-6 px-16"
            >
              <Checkbox className="p-0 me-16" checked={allSelected} />
              ALL
            </ListItem>
          </MenuItem>
          {AssignedName.map((item) => (
            <MenuItem key={item.name} value={item.name}>
              <Checkbox
                checked={formik.values.assigned_to.includes(item.name)}
                sx={{
                  padding: 0,
                }}
              />
              <img
                className="w-[3.4rem] aspect-square me-14 ms-16 rounded-full"
                src={`/assets/images/avatars/${item.image}`}
                alt=""
              />
              {item.name}
            </MenuItem>
          ))}
        </SelectField>
        <InputField
          formik={formik}
          name="created_on"
          label="Created On"
          placeholder="Select Date"
        />
      </div>
    </CommonModal>
  );
}

export default AddPassword;
