import React from "react";
import SitePieChart from "./SitePieChart";
import { LineChart } from "lucide-react";
import RevisionLine from "./RevisionLine";

const Analytics = () => {
  return (
    <div className="min-h-[100vh] w-full">
      <div className="m-3">
        <h1 className="text-4xl  font-semibold  mb-8">Analytics</h1>
      </div>
      <div className="my-3 flex gap-9  pr-12">
        <SitePieChart />
        <RevisionLine />
      </div>
    </div>
  );
};

export default Analytics;
