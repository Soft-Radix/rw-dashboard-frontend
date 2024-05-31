import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Button, InputAdornment, TextField, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import TitleBar from "src/app/components/TitleBar";
import CommonTab from "../../components/CommonTab";
import { debounce } from "lodash";
import { ClientType } from "app/store/Client/Interface";

import { SearchIcon } from "public/assets/icons/topBarIcons";
import DropdownMenu from "src/app/components/Dropdown";
import AddClient from "src/app/components/client/AddClient";
import DeleteClient from "src/app/components/client/DeleteClient";
import img1 from "../../../../public/assets/images/pages/admin/accImg.png";
import AssignedAgents from "src/app/components/client/components/AssignedAgents";
import CustomButton from "src/app/components/custom_button";
import ClientTable from "src/app/components/client/ClientTable";
import { useAppDispatch } from "app/store/store";
import { deletClient, getClientList } from "app/store/Client";
import { ClientRootState, filterType } from "app/store/Client/Interface";
import { useSelector } from "react-redux";
import FuseLoading from "@fuse/core/FuseLoading";
import ManageButton from "src/app/components/client/ManageButton";
import { useLocation } from "react-router";
import { CrossGreyIcon } from "public/assets/icons/common";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export default function Clients() {
  const theme: Theme = useTheme();
  const dispatch = useAppDispatch();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenDeletedModal, setIsOpenDeletedModal] = useState(false);
  const [count, setCount] = useState(1);
  const { search } = useLocation();
  const query = search.split("=");
  const [active, setActive] = useState(query[query.length - 1]);
  const [filters, setfilters] = useState<filterType>({
    start: 0,
    limit: 10,
    search: "",
  });
  const clientState = useSelector((store: ClientRootState) => store.client);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isAllSelected, setisAllSelected] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // Debounce function to delay executing the search
  const debouncedSearch = debounce((searchValue) => {
    // Update the search filter here
    setfilters((prevFilters) => ({
      ...prevFilters,
      search: searchValue,
      start: 0,
    }));
  }, 300); // Adjust the delay as needed (300ms in this example)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
    debouncedSearch(value);
  };

  const handleCheckboxChange = (rowId: number) => {
    const allRowIds = clientState?.list.map((row: ClientType) => row.id) || [];
    let selectedId = selectedIds.includes(rowId)
      ? [...selectedIds.filter((id) => id !== rowId)]
      : [...selectedIds, rowId];

    if (allRowIds.length == selectedId.length) {
      setSelectedIds(allRowIds);
      setisAllSelected(true);
    } else {
      setSelectedIds(selectedId); // Select all
      setisAllSelected(false);
    }
  };

  const handleSelectAll = () => {
    const allRowIds = clientState?.list.map((row: ClientType) => row.id) || [];
    const allSelected = allRowIds.every((id: number) =>
      selectedIds.includes(id)
    );
    if (allSelected) {
      setSelectedIds([]); // Deselect all
      setisAllSelected(false);
    } else {
      setisAllSelected(true);
      setSelectedIds(allRowIds); // Select all
    }
  };

  const { actionStatusClient } = useSelector(
    (store: ClientRootState) => store.client
  );

  const deleteClient = async () => {
    if (!!actionStatusClient || selectedIds.length < 1) return;
    const { payload } = await dispatch(
      deletClient({ client_ids: selectedIds })
    );
    if (payload?.data?.status) {
      setfilters((prevFilters) => ({
        ...prevFilters,
        start: clientState?.list.length - 1 == 0 ? 0 : prevFilters.start,
      }));
      setIsOpenDeletedModal(false);
    }
    setSelectedIds([]);
  };

  const fetchList = useCallback(() => {
    const payload = {
      ...filters,
      type:
        active == "all"
          ? 0
          : active == "active"
            ? 1
            : active == "paused"
              ? 2
              : active == "cancel"
                ? 3
                : active == "pastDue"
                  ? 4
                  : null,
    };
    dispatch(getClientList(payload));
  }, [dispatch, filters, active]);

  useEffect(() => {
    fetchList();
  }, [dispatch, filters, active]);

  useEffect(() => {
    setActive(query[query.length - 1]);
  }, [search]);
  const handleInputClear = () => {
    setInputValue("");
    setfilters((prevFilters) => ({
      ...prevFilters,
      search: "",
      start: 0,
    }));
  };
  const ClientTabButton = () => {
    return (
      <div className="flex flex-col gap-10 sm:flex-row">
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          defaultValue=""
          value={inputValue}
          variant="standard"
          placeholder="Search Client"
          onChange={handleSearchChange}
          sx={{
            pl: 2,
            // border: "1px solid blue",
            backgroundColor: "#F6F6F6",
            borderRadius: "8px",
            border: "1px solid transparent", // Show border when focused
            "&:focus-within": {
              border: "1px solid blue", // Show border when focused
            },
            "& .MuiInputBase-input": {
              textDecoration: "none", // Example: Remove text decoration (not typically used for input)
              border: "none", // Hide the border of the input element
            },
            "& .MuiInput-underline:before": {
              border: "none !important", // Hide the underline (if using underline variant)
            },
            "& .MuiInput-underline:after": {
              borderBottom: "none !important", // Hide the underline (if using underline variant)
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#757982", // Change placeholder color here
              opacity: 1, // Override opacity
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="p-2" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <CrossGreyIcon
                  className="mr-16 p-1 cursor-pointer fill-[#c2cad2] h-[14px]"
                  onClick={handleInputClear}
                />
              </InputAdornment>
            ),
          }}
        />

        <ManageButton />
      </div>
    );
  };
  const tabs = [
    {
      id: "all",
      label: "All",
      content: (
        <ClientTable
          clientState={clientState}
          handleSelectAll={handleSelectAll}
          selectedIds={selectedIds}
          handleCheckboxChange={handleCheckboxChange}
          setfilters={setfilters}
          filters={filters}
          isAllSelected={isAllSelected}
        />
      ),
      actionBtn: ClientTabButton,
    },
    {
      id: "active",
      label: "Active",
      // content: <AssignedAgents type={1} />,
      content: (
        <ClientTable
          clientState={clientState}
          handleSelectAll={handleSelectAll}
          selectedIds={selectedIds}
          handleCheckboxChange={handleCheckboxChange}
          setfilters={setfilters}
          filters={filters}
          status={false}
        />
      ),
      actionBtn: ClientTabButton,
    },
    {
      id: "paused",
      label: "Paused",
      // content: <AssignedAgents type={2} />,
      content: (
        <ClientTable
          clientState={clientState}
          handleSelectAll={handleSelectAll}
          selectedIds={selectedIds}
          handleCheckboxChange={handleCheckboxChange}
          setfilters={setfilters}
          filters={filters}
          status={false}
        />
      ),
      actionBtn: ClientTabButton,
    },
    {
      id: "cancel",
      label: "Cancelled",
      // content: <AssignedAgents type={3} />,
      content: (
        <ClientTable
          clientState={clientState}
          handleSelectAll={handleSelectAll}
          selectedIds={selectedIds}
          handleCheckboxChange={handleCheckboxChange}
          setfilters={setfilters}
          filters={filters}
          status={false}
        />
      ),
      actionBtn: ClientTabButton,
    },
    {
      id: "pastDue",
      label: "Past Due",
      // content: <AssignedAgents type={4} />,
      content: (
        <ClientTable
          clientState={clientState}
          handleSelectAll={handleSelectAll}
          selectedIds={selectedIds}
          handleCheckboxChange={handleCheckboxChange}
          setfilters={setfilters}
          filters={filters}
          status={false}
        />
      ),
      actionBtn: ClientTabButton,
    },
  ];

  return (
    <>
      <TitleBar title="Clients">
        <div className="flex flex-col items-start gap-20 sm:items-center sm:flex-row">
          {/* <DropdownMenu
            marginTop={"mt-20"}
            button={
              <div
                className="relative flex items-center"
                onClick={handleButtonClick}
              >
                <Button
                  variant="contained"
                  className="h-[40px] sm:text-[16px] text-secondary flex gap-8 bg-[#EDEDFC] leading-none hover:bg-[#EDEDFC]"
                  aria-label="Manage Sections"
                  size="large"
                  style={{
                    border: anchorEl ? "1px #4F46E5 solid" : "none",
                  }}
                >
                  Assign to account manager
                </Button>
              </div>
            }
            anchorEl={anchorEl}
            handleClose={handleClose}
          >
            <div className="w-[375px]">
              <div className="flex w-full border-b-1">
                <TextField
                  hiddenLabel
                  id="filled-hidden-label-small"
                  defaultValue=""
                  variant="standard"
                  sx={{
                    pl: 2,
                    pr: 2,
                    pt: 1,
                    width: "43ch",
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
            </div>
            <div className="flex items-center gap-10 p-20 px-20">
              <span>
                <img src={img1} alt=""></img>
              </span>
              <span>Hello</span>
            </div>
          </DropdownMenu> */}

          {selectedIds?.length > 0 && (
            <Button
              variant="contained"
              className="h-[40px] text-[16px] font-600 flex gap-8 text-[#4F46E5] bg-[#EDEDFC] hover:bg-transparent"
              aria-label="delete"
              size="large"
              onClick={() => setIsOpenDeletedModal(true)}
            >
              Delete
            </Button>
          )}
          <Button
            variant="outlined"
            color="secondary"
            className="h-[40px] text-[16px] flex gap-8 font-600"
            aria-label="Clients"
            size="large"
            onClick={() => setIsOpenAddModal(true)}
          >
            <PlusIcon color={theme.palette.secondary.main} />
            Add Client
          </Button>
        </div>
      </TitleBar>

      <div className="flex flex-wrap gap-20 px-28 lg:flex-nowrap">
        <div className="basis-full lg:basis-auto lg:grow">
          <div className="bg-white rounded-lg shadow-sm pt-[2rem]  ">
            <CommonTab tabs={tabs} setActive={setActive} />
            <div className="h-24" />
          </div>
        </div>
      </div>
      <AddClient
        isOpen={isOpenAddModal}
        setIsOpen={setIsOpenAddModal}
        fetchList={fetchList}
      />

      <DeleteClient
        isOpen={isOpenDeletedModal}
        setIsOpen={setIsOpenDeletedModal}
        loading={clientState?.actionStatus}
        onDelete={deleteClient}
        heading={"Delete Client"}
        description={"Are you sure you want to delete this Client? "}
      />
    </>
  );
}
