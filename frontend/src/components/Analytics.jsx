import React from "react";
import SitePieChart from "./SitePieChart";

const Analytics = () => {
  return (
    <div className="min-h-[100vh] w-full">
      <div className="m-3">
        <h1 className="text-4xl  font-semibold ">Analytics</h1>
      </div>
      <div className="my-3">
        <SitePieChart />
      </div>
    </div>
  );
};

export default Analytics;
