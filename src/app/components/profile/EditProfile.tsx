import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { MenuItem, styled, useTheme } from "@mui/material";
import { useFormik } from "formik";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import CommonModal from "../CommonModal";
import InputField from "../InputField";
import SelectField from "../selectField";
import { ClientType } from "app/store/Client/Interface";
import { updateProfile } from "app/store/Client";
import { useAppDispatch } from "app/store/store";

type profileState = {
  value: string;
  label: string;
};

type FormType = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number | string;
  address: string;
  status: string;
  company_name: string;
  country_code: number | string;
};

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  clientDetail?: ClientType;
  loading?: boolean;
}

export const profileStatus: profileState[] = [
  { value: "Active", label: "Active" },
  { value: "Suspended", label: "Suspended" },
  { value: "Cancelled", label: "Cancelled" },
  { value: "Pending", label: "Pending" },
];

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  "& .radioIcon": {
    color: "#9DA0A6",
    border: "2px solid currentColor",
    height: "16px",
    aspectRatio: 1,
    borderRadius: "50%",
    position: "relative",
  },
  "&.Mui-selected": {
    backgroundColor: "transparent",
    "& .radioIcon": {
      color: theme.palette.secondary.main,
      "&::after": {
        content: '""',
        display: "block",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: "7px",
        aspectRatio: 1,
        borderRadius: "50%",
        backgroundColor: "currentColor",
      },
    },
  },
}));

function EditProfile({ isOpen, setIsOpen, loading, clientDetail }: IProps) {
  const dispatch = useAppDispatch();
  const onSubmit = async (values: FormType) => {
    const formData = new FormData();
    // Append form fields to FormData
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    formData.append("client_id", String(clientDetail.id));
    if (selectedImage) {
      formData.append("files", selectedImage); // Add the selected image to the FormData
    }
    try {
      const { payload } = await dispatch(updateProfile({ formData }));
      if (payload?.data?.status) {
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      status: "",
      email: "",
      phone_number: null,
      company_name: "",
      country_code: "+1",
      address: "",
    },
    onSubmit,
  });
  const urlForImage = import.meta.env.VITE_API_BASE_IMAGE_URL;
  // Update initial values after clientDetail changes
  useEffect(() => {
    if (clientDetail) {
      formik.setValues({
        first_name: clientDetail.first_name || "",
        last_name: clientDetail.last_name || "",
        status: clientDetail.status,
        email: clientDetail.email || "",
        phone_number: clientDetail.phone_number || "",
        company_name: clientDetail.company_name || "",
        country_code: clientDetail.country_code || "",
        address: clientDetail.address,
      });
      if (clientDetail.user_image) {
        setpreviewUrl(urlForImage + clientDetail.user_image);
      }
    }
  }, [clientDetail, isOpen]); // Dependency on clientDetail

  const [selectedImage, setSelectedImage] = useState<File>(); // Default image path
  const [previewUrl, setpreviewUrl] = useState<string>("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file); // Store the selected file
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the uploaded image
      setpreviewUrl(imageUrl); // Set the new image
    }
  };

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle="Edit Profile"
      maxWidth="733"
      btnTitle={"Save"}
      closeTitle={"Cancel"}
      disabled={loading}
      onSubmit={formik.handleSubmit}
    >
      <div className="h-[100px] w-[100px] mb-[2.4rem] relative">
        <img
          src={previewUrl || "../assets/images/logo/images.jpeg"}
          alt="profile_picture"
          className="w-full h-full rounded-full"
        />
        <input
          type="file"
          accept="image/*" // Allows only image files
          className="hidden" // Hide the file input
          id="file-input" // ID for the label to refer to
          onChange={handleFileChange} // Event handler when the file changes
        />
        <label
          htmlFor="file-input" // The label triggers the file input when clicked
          className="absolute bottom-0 right-0 bg-secondary h-[3.4rem] aspect-square flex items-center justify-center rounded-full border-2 border-white cursor-pointer"
        >
          <span className="absolute bottom-0 right-0 bg-secondary h-[3.4rem] aspect-square flex items-center justify-center rounded-full border-2 border-white cursor-pointer">
            <FuseSvgIcon className="text-white" size={20}>
              heroicons-outline:camera
            </FuseSvgIcon>
          </span>
        </label>
      </div>
      <div className="flex flex-col gap-20 mb-20">
        <InputField
          formik={formik}
          name="first_name"
          label="Name"
          placeholder="Enter Name"
        />
        <SelectField
          formik={formik}
          name="status"
          label="Status"
          placeholder="Select Status"
          sx={{
            "& .radioIcon": { display: "none" },
          }}
        >
          {profileStatus.map((item) => (
            <StyledMenuItem key={item.value} value={item.value}>
              {item.label}
            </StyledMenuItem>
          ))}
        </SelectField>
        <InputField
          formik={formik}
          name="email"
          label="Email Address"
          placeholder="Enter Email Address"
        />
        <InputField
          formik={formik}
          name="phone_number"
          label="Phone Number"
          placeholder="Enter Phone Number"
        />
        <InputField
          formik={formik}
          name="company_name"
          label="Company Name"
          placeholder="Enter Company Name"
        />
        <InputField
          formik={formik}
          name="address"
          label="Address"
          placeholder="Enter Address"
        />
      </div>
    </CommonModal>
  );
}

export default EditProfile;
