import { useAppDispatch } from "app/store/store";
import { useFormik } from "formik";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { accManagerSchema, editAgentSchema } from "src/formSchema";
import CommonModal from "../CommonModal";
import InputField from "../InputField";

import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {
  Button,
  Checkbox,
  InputAdornment,
  ListItemText,
  Menu,
  TextField,
  Typography,
} from "@mui/material";
import { restAll } from "app/store/Agent";
import { AgentRootState, AgentType } from "app/store/Agent/Interafce";
import { UpArrowBlank } from "public/assets/icons/clienIcon";
import { CrossGreyIcon } from "public/assets/icons/common";
import { DownArrowBlank } from "public/assets/icons/dashboardIcons";
import { SearchIcon } from "public/assets/icons/topBarIcons";
import { useSelector } from "react-redux";
import img1 from "../../../../public/assets/images/pages/admin/accImg.png";

import { AgentGroupRootState } from "app/store/Agent group/Interface";
import {
  AccManagerRootState,
  AccManagerType,
  assignedClientInfoType,
} from "app/store/AccountManager/Interface";
import {
  accManagerClientList,
  addAccManager,
  assignedAccManagerList,
  getAccManagerList,
  updateAccManagerList,
} from "app/store/AccountManager";
import { useParams } from "react-router-dom";
import { ClientType } from "app/store/Client/Interface";
import SelectField from "../selectField";
import { MenuItem, styled, useTheme } from "@mui/material";
import { GetCountry, getAllState } from "app/store/Client";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  fetchManagerList?: () => void;
  isEditing: boolean;
}
type FormType = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number | string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zipcode: number | string;
  country: string;
};

type profileState = {
  value: string;
  label: string;
};

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

function AddAccountManagerModel({
  isOpen,
  setIsOpen,
  fetchManagerList,
  isEditing,
}: IProps) {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItems, setSelectedItems] = useState<any>([]);
  // console.log([selectedItems], "items");
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [allCountries, setAllCountries] = useState([]);
  const [allState, setAllState] = useState([]);
  // const agentState = useSelector((store: AgentRootState) => store.agent);
  const accmanagerState = useSelector(
    (store: AccManagerRootState) => store.accManagerSlice
  );
  const { accManagerDetail, accClientList, actionStatus } = useSelector(
    (store: AccManagerRootState) => store.accManagerSlice
  );
  // console.log(accManagerDetail, "accManagerDetail");

  const [selectedImage, setSelectedImage] = useState<File>(); // Default image path
  const [previewUrl, setpreviewUrl] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    // console.log(file, "file");
    if (file) {
      setSelectedImage(file); // Store the selected file
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the uploaded image
      setpreviewUrl(imageUrl); // Set the new image
    }
  };
  const { accountManager_id } = useParams();
  // console.log(accountManager_id, "ll");

  const onSubmit = async (values: AccManagerType, { resetForm }) => {
    const formData = new FormData();
    let payload;
    if (accountManager_id) {
      formData.append("account_manager_id", accountManager_id);
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("phone_number", String(values.phone_number));
      formData.append("address", values.address);

      // Dispatch action to update account manager

      if (selectedImage) {
        formData.append("files", selectedImage);
      }
      formData.append("address2", values.address2);
      formData.append("city", values.city);
      formData.append("state", values.state);
      formData.append("country", values.country);
      formData.append("zipcode", values.zipcode.toString());

      payload = await dispatch(
        updateAccManagerList({
          formData,
          account_manager_id: accountManager_id,
        })
      );
      setIsOpen((prev) => !prev);
    } else {
      formData.append("first_name", values.first_name);
      formData.append("last_name", values.last_name);
      formData.append("phone_number", String(values.phone_number)); // Convert number to string
      formData.append("email", values.email);
      formData.append("address", values.address);
      formData.append("address2", values.address2);
      formData.append("city", values.city);
      formData.append("state", values.state);
      formData.append("zipcode", values.zipcode.toString());
      formData.append("country", values.country);
      if (selectedImage) {
        formData.append("files", selectedImage);
      }
      // uploadedFiles.forEach((file, index) => {
      //   formData.append(`files`, file);
      // });
      await dispatch(addAccManager({ formData }));
    }
    // console.log(payload, "payload");

    if (payload?.data?.status) {
      resetForm();
    }
    fetchManagerList();
    setIsOpen((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone_number: null,
      email: "",
      address: "",
      address2: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    },
    validationSchema: accManagerSchema,
    onSubmit,
  });
  useEffect(() => {
    if (!!accmanagerState?.successMsg) {
      dispatch(restAll());
      setIsOpen(false), formik.resetForm();
      // fetchManagerList();
    } else if (!!accmanagerState?.errorMsg) {
      setIsOpen(true);
      // dispatch(restAll());
    }
  }, [accmanagerState]);

  const urlForImage = import.meta.env.VITE_API_BASE_IMAGE_URL;
  const handleMenuItemClick = (data: ClientType) => {
    if (data.userName === "All") {
      // Toggle select all
      const allSelected = !selectAll;
      setSelectAll(allSelected);
      let newArray = [];
      let res = allSelected
        ? accClientList.forEach((name: ClientType) => {
            if (name.userName !== "All") {
              newArray.push(name.id);
            }
          })
        : [];

      setSelectedItems(newArray);
      // setSelectedItems(
      //   allSelected
      //     ? accClientList.filter((name: ClientType) =>
      //         name.first_name !== "All" ? name.id : ""
      //       )
      //     : []
      // );
    } else {
      // Toggle the selected state of the clicked item
      const updatedSelectedItems = selectedItems.includes(data.id)
        ? selectedItems.filter((item) => item !== data.id)
        : [...selectedItems, data.id];
      setSelectedItems(updatedSelectedItems);
      // Check if all items are selected

      const allSelected =
        updatedSelectedItems.length === accClientList.length - 1;
      setSelectAll(allSelected);
    }
  };
  const handleRemoveFile = (file: File) => {
    const filteredFiles = uploadedFiles.filter((f) => f !== file);
    setUploadedFiles(filteredFiles);
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (files) {
      const newFiles: File[] = Array.from(files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };
  const handleRemoveClient = (
    clientName: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.stopPropagation(); // Prevents event propagation to parent elements
    const updatedSelectedItems = selectedItems.filter(
      (item) => item !== clientName
    );
    setSelectedItems(updatedSelectedItems);
    setSelectAll(false);
  };

  // console.log(accClientList, "accClientttttList");
  useEffect(() => {
    if (accManagerDetail) {
      formik.setValues({
        first_name: accManagerDetail.first_name || "",
        last_name: accManagerDetail.last_name || "",
        email: accManagerDetail.email || "",
        phone_number: accManagerDetail.phone_number || "",
        address: accManagerDetail.address,
        address2: accManagerDetail?.address2 || "",
        city: accManagerDetail?.city,
        state: accManagerDetail?.state,
        zipcode: accManagerDetail?.zipcode,
        country: accManagerDetail?.country,
      });
      if (accManagerDetail.user_image) {
        setpreviewUrl(urlForImage + accManagerDetail.user_image);
      }
      if (!isOpen) {
        setpreviewUrl("");
      }
    }
  }, [accManagerDetail, isOpen]);

  const getCountries = async () => {
    const data = {
      start: 0,
      limit: -1,
    };
    try {
      const { payload } = await dispatch(GetCountry({ data }));

      setAllCountries(payload?.data?.data?.list);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  const statecode = formik?.values?.country;
  const getState = async () => {
    const data = {
      start: 0,
      limit: -1,
      country_name: statecode,
    };
    try {
      const { payload } = await dispatch(getAllState({ data }));
      setAllState(payload?.data?.data?.list);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    if (statecode == "United States") {
      getState();
      formik.setFieldValue("state", "");
    }
  }, [statecode]);
  // console.log("🚀 ~ isOpen:", isOpen);
  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => {
        setIsOpen(false),
          formik.resetForm(),
          setpreviewUrl(""),
          setSelectedImage(null);
      }}
      modalTitle={
        isEditing == true ? "Edit Account Manager" : "Add Account Manager"
      }
      maxWidth="733"
      btnTitle={"Save"}
      disabled={actionStatus}
      onSubmit={formik.handleSubmit}
      closeTitle="Close"
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
          <span className="absolute bottom-[-2px] right-0 bg-secondary h-[3.4rem] aspect-square flex items-center justify-center rounded-full border-2 border-white cursor-pointer">
            <FuseSvgIcon className="text-white" size={20}>
              heroicons-outline:camera
            </FuseSvgIcon>
          </span>
        </label>
      </div>
      <div className="flex flex-col gap-20 mb-20 px-10">
        <div className="flex gap-20 sm:flex-row flex-col">
          <InputField
            formik={formik}
            name="first_name"
            label="First Name"
            placeholder="Enter First Name"
          />
          <InputField
            formik={formik}
            name="last_name"
            label="Last Name"
            placeholder="Enter Last Name"
          />
        </div>
        <div className="flex gap-20 sm:flex-row flex-col">
          <InputField
            type="number"
            formik={formik}
            name="phone_number"
            label="Phone Number"
            placeholder="Enter Phone Number"
            sx={{
              backgroundColor: "#F6F6F6",
              borderRadius: "8px",
              "& input[type=number]": {
                "-moz-appearance": "textfield", // Firefox
                "&::-webkit-outer-spin-button": {
                  // Chrome, Safari, Edge, Opera
                  "-webkit-appearance": "none",
                  margin: 0,
                },
                "&::-webkit-inner-spin-button": {
                  // Chrome, Safari, Edge, Opera
                  "-webkit-appearance": "none",
                  margin: 0,
                },
              },
            }}
          />

          <InputField
            formik={formik}
            name="email"
            label="Email "
            placeholder="Enter Email"
            disabled={isEditing}
          />
        </div>
        {/* {!isEditing && (
          <InputField
            formik={formik}
            name="address"
            label="Address"
            placeholder="Enter Address"
          />
        )} */}

        <>
          <div className="flex gap-20">
            <InputField
              formik={formik}
              name="address"
              label="Address 1"
              placeholder="Enter Address 1"
            />
            <InputField
              formik={formik}
              name="address2"
              label="Address 2"
              placeholder="Enter Address 2"
            />
          </div>

          <div className="flex gap-20">
            <InputField
              formik={formik}
              name="city"
              label="City"
              placeholder="Enter City"
            />
            {statecode == "United States" ? (
              <SelectField
                formik={formik}
                name="state"
                label="state"
                placeholder="Select State"
                sx={{
                  "& .radioIcon": { display: "none" },
                }}
              >
                {allState?.length > 0 ? (
                  allState?.map((item) => (
                    <StyledMenuItem key={item.name} value={item.name}>
                      {item.name}
                    </StyledMenuItem>
                  ))
                ) : (
                  <StyledMenuItem>No Data</StyledMenuItem>
                )}
              </SelectField>
            ) : (
              <InputField
                formik={formik}
                name="state"
                label="state"
                placeholder="Enter State"
              />
            )}
          </div>

          <div className="flex gap-20">
            <InputField
              formik={formik}
              name="zipcode"
              label="Zipcode"
              placeholder="Enter Zipcode"
            />
            <SelectField
              formik={formik}
              name="country"
              label="Country"
              placeholder="Select Country"
              sx={{
                "& .radioIcon": { display: "none" },
              }}
            >
              {allCountries?.length > 0 ? (
                allCountries?.map((item) => (
                  <StyledMenuItem key={item.iso_code} value={item.name}>
                    {item.name}
                  </StyledMenuItem>
                ))
              ) : (
                <StyledMenuItem>No Data</StyledMenuItem>
              )}
            </SelectField>
          </div>
        </>
      </div>
    </CommonModal>
  );
}

export default AddAccountManagerModel;
