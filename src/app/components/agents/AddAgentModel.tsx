import { useAppDispatch } from "app/store/store";
import { useFormik } from "formik";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { editAgentSchema } from "src/formSchema";
import CommonModal from "../CommonModal";
import InputField from "../InputField";

import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Typography } from "@mui/material";
import {
  addAgent,
  getAgentInfo,
  restAll,
  updateAgentProfile,
} from "app/store/Agent";
import { AgentRootState } from "app/store/Agent/Interafce";
import { CrossGreyIcon, PreviewIcon } from "public/assets/icons/common";
import { AttachmentUploadIcon } from "public/assets/icons/supportIcons";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  fetchAgentList?: () => void;
  isEditing?: boolean;
}

type FormType = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: number | string;
  address: string;
};

function AddAgentModel({
  isOpen,
  setIsOpen,
  fetchAgentList,
  isEditing,
}: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const agentState = useSelector((store: AgentRootState) => store.agent);
  const { agentDetail, actionStatus } = useSelector(
    (store: AgentRootState) => store.agent
  );
  // console.log(agentDetail, "kklkfldkf");
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
  const { agent_id } = useParams();
  // console.log(agent_id, "iddd");

  const onSubmit = async (values: FormType, { resetForm }) => {
    try {
      if (agent_id) {
        const { email, ...restData } = values;
        const formData: any = new FormData();
        Object.entries(restData).forEach(([key, value]) => {
          formData.append(key, String(value));
        });
        formData.append("agent_id", agent_id);
        if (selectedImage) {
          formData.append("profile_picture", selectedImage);
        }
        const { payload } = await dispatch(updateAgentProfile(formData));
        if (payload?.data?.message) {
          setIsOpen(false);
        }
      } else {
        const formData: any = new FormData();
        Object.entries(values).forEach(([key, value]) => {
          formData.append(key, String(value));
        });

        if (selectedImage) {
          formData.append("profile_picture", selectedImage);
        }
        // let selectFiles: any = [];
        if (uploadedFiles.length > 0) {
          uploadedFiles.forEach((file) => {
            formData.append("files", file);
          });
        }

        const resultAction = await dispatch(addAgent({ formData }));

        // Access the response data if needed
        const responseData = resultAction.payload?.data;
        // console.log(responseData, "data");
        // Reset form after successful submission

        // Optionally fetch updated agent list
        if (fetchAgentList) {
          fetchAgentList();
        }

        // Close the modal
        setIsOpen(false);
        setUploadedFiles([]);
        setpreviewUrl("");
      }
    } catch (error) {
      // Handle error if dispatch or API call fails
      console.error("Error submitting form:", error);
      // You can add specific error handling logic here
    }
  };
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      phone_number: null,
      email: "",
      address: "",
    },
    validationSchema: editAgentSchema,
    onSubmit,
  });

  useEffect(() => {
    if (!!agentState?.successMsg) {
      dispatch(restAll());
      fetchAgentList();
      setIsOpen(false);
    } else if (!!agentState?.errorMsg) {
      dispatch(restAll());
    }
  }, [agentState, isOpen]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  // const handleMenuItemClick = (itemName: string) => {
  //   if (itemName === "All") {
  //     // Toggle select all
  //     const allSelected = !selectAll;
  //     setSelectAll(allSelected);
  //     setSelectedItems(
  //       allSelected ? names.filter((name) => name !== "All") : []
  //     );
  //   } else {
  //     // Toggle the selected state of the clicked item
  //     const updatedSelectedItems = selectedItems.includes(itemName)
  //       ? selectedItems.filter((item) => item !== itemName)
  //       : [...selectedItems, itemName];
  //     setSelectedItems(updatedSelectedItems);
  //     // Check if all items are selected

  //     const allSelected = updatedSelectedItems.length === names.length - 1;
  //     setSelectAll(allSelected);
  //   }
  // };
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
    e.target.value = ""; //upload same file again
  };
  const urlForImage = import.meta.env.VITE_API_BASE_IMAGE_URL;
  useEffect(() => {
    if (agentDetail) {
      formik.setValues({
        first_name: agentDetail.first_name || "",
        last_name: agentDetail.last_name || "",
        email: agentDetail.email || "",
        phone_number: agentDetail.phone_number || "",
        address: agentDetail.address,
      });
      if (agentDetail.user_image) {
        setpreviewUrl(urlForImage + agentDetail.user_image);
      }
      if (!isOpen) {
        setpreviewUrl("");
      }
    }
    setUploadedFiles([]);
  }, [agentDetail, isOpen]);
  // console.log("uploadedFiles", uploadedFiles);
  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => {
        setIsOpen((prev) => false), formik.resetForm();
      }}
      modalTitle={isEditing ? "Edit Agent" : "Add Agent"}
      maxWidth="733"
      btnTitle={"Save"}
      disabled={agentState.actionStatus}
      //   disabled={loading}
      onSubmit={formik.handleSubmit}
      closeTitle={"Cancel"}
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
            label="Email Address"
            placeholder="Enter Email Address"
            disabled={isEditing}
          />
        </div>
        <InputField
          formik={formik}
          name="address"
          label="Address"
          placeholder="Enter Address"
        />
        {/* <div className="flex gap-20 sm:flex-row flex-col"> */}
        {!isEditing && ( // Use logical NOT operator ! to conditionally render if !isEditing is true
          <div className="flex-1 w-[50%]">
            <Typography className="text-[16px] font-500 text-[#111827] pb-10">
              Attachments
            </Typography>
            <label
              htmlFor="attachment"
              className="bg-[#EDEDFC] px-20 mb-10 border-[0.5px] border-solid border-[#4F46E5] rounded-6 min-h-[48px] flex items-center 
            justify-between cursor-pointer"
              // onClick={() => handleUploadFile()}
            >
              <label className="text-[16px] text-[#4F46E5] flex items-center cursor-pointer">
                Upload File
                <input
                  type="file"
                  style={{ display: "none" }}
                  multiple={true}
                  id="attachment"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleUploadFile}
                />
              </label>
              <span>
                <AttachmentUploadIcon />
              </span>
            </label>
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="bg-[#F6F6F6] mb-10 px-10 rounded-6 min-h-[48px] flex items-center justify-between cursor-pointer"
              >
                <div className="mr-4 text-[16px] text-[#4F46E5] py-5 w-full flex  items-center">
                  <PreviewIcon />
                  {file.name}
                </div>

                <div onClick={() => handleRemoveFile(file)}>
                  <CrossGreyIcon />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* </div> */}
    </CommonModal>
  );
}

export default AddAgentModel;
