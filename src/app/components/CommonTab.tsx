import { Button } from "@mui/material";
import React, { ReactNode, SetStateAction, useState } from "react";
import {
  NavigateFunction,
  useLocation,
  Location,
  useNavigate,
} from "react-router-dom";
import DropdownMenu from "../../app/components/Dropdown";
import { DownArrowIcon } from "public/assets/icons/dashboardIcons";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  actionBtn?: () => React.ReactNode;
}

interface TabProps {
  tabs: Tab[];
  setActive?: React.Dispatch<SetStateAction<number | string>>;
}

const TabComponent: React.FC<TabProps> = ({ tabs, setActive }) => {
  const location: Location = useLocation();
  const navigate: NavigateFunction = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  // Get a specific query parameter
  const paramValue = queryParams.get("type");
  const [activeTab, setActiveTab] = useState<string>(paramValue ?? tabs[0].id);

  return (
    <div className="relative">
      <div className="flex justify-between gap-[30px] pt-[1.5rem] pb-[1.6rem] flex-wrap px-[2rem] min-h-[4rem]">
        <div className="flex justify-left gap-[30px] flex-wrap ">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${
                activeTab === tab.id
                  ? "border-b-[3px] border-secondary text-secondary"
                  : "border-b border-transparent text-para_light"
              } py-2 pr-[10px] focus:outline-none text-[1.8rem] font-500`}
              onClick={() => {
                setActiveTab(tab.id);
                navigate(`${location.pathname}?type=${tab.id}`);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div>{tabs.find((tab) => tab.id === activeTab)?.actionBtn()}</div>
      </div>
      <div className="mt-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default TabComponent;
