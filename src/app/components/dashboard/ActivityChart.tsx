import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Modal from "react-modal";
import { Button, Menu, MenuItem, ListItemText } from "@mui/material";
import { DownArrowBlank } from "public/assets/icons/dashboardIcons";
import { UpArrowBlank } from "public/assets/icons/clienIcon";
import CommonModal from "../CommonModal";

const sevenDayData = [
  { name: "M", hour: 60 },
  { name: "T", hour: 80 },
  { name: "W", hour: 60 },
  { name: "T", hour: 80 },
  { name: "F", hour: 50 },
  { name: "S", hour: 40 },
  { name: "S", hour: 30 },
];

const customData = [
  { name: "1", hour: 20 },
  { name: "2", hour: 30 },
  { name: "3", hour: 50 },
  { name: "4", hour: 70 },
  { name: "5", hour: 40 },
  { name: "6", hour: 60 },
  { name: "7", hour: 30 },
  { name: "8", hour: 50 },
  { name: "9", hour: 70 },
  { name: "10", hour: 20 },
];

interface DataPoint {
  name: string;
  hour: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: number }[];
}

const CustomYAxisTick = (props: any) => {
  const { x, y, payload } = props;
  return (
    <text x={x} y={y} dy={16} textAnchor="middle" fill="#666">
      {`${payload.value}h`}
    </text>
  );
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-[#ffffff] h-40 w-80 flex items-center justify-center">
        <p className="label font-500">{` ${payload[0].value} hours`}</p>
      </div>
    );
  }
  return null;
};

const ActivityChart = () => {
  const [data, setData] = useState<DataPoint[]>(sevenDayData);
  const [selectedOption, setSelectedOption] = useState<string>("7days");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option: string) => {
    setSelectedOption(option);
    handleClose();
    if (option === "7days") {
      setData(sevenDayData);
    } else if (option === "custom") {
      setIsModalOpen(true);
    }
  };

  const handleApplyCustomDates = () => {
    // Here you can fetch or calculate the custom data based on the selected dates
    // For now, we'll just use customData as a placeholder
    setData(customData);
    setIsModalOpen(false);
  };

  return (
    <div className="pt-20 sm:px-20">
      <div className="flex justify-end mb-4">
        <Button
          onClick={handleClick}
          variant="contained"
          className="bg-[#F6F6F6]  min-h-[45px] rounded-[8px] flex items-center justify-between font-400 text-[#757982]"
          sx={{ border: Boolean(anchorEl) ? "1px solid #4F46E5" : "none" }}
        >
          {selectedOption}
          <span>{!anchorEl ? <DownArrowBlank /> : <UpArrowBlank />}</span>
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            sx: {
              width: "100%",
              marginTop: 2,
              marginRight: 2,
              "& ul": {
                padding: 1, // Example: Remove padding from the ul element inside Paper
                listStyle: "none", // Example: Remove default list styles
                overflowY: "auto",
              },
            },
          }}
        >
          <MenuItem onClick={() => handleMenuItemClick("7days")}>
            <ListItemText primary="Past 7 Days" />
          </MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("custom")}>
            <ListItemText primary="Custom" />
          </MenuItem>
        </Menu>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorHour" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            axisLine={{ stroke: "#4F46E5", strokeWidth: 0 }}
            tickLine={false}
            interval={0}
            tickMargin={10}
            fontSize={13}
          />
          <YAxis
            tick={<CustomYAxisTick />}
            tickLine={false}
            strokeWidth={0}
            fontSize={10}
            tickMargin={20}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="hour"
            strokeWidth="2"
            stroke="#4E47E5"
            fill="url(#colorHour)"
            opacity={1}
            activeDot={{ fill: "#4E47E5", r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
      <CommonModal
        open={isModalOpen}
        handleToggle={() => setIsModalOpen(false)}
        modalTitle={"Add Custom Date"}
        maxWidth="733"
        btnTitle={"Save"}
        closeTitle="Close"
        onSubmit={handleApplyCustomDates}
      >
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <label>Start Date: </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label>End Date: </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>
      </CommonModal>
    </div>
  );
};

export default ActivityChart;
