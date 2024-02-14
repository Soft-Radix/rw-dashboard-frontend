import React from "react";
import TitleBar from "src/app/components/TitleBar";
import MainCard from "src/app/components/dashboard/MainCard";

export default function Dashboard() {
  return (
    <div className="pl-28">
      <TitleBar title="Welcome On Dashboard!" />
      <div>
        <MainCard title="In Progress" />
      </div>
    </div>
  );
}
