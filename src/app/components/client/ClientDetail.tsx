import { Button, Checkbox, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";

import ListLoading from "@fuse/core/ListLoading";
import {
  GetAssignAgentsInfo,
  addAssignAgents,
  changeFetchStatus,
  getClientInfo,
} from "app/store/Client";
import { ClientRootState, filterType } from "app/store/Client/Interface";
import { useAppDispatch } from "app/store/store";
import {
  DownArrowIconWhite,
  PlusIcon,
} from "public/assets/icons/dashboardIcons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import TitleBar from "src/app/components/TitleBar";
import DropdownMenu from "../../../app/components/Dropdown";
import CommonTab from "../../components/CommonTab";
import InputField from "../InputField";
import ChangePassword from "../profile/ChangePassword";
import EditProfile from "../profile/EditProfile";
import AssignedAccountManager from "./components/AssignedAccountManager";
import AssignedAgents from "./components/AssignedAgents";
import Profile from "./components/Profile";
import SubscriptionList from "./components/SubscriptionList";
import { AgentGroupRootState } from "app/store/Agent group/Interface";
import { addAgentInagentGroup } from "app/store/Agent group";
import { debounce } from "lodash";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
export default function ClientDetail() {
  const theme: Theme = useTheme();
  const dispatch = useAppDispatch();
  const [isOpenAddModal, setIsOpenAddModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isOpenChangePassModal, setIsOpenChangePassModal] =
    useState<boolean>(false);
  const location: Location = useLocation();
  const { clientDetail, actionStatus, fetchStatus } = useSelector(
    (store: ClientRootState) => store?.client
  );
  const { role } = useSelector((store: any) => store?.user);
  const { searchAgentList } = useSelector(
    (store: AgentGroupRootState) => store.agentGroup
  );
  const { client_id } = useParams();
  if (client_id) {
    localStorage.setItem("client_id", client_id);
  }
  const navigate: NavigateFunction = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // Get a specific query parameter
  const paramValue = queryParams.get("type");
  //custom dropdown
  const [anchorEl3, setAnchorEl3] = useState<HTMLElement | null>(null);
  const [filterMenu, setFilterMenu] = useState<filterType>({
    start: 0,
    limit: -1,
    search: "",
  });
  const [checkedItems, setCheckedItems] = useState([]);
  const [agentId, setAgentId] = useState<number[]>();
  const handleClose = () => {
    setAnchorEl3(null);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    // event.stopPropagation();
    setAnchorEl3(event.currentTarget);
  };

  const handleAddnewAgents = () => {
    dispatch(
      addAssignAgents({
        client_id: client_id,
        agent_ids: checkedItems,
      })
    );
  };

  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prevState) =>
      prevState.includes(id)
        ? prevState.filter((item) => item !== id)
        : [...prevState, id]
    );
  };
  const debouncedSearch = debounce((searchValue) => {
    // Update the search filter here
    setFilterMenu((prevFilters) => ({
      ...prevFilters,
      search: searchValue,
    }));
  }, 300); // Adjust the delay as needed (300ms in this example)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSearch(value);
  };
  useEffect(() => {
    dispatch(addAgentInagentGroup(filterMenu));
    dispatch(
      GetAssignAgentsInfo({
        client_id: client_id,
        start: 0,
        limit: 10,
        search: "",
      })
    );
  }, [filterMenu]);
  // console.log(agentId, "popop");
  const CustomDropDown = (): JSX.Element => {
    return (
      <>
        <DropdownMenu
          marginTop={"mt-20"}
          button={
            <div
              className="relative flex items-center"
              onClick={handleButtonClick}
            >
              <Button
                variant="outlined"
                className="h-[40px] sm:text-[16px] flex gap-8  text-white leading-none bg-secondary hover:bg-secondary"
                aria-label="Manage Sections"
                size="large"
                endIcon={<DownArrowIconWhite className="cursor-pointer" />}
              >
                Assigned New Agent
              </Button>
            </div>
          }
          anchorEl={anchorEl3}
          handleClose={handleClose}
        >
          <div className="w-[375px] p-20">
            <p className="text-title font-600 text-[1.6rem]">Agent Name</p>

            <div className="relative w-full mt-10 mb-3 sm:mb-0 ">
              <InputField
                name={"agent"}
                placeholder={"Enter Agent Name"}
                className="common-inputField "
                inputProps={{
                  className: "ps-[2rem] w-full sm:w-full",
                }}
                onChange={handleSearchChange}
              />
              <div className=" max-h-[100px] w-1/2 overflow-y-auto shadow-sm cursor-pointer">
                {searchAgentList.map((item: any) => (
                  <div
                    className="flex items-center gap-10 px-20 w-full"
                    key={item.id}
                  >
                    <label className="flex items-center gap-10 w-full cursor-pointer">
                      <Checkbox
                        checked={checkedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                      <span>{item.first_name}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex pt-10">
              <Button
                variant="contained"
                color="secondary"
                className="w-[156px] h-[48px] text-[18px]"
                onClick={handleAddnewAgents}
              >
                Assign
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                className="w-[156px] h-[48px] text-[18px] ml-14"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DropdownMenu>
      </>
    );
  };

  const tabs = [
    {
      id: "profile",
      label: "Profile",
      content: (
        <Profile
          clientDetail={clientDetail}
          setIsOpenEditModal={setIsOpenEditModal}
          setIsOpenChangePassModal={setIsOpenChangePassModal}
        />
      ),
      actionBtn: () => null,
    },
    {
      id: "assigned-agents",
      label: "Assigned agents",
      content: <AssignedAgents />,
      actionBtn: CustomDropDown,
    },
    {
      id: "assigned-account",
      label: "Assigned account manager",
      content: <AssignedAccountManager />,
      actionBtn: CustomDropDown,
    },
    {
      id: "subscription",
      label: "Subscriptions",
      content: <SubscriptionList />,
      actionBtn: () => null,
    },
  ];

  useEffect(() => {
    if (!client_id) return null;
    dispatch(getClientInfo({ client_id }));
    return () => {
      dispatch(changeFetchStatus());
    };
  }, []);

  if (fetchStatus === "loading") {
    return <ListLoading />;
  }

  return (
    <>
      <TitleBar title="Clients" minHeight="min-h-[80px]">
        {paramValue == "subscription" && (
          <Button
            variant="outlined"
            color="secondary"
            className="h-[40px] text-[16px] flex gap-8 font-[600]"
            aria-label="Add Tasks"
            size="large"
            onClick={() => {
              navigate("/admin/client/add-subscription");
            }}
          >
            <PlusIcon color={theme.palette.secondary.main} />
            Add Subscription
          </Button>
        )}
      </TitleBar>
      <div className="px-28 mb-[3rem]">
        <div className="bg-white rounded-lg shadow-sm">
          <CommonTab tabs={tabs} />
          {/* <div className="h-24" /> */}
        </div>
      </div>

      {/* <AddAgentModel isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} /> */}
      <EditProfile
        isOpen={isOpenEditModal}
        setIsOpen={setIsOpenEditModal}
        clientDetail={clientDetail}
        loading={actionStatus}
      />
      <ChangePassword
        role={role}
        isOpen={isOpenChangePassModal}
        setIsOpen={setIsOpenChangePassModal}
      />
    </>
  );
}
