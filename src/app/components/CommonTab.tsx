import React, { SetStateAction, useState } from "react";
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";

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
      <div className="flex justify-between gap-[20px] pt-[1.5rem] pb-[1.6rem] flex-wrap px-[1rem] min-h-[4rem]">
        <div className="flex justify-left gap-[20px] flex-wrap ">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${
                activeTab === tab.id
                  ? "border-b-[3px] border-secondary text-secondary"
                  : "border-b border-transparent text-para_light"
              } py-2 pr-[10px] focus:outline-none text-[1.8rem] font-500`}
              onClick={() => {
                navigate(`${location.pathname}?type=${tab.id}`);
                setActiveTab(tab.id);
                // setActive(tab.id);
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div>{tabs.find((tab) => tab.id === activeTab)?.actionBtn()}</div>
      </div>
      <div className="mt-4 pb-4">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default TabComponent;
