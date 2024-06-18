import { Button, Checkbox, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";

import ListLoading from "@fuse/core/ListLoading";
import { addAgentInagentGroup } from "app/store/Agent group";
import { AgentGroupRootState } from "app/store/Agent group/Interface";
import {
  GetAssignAgentsInfo,
  addAssignAccManager,
  addAssignAgents,
  changeFetchStatus,
  getAssignAccMangerInfo,
  getClientInfo,
} from "app/store/Client";
import { ClientRootState, filterType } from "app/store/Client/Interface";
import { useAppDispatch } from "app/store/store";
import { debounce } from "lodash";
import {
  DownArrowIconWhite,
  PlusIcon,
} from "public/assets/icons/dashboardIcons";
import { useCallback, useEffect, useState } from "react";
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
import { getAccManagerList } from "app/store/AccountManager";
import { AccManagerRootState } from "app/store/AccountManager/Interface";
import { getAgentList } from "app/store/Agent";

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
  const { clientDetail, actionStatus, fetchStatus, assignAccManagerDetail } =
    useSelector((store: ClientRootState) => store?.client);
  // console.log(assignAccManagerDetail, "detailsffffs");
  const { role } = useSelector((store: any) => store?.user);
  const { searchAgentList, status } = useSelector(
    (store: AgentGroupRootState) => store.agentGroup
  );
  const { list } = useSelector(
    (store: AccManagerRootState) => store.accManagerSlice
  );
  const [filteredAgentList, setFilteredAgentList] = useState(searchAgentList);
  const [filteredAccMaangerList, setFilteredAccMaangerList] = useState(list);

  useEffect(() => {
    setFilteredAgentList(searchAgentList);
  }, [searchAgentList]);

  useEffect(() => {
    setFilteredAccMaangerList(list);
  }, [list]);

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevCheckedItems) => {
      if (prevCheckedItems.includes(id)) {
        return prevCheckedItems.filter((item) => item !== id);
      } else {
        return [...prevCheckedItems, id];
      }
    });
  };

  const handleAddnewAgents = () => {
    dispatch(
      addAssignAgents({
        client_id: client_id,
        agent_ids: checkedItems,
      })
    );
    // dispatch(
    //   GetAssignAgentsInfo({
    //     client_id,
    //     agentfilterMenu,
    //   })
    // );
    handleClose();
    setIsOpenEditModal(false);

    // Filter out the selected items
    setFilteredAgentList((prevList: any) =>
      prevList.filter((item) => !checkedItems.includes(item.id))
    );
    setCheckedItems([]); // Clear the checked items
    setInitialRender(false);
    setSearch("");
  };

  // console.log(list,"fdkfdlfkkdfsdfl")
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
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [search, setSearch] = useState("");
  const [initialRender, setInitialRender] = useState(false);
  const [filterMenu, setFilterMenu] = useState<filterType>({
    start: 0,
    limit: -1,
    search: "",
  });
  const [agentfilterMenu, setAgentFilterMenu] = useState<filterType>({
    start: 0,
    limit: 10,
    search: "",
  });
  const [managerfilterMenu, setManagerFilterMenu] = useState<filterType>({
    start: 0,
    limit: 10,
    search: "",
  });
  const [checkedItems, setCheckedItems] = useState([]);

  const handleClose = () => {
    setAnchorEl3(null);
    setAnchorEl(null);
    setCheckedItems([]);
    debouncedSearch("");
    setInitialRender(false);
    setSearch("");
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl3(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const debouncedSearch = debounce((searchValue) => {
    // Update the search filter here
    setFilterMenu((prevFilters) => ({
      ...prevFilters,
      search: searchValue,
    }));
    setInitialRender(true);
  }, 300); // Adjust the delay as needed (300ms in this example)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearch(value);
    debouncedSearch(value);
  };

  const handleAddnewAccManager = () => {
    dispatch(
      addAssignAccManager({
        client_id: client_id,
        account_manager_ids: checkedItems,
      })
    );
    dispatch(
      GetAssignAgentsInfo({
        client_id,
        managerfilterMenu,
      })
    );
    handleClose();
    setIsOpenEditModal(false);

    // Filter out the selected items
    setFilteredAccMaangerList((prevList: any) =>
      prevList.filter((item) => !checkedItems.includes(item.id))
    );
    setCheckedItems([]); // Clear the checked items
    setInitialRender(false);
    setSearch("");
  };
  const fetchManagerList = useCallback(() => {
    dispatch(getAccManagerList({ ...filterMenu, client_id: client_id }));
  }, [filterMenu]);
  useEffect(() => {
    dispatch(addAgentInagentGroup({ ...filterMenu, client_id: client_id }));
    fetchManagerList();
  }, [dispatch, filterMenu]);

  // console.log(agentfilterMenu, "filterMenu");
  const managerCallApi = () => {
    dispatch(
      getAssignAccMangerInfo({
        ...managerfilterMenu,
        client_id,
      })
    );
  };

  const callAgentApi = () => {
    dispatch(
      GetAssignAgentsInfo({
        ...agentfilterMenu,
        client_id,
      })
    );
  };

  useEffect(() => {
    if (initialRender) {
      callAgentApi();
    }
  }, [agentfilterMenu]);

  useEffect(() => {
    // if (initialRender) {
    managerCallApi();
    // }
  }, [managerfilterMenu]);
  const CustomDropDown = (): JSX.Element => {
    return (
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
              Assign New Agent
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
            <div className="max-h-[200px] w-full overflow-y-auto shadow-sm cursor-pointer">
              {status == "loading" ? (
                <ListLoading />
              ) : (
                <>
                  {initialRender && search != "" && (
                    <>
                      {filteredAgentList.map((item: any) => (
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
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="flex pt-10">
            <Button
              variant="contained"
              color="secondary"
              className="w-[156px] h-[48px] text-[18px]"
              onClick={handleAddnewAgents}
              disabled={checkedItems.length === 0 || actionStatus}
            >
              Assign
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              className="w-[156px] h-[48px] text-[18px] ml-14"
              onClick={handleClose}
              disabled={actionStatus}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DropdownMenu>
    );
  };
  const AssignedAccManagerDropDown = (): JSX.Element => {
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
                Assign New Account Manager
              </Button>
            </div>
          }
          anchorEl={anchorEl}
          handleClose={handleClose}
        >
          <div className="w-[375px] p-20">
            <p className="text-title font-600 text-[1.6rem]">
              Account Manager Name
            </p>

            <div className="relative w-full mt-10 mb-3 sm:mb-0 ">
              <InputField
                name={"agent"}
                placeholder={"Enter Account Manager Name"}
                className="common-inputField "
                inputProps={{
                  className: "ps-[2rem] w-full sm:w-full",
                }}
                onChange={handleSearchChange}
              />
              <div className=" max-h-[200px] w-full overflow-y-auto shadow-sm cursor-pointer">
                {status == "loading" ? (
                  <ListLoading />
                ) : (
                  <>
                    {initialRender && search != "" && (
                      <>
                        {filteredAccMaangerList.map((item: any) => (
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
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="flex pt-10">
              <Button
                variant="contained"
                color="secondary"
                className="w-[156px] h-[48px] text-[18px]"
                onClick={handleAddnewAccManager}
                disabled={checkedItems.length === 0}
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
      content: (
        <AssignedAgents
          setAgentFilterMenu={setAgentFilterMenu}
          agentfilterMenu={agentfilterMenu}
        />
      ),
      actionBtn: CustomDropDown,
      agentfilterMenu,
    },
    {
      id: "assigned-account",
      label: "Assigned account manager",
      content: (
        <AssignedAccountManager
          setManagerFilterMenu={setManagerFilterMenu}
          managerfilterMenu={managerfilterMenu}
        />
      ),
      actionBtn: AssignedAccManagerDropDown,
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
      <TitleBar title="Client" minHeight="min-h-[80px]">
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
            Add a subscription
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
