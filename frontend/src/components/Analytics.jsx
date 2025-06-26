import React from "react";
import SitePieChart from "./SitePieChart";
import { LineChart } from "lucide-react";
import RevisionLine from "./RevisionLine";
import WeeklyBarChart from "./WeeklyBarChart";

const Analytics = () => {
  return (
    <div className="min-h-[100vh] w-full">
      <div className="m-3">
        <h1 className="text-4xl  font-semibold  mb-8">Analytics</h1>
      </div>
      <div className="my-3 flex flex-col gap-9  pr-12">
        <div className="flex gap-9">
          {" "}
          <WeeklyBarChart />
          <RevisionLine />
        </div>
        <div className="flex gap-9">
          <SitePieChart />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
