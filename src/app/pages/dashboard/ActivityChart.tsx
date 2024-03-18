import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "M", hour: 60 },
  { name: "T", hour: 80 },
  { name: "W", hour: 60 },
  { name: "T", hour: 80 },
  { name: "F", hour: 50 },
  { name: "S", hour: 40 },
  { name: "S", hour: 30 },
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
  return (
    <div className="pt-20 px-10 sm:px-20">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* <CartesianGrid strokeDasharray="2 3" />    */}
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
            fill="#E0DDFA"
            opacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityChart;
