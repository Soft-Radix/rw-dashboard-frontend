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
  MenuItem,
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
};

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
    },
    validationSchema: accManagerSchema,
    onSubmit,
  });
  useEffect(() => {
    if (!!accmanagerState?.successMsg) {
      dispatch(restAll());
      setIsOpen((prev) => !prev), formik.resetForm();
      // fetchManagerList();
    } else if (!!accmanagerState?.errorMsg) {
      setIsOpen((prev) => !prev);
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
      });
      if (accManagerDetail.user_image) {
        setpreviewUrl(urlForImage + accManagerDetail.user_image);
      }
      if (!isOpen) {
        setpreviewUrl("");
      }
    }
  }, [accManagerDetail, isOpen]);
  console.log("🚀 ~ isOpen:", isOpen);

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => {
        setIsOpen((prev) => !prev),
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
            formik={formik}
            name="phone_number"
            label="Phone Number"
            placeholder="Enter Phone Number"
            sx={{ backgroundColor: "#F6F6F6", borderRadius: "8px" }}
          />

          <InputField
            formik={formik}
            name="email"
            label="Email "
            placeholder="Enter Email"
            disabled={isEditing}
          />
        </div>
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

export default AddAccountManagerModel;
