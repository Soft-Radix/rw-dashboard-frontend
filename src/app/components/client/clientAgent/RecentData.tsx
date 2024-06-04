import { Typography } from "@mui/material";
import React from "react";

const recentClients = [
  {
    img: "female-01.jpg",
    name: "Amanda",
    description: "Amanda has successfully completed the logo design task.",
  },
  {
    img: "male-02.jpg",
    name: "Katherine",
    description: "Katherine has successfully completed the logo design task.",
  },
];

function RecentData() {
  return (
    <div className="shadow-md bg-white rounded-lg overflow-hidden  h-full">
      <div className="bg-[#2C334C] px-6 py-4">
        <Typography className="text-xl font-600 text-white">
          Recent Clients
        </Typography>
      </div>
      <div className="px-[20px] py-4 space-y-4">
        {recentClients.map((item, index) => (
          <div className="flex items-start gap-10 my-[20px]" key={index}>
            {/* <span className="shrink-0">
              <img
                className="rounded-full object-cover"
                src={`/assets/images/avatars/${item.img}`}
                height={34}
                width={34}
                alt={item.name}
              />
            </span> */}
            <div className="bg-[#F6F6F6] rounded-[10px] p-[16px] ">
              <Typography className="text-grey-600 text-sm">
                {item.description}
              </Typography>
              <div className="flex items-center justify-between mb-2">
                {/* <Typography className="font-600">{item.name}</Typography> */}
                <Typography className="text-grey-600 text-xs">
                  Feb 12, 2024
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentData;
