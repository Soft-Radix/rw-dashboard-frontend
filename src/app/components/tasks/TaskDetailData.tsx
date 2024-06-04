import { Button } from "@mui/base";
import { TextField, Typography } from "@mui/material";
import { Send } from "public/assets/icons/common";
import { GroupName } from "public/assets/icons/task-icons";
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

function TaskDetailData() {
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
    <div className="shadow-md bg-white rounded-lg overflow-hidden min-h-[82vh] flex flex-col justify-between">
      <div>
        <div className="flex gap-10 justify-start items-center bg-[#2C334C] px-[10px] py-[10px]">
          <GroupName />

          <div>
            <Typography className="text-xl font-600 text-white">
              Group Name
            </Typography>
            <Typography className="text-[14px] font-400 text-white">
              (3 members)
            </Typography>
          </div>
        </div>

        <div className="px-[20px] py-4 space-y-4 flex-grow overflow-y-auto">
          {messages.map((item, index) => (
            <div className="flex gap-10 my-[20px]" key={index}>
              <span className="shrink-0 items-end flex">
                <img
                  className="rounded-full object-cover"
                  src={`/assets/images/avatars/${item.img}`}
                  height={34}
                  width={34}
                  alt={item.name}
                />
              </span>
              <div className="bg-[#F6F6F6] rounded-[10px] p-[16px] ">
                <Typography className="text-[#111827] text-sm w-full">
                  {item.description}
                </Typography>
                <div className="mt-10 flex justify-between items-center">
                  <Typography className="font-400 text-[#4F46E5] text-[12px]">
                    {item.name}
                  </Typography>
                  <Typography className="text-[#111827] text-xs text-right ">
                    10:24 PM
                  </Typography>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-10 mt-20 px-[20px]">
          <span className="shrink-0 items-end flex">
            <img
              className="invisible"
              //   src={`/assets/images/avatars/${item.img}`}
              height={34}
              width={34}
              //   alt={item.name}
            />
          </span>
          <div className="bg-[#4F46E5] rounded-[10px] p-[16px] ">
            <Typography className="text-[#fff] text-sm w-full">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nisl,
            </Typography>
            <div className="mt-10 ">
              <Typography className="text-[#fff] text-xs text-right ">
                10:24 PM
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-4    m-[10px]">
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
            placeholder="Write a comment...."
          />
          <Button color="primary" onClick={handleSend}>
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TaskDetailData;
