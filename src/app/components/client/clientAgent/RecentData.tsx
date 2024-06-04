import { Button } from "@mui/base";
import { TextField, Typography } from "@mui/material";
import { Send } from "public/assets/icons/common";
import React, { useState } from "react";

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
  const [messages, setMessages] = useState(recentClients);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMsg = {
        img: "default-avatar.jpg", // Assuming a default avatar for new messages
        name: "You",
        description: newMessage,
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <div className="shadow-md bg-white rounded-lg overflow-hidden h-full flex flex-col justify-between">
      <div>
        <div className="bg-[#2C334C] px-[20px] py-[20px]">
          <Typography className="text-xl font-600 text-white">Notes</Typography>
        </div>
        <div className="px-[20px] py-4 space-y-4 flex-grow overflow-y-auto">
          {messages.map((item, index) => (
            <div className="gap-10 my-[20px]" key={index}>
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
                <Typography className="text-[#111827] text-sm w-full">
                  {item.description}
                </Typography>
                <div className="mb-2">
                  {/* <Typography className="font-600">{item.name}</Typography> */}
                  <Typography className="text-[#111827] text-xs text-right ">
                    Feb 12, 2024
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-4 border-t border-t-[#EDF2F6]  m-[10px]">
        <div className="flex gap-1 " style={{ alignItems: "center" }}>
          <TextField
            size="small"
            fullWidth
            sx={{
              backgroundColor: "#F6F6F6",
              color: "#757982",
              height: 48,
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                height: "100%",
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
              },
            }}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write a note...."
          />
          <Button color="primary" onClick={handleSend}>
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RecentData;
