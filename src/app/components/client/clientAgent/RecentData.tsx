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
  {
    img: "female-02.jpg",
    name: "Gabrielle",
    description: "Gabrielle has successfully completed the logo design task.",
  },
  {
    img: "female-03.jpg",
    name: "Jennifer",
    description: "Jennifer has successfully completed the logo design task.",
  },
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
  {
    img: "female-02.jpg",
    name: "Gabrielle",
    description: "Gabrielle has successfully completed the logo design task.",
  },
  {
    img: "female-03.jpg",
    name: "Jennifer",
    description: "Jennifer has successfully completed the logo design task.",
  },
];

function RecentData() {
  return (
    <div className="shadow-md bg-white px-[18px] py-20 rounded-lg">
      <Typography className="text-xl font-600 mb-10 bg-[#2C334C]">
        2C334C
      </Typography>
      <div>
        {recentClients.map((item, index) => (
          <div
            className="flex gap-14 py-14 border-b border-b-[#EDF2F6]"
            key={index}
          >
            <span className="shrink-0">
              <img
                className="rounded-full object-cover"
                src={`/assets/images/avatars/${item.img}`}
                height={34}
                width={34}
                alt=""
              />
            </span>
            <div className="grow">
              <div className="flex items-center justify-between mb-6">
                <Typography className="font-600">{item.name}</Typography>
                <Typography className="text-grey-600 text-sm">
                  Feb 12,2024
                </Typography>
              </div>
              <Typography className="text-grey-600 text-sm">
                {item.description}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentData;
