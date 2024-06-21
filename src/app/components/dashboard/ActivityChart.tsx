import React, { Suspense, useEffect, useState } from "react";
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

import { DateRangePicker } from "react-date-range";
import DatePopup from "../DatePopup";
// import { addDays } from "date-fns";

const sevenDayData = [
  { name: "M", hour: 60, type: 0 },
  { name: "T", hour: 80, type: 0 },
  { name: "W", hour: 60, type: 0 },
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
      {`${payload.value}`}
    </text>
  );
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-[#ffffff] h-40 w-[auto] flex items-center justify-center p-10 rounded-6 shadow-lg">
        <p className="label font-400">{`Total Clients: ${payload[0].value} `}</p>
      </div>
    );
  }
  return null;
};

const ActivityChart = ({ graphdata, fetchData }) => {
  const [data, setData] = useState<DataPoint[]>(sevenDayData);
  const [selectedOption, setSelectedOption] = useState<string>("7days");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
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
      fetchData(0, "", "");
    } else if (option === "custom") {
      setIsModalOpen(true);
    }
  };

  const handleApplyCustomDates = () => {
    // Here you can fetch or calculate the custom data based on the selected dates
    // For now, we'll just use customData as a placeholder
    setIsModalOpen(false);
    fetchData(1, startDate, endDate);
  };

  useEffect(() => {
    setData(graphdata);
  }, [graphdata]);

  useEffect(() => {
    if (startDate && endDate) {
      handleApplyCustomDates();
    }
  }, [startDate, endDate]);

  return (
    <div className="pt-20 sm:px-20 bg-[#FFFFFF] rounded-6">
      <div className="flex justify-between mb-4 ">
        <p className="text-[#0A0F18] text-[20px] font-600">New Client   </p>
        <Button
          onClick={handleClick}
          variant="contained"
          className="bg-[#EDEDFC]  min-h-[45px] rounded-[8px] flex items-center justify-between font-400 text-[#4F46E5]"
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
            dataKey="total"
            strokeWidth="2"
            stroke="#4E47E5"
            fill="url(#colorHour)"
            opacity={1}
            activeDot={{ fill: "#4E47E5", r: 8 }}
          />
        </AreaChart>
      </ResponsiveContainer>
      {/* <DateRangePicker
        onChange={(item) => setState([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
      
        ranges={state}
        direction="horizontal"
      /> */}
      <Suspense>
        <DatePopup
          open={isModalOpen}
          handleToggle={() => setIsModalOpen(false)}
          modalTitle={"Add Custom Date"}
          btnTitle={"Apply"}
          closeTitle="Cancel"
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
      </Suspense>
    </div>
  );
};

export default ActivityChart;
