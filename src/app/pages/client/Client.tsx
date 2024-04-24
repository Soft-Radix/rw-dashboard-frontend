import { Button, InputAdornment, TextField, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { debounce } from "lodash";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useEffect, useState } from "react";
import TitleBar from "src/app/components/TitleBar";
import CommonTab from "../../components/CommonTab";

import { getClientList } from "app/store/Client";
import { ClientRootState, filterType } from "app/store/Client/Interface";
import { useAppDispatch } from "app/store/store";
import { SearchIcon } from "public/assets/icons/topBarIcons";
import { useSelector } from "react-redux";
import AddClient from "src/app/components/client/AddClient";
import ClientTable from "src/app/components/client/ClientTable";
import DeleteClient from "src/app/components/client/DeleteClient";
import ManageButton from "src/app/components/client/ManageButton";
import AssignedAgents from "src/app/components/client/components/AssignedAgents";
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
  const [filters, setfilters] = useState<filterType>({
    start: 0,
    limit: 10,
    search: "",
  });
  const clientState = useSelector((store: ClientRootState) => store.client);

  // Debounce function to delay executing the search
  const debouncedSearch = debounce((searchValue) => {
    // Update the search filter here
    setfilters((prevFilters) => ({
      ...prevFilters,
      search: searchValue,
    }));
  }, 300); // Adjust the delay as needed (300ms in this example)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSearch(value);
  };

  const ClientTabButton = () => {
    return (
      <div className="flex flex-col gap-10 sm:flex-row">
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          defaultValue=""
          variant="standard"
          placeholder="Search"
          onChange={handleSearchChange}
          sx={{
            pl: 2,
            // border: "1px solid blue",
            backgroundColor: "#F6F6F6",
            borderRadius: "8px",
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
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon className="p-2" />
              </InputAdornment>
            ),
          }}
        />

        {/* <input type="text" placeholder="enter></input> */}
        <ManageButton />
      </div>
    );
  };

  const tabs = [
    {
      id: "all",
      label: "All",
      content: <ClientTable clientState={clientState} />,
      actionBtn: ClientTabButton,
    },
    {
      id: "active",
      label: "Active",
      content: <AssignedAgents />,
      actionBtn: () => null,
    },
    {
      id: "passed",
      label: "Passed",
      content: <AssignedAgents />,
      actionBtn: () => null,
    },
    {
      id: "cancel",
      label: "Cancelled",
      content: <AssignedAgents />,
      actionBtn: () => null,
    },
    {
      id: "pastDue",
      label: "Past Due",
      content: <AssignedAgents />,
      actionBtn: () => null,
    },
  ];

  useEffect(() => {
    dispatch(getClientList(filters));
  }, [filters]);

  return (
    <>
      <TitleBar title="Clients">
        <div className="flex flex-col items-start gap-20 sm:items-center sm:flex-row">
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
          <div className="bg-white rounded-lg shadow-sm pt-[2rem]">
            <CommonTab tabs={tabs} />
            <div className="h-24" />
          </div>
        </div>
      </div>
      <AddClient isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
      <DeleteClient
        isOpen={isOpenDeletedModal}
        setIsOpen={setIsOpenDeletedModal}
      />
    </>
  );
}
