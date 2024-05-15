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
import { addAgentSchema, editAgentSchema } from "src/formSchema";
import { useAppDispatch } from "app/store/store";

import { useSelector } from "react-redux";
import { addAgent } from "app/store/Agent";
import { restAll } from "app/store/Agent";
import { AgentRootState, AgentType } from "app/store/Agent/Interafce";
import profilePic from "public/assets/images/pages/profile/AgentProfile.png";
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
import { UploadDocIcon } from "public/assets/icons/welcome";
import { AttachmentUploadIcon } from "public/assets/icons/supportIcons";
import {
  CrossGreyIcon,
  CrossIcon,
  PreviewIcon,
} from "public/assets/icons/common";
import ManageButton from "../client/ManageButton";
import { DownArrowBlank } from "public/assets/icons/dashboardIcons";
import { UpArrowBlank } from "public/assets/icons/clienIcon";
import SearchInput from "../SearchInput";
import { SearchIcon } from "public/assets/icons/topBarIcons";
import img1 from "../../../../public/assets/images/pages/admin/accImg.png";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  fetchAgentList?: () => void;
}
const names = ["All", "Rahul", "Manisha", "Elvish", "Abhishek"];
function AddAgentModel({ isOpen, setIsOpen, fetchAgentList }: IProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const agentState = useSelector((store: AgentRootState) => store.agent);
  const [selectedImage, setSelectedImage] = useState<File>(); // Default image path
  const [previewUrl, setpreviewUrl] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    console.log(file, "file");
    if (file) {
      setSelectedImage(file); // Store the selected file
      const imageUrl = URL.createObjectURL(file); // Create a temporary URL for the uploaded image
      setpreviewUrl(imageUrl); // Set the new image
    }
  };

  const onSubmit = async (values: AgentType, { resetForm }) => {
    console.log(values, "values");
    const { phone_number, address, ...restValue } = values;
    const { payload } = await dispatch(addAgent(restValue));

    // const formData = {
    //   ...formik.values, // Include form values from Formik
    //   uploadedFiles: uploadedFiles, // Include uploaded files
    //   selectedItems: selectedItems, // Include selected items
    // };
    resetForm();
    // console.log(formData, "formdta");
    // const { payload } = await dispatch(formData(values));
    // if (payload?.data?.status) {
    //   fetchAgentList();
    //   resetForm();
    // }
    // console.log("Form values:", values);
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
      setIsOpen((prev) => false);
    } else if (!!agentState?.errorMsg) {
      dispatch(restAll());
    }
  }, [agentState]);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(true);
  };

  const handleMenuItemClick = (itemName: string) => {
    if (itemName === "All") {
      // Toggle select all
      const allSelected = !selectAll;
      setSelectAll(allSelected);
      setSelectedItems(
        allSelected ? names.filter((name) => name !== "All") : []
      );
    } else {
      // Toggle the selected state of the clicked item
      const updatedSelectedItems = selectedItems.includes(itemName)
        ? selectedItems.filter((item) => item !== itemName)
        : [...selectedItems, itemName];
      setSelectedItems(updatedSelectedItems);
      // Check if all items are selected

      const allSelected = updatedSelectedItems.length === names.length - 1;
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

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle="Edit Profile"
      maxWidth="733"
      btnTitle={"Add"}
      //   disabled={loading}
      onSubmit={formik.handleSubmit}
      closeTitle={"Cancel"}
    >
      <div className="h-[100px] w-[100px] mb-[2.4rem] relative">
        <img
          src={previewUrl || "/assets/images/avatars/male-01.jpg"}
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
          />
        </div>
        <InputField
          formik={formik}
          name="address"
          label="Address"
          placeholder="Enter Address"
        />
        <div className="flex gap-20 sm:flex-row flex-col">
          <div className="flex-1 ">
            <Typography className="text-[16px] font-500 text-[#111827] pb-10">
              Attachments
            </Typography>
            <div className="bg-[#EDEDFC] px-20 mb-10 border-[0.5px] border-solid border-[#4F46E5] rounded-6 min-h-[48px] flex items-center justify-between cursor-pointer">
              <label className="text-[16px] text-[#4F46E5] flex items-center cursor-pointer">
                Upload File
                <input
                  type="file"
                  style={{ display: "none" }}
                  multiple
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={handleUploadFile}
                />
              </label>
              <span>
                <AttachmentUploadIcon />
              </span>
            </div>
            {uploadedFiles.map((file, index) => (
              <div className="bg-[#F6F6F6] mb-10 px-10 rounded-6 min-h-[48px] flex items-center justify-between cursor-pointer">
                <div
                  key={index}
                  className="bg-F6F6F6 mb-10 px-10 rounded-6 min-h-48 flex items-center justify-between cursor-pointer"
                >
                  <span className="mr-4">
                    <PreviewIcon />
                  </span>
                  <span className="text-[16px] text-[#4F46E5] py-5">
                    {file.name}
                  </span>

                  <span onClick={() => handleRemoveFile(file)}>
                    <CrossGreyIcon />
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex-1">
            {" "}
            <Typography className="text-[16px] font-500 text-[#111827] pb-10 text-left">
              Assign Clients
            </Typography>
            <Button
              onClick={handleClick}
              variant="contained"
              className="bg-[#F6F6F6] sm:min-w-[320px] min-h-[48px] rounded-[8px] flex items-center justify-between text-[16px] font-400 text-[#757982] w-full "
              sx={{ border: isOpen ? "1px solid #4F46E5" : "none" }}
            >
              Select Clients
              <span>{!isOpen ? <DownArrowBlank /> : <UpArrowBlank />}</span>
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              MenuListProps={{
                sx: {
                  // Example: Set max height of the menu container
                  width: 300,
                  // maxHeight: "250px",
                  // overflowY: "auto",
                  "& ul": {
                    padding: 1, // Example: Remove padding from the ul element inside Paper
                    listStyle: "none", // Example: Remove default list styles
                    overflowY: "auto",
                  },
                },
              }}
            >
              <div className="flex w-full border-b-1 mb-[15px]">
                <TextField
                  hiddenLabel
                  id="filled-hidden-label-small"
                  defaultValue=""
                  variant="standard"
                  placeholder="Search Assignee"
                  sx={{
                    pl: 2,
                    pr: 2,
                    pt: 1,
                    pb: 1,

                    "& .MuiInputBase-input": {
                      textDecoration: "none", // Example: Remove text decoration (not typically used for input)
                      border: "none", // Hide the border of the input element
                    },
                    "& .MuiInput-underline:before": {
                      borderBottom: "none !important", // Hide the underline (if using underline variant)
                    },
                    "& .MuiInput-underline:after": {
                      borderBottom: "none !important", // Hide the underline (if using underline variant)
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              {/* <SearchInput name="Assignee" placeholder="Search Assignee" /> */}
              <div className="overflow-y-scroll h-[200px] ">
                {names.map((name) => (
                  <MenuItem className="py-10">
                    <div
                      className="flex items-center gap-10  "
                      onClick={() => handleMenuItemClick(name)}
                    >
                      <Checkbox
                        checked={
                          name === "All"
                            ? selectAll
                            : selectedItems.includes(name)
                        }
                      />
                      {name !== "All" && (
                        <span>
                          <img src={img1} alt=""></img>
                        </span>
                      )}
                      <ListItemText primary={name} />
                      {/* <span>Hello</span> */}
                    </div>
                  </MenuItem>
                ))}
              </div>
            </Menu>
          </div>
        </div>
      </div>
    </CommonModal>
  );
}

export default AddAgentModel;
