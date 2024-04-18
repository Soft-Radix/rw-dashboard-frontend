import { Button, Box, Grid, Checkbox, Typography, TableCell, Tab, Tabs, TableRow, Theme, IconButton } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
  LastPayment,
} from "public/assets/icons/common";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ImagesOverlap from "src/app/components/ImagesOverlap";
import TitleBar from "src/app/components/TitleBar";
import AddAgentModel from "src/app/components/agents/AddAgentModel";
import EditProfile from "../profile/EditProfile";
import ChangePassword from "../profile/ChangePassword";
import CommonTab from "../../components/CommonTab";
import Profile from "./components/Profile";
import AssignedAgents from "./components/AssignedAgents";


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ padding: 0 }}
    >
      {value === index && (
        <Box sx={{ paddingTop: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ClientDetail() {
  const theme: Theme = useTheme();
  const formik = useFormik({
    initialValues: {
      role: "",
      verification: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => { },
  });

  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isOpenChangePassModal, setIsOpenChangePassModal] = useState<boolean>(false);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const tabs = [
    {
      id: 'tab1',
      label: 'Profile',
      content: <Profile
        setIsOpenEditModal={setIsOpenEditModal}
        setIsOpenChangePassModal={setIsOpenChangePassModal}
      />,
    },
    {
      id: 'tab2',
      label: 'Assigned agents',
      content: <AssignedAgents />,
    },
    {
      id: 'tab3',
      label: 'Assigned account manager',
      content: <div>Content of Tab 3</div>,
    },
    {
      id: 'tab4',
      label: 'Subscriptions',
      content: <div>Content of Tab 3</div>,
    },
  ];

  return (
    <>

      <TitleBar title="Clients" />
      <div className="px-28 mb-[3rem]">
        <div className="bg-white rounded-lg shadow-sm py-[2rem]">
          <CommonTab tabs={tabs} />
          <div className="h-24" />
        </div>
      </div >

      <AddAgentModel isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
      <EditProfile
        isOpen={isOpenEditModal}
        setIsOpen={setIsOpenEditModal}
      />
      <ChangePassword
        isOpen={isOpenChangePassModal}
        setIsOpen={setIsOpenChangePassModal}
      />
    </>
  );
}
