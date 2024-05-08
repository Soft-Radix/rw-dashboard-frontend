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
import { boolean } from "zod";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  fetchAgentList?: () => void;
  isEditing: boolean;
}
const names = ["All", "Rahul", "Manisha", "Elvish", "Abhishek"];
function AddAccountManagerModel({
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
    const formData = {
      ...formik.values, // Include form values from Formik
      uploadedFiles: uploadedFiles, // Include uploaded files
      selectedItems: selectedItems, // Include selected items
    };
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

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle={
        isEditing == true ? "Edit Account Manager" : "Add Account Manager"
      }
      maxWidth="733"
      btnTitle={"Save"}
      //   disabled={loading}
      onSubmit={formik.handleSubmit}
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className="text-[16px] font-600 text-[#111827] bg-[#F6F6F6] pl-10">
                    +1
                  </span>
                </InputAdornment>
              ),
            }}
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
          <div className="">
            {" "}
            <Typography className="text-[16px] font-500 text-[#111827] pb-10 text-left">
              Assign Clients
            </Typography>
            <Button
              onClick={handleClick}
              variant="contained"
              className="bg-[#F6F6F6] sm:min-w-[320px] min-h-[48px] rounded-[8px] flex items-center justify-between text-[16px] font-400 text-[#757982] w-full "
              sx={{ border: anchorEl ? "1px solid #4F46E5" : "none" }}
            >
              {selectedItems.length > 0 ? (
                selectedItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-5">
                    <span>
                      <img src={img1} alt="" />
                    </span>
                    <ListItemText primary={item} />
                    <div
                      className="bg-[#FFFFFF] rounded-full border-solid border-1 cursor-pointer  "
                      onClick={(event) => handleRemoveClient(item, event)}
                    >
                      <CrossGreyIcon className="h-20 w-20 p-5" />
                    </div>
                  </div>
                ))
              ) : (
                <span>Select Clients</span>
              )}
              <span>{!anchorEl ? <DownArrowBlank /> : <UpArrowBlank />}</span>
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

export default AddAccountManagerModel;
